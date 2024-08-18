import { ToDoComponent } from "./ToDoComponent";

interface ToDoListProps {
  listTask: Task[];
}

interface Task {
  _id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ToDoList = ({ listTask }: ToDoListProps) => {
  return (
    <div className="flex items-center flex-col gap-3 overflow-y-auto h-[500px]">
      {listTask.map((task) => (
        <ToDoComponent key={task._id} task={task} />
      ))}
    </div>
  );
};
