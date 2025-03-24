import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // ✅ Correct import for Expo

import { useRouter } from "expo-router";
import { fetchMovies } from "@/services/api";
import { fetchTrendingMovie } from "@/services/api";

import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";

const Index = () => {
  const router = useRouter();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingError, setTrendingError] = useState<string | null>(null);

  const [moviesData, setMoviesData] = useState<{ movies: Movie[]; total_pages: number } | null>(null);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState<string | null>(null);

  const trendingListRef = useRef<FlatList>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const itemWidth = 150;

  // Fetch Trending Movies
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setTrendingLoading(true);
      try {
        const data = await fetchTrendingMovie();
        setTrendingMovies(data.movies);
      } catch (error) {
        setTrendingError(error instanceof Error ? error.message : String(error));
      } finally {
        setTrendingLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  // Fetch Movies when currentPage changes
  useEffect(() => {
    const fetchMovieData = async () => {
      setMoviesLoading(true);
      try {
        const data = await fetchMovies({ query: "", page: currentPage });
        setMoviesData(data);
        setTotalPages(data.total_pages);
      } catch (error) {
        setMoviesError(error instanceof Error ? error.message : String(error));
      } finally {
        setMoviesLoading(false);
      }
    };

    fetchMovieData();
  }, [currentPage]);

  // Move Left in Trending Movies
  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - itemWidth * 2);
    trendingListRef.current?.scrollToOffset({ offset: newPosition, animated: true });
    setScrollPosition(newPosition);
  };

  // Move Right in Trending Movies
  const scrollRight = () => {
    const newPosition = scrollPosition + itemWidth * 2;
    trendingListRef.current?.scrollToOffset({ offset: newPosition, animated: true });
    setScrollPosition(newPosition);
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError || trendingError}</Text>
        ) : (
          <View className="flex-1 mt-5">
            {/* Trending Movies Section with Scroll Controls */}
            {trendingMovies && (
              <View className="relative mt-10">
                <Text className="text-lg text-white font-bold mb-10">
                  <Text className="text-lg text-white font-bold " style={{ marginRight: 28 }}>
                    Trending Movies
                  </Text>

                  <TouchableOpacity
                    onPress={scrollLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10"
                    style={{top: "600%" }}
                  >
                    <Feather name="arrow-left" size={30} color="white" />
                  </TouchableOpacity>
                </Text>

                {/* Movie List */}
                <FlatList
                  ref={trendingListRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={trendingMovies || []}
                  renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}
                  keyExtractor={(item) => item.id.toString()}
                  onScroll={(event) => {
                    setScrollPosition(event.nativeEvent.contentOffset.x);
                  }}
                />

                {/* Right Scroll Button */}
                <TouchableOpacity
                  onPress={scrollRight}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10"
                >
                  <Feather name="arrow-right" size={30} color="white" />
                </TouchableOpacity>
              </View>
            )}

            {/* Latest Movies Section */}
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies (Page {currentPage}/{totalPages})
            </Text>

            <FlatList
              data={moviesData?.movies || []}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={4}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />

            {/* Pagination Controls */}
            <View className="flex-row justify-between items-center mt-5 px-5 absolute bottom-20 w-full">
              <Button
                title="Previous"
                onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
              <Text className="text-white">Page {currentPage} of {totalPages}</Text>
              <Button
                title="Next"
                onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
