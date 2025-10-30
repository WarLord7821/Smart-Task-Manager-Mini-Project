interface ITask {
    id: string,
    name: string,
    priority: string,
    dueDate: string,
}

export interface ITaskHomeProps {
    id: string;
    status: string,
    items: ITask[]
}

export interface IInitialTask {
    id: string;
    name: string,
    status?: string,
    priority: string,
    dueDate: string
}

export interface ITaskState {
    tasks: ITaskHomeProps[],
    setTasks: React.Dispatch<React.SetStateAction<ITaskHomeProps[]>>
}

export interface ITaskItem extends ITaskState {
    status: string,
    id: string,
    items: ITask[]
}

export interface IGraphDataItem {
    graphData: ITaskHomeProps[]
}

export interface IBarGraph {
    name?: string,
    dueDate?: string | number;
}

export interface IBarGraphData {
    barGraphData: IBarGraph[]
}