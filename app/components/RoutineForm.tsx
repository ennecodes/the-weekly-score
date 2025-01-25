import { Form } from "@remix-run/react";
import { useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import { MdOutlineAddCircleOutline } from "react-icons/md";

export const RoutineForm = () => {
  const [routineName, setRoutineName] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([""]);
  return (
    <Form method="post">
      <div className="m-auto flex w-screen content-center justify-center antialiased">
        <div className="rounded-md bg-pink-50 px-12 py-12">
          <h2 className="pb-2 text-center">Add New Daily Routine</h2>
          <div>
            <label htmlFor="routineName">Routine Name:</label>
            <br />
            <input
              type="text"
              name="routineName"
              value={routineName}
              onChange={(e) => {
                setRoutineName(e.target.value);
              }}
              className="form-input w-full rounded-md border-2 border-pink-300 bg-fuchsia-50 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            />
            <br />

            <label htmlFor="cname">Tasks:</label>
            {tasks.map((task, index) => {
              return (
                <div key={index}>
                  <input
                    type="text"
                    name="routineTask"
                    value={task}
                    onChange={(e) => {
                      setTasks((prevTasks) => {
                        const updatedTasks = [...prevTasks];
                        updatedTasks[index] = e.target.value;
                        return updatedTasks;
                      });
                    }}
                    className="form-input w-full rounded-md border-2 border-pink-300 bg-fuchsia-50 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                  />
                  {tasks.length > 1 ? (
                    <button
                      is="span"
                      type="button"
                      onClick={() => {
                        setTasks((prevTasks) => {
                          return prevTasks.filter(
                            (_, taskIndex) => taskIndex !== index,
                          );
                        });
                      }}
                    >
                      <CiCircleMinus />
                    </button>
                  ) : null}
                </div>
              );
            })}
            <br />

            <button
              type="button"
              onClick={() => {
                setTasks((prevTasks) => {
                  return [...prevTasks, ""];
                });
              }}
            >
              <MdOutlineAddCircleOutline />
            </button>
            <br />

            <button
              type="submit"
              disabled={
                routineName === "" || tasks.every((task) => task.trim() === "")
              }
              onClick={() => {
                console.log({ routineName, tasks });
              }}
              className="mt-4 w-full rounded-lg bg-fuchsia-400 p-2 hover:bg-fuchsia-700 disabled:border-fuchsia-200 disabled:bg-fuchsia-100 disabled:text-slate-300 disabled:shadow-none"
            >
              Add Routine
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};
