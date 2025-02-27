import { Box, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTask, toggleTask } from "../redux/taskSlice";
interface Task {
  id: number;
  task_name: string;
  completed: boolean;
}
const TaskItem = () => {
  const taskList = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  console.log(taskList);

  return (
    <Box>
      {taskList?.tasks?.map((task: Task) => (
        <Box key={task.id}>
          <h2>{task.task_name}</h2>
          <p>{task.completed ? "Completed" : "Not Completed"}</p>
          <DeleteIcon onClick={() => dispatch(deleteTask(task.id))} />
        </Box>
      ))}
    </Box>
  );
};

export default TaskItem;
