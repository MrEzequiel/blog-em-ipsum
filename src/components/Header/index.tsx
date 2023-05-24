import { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header className="bg-gray-900 shadow-sm hover:shadow-md transition-all">
      <div className="container max-w-3xl mx-auto p-5 flex justify-between items-center">
        <h1 className="w-fit cursor-pointer text-xl hover:text-gray-50 hover:underline">
          <Link to={"/"}>Blog em-ipsum</Link>
        </h1>

        <a
          href="https://jsonplaceholder.typicode.com/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-gray-300 hover:underline"
        >
          API
        </a>
      </div>
    </header>
  );
};

export default Header;
