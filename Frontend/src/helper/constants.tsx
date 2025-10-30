import { IInitialTask } from "src/views/TaskHome/ITaskHomeProps";

export const STATUSES_OBJ = {
  ADDED: "ADDED",
  STARTED: "STARTED",
  COMPLETED: "COMPLETED"
}

export const INITIAL_TASK_STATE: IInitialTask = {
  id: "",
  name: "",
  status: STATUSES_OBJ.ADDED,
  priority: "",
  dueDate: ""
};

export const INITIAL_FORM_DATA_STATE = {
  task: INITIAL_TASK_STATE,
  selectedPriority: "",
  selectedDate: "",

}

export const COMMON_TEXT = {
  TITLE: "Smart Task Manager",
  STORAGE_TASK: 'tasks',
  DND_TASK: 'task',
  TASK_INPUT_PLACEHOLDER: "Enter task...",
  ADD_TASK_TXT: "Add Task",
  RESET_TASK_TXT: "Reset Task",
  ERROR_DETAILS_MISSING: "Please fill all the details",
  ERROR_TASK_TOO_SHORT: "Task must be more than 3 characters!",
  ERROR_TASK_TOO_LONG: "Task must be less than 100 characters!",
  SUCCESS_TASK_ADDED: "Task added successfully!",
  REMOVED_TASK: "Task removed successfully",
  INPUT_NAME_LABEL: "Task Name",
  INPUT_CHECKBOX_LABEL: "Task Priority",
  INPUT_DATE_LABEL: "Select Task End Date",
};

export const CHECKBOX_OPTIONS = ['high', 'medium', 'low'];