import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed h-full w-54 border-rounded border-[#4b3a6b] bg-[#241d2d] shadow-lg shadow-black/20">
      <aside className="text-gray-100 h-full p-6">
        <ul className="space-y-4">
          <li className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 shadow-md">
            <Link
              to="/admin/movies/dashboard"
              className="block text-center py-2 px-6 font-semibold"
            >
              Dashboard
            </Link>
          </li>

          <li className="rounded-full hover:bg-[#6e5b9d] transition-all duration-200">
            <Link
              to="/admin/movies/create"
              className="block text-center py-2 px-6 font-medium"
            >
              Create Movie
            </Link>
          </li>

          <li className="rounded-full hover:bg-[#6e5b9d] transition-all duration-200">
            <Link
              to="/admin/movies/genre"
              className="block text-center py-2 px-6 font-medium"
            >
              Create Genre
            </Link>
          </li>

          <li className="rounded-full hover:bg-[#6e5b9d] transition-all duration-200">
            <Link
              to="/admin/movies-list"
              className="block text-center py-2 px-6 font-medium"
            >
              Update Movie
            </Link>
          </li>

          <li className="rounded-full hover:bg-[#6e5b9d] transition-all duration-200">
            <Link
              to="/admin/movies/comments"
              className="block text-center py-2 px-6 font-medium"
            >
              Comments
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
