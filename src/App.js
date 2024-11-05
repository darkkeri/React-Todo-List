import './App.css';
import {useState} from "react";

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    setTasks([...tasks, task])
    setTask("")
  }

  const deleteTask = (delItem) => {
    const removeFilter = tasks.filter((item) => item !== delItem)
    setTasks(removeFilter)
  }

  return (
    <div id="container">
      <h3>Todos</h3>
      <form>
        <input placeholder="Add new task" 
        value={task}
        onChange={e => setTask(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault()
            addTask()
          }
        }}        
        />
      </form>
      <ul>
        {
          tasks.map(item => (
            <li>{item}
            <button className="deletebutton" onClick={() => deleteTask(item)}>Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
