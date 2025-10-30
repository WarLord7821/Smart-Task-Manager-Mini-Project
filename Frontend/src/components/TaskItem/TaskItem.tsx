import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../StrictModeDroppable/StrictModeDroppable";
import { ITaskItem } from "src/views/TaskHome/ITaskHomeProps";
import "./TaskItem.css";
import { COMMON_TEXT } from "src/helper/constants";
import { getDaysLeft } from "src/helper/helperFunc";

const TaskItem = ({ status, items, id, tasks, setTasks }: ITaskItem) => {
  const handleRemoveTask = (itemId: string) => {
    const updatedStores = [...tasks];
    const storeIndex = updatedStores.findIndex(store => store.id === id);
    if (storeIndex === -1) return;
    const itemIndex = updatedStores[storeIndex].items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;
    updatedStores[storeIndex].items.splice(itemIndex, 1);
    localStorage.setItem(COMMON_TEXT.STORAGE_TASK, JSON.stringify(updatedStores))
    setTasks(updatedStores);
  };

  return (
    <StrictModeDroppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="mainContainer paddingStyle">
          <div className="store-container">
            <h3>{status}</h3>
            <span className="counter">{items?.length}</span>
          </div>
          <div className="items-container">
            {items?.map((item, index) => {
              const { id, name, priority, dueDate } = item
              return <Draggable draggableId={id} index={index} key={id}>
                {(provided) => (
                  <div
                    className="item-container"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <div className="nameContainer">
                      <div>
                        <h4 className="taskItemName">{name}</h4>
                        <h5 className="date">End date:- {dueDate}</h5>
                      </div>
                      <span className="crossStyles" onClick={() => handleRemoveTask(id)}>✕</span>
                    </div>
                    <div className="extraDetails">
                      <span className={`chipstyle ${priority}`}>{priority}</span>
                      <h5 className="date daysInput">{getDaysLeft(dueDate, true)}</h5>
                    </div>
                  </div>
                )}
              </Draggable>
            })}
            {provided.placeholder}
          </div>
        </div>
      )}
    </StrictModeDroppable>
  );
};

export default TaskItem