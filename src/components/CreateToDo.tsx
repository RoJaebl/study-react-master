import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

interface IToDoForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IToDoForm>();
    const onValid = ({ toDo }: IToDoForm) => {
        const newTodo: IToDo = {
            text: toDo,
            id: Date.now(),
            category: "TO_DO",
        };
        setToDos((oldTodo) => [newTodo, ...oldTodo]);
        setValue("toDo", "");
    };
    return (
        <form onSubmit={handleSubmit(onValid)}>
            <input
                {...register("toDo", { required: true })}
                placeholder="Write a to do"
            />
            <button>Add</button>
        </form>
    );
}
export default CreateToDo;
