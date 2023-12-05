import InputTodo from "@/components/InputTodo";
import TodosList from "@/components/TodosList";
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