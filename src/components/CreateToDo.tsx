import { useForm } from "react-hook-form";
import { categoryState, IToDo, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const ToDoAdd = styled.button`
    height: 25px;
    max-width: 300px;
    border-radius: 4px;
    border: 0;
`;
const ToDoForm = styled.form`
    display: flex;
    justify-content: center;
    max-width: 480px;
    margin: 10px;
`;
const ToDoInput = styled.input`
    border: 1px solid #cccccc;
    outline: 0;
    height: 25px;
    max-width: 300px;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    margin: 0 10px;
`;
interface IToDoForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const { register, handleSubmit, setValue } = useForm<IToDoForm>();
    const onValid = ({ toDo }: IToDoForm) => {
        const newToDo: IToDo = {
            text: toDo,
            id: Date.now(),
            category,
        };
        setToDos((oldTodo) => [newToDo, ...oldTodo]);
        setValue("toDo", "");
    };
    return (
        <ToDoForm onSubmit={handleSubmit(onValid)}>
            <ToDoInput
                {...register("toDo", { required: true })}
                placeholder="Write a to do"
            />
            <ToDoAdd>Add</ToDoAdd>
        </ToDoForm>
    );
}
export default CreateToDo;
