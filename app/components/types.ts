import { Routine, Task } from "@prisma/client";

export type TaskDTO = Task & {
  isCompleted: boolean;
  completionId: string | null;
};

export type RoutineDTO = Routine & { tasks: TaskDTO[] };
