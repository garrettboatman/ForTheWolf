"use client";

import { useState, useEffect, FormEvent } from "react";

interface SearchFormProps {
  initialQuery: string;
  initialExactSearch: string;
  onSearch: (localQuery?: string, localExactSearch?: string) => void;
  setQuery: (query: string) => void;
  setExactSearch: (exactSearch: string) => void;
  isLoading: boolean;
}

export default function SearchForm({
  initialQuery,
  initialExactSearch,
  onSearch,
  setQuery,
  setExactSearch,
  isLoading,
}: SearchFormProps) {
  const [localQuery, setLocalQuery] = useState(initialQuery);
  const [localExactSearch, setLocalExactSearch] = useState(initialExactSearch === "true");

  // Sync local query with parent state
  useEffect(() => {
    setLocalQuery(initialQuery);
    setLocalExactSearch(initialExactSearch === "true");
  }, [initialQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setLocalQuery(newQuery.toLowerCase());
  };

  const handleExactSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setLocalExactSearch(newValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("localQuery", localQuery);
    setQuery(localQuery);
    setExactSearch(localExactSearch.toString());
    onSearch(localQuery || "", localExactSearch.toString());
  };

  return (
    <form onSubmit={handleSubmit} className="mb-16 max-w-[400px] mx-auto">
      <div className="flex relative">
        <input
          type="text"
          autoComplete="off"
          autoCorrect="off"
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
      <div className="flex relative">
        <input
          type="checkbox"
          checked={localExactSearch}
          onChange={handleExactSearchChange}
          id="exactSearchCheckbox"
        />
        <label
          htmlFor="exactSearchCheckbox"
          className="h-full text-black p-3 px-4"
        >
          Exact phrase?
        </label>
      </div>
    </form>
  );
}
