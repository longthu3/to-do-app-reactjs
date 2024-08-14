import { useState } from "react";
import Button from "./Button";
import apiRequest from "../utils/Https";
import { API_URL } from "../utils/constant/Api";

interface TaskProps {
  task: Task;
}

interface Task {
  _id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ToDoComponent = ({ task }: TaskProps) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [value, setValue] = useState<string>(task.todo);

  const fetchUpdate = async (id: string) => {
    const apiKey = localStorage.getItem("apiKey");
    try {
      const response = await apiRequest<Task>(
        `${API_URL}/todos/${id}`,
        "PATCH",
        { todo: value },
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      if (response.code === 200) {
        alert("Task updated successfully");
      }
    } catch (error) {
      console.error("Error occurred during API call:", error);
    }
  };

  const handleEdit = (id: string) => {
    const btn = document.getElementById(id);
    setIsUpdate(!isUpdate);

    if (!btn) return;
    const className =
      "!bg-white text-start p-2 rounded-xl outline-none cursor-auto";

    if (!isUpdate) {
      btn.removeAttribute("disabled");
      btn.classList.add(...className.split(" "));
      return;
    }

    const agree = confirm("Do you want to save changes?");
    if (agree) {
      btn.setAttribute("disabled", "true");
      btn.classList.remove(...className.split(" "));
      fetchUpdate(id);
    } else {
      setIsUpdate(true);
    }
  };

  const fetchRemove = async (id: string) => {
    const apiKey = localStorage.getItem("apiKey");
    try {
      const response = await apiRequest<Task>(
        `${API_URL}/todos/${id}`,
        "DELETE",
        undefined,
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      if (response.code === 200) {
        alert("Task removed successfully");
      }
    } catch (error) {
      console.log("Error occurred during API call:", error);
    }
  };

  const handleRemove = (id: string) => {
    const agree = confirm("Do you want to remove this task?");
    if (agree) {
      // Remove task
      fetchRemove(id);
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.parentElement?.remove();
    }
  };
  return (
    <div className="w-3/4 flex gap-2 items-center">
      <input
        className="bg-slate-50 w-[95%] h-[50px] rounded-md outline-none cursor-pointer font-sans text-slate-500 text-lg text-center"
        type="text"
        defaultValue={value}
        disabled={true}
        id={task._id}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        label={isUpdate ? "Save" : "Edit"}
        color="green"
        onClick={() => handleEdit(task._id)}
        size="sm"
      />

      <Button
        label="Remove"
        color="red"
        onClick={() => handleRemove(task._id)}
        size="sm"
      />
    </div>
  );
};
