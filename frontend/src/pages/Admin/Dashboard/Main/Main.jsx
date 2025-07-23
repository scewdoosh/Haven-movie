import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div className="text-gray-100">
      <section className="flex justify-between px-4 mt-10">
        {/* Left section */}
        <div className="ml-[14rem] w-full max-w-5xl">
          {/* Cards Row */}
          <div className="flex gap-6 mb-10 items-stretch">
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
              info="20.2k more than usual"
              gradient="from-purple-600 to-indigo-500"
            />
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="742 more than usual"
              gradient="from-pink-500 to-purple-500"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
              info="372 more than usual"
              gradient="from-purple-500 to-indigo-400"
            />
          </div>

          {/* Top Content Header */}
          <div className="flex justify-between pr-6 mb-4 text-lg font-semibold">
            <p className="text-purple-300">Top Content</p>
            <p className="text-purple-300">Comments</p>
          </div>

          {/* Top Movies */}
          <div className="space-y-4">
            {topMovies?.map((movie) => (
              <VideoCard
                key={movie._id}
                image={movie.image}
                title={movie.name}
                date={movie.year}
                comments={movie.numReviews}
              />
            ))}
          </div>
        </div>

        {/* Right section: RealTimeCard */}
        <div className="ml-10 mt-10">
          <RealTimeCard />
        </div>
      </section>
    </div>
  );
};

export default Main;
