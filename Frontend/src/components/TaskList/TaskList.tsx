import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from 'src/components/StrictModeDroppable/StrictModeDroppable';
import TaskItem from 'src/components/TaskItem/TaskItem';
import { ITaskState } from 'src/views/TaskHome/ITaskHomeProps';
import { COMMON_TEXT } from 'src/helper/constants';
import "./TaskList.css"

const TaskList = ({ tasks, setTasks }: ITaskState) => {
  const handleDragAndDrop = (results: DropResult) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedTasks = [...tasks];

      const taskSourceIndex = source.index;
      const taskDestinatonIndex = destination.index;

      const [removedStore] = reorderedTasks.splice(taskSourceIndex, 1);
      reorderedTasks.splice(taskDestinatonIndex, 0, removedStore);

      return setTasks(reorderedTasks);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const taskSourceIndex = tasks.findIndex(
      (task) => task.id === source.droppableId
    );
    const taskDestinationIndex = tasks.findIndex(
      (task) => task.id === destination.droppableId
    );

    const newSourceItems = [...tasks[taskSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...tasks[taskDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newTasks = [...tasks];

    newTasks[taskSourceIndex] = {
      ...tasks[taskSourceIndex],
      items: newSourceItems,
    };
    newTasks[taskDestinationIndex] = {
      ...tasks[taskDestinationIndex],
      items: newDestinationItems,
    };
    localStorage.setItem(COMMON_TEXT.STORAGE_TASK, JSON.stringify(newTasks))
    setTasks(newTasks);
  };

  return (
    <div className="layout__wrapper">
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <StrictModeDroppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="container">
              {tasks.map((task) => (
                <TaskItem key={task.id} {...task} tasks={tasks} setTasks={setTasks} />
              ))}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;