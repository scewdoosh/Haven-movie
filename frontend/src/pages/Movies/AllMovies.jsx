import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/miles.gif";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector(
    (state) => state.movies
  );

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleYearChange = (selectedYear) => {
  dispatch(setMoviesFilter({ selectedYear }));
  const filtered = data.filter((movie) => String(movie.year) === String(selectedYear));
  dispatch(setFilteredMovies(filtered));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

 const handleSortChange = (sortOption) => {
  dispatch(setMoviesFilter({ selectedSort: sortOption }));

  switch (sortOption) {
    case "new":
      if (newMovies) dispatch(setFilteredMovies(newMovies));
      break;
    case "top":
      if (topMovies) dispatch(setFilteredMovies(topMovies));
      break;
    case "random":
      if (randomMovies) dispatch(setFilteredMovies(randomMovies));
      break;
    default:
      dispatch(setFilteredMovies(data || []));
      break;
  }
};

  return (
    <>
      <section>
        <div
          className="relative h-[50rem] w-screen mb-32 flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/50"></div>

          <div className="relative z-10 text-center text-white mt-[10rem]">
            <h1 className="text-7xl md:text-8xl font-bold mb-4">
              Haven Movies
            </h1>
            <p className="text-xl md:text-2xl">
              Cinematic Odyssey: Unveiling the Magic of Movies
              <span className="block text-fuchsia-900 mt-10">scroll down</span>
            </p>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col items-center mb-20">
        <input
          type="text"
          className="w-[90%] max-w-lg h-[3.5rem] border border-gray-400 px-6 outline-none rounded-md mb-6"
          placeholder="Search Movie"
          value={moviesFilter.searchTerm}
          onChange={handleSearchChange}
        />

        <div className="sorts-container flex justify-center gap-4 flex-wrap px-4">
          {/* Genre Filter */}
          <select
            className="border border-gray-400 p-2 rounded bg-white text-black"
            value={moviesFilter.selectedGenre}
            onChange={(e) => handleGenreClick(e.target.value)}
          >
            <option value="">Genres</option>
            {genres?.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            className="border border-gray-400 p-2 rounded bg-white text-black"
            value={moviesFilter.selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
          >
            <option value="">Year</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Sort Filter */}
          <select
            className="border border-gray-400 p-2 rounded bg-white text-black"
            value={moviesFilter.selectedSort}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="new">New Movies</option>
            <option value="top">Top Movies</option>
            <option value="random">Random Movies</option>
          </select>
        </div>
      </section>

      <section className="px-6 sm:px-10 md:px-16 lg:px-20 xl:px-32 2xl:px-48 w-full mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center">
          {filteredMovies?.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AllMovies;
