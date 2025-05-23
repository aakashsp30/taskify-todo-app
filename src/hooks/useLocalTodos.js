import { useEffect, useState } from "react";

/**
 * Custom hook for managing todos with localStorage persistence
 * Handles all CRUD operations and automatically saves/loads data
 */

function useLocalTodos() {
    // Main state for storing all todos
    const [todos, setTodos] = useState([])

    // Flag to prevent saving empty state before loading from localStorage
    const [isLoaded, setIsLoaded] = useState(false)

    // Load todos from LocalStorage on initial render only
    useEffect(() => {
        const storedTodos = localStorage.getItem("todos")
        if (storedTodos) {
            // Parse and restore saved todos from localStorage
            setTodos(JSON.parse(storedTodos))
        }
        // Mark as loaded to enable saving on future changes
        setIsLoaded(true)
    }, []) // Empty dependency array = runs only once on mount

    // Save todos to localStorage whenever todos state changes
    useEffect(() => {
        // Only save after initial load to prevent overwriting stored data with empty array
        if (isLoaded) {
            localStorage.setItem("todos", JSON.stringify(todos))
        }
    }, [todos, isLoaded]) // Runs whenever todos or isLoaded changes

    /**
     * Add a new todo to the list
     * @param {Object} todo - Todo object with id, todo text, and isCompleted status
     */
    const addTodo = (todo) => {
        setTodos(prev => [...prev, todo])
    }

     /**
     * Update specific fields of a todo
     * @param {string} id - Unique identifier of the todo to update
     * @param {Object} updateFields - Object containing fields to update
     */
    const updateTodo = (id, updateFields) => {
        setTodos(prev =>
            prev.map(todo => todo.id === id
                ? { ...todo, ...updateFields } // Merge new fields with existing todo
                : todo) // Keep other todos unchanged
        )
    }

    /**
     * Remove a todo from the list
     * @param {string} id - Unique identifier of the todo to delete
     */
    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }

     // Return the state and functions for use in components
    return {
        todos,
        addTodo,
        updateTodo,
        deleteTodo
    }
}

export default useLocalTodos