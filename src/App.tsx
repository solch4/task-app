import { useState, useRef, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskCard from "./components/TaskCard";

type FormElement = FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
  id: string;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks = [...tasks, { name, done: false, id: uuidv4() }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (id: string): void => {
    const newTasks: ITask[] = [...tasks];
    const index = newTasks.findIndex((task) => task.id === id);
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const removeTask = (id: string): void => {
    const newTasks: ITask[] = [...tasks];
    const index = newTasks.findIndex((task) => task.id === id);
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success mt-2 w-100" type="submit">
                  Add task
                </button>
              </form>
            </div>
          </div>
          {tasks.map((task: ITask) => (
            <TaskCard
              key={task.id}
              toggleDoneTask={toggleDoneTask}
              removeTask={removeTask}
              {...task}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
