import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const Home = () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState([...savedTodos]);
  const [inputVal, setInputVal] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editVal, setEditVal] = useState("");

  useEffect(() => {
    console.log("Saving todos to localStorage:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputVal.trim() === "") return;
    setTodos([...todos, { task: inputVal, completed: false }]);
    setInputVal("");
    toast.success("Task added");
  };

  const toggleTodo = (i) => {
    const newTodos = todos.map((todo, index) => {
      if (index === i) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const editStart = (index) => {
    setEditIndex(index);
    setEditVal(todos[index].task);
  };

  const editSave = () => {
    const newTodos = todos.map((todo, index) => {
      if (index === editIndex) {
        return { ...todo, task: editVal };
      }
      return todo;
    });
    setTodos(newTodos);
    setEditIndex(null);
    setEditVal("");
    toast.success("Edit saved");
  };

  const editCancel = () => {
    setEditIndex(null);
    setEditVal("");
    toast.error("Edit Cancelled");
  };

  const delTodo = (i) => {
    let newList = todos.filter((_, index) => index !== i);
    setTodos(newList);
    toast.error("Task deleted");
  };

  return (
    <div className="flex flex-col justify-start items-center bg-orange-300 h-screen">
      <h2 className="mt-6 font-bold">Todos List</h2>
      <div className="flex flex-col mt-5 p-3">
        <p className="text-center font-semibold">Enter a Task</p>
        <input
          className="mt-4 bg-slate-400 rounded-md border-opacity-70 p-3 text-center"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Enter a Task"
        />
        <button
          className="btn mt-4 bg-cyan-700 text-white p-2 rounded"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <div className="mt-5 bg-slate-400 p-4 w-60 h-auto">
        <h3 className="font-bold text-center">List</h3>
        <ul className="flex list-decimal flex-col justify-center items-start p-4">
          {todos.map((todo, index) => (
            <li
              className={`ml-3 ${
                todo.completed ? "text-red-500" : "text-black"
              }`}
              key={index}
            >
              {editIndex === index ? (
                <div className="flex flex-wrap">
                  <input
                    className="ml-2 w-3/4 rounded-md bg-orange-300 border-opacity-70 p-2 text-start"
                    value={editVal}
                    onChange={(e) => setEditVal(e.target.value)}
                    type="text"
                  />
                  <button
                    className="btn ml-2 mt-4 bg-cyan-700 text-white p-2 rounded"
                    onClick={editSave}
                  >
                    Save
                  </button>
                  <button
                    className="btn ml-4 mt-4 bg-red-600 text-white p-2 rounded"
                    onClick={editCancel}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-row justify-evenly mt-2">
                  <span className="w-24">{todo.task}</span>
                  <input
                    type="checkbox"
                    className="ml-3"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index)}
                  />
                  <button
                    className="ml-5 text-xs text-black"
                    onClick={() => editStart(index)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="ml-5 text-xs text-black"
                    onClick={() => delTodo(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
