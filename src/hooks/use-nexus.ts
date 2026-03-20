import { useState, useEffect } from 'react';

const NEXUS_API_BASE = process.env.NEXT_PUBLIC_NEXUS_API || 'http://localhost:3001/api';

/**
 * A custom hook to fetch data from the local Nexus Express backend.
 * This directly replaces the old useCollection Firebase hooks.
 */
export function useNexus<T>(endpoint: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  const mutate = () => setTrigger(t => t + 1);

  useEffect(() => {
    if (!endpoint) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const isCloudRoute = endpoint.startsWith('/chat');
        const fetchUrl = isCloudRoute ? `/api${endpoint}` : `${NEXUS_API_BASE}${endpoint}`;

        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error(`Connection failed: ${response.statusText}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error("API Error:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, trigger]);

  return { data, isLoading, error, mutate };
}

/**
 * Helper utility to run POST/PUT/DELETE mutations against Nexus
 */
export async function mutateNexus(endpoint: string, options: RequestInit = {}) {
  try {
    const isCloudRoute = endpoint.startsWith('/chat');
    const fetchUrl = isCloudRoute ? `/api${endpoint}` : `${NEXUS_API_BASE}${endpoint}`;

    const response = await fetch(fetchUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!response.ok) throw new Error(`Mutation failed: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Mutation Error:", error);
    throw error;
  }
}
