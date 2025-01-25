import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { requireUser } from "~/auth.server";
import { RoutineSummary } from "~/components/RoutineSummary";
import { prisma } from "~/db.server";


export const meta: MetaFunction = () => [{ title: "The Weekly Score" }];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  const routines = await prisma.routine.findMany({
    where: { userId: user.uid },
    include: { tasks: { orderBy: { order: "asc" } , include: {completions: {where: { createdAt: {
      gte: new Date(new Date().setHours(0, 0, 0, 0)),
      lt: new Date(new Date().setHours(24, 0, 0, 0)),
    }}, take: 1}}}},
  });

  console.log(routines);

  return json({ user, routines: routines.map(routine => ({...routine, tasks: routine.tasks.map(task => ({...task, isCompleted: task.completions.length, completionId: task.completions[0]?.id || null}))})) });
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData()
  const {_action, ...values} = Object.fromEntries(formData)
  const taskId = values.taskId ? Number(values.taskId) : undefined;
  const completionId = values.completionId ? Number(values.completionId) : undefined;

  console.log(taskId, completionId, _action);
  if (_action === "check" && taskId)  {
    await prisma.taskCompletion.create({
      data: {
        taskId,
      },
    });
  } else if (_action === "uncheck" && completionId) {
    await prisma.taskCompletion.delete({
      where: {
        id: completionId,
      },
    });
  }

  return json({ message: "success" }, { status: 200 });
}

export default function Index() {
  const { user , routines} = useLoaderData<typeof loader>();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        Welcome {user.email}
        <RoutineSummary routines={routines}/>
      </div>
      <div className="absolute bottom-0 right-0 p-4">
      <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </div>
    </main>
  );
}
