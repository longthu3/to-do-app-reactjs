import { useEffect, useState } from "react";
import { MainLayout } from "./layout/MainLayout";
import apiRequest from "../utils/Https";
import { API_URL } from "../utils/constant/Api";
import Button from "../components/Button";
import { ToDoList } from "../components/ToDoList";
import CircularProgress from "@mui/material/CircularProgress";

interface Task {
  _id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ListResponse {
  listTodo: Task[];
}

interface ApiResponse {
  apiKey: string;
}

export const ToDoApp = () => {
  const [listTask, setListTask] = useState<Task[]>([]);
  const [value, setValue] = useState<string>("");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(true);

  const getUser = async () => {
    const email = localStorage.getItem("email");
    try {
      const response = await apiRequest<ApiResponse>(
        `${API_URL}/api-key?email=${email}`,
        "GET"
      );

      if (response.code === 200) {
        console.log("API key:", response.data.apiKey);
        setApiKey(response.data.apiKey);
        localStorage.setItem("apiKey", response.data.apiKey);
        setInvalidEmail(false);
        return response.data.apiKey;
      } else {
        setInvalidEmail(true);
        setLoading(false);
        console.error("Error fetching API key:", response.message);
      }
    } catch (error) {
      localStorage.removeItem("email");
      window.location.reload();
      console.error("Error occurred during API call:", error);
      return null;
    }
  };

  const getToDos = async (key: string | undefined | null) => {
    if (key) {
      try {
        const response = await apiRequest<ListResponse>(
          `${API_URL}/todos`,
          "GET",
          undefined,
          {
            headers: {
              "x-api-key": key,
            },
          }
        );
        if (response.code === 200) {
          setLoading(false);
          setListTask(response.data.listTodo);
        }
      } catch (error) {
        console.log("Error occurred during API call:", error);
      }
    }
  };

  const handleAdd = async () => {
    if (value.trim() === "") return;

    try {
      const response = await apiRequest<Task>(
        `${API_URL}/todos`,
        "POST",
        {
          todo: value,
        },
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      setLoading(true);

      if (response.code === 201) {
        setListTask([response.data, ...listTask]);
        setValue("");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error occurred during API call:", error);
    }
  };

  useEffect(() => {
    getUser().then((key) => getToDos(key));
  }, []);

  return (
    <MainLayout>
      <div className="bg-violet-500 w-full rounded-3xl p-4 flex flex-col h-full">
        <div className="flex-shrink-0">
          <h3 className="text-white text-xl font-medium">Today main focus</h3>
          <h3 className="text-white text-2xl font-bold">Design team meeting</h3>
          <form className="mb-8" id="formAddTask">
            <div className="relative w-full mt-5">
              <input
                type="text"
                className="w-full h-10 p-2 pr-12 rounded-xl outline-none"
                placeholder="Add Task..."
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button
                label="Add"
                color="gray"
                onClick={handleAdd}
                size="sxm"
                className="absolute right-0 top-0 h-full"
              />
            </div>
          </form>
        </div>

        <div className="flex-grow overflow-y-auto">
          {loading && !invalidEmail ? (
            <div className="flex items-center justify-center h-full">
              <CircularProgress color="warning" />
            </div>
          ) : (
            <ToDoList listTask={listTask} />
          )}
        </div>

        {invalidEmail ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-white text-lg font-semibold">Invalid email</p>
          </div>
        ) : null}
      </div>
    </MainLayout>
  );
};
