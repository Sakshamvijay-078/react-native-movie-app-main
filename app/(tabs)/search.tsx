import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, Button } from "react-native";

import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";

import SearchBar from "@/components/SearchBar";
import MovieDisplayCard from "@/components/MovieCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<{ movies: Movie[]; total_pages: number }>({ movies: [], total_pages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMoviesData = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchMovies({ query: searchQuery, page: currentPage });
      setMovies(data);

      // Call updateSearchCount only if there are results
      if (data.movies.length > 0) {
        await updateSearchCount(searchQuery, data.movies[0]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies when searchQuery or currentPage changes (Debounced)
  useEffect(() => {
    const timeoutId = setTimeout(fetchMoviesData, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, currentPage]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1); // Reset to first page when search changes
  };

  return (
    <View className="flex-1 bg-primary">
      <FlatList
        className="px-5 w-full"
        showsVerticalScrollIndicator={false}
        data={movies.movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieDisplayCard {...item} />}
        numColumns={4}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-5 items-center">
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && <ActivityIndicator size="large" color="#0000ff" className="my-3" />}
            {error && <Text className="text-red-500 px-5 my-3">Error: {error}</Text>}

            {!loading && !error && searchQuery.trim() && movies.movies.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Results for <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />

      {/* Pagination Controls */}
      {movies.total_pages > 1 && (
        <View className="flex-row justify-between items-center mt-5 px-5 absolute bottom-20 w-full mt-10">
          <Button title="Previous" onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
          <Text className="text-white">Page {currentPage} of {movies.total_pages}</Text>
          <Button title="Next" onPress={() => setCurrentPage((prev) => Math.min(prev + 1, movies.total_pages))} disabled={currentPage >= movies.total_pages} />
        </View>
      )}
    </View>
  );
};

export default Search;
