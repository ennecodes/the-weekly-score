import { TaskSwitch } from "./TaskSwitch";

export interface Routine {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Task {
    id: string;
    name: string;
}

export const RoutineCard = ({ routine }: { routine: Routine }) => {
  return (
    <div className="rounded-lg bg-pink-100 p-4 shadow-lg">
      <h2 className="mb-4 text-center text-xl font-bold">{routine.name}</h2>
      <ul>
        {routine.tasks.map((task, index) => (
          <li key={index} className="flex items-center justify-between">
            <TaskSwitch task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};
