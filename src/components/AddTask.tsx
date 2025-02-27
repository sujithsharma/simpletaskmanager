import { Box, Button, Input } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, initializeData, Task } from "../redux/taskSlice";
import TaskItem from "./TaskItem";

const AddTask = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const taskList = useSelector((state) => state.tasks);

  useEffect(() => {
    setLoading(false);
    axios
      .get("https://61fcccf43f1e34001792c9a9.mockapi.io/dummy")
      .then((response) => {
        dispatch(initializeData(response.data));
        setLoading(true);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // there is no post method allowed for mock api so i used put method logic here
  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      task_name: title,
      completed: false,
    };
    dispatch(addTask(newTask));
    axios.put(
      "https://mockapi.io/api/mocks/61fcccf43f1e34001792c9aa/resources/6200aabdfdf509001724956e/data",
      [...taskList.tasks, newTask],
      {
        headers: {
          Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MWZjY2NlMzNmMWUzNDAwMTc5MmM5YTgiLCJpYXQiOjE3NDA2NTk0MDU1NTcsImV4cCI6MTgwMzczMTQwNTU1N30.wo0fRIPIW6rRO0gymxzyH21esYDPp3Anow08Gyj5Skc
`,
        },
      }
    );
  };

  return (
    <>
      <Box>AddTask</Box>
      <Input
        aria-label="taskName"
        placeholder="Type new task"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button onClick={handleAddTask}>Submit</Button>
      {loading && <TaskItem />}
    </>
  );
};

export default AddTask;
