import TodoItem from '@/components/todo/TodoItem'
import { useContext} from 'react'
import { useTodosContext } from '@/context/TodosContext';
import { useTodosStore } from '@/context/todosStore';

function TodosList() {
    //const { todosProps } = props;
    //const { todos } = useTodosContext();

    const todos = useTodosStore((state) => state.todos)
    //console.log(todos);
    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem 
                    key={todo.id} 
                    itemProp={todo}
                />
            ))}
        </ul>
    );
};
export default TodosList;