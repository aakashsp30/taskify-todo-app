import React from 'react'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useState } from 'react';

/**
 * Individual todo item component with inline editing capabilities
 * Handles display, editing, completion toggling, and deletion of a single todo
 */

const TodoItem = ({ item, onCheckboxChange, onDelete, onUpdate }) => {
    // Local state to control whether this todo is in edit mode
    const [isEditing, setIsEditing] = useState(false)

    // Local state to store the edited text while in edit mode
    const [editedText, setEditedText] = useState(item.todo)

    /**
     * Save the edited todo text and exit edit mode
     * Uses the onUpdate prop to update the todo in the parent component
     */
    const handleSave = () => {
        onUpdate(item.id, { todo: editedText })
        setIsEditing(false)
    }

    return (
        <div className='todo flex justify-between my-3'>
            <div className='flex gap-5'>
                {/* Checkbox to toggle completion status */}
                <input onChange={onCheckboxChange} type="checkbox" name={item.id} checked={item.isCompleted} id="" />

                 {/* Conditional rendering: show input field when editing, text when not */}
                {isEditing ? (
                    <input type="text" className='px-2 py-1 rounded bg-white' value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                ) : (
                    // Apply strikethrough style for completed todos
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                )}
            </div>

            {/* Action buttons: Edit/Save and Delete */}
            <div className="buttons flex h-full">
                {/* Conditional rendering: show Save button when editing, Edit button when not */}
                {isEditing ? (
                    <button onClick={handleSave} className='bg-green-600 hover:bg-green-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Save</button>
                ):(<button onClick={()=> setIsEditing(true)} className="bg-purple-800 hover:bg-purple-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"><FaEdit /></button>)}
                {/* Delete button - always visible */}
                <button className='cursor-pointer bg-purple-800 hover:bg-purple-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1' onClick={(e) => onDelete(e, item.id)}><AiFillDelete /></button>
            </div>
        </div>

    )
}

export default TodoItem