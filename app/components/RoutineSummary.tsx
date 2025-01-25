import { Link } from "@remix-run/react";

import { RoutineCard } from "./RoutineCard";
import { RoutineDTO } from "./types";

export const RoutineSummary = ({ routines }: { routines: RoutineDTO[] }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {routines.map((routine, index) => (
          <RoutineCard key={index} routine={routine} />
        ))}
      </div>
      <Link
        to={{
          pathname: "/addRoutine",
        }}
      >
        <button className="rounded bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-700">
          Add Routine
        </button>
      </Link>
    </>
  );
};
