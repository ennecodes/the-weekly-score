import { Dialog, DialogPanel, DialogTitle, Switch } from "@headlessui/react";
import { useSubmit } from "@remix-run/react";
import { useState } from "react";

import { TaskDTO } from "./types";

export const TaskSwitch = ({ task }: { task: TaskDTO }) => {
  const [isChecked, setIsChecked] = useState(task.isCompleted);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const submit = useSubmit();
  console.log(task);

  const { id, name } = task;
  return (
    <>
      <span>{name}</span>
      <Switch
        type="submit"
        onChange={(checked) => {
          if (checked) {
            setIsChecked(checked);
            submit(
              { _action: "check", taskId: id },
              { method: "post", navigate: false },
            );
          } else {
            setIsModalOpen(true);
          }
        }}
        checked={isChecked}
        className={`group inline-flex h-6 w-11 items-center rounded-full ${isChecked ? "bg-pink-600" : "bg-gray-200"} transition data-[checked]:bg-pink-600`}
        data-testid={`task-${id}-switch`}
      >
        <span
          className={`size-4 translate-x-1 rounded-full bg-white transition ${isChecked ? "translate-x-6" : "translate-x-1"} `}
        />
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
                  submit(
                    { _action: "uncheck", completionId: task.completionId },
                    { method: "post", navigate: false },
                  );
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
