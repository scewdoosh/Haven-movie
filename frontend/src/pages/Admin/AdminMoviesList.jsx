import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="flex flex-wrap justify-around items-center p-[2rem]">
      {movies?.map((movie) => (
        <Link
          key={movie._id}
          to={`/admin/movies/update/${movie._id}`}
          className="block mb-4 overflow-hidden"
        >
          <div className="flex">
            <div className="w-[200px] md:w-[250px] bg-white dark:bg-gray-900 m-[2rem] rounded-2xl overflow-hidden shadow-lg border border-gray-700">
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full h-[340px] object-cover rounded-t-xl bg-gray-800"
              />
              <div className="px-4 py-3 border-t border-gray-800">
                <div className="font-bold text-white text-xl mb-2 text-center">{movie.name}</div>
                <p className="text-gray-300 text-sm">{movie.detail}</p>
                <div className="mt-4 mb-2">
                  <Link
                    to={`/admin/movies/update/${movie._id}`}
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-full block text-center"
                  >
                    Update Movie
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminMoviesList;