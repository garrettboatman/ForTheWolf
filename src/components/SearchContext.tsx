"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Episode } from "@/utils/types";

interface ApiResponse {
  total: number;
  offset: number;
  limit: number;
  data: (Episode & { highlight?: Record<string, string[]> })[];
}

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: (Episode & { highlight?: Record<string, string[]> })[];
  isLoading: boolean;
  totalResults: number;
  handleSearch: () => Promise<void>;
  loadMore: () => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    (Episode & { highlight?: Record<string, string[]> })[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [offset, setOffset] = useState(0);
  const pageSize = 50; // Always load 50 results at a time

  // Function to update URL with current search state
  const updateUrl = useCallback(
    (newParams: Record<string, string | boolean>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === "" || value === false) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const newUrl = params.toString() ? `?${params.toString()}` : "";
      router.push(newUrl);
    },
    [router, searchParams]
  );

  // Effect to load initial search from URL parameters
  useEffect(() => {
    const queryParam = searchParams.get("search") || "";
    setQuery(queryParam);

    // Reset pagination state when URL changes
    setOffset(0);

    // We only want to trigger a search on initial load or when URL params change
    if (queryParam) {
      const fetchResults = async () => {
        setIsLoading(true);
        try {
          const params = new URLSearchParams();
          if (queryParam.trim()) params.append("search", queryParam);
          params.append("exactPhrase", "true"); // Always use exact phrase
          params.append("limit", "50"); // Always load 50 at a time
          params.append("offset", "0"); // Explicitly set offset to 0

          console.log("Initial search with limit: 50, offset: 0");

          const response = await fetch(`/api/episodes?${params.toString()}`);
          if (!response.ok) {
            throw new Error(
              `API request failed with status ${response.status}`
            );
          }

          const data: ApiResponse = await response.json();
          setResults(data.data);
          setTotalResults(data.total);
        } catch (error) {
          console.error("Error searching episodes:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchResults();
    }
  }, [searchParams]);

  const handleSearch = async () => {
    setIsLoading(true);

    // Reset offset and current page for new searches
    setOffset(0);

    // Update URL with current search parameters
    updateUrl({
      search: query,
    });

    try {
      // Build the API URL with query parameters
      const params = new URLSearchParams();
      if (query.trim()) params.append("search", query);
      params.append("exactPhrase", "true"); // Always use exact phrase
      params.append("limit", "50"); // Always load 50 at a time
      params.append("offset", "0"); // Explicitly set offset to 0

      console.log("New search with limit: 50, offset: 0");

      // Fetch from our API route
      const response = await fetch(`/api/episodes?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setResults(data.data);
      setTotalResults(data.total);
    } catch (error) {
      console.error("Error searching episodes:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (isLoading || !query.trim()) return;

    setIsLoading(true);
    const newOffset = offset + pageSize;
    setOffset(newOffset);

    try {
      const params = new URLSearchParams();
      if (query.trim()) params.append("search", query);
      params.append("exactPhrase", "true"); // Always use exact phrase
      params.append("limit", "50"); // Explicitly set to 50 to ensure consistency
      params.append("offset", newOffset.toString());

      console.log(`Loading more with offset: ${newOffset}, limit: 50`);

      const response = await fetch(`/api/episodes?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      // Only append new results if we received any
      if (data.data.length > 0) {
        setResults((prev) => [...prev, ...data.data]);
      } else {
        console.log("No more episodes to load");
      }

      console.log(`Loaded ${data.data.length} more episodes`);
    } catch (error) {
      console.error("Error loading more episodes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    query,
    setQuery,
    results,
    isLoading,
    totalResults,
    handleSearch,
    loadMore,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
