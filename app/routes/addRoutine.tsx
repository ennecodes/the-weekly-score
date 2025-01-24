import { ActionFunction, redirect } from "@remix-run/node";

import { requireUser } from "~/auth.server";
import { RoutineForm } from "~/components/RoutineForm";
import { prisma } from "~/db.server";

// This is the action function for the form in RoutineForm.tsx
export const action: ActionFunction = async ({ request }) => {
    const user = await requireUser(request);
    
    const data = new URLSearchParams(await request.text())
    console.log(data.get("routineName"))
    console.log(data.getAll("routineTask"))
    prisma.routine.create({
        data: {
            name: data.get("routineName") || "",
            userId: user.uid, // Replace with actual user ID
            tasks: {
                create: data.getAll("routineTask").map((task, index) => ({ name: task, order: index }))
            }
        }
    }).then((routine) => {
        console.log(routine)
    }).catch((error) => {
        console.error(error)
    })

    return redirect("/")
  
  }
  
export default function AddRoutine() {
    return (<RoutineForm/>)
}