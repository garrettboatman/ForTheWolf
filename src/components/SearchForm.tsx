"use client";

import { useState, useEffect, FormEvent } from "react";

interface SearchFormProps {
  initialQuery: string;
  onSearch: (localQuery?: string) => void;
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

  // Sync local query with parent state
  useEffect(() => {
    setLocalQuery(initialQuery);
  }, [initialQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setLocalQuery(newQuery);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("localQuery", localQuery);
    setQuery(localQuery);
    onSearch(localQuery || "");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-16 max-w-[400px] mx-auto">
      <div className="flex relative">
        <input
          type="text"
          value={localQuery}
          onChange={handleQueryChange}
          placeholder="for the wolf..."
          className="bg-white flex-grow p-3 border border-slate-200 focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute top-0 right-0 bg-orange-500 font-bold h-full text-white p-3 px-4 disabled:bg-orange-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}
