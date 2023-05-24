import { FC } from "react";
import { MdNotListedLocation } from "react-icons/md";

const NotFound: FC = () => {
  return (
    <div className="h-96 gap-2 flex flex-col items-center justify-center">
      <MdNotListedLocation size={100} />
      <h1 className="text-xl text-gray-400 font-bold text-center">
        404 - Nada encotrado
      </h1>
    </div>
  );
};

export default NotFound;
