import React from "react";
import { useAppSelector } from "../hooks/redux";

const FavoritesPage = () => {
  const { favourites } = useAppSelector((state) => state.github);
  if (favourites.length === 0) return <p className="text-center">No items</p>;
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none ">
        {favourites.map((f, i) => (
          <li
            key={i}
            className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <a href={f} rel="noreferrer" target="_blank">
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
