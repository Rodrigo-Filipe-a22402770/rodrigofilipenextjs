"use client";
import { useState } from "react";

export default function InputPage() {
  const [text, setText] = useState("");
  const [tech, setTech] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const addTask = () => {
    if (editIndex >= 0) {
      const updated = [...tasks];
      updated[editIndex] = newTask;
      setTasks(updated);
      setEditIndex(-1);
    } else {
      setTasks([...tasks, newTask]);
    }
    setNewTask("");
  };

  const editTask = (index: number) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <main className="p-4">
      <h1>Input Page</h1>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <p>Texto: {text}</p>
      <select value={tech} onChange={(e) => setTech(e.target.value)}>
        <option value="">Selecione</option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JS">JS</option>
      </select>
      <p>Tecnologia: {tech}</p>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={addTask}>Adicionar/Editar</button>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            {task} <button onClick={() => editTask(i)}>Editar</button> <button onClick={() => deleteTask(i)}>Apagar</button>
          </li>
        ))}
      </ul>
    </main>
  );
}