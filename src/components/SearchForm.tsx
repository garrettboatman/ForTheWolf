"use client";

import { usePostHog } from "posthog-js/react";
import { useState, useEffect } from "react";

interface SearchFormProps {
  initialQuery: string;
  onSearch: () => void;
  setQuery: (query: string) => void;
  isLoading: boolean;
}

export default function SearchForm({
  initialQuery,
  onSearch,
  setQuery,
  isLoading,
}: SearchFormProps) {
  const [localQuery, setLocalQuery] = useState(initialQuery);
  const posthog = usePostHog();

  // Sync local query with parent state
  useEffect(() => {
    setLocalQuery(initialQuery);
  }, [initialQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setLocalQuery(newQuery);
    setQuery(newQuery);
    posthog.capture("searched", { query: newQuery });
  };

  return (
    <div className="flex mb-16 relative max-w-[400px] mx-auto">
      <input
        type="text"
        value={localQuery}
        onChange={handleQueryChange}
        placeholder="for the wolf..."
        className="bg-white flex-grow p-3 border border-slate-200 focus:outline-none"
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        disabled={isLoading}
      />
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="absolute top-0 right-0 bg-orange-500 font-bold h-full text-white p-3 px-4 disabled:bg-orange-800"
      >
        Search
      </button>
    </div>
  );
}
