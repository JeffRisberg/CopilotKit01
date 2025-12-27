"use client";

import {TasksList} from "@/components/TasksList";
import {TasksProvider} from "@/lib/hooks/use-tasks";
import {CopilotPopup} from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
   return (
      <>
         <TasksProvider>
            <TasksList/>
         </TasksProvider>
         <CopilotPopup
            labels={{
               title: "CopilotKit01",
            }}
         >
         </CopilotPopup>
      </>
   );
}
