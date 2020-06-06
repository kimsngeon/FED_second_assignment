import React from "react";
import "./styles.css";

let localTasks = [];

//localStorage
const tasksAsString = localStorage.getItem("tasks");
if (tasksAsString) {
  localTasks = JSON.parse(tasksAsString);
}

//function Todo
function Todo({ task, index, completeTask, deleteTask }) {
  return (
    <div
      className="todo"
      class="todo"
      style={{ backgroundColor: task.isCompleted ? "black" : "" }}
    >
      <input
        id={index}
        class="checkmark"
        checked={task.isCompleted}
        onClick={() => completeTask(index)}
        type="checkbox"
      />
      <span class="tasklist">{task.text}</span>
      <button class="deleteButton" onClick={() => deleteTask(index)}>
        X
      </button>
    </div>
  );
}

//function App
function App() {
  const [newTask, setNewTask] = React.useState("");
  const [tasks, setTasks] = React.useState(localTasks);

  const addTask = text => {
    const newTodos = [...tasks, { text, isCompleted: false }];
    setTasks(newTodos);

    const tasksAsString = JSON.stringify(newTodos);
    localStorage.setItem("tasks", tasksAsString);
  };

  const completeTask = index => {
    const newTodos = [...tasks];
    if (newTodos[index].isCompleted === false) {
      newTodos[index].isCompleted = true;
    } else {
      newTodos[index].isCompleted = false;
    }
    setTasks(newTodos);

    const tasksAsString = JSON.stringify(newTodos);
    localStorage.setItem("tasks", tasksAsString);
  };

  const deleteTask = index => {
    const newTodos = [...tasks];
    newTodos.splice(index, 1);
    setTasks(newTodos);

    const tasksAsString = JSON.stringify(newTodos);
    localStorage.setItem("tasks", tasksAsString);
  };

  return (
    <div>
      <h1 class="title">TODO LIST</h1>
      <div class="input_wrap">
        <input
          type="text"
          class="input"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button
          class="inputButton"
          onClick={function() {
            addTask(newTask);
          }}
        >
          Add
        </button>
      </div>

      <div className="todo-list">
        {tasks.map((task, index) => (
          <Todo
            key={index}
            index={index}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
