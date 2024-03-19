import styles from '@/styles/components/TodoItem.module.css'
import { useState, useRef } from 'react';
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { useTodosContext } from '@/context/TodosContext';
import { useTodosStore } from '@/context/todosStore';
import { useAuthStore } from '@/context/authStore';

function TodoItem({ itemProp }) {
    //console.log(itemProp)
    //const { handleChange, delTodo, setUpdate } = useTodosContext();
    const handleChange = useTodosStore((state) => state.handleChange);
    const delTodo = useTodosStore((state) => state.delTodo);
    const setUpdate = useTodosStore((state) => state.setUpdate);
    const [editing, setEditing] = useState(false);
    // const [updateInput, setUpdateInput] = useState(itemProp.title)
    const editInputRef = useRef(null);
    const user = useAuthStore((state) => state.user)

    const completedStyle = {
        fontStyle: 'italic',
        color: '#595959',
        opacity: 0.4,
        textDecoration: 'line-through',
    }

    /*
    const handleChange = (id) => {
        console.log('clicked', id);
        setTodos((prevState) => 
            prevState.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }
                return todo;
            })
        )
    }
    */
   
    const handleEditing = () => {
        setEditing(true);
    };

    let viewMode = {};
    let editMode = {};
    if (editing) {
        viewMode.display = 'none';
    } else {
        editMode.display = 'none';
    }

    const handleUpdatedDone = (event) => {
        if (event.key === 'Enter') {
            setUpdate(editInputRef.current.value, itemProp.id)
            setEditing(false);
        }
    }
    return (
        <li className={styles.item}>
            <div className={styles.content} style={viewMode}>
                <input 
                    type="checkbox"
                    checked={itemProp.completed}
                    onChange={() => handleChange(itemProp.id)}
                />
                {user && (
                    <button onClick={handleEditing}>
                        <AiFillEdit style={{ color: "#5e5e5e", fontSize: "16px" }} />
                    </button>
                )}
                <button onClick={() => delTodo(itemProp.id)}>
                    <FaTrash style={{ color:"#5e5e5e", fontSize: "16px" }} />
                </button>
                <span style={itemProp.completed ? completedStyle : null}>
                    {itemProp.title}    
                </span>    
            </div>
            <input 
                type="text"
                // value={updateInput}
                ref={editInputRef}
                defaultValue={itemProp.title}
                className={styles.textInput}
                style={editMode}
                // onChange={(e) => setUpdateInput(e.target.value, itemProp.id)}
                onKeyDown={handleUpdatedDone}
            />
        </li>
    )
};
export default TodoItem;