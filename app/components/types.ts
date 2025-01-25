import { Routine, Task } from "@prisma/client";

export type TaskDTO = Task & {
  isCompleted: boolean;
  completionId: number | null;
};

export type RoutineDTO = Routine & { tasks: TaskDTO[] };
