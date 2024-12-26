import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/debounce";
import {
  useSearchUsersQuery,
  useLazyGetUserReposQuery,
} from "../store/github/github.api";
import RepoCard from "../components/repoCard";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search, 600);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();
  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };
  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);
  console.log(repos);

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong</p>
      )}
      <div className="relative w-[540px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42] mb-2"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropdown && (
          <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] swadow-md bg-white overflow-y-scroll">
            {isLoading && <li>Loading...</li>}
            {data?.map((user) => (
              <li
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                key={user.id}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {areReposLoading && <p className="text-center">Loading...</p>}
          {repos?.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
