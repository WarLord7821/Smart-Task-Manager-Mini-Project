import React, { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { COMMON_TEXT, INITIAL_FORM_DATA_STATE } from "src/helper/constants";
import { ITaskState } from "src/views/TaskHome/ITaskHomeProps";
import Checkbox from "../PriorityChecker/Checkbox";
import DateInput from "../DateInput/DateInput";
import TextInput from "../TextInput/TextInput";
import "./TaskForm.css";

const TaskForm: React.FC<ITaskState> = ({ setTasks }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA_STATE);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, priority, dueDate } = formData.task;

    if (name && priority && dueDate) {
      if (name.length < 3 || name.length > 100) {
        return toast.error(name.length < 3 ? COMMON_TEXT.ERROR_TASK_TOO_SHORT : COMMON_TEXT.ERROR_TASK_TOO_LONG);
      }

      setTasks((prevTasks) => {
        const newTaskList = [...prevTasks];
        for (const prevTask of newTaskList) {
          if (prevTask.status === formData.task.status) {
            delete formData.task.status;
            prevTask.items.push(formData.task);
          }
        }
        localStorage.setItem(COMMON_TEXT.STORAGE_TASK, JSON.stringify(newTaskList));
        return newTaskList;
      });

      toast.success(COMMON_TEXT.SUCCESS_TASK_ADDED);
      handleResetForm();
    } else {
      toast.error(COMMON_TEXT.ERROR_DETAILS_MISSING);
    }
  };

  const handleChange = (text: string) => {
    setFormData((prevData) => ({
      ...prevData,
      task: { ...prevData.task, id: uuidv4(), name:text },
    }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      task: { ...prevData.task, priority: value },
      selectedPriority: value,
    }));
  };

  const handleDateChange = (date: string) => {
    setFormData((prevData) => ({
      ...prevData,
      task: { ...prevData.task, dueDate: date },
      selectedDate: date,
    }));
  };

  const handleResetForm = () => setFormData(INITIAL_FORM_DATA_STATE);

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <TextInput
        label={COMMON_TEXT.INPUT_NAME_LABEL}
        placeholder={COMMON_TEXT.TASK_INPUT_PLACEHOLDER}
        value={formData.task.name}
        onChange={(e) => handleChange(e)}
      />
      <Checkbox onChange={handleCheckboxChange} selected={formData.selectedPriority} />
      <DateInput onDateChange={handleDateChange} selected={formData.selectedDate} />
      <div className="buttonStyleContainer">
        <button className="button" type="submit">{COMMON_TEXT.ADD_TASK_TXT}</button>
        <button className="button" type="button" onClick={handleResetForm}>{COMMON_TEXT.RESET_TASK_TXT}</button>
      </div>
    </form>
  );
};

export default TaskForm;
