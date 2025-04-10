export interface Subtask {
  id?: string;
  task: string;
  done: boolean;
}

export interface AddTaskData {
  id?: string;
  rubric: string;
  title: string;
  description: string;
  assignedusers: User[];
  duedate:string,
  prio: string;
  subtasks: Subtask[];
}

export interface User {
  id?: string;
  name: string;
  mail: string;
}
