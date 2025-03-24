export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const response = await fetch("http://localhost:5000/update-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, movie }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await fetch("http://localhost:5000/trending-movies");
    return await response.json();
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
};
