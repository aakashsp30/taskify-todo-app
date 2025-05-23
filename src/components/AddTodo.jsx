import React from 'react'

/**
 * Component for adding new todos with validation
 * Handles user input, validation, and submission of new todos
 */

const AddTodo = ({todo, onChange, onAdd, showError}) => {
    return (
        <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className='font-bold text-2xl'>Add a Todo</h2>
            <div className='flex'>
                {/* Input field for todo text */}
                <input onChange={onChange} value={todo} className='bg-white rounded-full px-5 py-1 w-full' type="text" placeholder='Enter Todo' />

                {/* Submit button - disabled when todo is too short */}
                <button onClick={onAdd} disabled={todo.trim().length <= 3} className='bg-purple-800 hover:bg-purple-950 text-white rounded-full p-4 py-2 font-bold text-sm mx-2 cursor-pointer disabled:bg-purple-500 disabled:cursor-not-allowed'>Save</button>
            </div>

            {/* Error message displayed when validation fails */}
            {showError && (
                <div className='text-red-500 text-sm mt-1'>
                    Todo must be more than 3 characters
                </div>
            )}
        </div>
    )
}

export default AddTodo