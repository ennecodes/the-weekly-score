import { Dialog, DialogPanel, DialogTitle, Switch } from "@headlessui/react";
import { useState } from "react";

import { Task } from "./RoutineCard";


export const TaskSwitch = ({ task }: { task: Task }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {id, name} = task;
    return (
      <>
        <span>{name}</span>
        <Switch
          onChange={(checked) => {
            if (checked) {
              setIsChecked(checked);
            } else {
              setIsModalOpen(true);
            }
          }}
          checked={isChecked}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-pink-600"
          data-testid={`task-${id}-switch`}
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-sm space-y-4 border bg-white p-12">
              <DialogTitle className="font-bold">
                Undo task completion?
              </DialogTitle>
              <p>Are you sure you want to mark {name} as incomplete?</p>
              <div className="flex gap-4">
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button
                  onClick={() => {
                    setIsChecked(false);
                    setIsModalOpen(false);
                  }}
                >
                  Mark Incomplete
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    );
  };
  