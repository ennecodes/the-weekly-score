import { Routine } from "@prisma/client";
import { Link } from "@remix-run/react";

import { RoutineCard } from "./RoutineCard";



export const RoutineSummary = ({routines}: {routines: Routine[]}) => {
    return (
    <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {routines.map((routine, index) => (
            <RoutineCard key={index} routine={routine} />
        ))}
        </div>
       <Link to={{
                  pathname: "/addRoutine",
                }}>
       
        <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
            Add Routine
        </button>
       </Link>
    </>
    );
}
