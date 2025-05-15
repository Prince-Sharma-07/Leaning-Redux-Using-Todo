import React, { useState } from 'react'
import { addTodo, removeTodo, toggleComplete } from '../features/todo/todoSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function TodoApp() {
    const [isOpen, setIsOpen] = useState(false)
    const todos = useSelector((state) => state.todo.todos)

    function handleAddTodo() {
        setIsOpen(!isOpen)
    }

    return (
        <div className='h-screen w-screen flex flex-col gap-4 items-center'>
            {isOpen ? <AddTodoCard handleAddTodo={handleAddTodo} /> : null}
            <div className='flex flex-col gap-4 items-center bg-sky-300 w-full p-4'>
                <h1 className='text-xl font-[700]'>TODO LIST APP</h1>
                <span className='text-md'>This app is built to get hands on, over the concept of Redux.</span>
                <button className='bg-blue-500 px-6 py-2 cursor-pointer text-lg font-[400] rounded-xl' onClick={handleAddTodo}>Add Todo</button>
            </div>
            <hr />
            <span className='text-lg font-[500]'>List of Todos:</span>
            <div className='grid grid-cols-3 gap-x-4 p-4 gap-y-4 w-[90%] bg-amber-100'>
                {todos.length ? todos.map(({ text, completed, id }) => <TodoCard task={text} completed={completed} id={id} />) : <div className='flex flex-col gap-4 items-center font-[500]'>Nothing is here :( <br /> Try adding some tasks...</div>}
            </div>
        </div>
    )
}

function TodoCard({ task, completed, id }) {
    const dispatch = useDispatch()
    return (
        <div className='p-4 gap-4 flex flex-col items-center relative bg-white'>
            <input type="checkbox" checked={completed} onChange={() => dispatch(toggleComplete(id))} className='absolute top-2 right-2 size-3.5' />
            {completed ? <Status text={'Completed'} color={'#86efac'} /> : <Status text={'Pending'} color={'#fca5a5'} />}
            <span className='text-2xl self-start font-[600] h-30'>Task: <div className='text-lg self-start font-[500] capitalize line-clamp-3 w-[80%]'>{task}</div></span>
            <button className='px-2 py-1 bg-green-400 rounded-md self-end cursor-pointer' onClick={() => dispatch(removeTodo(id))}>Remove</button>
        </div>
    )
}

function Status({ text, color }) {
    return (
        <div
            style={{ backgroundColor: color }}
            className='flex items-center justify-center absolute text-xs font-[600] w-20 text-white px-8 py-1 rounded-lg top-1.5 right-8'
        >
            {text}
        </div>
    );
}

function AddTodoCard({ handleAddTodo }) {
    const [task, setTask] = useState('')

    const dispatch = useDispatch();

    function handleAddTask() {
        if (task.trim()) {
            dispatch(addTodo(task))
            setTask('')
        }
    }

    return (
        <div onClick={handleAddTodo} className='fixed z-50 flex items-center justify-center h-screen w-screen bg-black/80'>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleAddTask(task)
                handleAddTodo()
            }
            }
                className='absolute bg-white rounded-lg flex flex-col p-4 gap-4' onClick={e => e.stopPropagation()}>
                <div className='text-xl font-[500] text-center'>Add a todo</div>
                <label className='text-md font-[600]' htmlFor='task'>Enter the Task: </label>
                <input value={task} onChange={e => setTask(e.target.value)} className='bg-gray-100 border p-1 px-2' type="text" id='task' />
                <button type='submit' className='bg-blue-500 px-4 py-1 cursor-pointer text-lg font-[400] rounded-xl'>+ Add Task</button>
            </form>
        </div>
    )
}
