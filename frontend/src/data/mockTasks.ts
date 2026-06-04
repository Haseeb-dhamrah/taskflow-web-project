import { type Task } from "../types/Task";

export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete HTML structure",
    description: "Create semantic HTML structure for the TaskFlow page.",
    status: "Todo",
    priority: "High",
    dueDate: "2026-03-26",
    createdAt: "2026-03-20",
  },
  {
    id: 2,
    title: "Design Task Cards",
    description: "Build clean and responsive card designs using pure CSS colors.",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2026-05-20",
    createdAt: "2026-05-15",
  },
  {
    id: 3,
    title: "Setup Project Router",
    description: "Install react-router-dom package and map exact application views.",
    status: "Done",
    priority: "Low",
    dueDate: "2026-05-18",
    createdAt: "2026-05-14",
  },
  {
    id: 4,
    title: "Form Title Validation",
    description: "Implement simple checks to prevent adding tasks with an empty title.",
    status: "Todo",
    priority: "High",
    dueDate: "2026-05-25",
    createdAt: "2026-05-19",
  },
  {
    id: 5,
    title: "Bonus Features Testing",
    description: "Verify that the Edit/Update behavior correctly pre-fills input forms.",
    status: "Todo",
    priority: "Medium",
    dueDate: "2026-05-21",
    createdAt: "2026-05-19",
  }
];