import SliderUtil from "../../components/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start mt-8 px-4 md:px-8">
      <nav className="w-full md:w-48 mb-6 md:mb-0 space-y-3">
        <Link
          to="/"
          className="block w-full bg-neutral-800 text-white hover:bg-teal-500 transition duration-200 px-4 py-2 rounded-lg text-center shadow"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="block w-full bg-neutral-800 text-white hover:bg-teal-500 transition duration-200 px-4 py-2 rounded-lg text-center shadow"
        >
          Browse Movies
        </Link>
      </nav>

      <div className="w-full md:flex-1">
        <SliderUtil data={data} />
      </div>
    </div>
  );
};

export default Header;
