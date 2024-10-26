import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]); // todos is the array that holds all todos
const  [showFinished, setshowFinished] = useState(true)
  // Load todos from localStorage when the component mounts
  useEffect(() => {
    let storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const saveToLS = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };
  const toggleFinished=(e)=>{
      setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.find(item => item.id === id);
    if (t) {
      setTodo(t.todo);
    }
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  const handleAdd = () => {
    if (todo.trim() !== '') {
      const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(updatedTodos);
      setTodo('');
      saveToLS(updatedTodos);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-9 bg-blue-400 rounded-xl p-6 px-4 ml-80 mr-2 w-1/2 min-h-[70vh] max-h-screen">
        <div className="addtodo">
          <h2 className="text-xl font-bold p-1">Add My Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-80" />
          <button
            onClick={handleAdd}
            className="bg-slate-700 hover:bg-slate-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
          >
            Save
          </button>
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" /> show showFinished
        </div>
        <h2 className="text-xl font-bold">Your todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="justify-center m-6">No Todos to display</div>}
          {todos.map((item) => {
            return (
             (showFinished || !item.isCompleted) &&<div key={item.id} className="todo flex justify-between mr-60 my-3">
                <div className="flex gap-5">
                  <input
                    onChange={handleCheckBox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                  />
                  <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-stone-500 hover:bg-stone-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-stone-500 hover:bg-stone-700  p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
