import { useState } from "react";

function ToDoList() {
    const [toDo, setToDo] = useState("");
    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <input
                    onChange={(e) => {
                        setToDo(e.currentTarget.value);
                    }}
                    value={toDo}
                    placeholder="Write a to do"
                ></input>
                <button>Add</button>
            </form>
        </>
    );
}
export default ToDoList;
