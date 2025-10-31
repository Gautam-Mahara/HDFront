import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdventures } from "../hooks/useAdventures";
import AdventureCard from "./AdventureCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import type { Adventure } from "../types/adventure";

const AdventureCardList: React.FC = () => {
  const { adventures, loading, error, refetch } = useAdventures();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAdventures, setFilteredAdventures] = useState<Adventure[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const navigate = useNavigate();

  const handleViewDetails = (adventureId: string) => {
    navigate(`/adventure/${adventureId}`);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setFilteredAdventures(adventures);
        return;
      }

      setSearchLoading(true);
      setSearchError("");
      try {
        const response = await fetch(
          `https://hdback.onrender.com/api/adventures/search?query=${encodeURIComponent(searchQuery)}`
        );
        if (!response.ok) throw new Error("Failed to fetch search results");
        const data = await response.json();
        setFilteredAdventures(data);
      } catch (err) {
        setSearchError(err instanceof Error ? err.message : String(err));
      } finally {
        setSearchLoading(false);
      }
    };

    const debounce = setTimeout(fetchSearchResults, 400);
    return () => clearTimeout(debounce);
  }, [searchQuery, adventures]);

  useEffect(() => {
    if (!searchQuery) setFilteredAdventures(adventures);
  }, [adventures, searchQuery]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-10 gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Adventure_icon.svg/512px-Adventure_icon.svg.png"
            alt="logo"
            className="w-8 h-8"
          />
          <h1 className="text-lg font-semibold text-gray-800">
            highway <span className="font-bold text-yellow-500">delite</span>
          </h1>
        </div>

        {/* Right: Search bar */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-72 border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition">
            Search
          </button>
        </div>
      </header>

      {/* Adventure List */}
      <main className="container mx-auto px-4 py-8">
        {searchLoading && <LoadingSpinner />}
        {searchError && (
          <ErrorMessage message={searchError} onRetry={() => setSearchQuery(searchQuery)} />
        )}

        {!searchLoading && filteredAdventures.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdventures.map((adventure) => (
              <AdventureCard
                key={adventure.id}
                adventure={adventure}
                onViewDetails={() => handleViewDetails(adventure.id)}
              />
            ))}
          </div>
        )}

        {!searchLoading && searchQuery && filteredAdventures.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No adventures found.</p>
        )}
      </main>
    </div>
  );
};

export default AdventureCardList;
