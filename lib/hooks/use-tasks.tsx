import {createContext, ReactNode, useContext, useState} from "react";
import {defaultTasks} from "../default-tasks";
import {Task, TaskStatus} from "../tasks.types";
import {useCopilotAction, useCopilotReadable} from "@copilotkit/react-core";

let nextId = defaultTasks.length + 1;

type TasksContextType = {
   tasks: Task[];
   addTask: (title: string) => void;
   updateTask: (id: number, title: string) => void;
   setTaskStatus: (id: number, status: TaskStatus) => void;
   deleteTask: (id: number) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({children}: { children: ReactNode }) => {
   const [tasks, setTasks] = useState<Task[]>(defaultTasks);

   useCopilotAction({
      name: "addTask",
      description: "Adds a task to the todo list",
      parameters: [
         {
            name: "title",
            type: "string",
            description: "The title of the task",
            required: true,
         },
      ],
      handler: ({ title }) => {
         addTask(title);
      },
   });

   useCopilotAction({
      name: "updateTask",
      description: "Updates the title of an existing task",
      parameters: [
         {
            name: "id",
            type: "number",
            description: "The id of the task",
            required: true,
         },
         {
            name: "title",
            type: "string",
            description: "The new title of the task",
            required: true,
         },
      ],
      handler: ({ id, title }) => {
         updateTask(id, title);
      },
   });

   useCopilotAction({
      name: "deleteTask",
      description: "Deletes a task from the todo list",
      parameters: [
         {
            name: "id",
            type: "number",
            description: "The id of the task",
            required: true,
         },
      ],
      handler: ({ id }) => {
         deleteTask(id);
      },
   });

   useCopilotAction({
      name: "setTaskStatus",
      description: "Sets the status of a task",
      parameters: [
         {
            name: "id",
            type: "number",
            description: "The id of the task",
            required: true,
         },
         {
            name: "status",
            type: "string",
            description: "The status of the task",
            enum: Object.values(TaskStatus),
            required: true,
         },
      ],
      handler: ({ id, status }) => {
         setTaskStatus(id, status);
      },
   });

   useCopilotReadable({
      description: "The state of the todo list",
      value: tasks
   });

   const addTask = (title: string) => {
      setTasks(prev => [...prev, {id: nextId++, title, status: TaskStatus.todo}]);
   };

   const updateTask = (id: number, title: string) => {
      setTasks(prev =>
         prev.map((task) =>
            task.id === id ? {...task, title} : task
         )
      );
   };

   const setTaskStatus = (id: number, status: TaskStatus) => {
      setTasks(prev =>
         prev.map((task) =>
            task.id === id ? {...task, status} : task
         )
      );
   };

   const deleteTask = (id: number) => {
      setTasks(prev => prev.filter((task) => task.id !== id));
   };

   return (
      <TasksContext.Provider value={{tasks, addTask, updateTask, setTaskStatus, deleteTask}}>
         {children}
      </TasksContext.Provider>
   );
};

export const useTasks = () => {
   const context = useContext(TasksContext);
   if (context === undefined) {
      throw new Error("useTasks must be used within a TasksProvider");
   }
   return context;
};
