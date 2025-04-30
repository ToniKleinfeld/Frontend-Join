export interface Subtask {
  id?: string;
  title: string;
  done: boolean;
}

export interface AddTaskData {
  id?: string;
  rubric: string;
  title: string;
  description: string;
  assigned_users: string[];
  due_date: string;
  category: string;
  prio: string;
  subtasks: Subtask[];
}

export interface User {
  id?: string;
  username: string;
  email?: string;
}

export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone: string;
}
