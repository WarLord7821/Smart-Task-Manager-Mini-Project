import { useEffect, useState } from "react";
import Header from "src/components/Header/Header";
import TaskForm from "src/components/TaskForm/TaskForm";
import { COMMON_TEXT } from "src/helper/constants";
import TaskList from "src/components/TaskList/TaskList";
import { taskSample } from "src/helper/tasks";
import { ITaskHomeProps } from "./ITaskHomeProps";
import PieChart from "src/components/PieChart/PieChart";
import "./TaskHome.css";
import BarGraph from "src/components/BarGraph/BarGraph";

const TaskHome: React.FC = () => {
  const [tasks, setTasks] = useState<ITaskHomeProps[]>(taskSample);

  const retrieveTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem(COMMON_TEXT.STORAGE_TASK);
    storedTasks !== null && setTasks(JSON.parse(storedTasks));
  };

  useEffect(retrieveTasksFromLocalStorage, []);

  return (
    <div className="mainPageContainer">
      <Header title={COMMON_TEXT.TITLE} />
      <div className="contentContainer">
        <div className="leftContainer">
          <TaskForm tasks={tasks} setTasks={setTasks} />
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
        <div className="rightContainer">
          <PieChart graphData={tasks} />
          <BarGraph graphData={tasks} />
        </div>
      </div>
    </div>
  );
};

export default TaskHome;
