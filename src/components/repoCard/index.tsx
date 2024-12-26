import React from "react";
import { IRepo } from "../../models/models";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavourite, removeFavourites } = useActions();
  const { favourites } = useAppSelector((state) => state.github);
  const [isFavourite, setIsFavourite] = React.useState(
    favourites.includes(repo.html_url)
  );
  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite(repo.html_url);
    setIsFavourite(true);
  };

  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourites(repo.html_url);
    setIsFavourite(false);
  };
  return (
    <div className="border py-3 rounded mb-2 hover:shadow-md  hover:bg-gray-100 transition-all">
      <Link to={repo.html_url} target="_blank" className="block px-4">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks:<span className="mr-2 font-bold">{repo.forks}</span>
          Watchers:<span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
        {!isFavourite && (
          <button
            className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
            onClick={addToFavourite}
          >
            Add
          </button>
        )}
        {isFavourite && (
          <button
            className="py-2 px-4 mr-2 bg-red-400 rounded hover:shadow-md transition-all"
            onClick={removeFromFavourite}
          >
            remove
          </button>
        )}
      </Link>
    </div>
  );
};

export default RepoCard;
