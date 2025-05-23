import { useState} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import useLocalTodos from './hooks/useLocalTodos';

function App() {
  // State for the current todo being typed in the input field
  const [todo, settodo] = useState("")

  // State for search functionality - filters todos based on user input
  const [searchtext, setSearchtext] = useState("")

  // Custom hook that handles all todo operations and localStorage persistence
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo
  } = useLocalTodos()

  // Controls whether completed todos are visible or hidden
  const [showfinished, setshowfinished] = useState(true)

  // Shows validation error when todo is short (≤3 characters)
  const [showError, setShowError] = useState(false);

  // Handle input changes in the add todo field
  const handleChange = (e) => {
    const value = e.target.value
    settodo(value)

    // Real-time validation: show error if input is too short
    if (value.trim().length <= 3) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }

  // Add a new todo to the list
  const handleAdd = () => {
    // Prevent adding todos that are too short
    if (todo.trim().length <= 3) {
      setShowError(true)
      return
    }

    // Create new todo with unique ID and add to list
    addTodo({ id: uuidv4(), todo, isCompleted: false })
    settodo("") // Clear the input field
    setShowError(false) // Hide any error messages
  }

  // Toggle the completion status of a todo
  const handleCheckbox = (e) => {
    const id = e.target.name
    const targetTodo = todos.find(t => t.id === id)
    // Flip the completion status
    updateTodo(id, { isCompleted: !targetTodo.isCompleted })
  }

  // Toggle visibility of completed todos 
  const toggleFinished = () => {
    setshowfinished(!showfinished)
  }

  // Delete a todo permanently
  const handleDelete = (e, id) => {
    deleteTodo(id)
  }

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto bg-purple-200 min-h-[80vh] md:w-[35%] my-5 rounded-xl p-5">
        <h1 className='text-center font-bold text-3xl p-5'>Taskify - Manage your Todos at one place</h1>

        {/* Todo input component with validation */}
        <AddTodo
          todo={todo}
          onChange={handleChange}
          onAdd={handleAdd}
          showError={showError}
        />

        {/* Toggle for showing/hiding completed todos */}
        <input className='my-4' onChange={toggleFinished} type="checkbox" name="" id="show" checked={showfinished} />
        <label htmlFor="show" className='mx-2'>Show Finished</label>

        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

         {/* Search input for filtering todos */}
        <input type="text" placeholder='Search todos...' className='bg-white w-full px-2 py-2 rounded-md mb-4' value={searchtext} onChange={(e) => setSearchtext(e.target.value)} />

        <h2 className='font-bold text-2xl'>Your Todos</h2>
        <div className="todos">
          {/* Show message when no todos exist */}
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}

          {/* Filter and display todos based on completion status and search text */}
          {todos
            .filter(item =>
              // Show todo if: (showfinished is true OR todo is not completed) AND todo text matches search
              (showfinished || !item.isCompleted) &&
              item.todo.toLowerCase().includes(searchtext.toLowerCase())
            )
            .map(item => (
              <TodoItem
                key={item.id}
                item={item}
                onCheckboxChange={handleCheckbox}
                onDelete={handleDelete}
                onUpdate={updateTodo}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default App