import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div key={movie._id} className="relative group px-2 py-2">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full aspect-square object-cover rounded-xl shadow-md transition duration-300 ease-in-out group-hover:opacity-60"
        />
      </Link>
      <p className="absolute bottom-3 left-3 right-3 text-white text-sm md:text-base font-semibold bg-black/60 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
        {movie.name}
      </p>
    </div>
  );
};

export default MovieCard;
