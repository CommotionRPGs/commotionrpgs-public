import InputTodo from "@/components/todo/InputTodo";
import TodosList from "@/components/todo/TodosList";
//import { TodosProvider } from '@/context/TodosContext';

function TodosLogic() {
    /*return (
        <TodosProvider>
            <InputTodo />
            <TodosList /> 
        </TodosProvider>    
    );*/
    return (
        <div>
            <InputTodo />
            <TodosList /> 
        </div>
    );
};
export default TodosLogic;