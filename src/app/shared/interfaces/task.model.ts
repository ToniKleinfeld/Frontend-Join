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
  assigned_users: User[];
  due_date:string,
  category:string,
  prio: string;
  subtasks: Subtask[];
}

export interface User {
  id?: string;
  name: string;
  mail: string;
}
