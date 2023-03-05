import { useForm } from "react-hook-form";
import { categoryState, ECategories, IToDo, toDoState } from "../atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const ToDoAdd = styled.button`
    height: 25px;
    max-width: 300px;
    border-radius: 4px;
    border: 0;
    margin: 0 10px;
`;
const ToDoForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
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
const ToDoSelector = styled.select`
    border: 1px solid #cccccc;
    outline: 0;
    height: 25px;
    border-radius: 4px;
    box-sizing: border-box;
    font-weight: 600;
`;
interface IToDoForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const [category, setCategory] = useRecoilState(categoryState);
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
    const onInput = (e: React.FormEvent<HTMLSelectElement>) =>
        setCategory(e.currentTarget.value as ECategories);
    return (
        <ToDoForm onSubmit={handleSubmit(onValid)}>
            <ToDoInput
                {...register("toDo", { required: true })}
                placeholder="Write a to do"
            />
            <ToDoAdd>Add</ToDoAdd>
            <ToDoSelector value={category} onInput={onInput} name="" id="">
                <option value={ECategories.TO_DO}>To Do</option>
                <option value={ECategories.DOING}>Doing</option>
                <option value={ECategories.DONE}>Done</option>
            </ToDoSelector>
        </ToDoForm>
    );
}
export default CreateToDo;
