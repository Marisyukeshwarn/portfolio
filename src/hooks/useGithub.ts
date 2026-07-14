import { useState, useEffect } from 'react';
import { GITHUB_API_BASE, GITHUB_USERNAME } from '@/config/github';

export interface GithubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  fork: boolean;
}

export interface GithubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    ref?: string;
    ref_type?: string;
    action?: string;
  };
}

export interface GithubData {
  profile: GithubProfile | null;
  repos: GithubRepo[];
  events: GithubEvent[];
  totalStars: number;
  loading: boolean;
  error: string | null;
}

const CACHE_KEY = `github_data_${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL_MS) return null;
    return data as T;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // Silently fail if sessionStorage is unavailable
  }
}

export function useGithub(): GithubData {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      // Check cache first
      const cached = getCached<Omit<GithubData, 'loading' | 'error'>>(CACHE_KEY);
      if (cached) {
        setProfile(cached.profile);
        setRepos(cached.repos);
        setEvents(cached.events);
        setTotalStars(cached.totalStars);
        setLoading(false);
        return;
      }

      try {
        const headers: HeadersInit = {
          Accept: 'application/vnd.github+json',
        };

        const [profileRes, reposRes, eventsRes] = await Promise.all([
          fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, { headers }),
          fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=30`, { headers }),
          fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=15`, { headers }),
        ]);

        if (!profileRes.ok) throw new Error(`GitHub API error: ${profileRes.status}`);

        const [profileData, reposData, eventsData]: [GithubProfile, GithubRepo[], GithubEvent[]] =
          await Promise.all([profileRes.json(), reposRes.json(), eventsRes.json()]);

        // Filter out forks, sort by stars desc
        const ownRepos = (Array.isArray(reposData) ? reposData : [])
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);

        const stars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
        const evts = Array.isArray(eventsData) ? eventsData : [];

        setProfile(profileData);
        setRepos(ownRepos);
        setEvents(evts);
        setTotalStars(stars);

        setCache(CACHE_KEY, {
          profile: profileData,
          repos: ownRepos,
          events: evts,
          totalStars: stars,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  return { profile, repos, events, totalStars, loading, error };
}
