"use client";

import { useSearch } from "./SearchContext";
import SearchForm from "./SearchForm";
import EpisodeList from "./EpisodeList";

export default function ClientWrapper() {
  const {
    query,
    setQuery,
    results,
    isLoading,
    totalResults,
    handleSearch,
    loadMore,
  } = useSearch();

  return (
    <>
      <SearchForm
        initialQuery={query}
        onSearch={handleSearch}
        setQuery={setQuery}
        isLoading={isLoading}
      />
      <div className="mt-6">
        <EpisodeList
          results={results}
          totalResults={totalResults}
          isLoading={isLoading}
          loadMore={loadMore}
          query={query}
        />
      </div>
    </>
  );
}
