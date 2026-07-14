import React from 'react';
import { motion } from 'framer-motion';
import {
  GitCommit, Star, Users, Book, GitFork, ExternalLink, Clock,
  GitPullRequest, GitMerge, AlertCircle, Zap, Code2
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useGithub, type GithubRepo, type GithubEvent } from '@/hooks/useGithub';
import { GITHUB_USERNAME, GITHUB_PROFILE_URL } from '@/config/github';

// Language color map
const LANG_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  JavaScript: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Python: 'bg-green-500/20 text-green-400 border-green-500/30',
  Rust: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Go: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  Java: 'bg-red-500/20 text-red-400 border-red-500/30',
  'C++': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  C: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  HTML: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  CSS: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  Shell: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Jupyter: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};
const DEFAULT_LANG_COLOR = 'bg-muted/50 text-muted-foreground border-border';

function langColor(lang: string | null) {
  if (!lang) return DEFAULT_LANG_COLOR;
  return LANG_COLORS[lang] ?? DEFAULT_LANG_COLOR;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function eventIcon(type: string) {
  switch (type) {
    case 'PushEvent': return <GitCommit className="w-3.5 h-3.5 text-primary" />;
    case 'PullRequestEvent': return <GitPullRequest className="w-3.5 h-3.5 text-violet-400" />;
    case 'CreateEvent': return <Zap className="w-3.5 h-3.5 text-yellow-400" />;
    case 'WatchEvent': return <Star className="w-3.5 h-3.5 text-amber-400" />;
    case 'ForkEvent': return <GitFork className="w-3.5 h-3.5 text-blue-400" />;
    case 'IssueCommentEvent': return <AlertCircle className="w-3.5 h-3.5 text-green-400" />;
    case 'MergeEvent': return <GitMerge className="w-3.5 h-3.5 text-purple-400" />;
    default: return <Code2 className="w-3.5 h-3.5 text-muted-foreground" />;
  }
}

function eventDescription(evt: GithubEvent): string {
  const repo = evt.repo.name.split('/')[1] ?? evt.repo.name;
  switch (evt.type) {
    case 'PushEvent': {
      const commits = evt.payload.commits ?? [];
      const msg = commits[0]?.message?.split('\n')[0] ?? 'pushed commits';
      return `Pushed "${msg}" to ${repo}`;
    }
    case 'CreateEvent':
      return `Created ${evt.payload.ref_type ?? 'ref'} in ${repo}`;
    case 'PullRequestEvent':
      return `${evt.payload.action ?? 'updated'} a pull request in ${repo}`;
    case 'WatchEvent':
      return `Starred ${repo}`;
    case 'ForkEvent':
      return `Forked ${repo}`;
    case 'IssueCommentEvent':
      return `Commented on an issue in ${repo}`;
    default:
      return `Activity in ${repo}`;
  }
}

// Skeleton loader
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-muted/40 rounded-lg ${className ?? ''}`} />;
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-between bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
    >
      <div>
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1 flex-1">
            {repo.name}
          </h4>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {repo.description ?? 'No description provided'}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400" />
              {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <GitFork className="w-3 h-3" />
              {repo.forks_count}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timeAgo(repo.pushed_at)}
          </span>
        </div>
        {repo.language && (
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${langColor(repo.language)}`}>
            {repo.language}
          </span>
        )}
      </div>
    </motion.a>
  );
}

export function GithubDashboard() {
  const { profile, repos, events, totalStars, loading, error } = useGithub();

  const displayRepos = repos.slice(0, 6);

  // Compute language breakdown
  const langMap: Record<string, number> = {};
  repos.forEach((r) => { if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1; });
  const topLangs = Object.entries(langMap).sort(([, a], [, b]) => b - a).slice(0, 5);

  return (
    <section id="github" className="py-24 relative bg-muted/20">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-primary/5 blur-3xl rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <FaGithub className="w-4 h-4" />
            Live GitHub Activity
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-foreground"
          >
            GitHub Dashboard
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mt-4 rounded-full" />
        </div>

        {error && (
          <div className="max-w-5xl mx-auto mb-8 flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error} — showing limited data.
          </div>
        )}

        {/* Profile Banner */}
        {loading ? (
          <div className="max-w-5xl mx-auto mb-10 flex items-center gap-5 p-6 bg-card/50 border border-border rounded-3xl">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-64" />
            </div>
          </div>
        ) : profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 p-6 bg-card/50 backdrop-blur-md border border-border rounded-3xl shadow-sm"
          >
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-16 h-16 rounded-full border-2 border-primary/30 shadow-lg shadow-primary/10 flex-shrink-0"
            />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-foreground">{profile.name ?? profile.login}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">@{profile.login}</p>
              {profile.bio && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{profile.bio}</p>
              )}
            </div>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
            >
              <FaGithub className="w-4 h-4" />
              View Profile
            </a>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {[
            { label: 'Repositories', value: profile?.public_repos, icon: Book, color: 'text-primary', glow: 'shadow-primary/20' },
            { label: 'Stars Earned', value: totalStars, icon: Star, color: 'text-amber-400', glow: 'shadow-amber-400/20' },
            { label: 'Followers', value: profile?.followers, icon: Users, color: 'text-green-400', glow: 'shadow-green-400/20' },
            { label: 'Following', value: profile?.following, icon: GitCommit, color: 'text-violet-400', glow: 'shadow-violet-400/20' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`bg-card/50 backdrop-blur-md border border-border p-6 rounded-2xl shadow-sm hover:shadow-md ${stat.glow} transition-shadow flex flex-col items-center justify-center text-center group`}
            >
              {loading ? (
                <>
                  <Skeleton className="w-8 h-8 mb-3 rounded-full" />
                  <Skeleton className="h-6 w-16 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </>
              ) : (
                <>
                  <stat.icon className={`w-8 h-8 mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {stat.value ?? 0}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Repos Grid (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Book className="w-5 h-5 text-primary" />
                Top Repositories
              </h3>
              <a
                href={`${GITHUB_PROFILE_URL}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                View all <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {displayRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}

            {/* Language Breakdown */}
            {!loading && topLangs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-6 bg-card/50 backdrop-blur-md border border-border rounded-2xl p-5"
              >
                <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" /> Languages Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {topLangs.map(([lang, count]) => (
                    <div key={lang} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${langColor(lang)}`}>
                      {lang}
                      <span className="opacity-60">({count})</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Recent Activity (1/3 width) */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-primary" />
              Recent Activity
            </h3>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-14" />
                ))}
              </div>
            ) : events.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent public activity.</p>
            ) : (
              <div className="space-y-3">
                {events.slice(0, 8).map((evt, i) => (
                  <motion.div
                    key={evt.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-3 p-3 bg-card/40 border border-border rounded-xl hover:border-primary/30 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-muted/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {eventIcon(evt.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground line-clamp-2 leading-relaxed">
                        {eventDescription(evt)}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {timeAgo(evt.created_at)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Contribution Heatmap via GitHub SVG */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 bg-card/50 backdrop-blur-md border border-border rounded-2xl p-5 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-foreground">Contribution Graph</h4>
                <span className="text-xs text-muted-foreground">Last year</span>
              </div>
              <div className="w-full overflow-x-auto rounded-xl">
                <img
                  src={`https://ghchart.rshah.org/38bdf8/${GITHUB_USERNAME}`}
                  alt="GitHub contribution chart"
                  className="w-full min-w-[300px] rounded-lg"
                  style={{ filter: 'hue-rotate(200deg) saturate(1.2)' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
