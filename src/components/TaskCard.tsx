type Props = {
  id: string;
  name: string;
  done: boolean;
  toggleDoneTask: (id: string) => void;
  removeTask: (id: string) => void;
};

function TaskCard({ id, name, done, toggleDoneTask, removeTask }: Props) {
  return (
    <div className="card card-body mt-2">
      <div className="d-flex align-items-center">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onClick={() => toggleDoneTask(id)}
          />
        </div>
        <h3 className={done ? "text-decoration-line-through" : ""}>{name}</h3>
      </div>
      <div className="text-center">
        <button
          onClick={() => removeTask(id)}
          className="btn btn-sm btn-danger"
        >
          Delete task 🗑
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
