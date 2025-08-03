import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
    // ✅ Load from localStorage on first render
    const stored = localStorage.getItem("todos")
    return stored ? JSON.parse(stored) : []
  })
  const [editingIndex, setEditingIndex] = useState(null)
  const [editingText, setEditingText] = useState("")

  // ✅ Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { todo, isCompleted: false }])
      setTodo("")
    }
  }

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodos(updatedTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleEdit = (index) => {
    setEditingIndex(index)
    setEditingText(todos[index].todo)
  }

  const handleEditSave = (index) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, todo: editingText } : item
    )
    setTodos(updatedTodos)
    setEditingIndex(null)
    setEditingText("")
  }

  const handleEditChange = (e) => {
    setEditingText(e.target.value)
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      handleEditSave(index)
    }
  }

  return (
    <>
      <Navbar />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />

      <div className="container">
        <div className="red">
          <h1>Your Todos App To Track Your Day</h1>
        </div>
      </div>

      <div className="main">
        <div className="add">
          <h3>Add a Todo--</h3>
          <div className="addbranch">
            <input
              value={todo}
              onChange={handleChange}
              type="text"
              placeholder="Enter Todo"
            />
            <button onClick={handleAdd}>
              <span className="hi material-symbols-outlined">add</span>
            </button>
          </div>

          {todos.map((item, index) => (
            <div className="todoflex" key={index}>
              {editingIndex === index ? (
                <input
                  value={editingText}
                  onChange={handleEditChange}
                  onBlur={() => handleEditSave(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  autoFocus
                />
              ) : (
                <div
                  className={item.isCompleted ? "line-through" : ""}
                  onClick={() => handleToggleComplete(index)}
                >
                  {item.todo}
                </div>
              )}
              <div className="buttons">
                <button className="edit" onClick={() => handleEdit(index)}>
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button className="del" onClick={() => handleDelete(index)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
