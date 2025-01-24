import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { requireUser } from "~/auth.server";
import { RoutineSummary } from "~/components/RoutineSummary";

export const meta: MetaFunction = () => [{ title: "The Weekly Score" }];

const testRoutines = [
  {
    id: "1",
    name: "Routine 1",
    tasks: [
      { id: "1", name: "Task 1" },
      { id: "2", name: "Task 2" },
      { id: "3", name: "Task 3" },
      { id: "4", name: "Task 4" },
    ],
  },
  {
    id: "2",
    name: "Routine 2",
    tasks: [
      { id: "5", name: "Task 5" },
      { id: "6", name: "Task 6" },
      { id: "7", name: "Task 7" },
      { id: "8", name: "Task 8" },
    ],
  },
  {
    id: "3",
    name: "Routine 3",
    tasks: [
      { id: "9", name: "Task 9" },
      { id: "10", name: "Task 10" },
      { id: "11", name: "Task 11" },
      { id: "12", name: "Task 12" },
    ],
  },
  {
    id: "4",
    name: "Routine 4",
    tasks: [
      { id: "13", name: "Task 9" },
      { id: "14", name: "Task 10" },
      
    ],
  },
  {
    id: "3",
    name: "Routine 3",
    tasks: [
      { id: "15", name: "Task 9" },
      { id: "16", name: "Task 10" },
  
    ],
  },
  {
    id: "3",
    name: "Routine 3",
    tasks: [
      { id: "17", name: "Task 9 PLUS MORE" },
      { id: "18", name: "Task 10" },
      { id: "19", name: "Task 11" },
      { id: "20", name: "Task 12" },
      { id: "21", name: "Task 12" },

    ],
  },

]
export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  return json({ user });
}


export default function Index() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        Welcome {user.email}
        <RoutineSummary routines={testRoutines}/>
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
