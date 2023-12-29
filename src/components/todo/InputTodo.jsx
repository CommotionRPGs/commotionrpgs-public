import { useState } from 'react';
import { FaPlusCircle } from "react-icons/fa"
import { useTodosContext } from '@/context/TodosContext';
import { useTodosStore } from '@/context/todosStore';

function InputTodo() {
    //const { addTodoItem } = useTodosContext();
    const addTodoItem = useTodosStore((state) => state.addTodoItem);
    // console.log(addTodoItem)
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            console.log(title);
            addTodoItem(title);
            setTitle('');
            setMessage('');
        } else {
            // alert('Please add item');
            setMessage('Please add item.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="form-container">
                <input 
                    type="text"
                    placeholder="Add Todo..."
                    value={title}
                    onChange={handleChange}
                    className="input-text"
                />
                <button className="input-submit">
                    <FaPlusCircle
                        style={{
                            color: '#5e5e5e',
                            fontSize: '20px',
                            marginTop: '2px',
                        }}
                    />
                </button>
            </form>
            <span className="submit-warning">{message}</span>
        </>
    )
};
export default InputTodo;