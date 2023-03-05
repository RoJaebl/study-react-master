import { ECategories, IToDo, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Button = styled.button`
    border: 1px solid #cccccc;
    outline: 0;
    height: 20px;
    border-radius: 4px;
    box-sizing: border-box;
    font-weight: 600;
    margin: 2px;
`;
const ToDoContainer = styled.div`
    display: grid;
    grid-template-columns: 6.5fr 2.5fr 1.5fr;
    justify-items: center;
    width: 100%;
    > span {
        width: 100%;
        justify-self: flex-start;
        white-space: nowrap;
        overflow: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;
const ToDoColumn = styled.div``;
function ToDo({ text, id, category }: IToDo) {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onClick = (category: ECategories) => {
        const targetIdx = toDos.findIndex((toDo) => toDo.id === id);
        const newToDo = { text, id, category };
        const head = toDos.slice(0, targetIdx);
        const tail = toDos.slice(targetIdx + 1);
        setToDos([...head, newToDo, ...tail]);
    };
    const onTrash = (id: IToDo["id"]) =>
        setToDos([...toDos.filter((toDo) => toDo.id !== id)]);
    return (
        <ToDoContainer style={{ listStyle: "none" }}>
            <span>{text}</span>
            <ToDoColumn>
                {category !== ECategories.TO_DO && (
                    <Button
                        name={ECategories.TO_DO}
                        onClick={() => onClick(ECategories.TO_DO)}
                    >
                        To Do
                    </Button>
                )}
                {category !== ECategories.DOING && (
                    <Button
                        name={ECategories.DOING}
                        onClick={() => onClick(ECategories.DOING)}
                    >
                        Doing
                    </Button>
                )}
                {category !== ECategories.DONE && (
                    <Button
                        name={ECategories.DONE}
                        onClick={() => onClick(ECategories.DONE)}
                    >
                        Done
                    </Button>
                )}
            </ToDoColumn>
            <ToDoColumn>
                <Button onClick={() => onTrash(id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </ToDoColumn>
        </ToDoContainer>
    );
}
export default ToDo;
