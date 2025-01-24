import { Form, Link } from "@remix-run/react"
import { useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import { MdOutlineAddCircleOutline} from "react-icons/md";



export const RoutineForm = () => {
    const [routineName, setRoutineName] = useState<string>("");
    const [tasks, setTasks] = useState<string[]>([""]);
    return (
      <div className="w-screen m-auto flex justify-center content-center antialiased ">
        <div className="bg-pink-50 px-12 py-12 rounded-md ">
          <h2 className="text-center pb-2">Add New Daily Routine</h2>
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
              className="w-full form-input rounded-md border-2 border-pink-300 bg-fuchsia-50 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
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
                    className="w-full form-input rounded-md border-2 border-pink-300 bg-fuchsia-50 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                  />
                  {tasks.length > 1 ? <button
                      is="span"
                      type="button"
                      onClick={() => {
                        setTasks((prevTasks) => {
                          return prevTasks.filter(
                            (_, taskIndex) => taskIndex !== index
                          );
                        });
                      }}
                    >
                        <CiCircleMinus />
                    </button> : null}
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
              disabled={
                routineName === "" || tasks.every((task) => task.trim() === "")
              }
              onClick={() => {
                console.log({ routineName, tasks });
              }}
              className="mt-4 bg-fuchsia-400 hover:bg-fuchsia-700 p-2 rounded-lg w-full  disabled:bg-fuchsia-100 disabled:text-slate-300 disabled:border-fuchsia-200 disabled:shadow-none
  "
            >
              Add Routine
            </button>
          </div>
        </div>
      </div>
    );
  };