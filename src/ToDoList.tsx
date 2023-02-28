import { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
    const { register, watch, handleSubmit, formState } = useForm();
    const onValid = (data: any) => {
        console.log(data);
    };
    console.log(formState.errors);
    return (
        <>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "480px",
                    alignItems: "center",
                }}
                onSubmit={handleSubmit(onValid)}
            >
                <input
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[A-Za-z0-9]+@naver.com$/,
                            message: "Only naver.com emails allowed",
                        },
                    })}
                    placeholder="Email"
                ></input>
                <input
                    {...register("first_name", { required: true })}
                    placeholder="First Name"
                ></input>
                <input
                    {...register("last_name", { required: true })}
                    placeholder="Last Name"
                ></input>
                <input
                    {...register("user_name", {
                        required: true,
                        minLength: 10,
                    })}
                    placeholder="User Name"
                ></input>
                <input
                    {...register("password", { required: true, minLength: 5 })}
                    placeholder="Password"
                ></input>
                <input
                    {...register("password1", {
                        required: "Password is required",
                        minLength: {
                            value: 5,
                            message: "Your password is too short",
                        },
                    })}
                    placeholder="Password1"
                ></input>
                <button>Add</button>
            </form>
        </>
    );
    // const [toDo, setToDo] = useState("");
    // return (
    //     <>
    //         <form
    //             onSubmit={(e) => {
    //                 e.preventDefault();
    //             }}
    //         >
    //             <input
    //                 onChange={(e) => {
    //                     setToDo(e.currentTarget.value);
    //                 }}
    //                 value={toDo}
    //                 placeholder="Write a to do"
    //             ></input>
    //             <button>Add</button>
    //         </form>
    //     </>
    // );
}

export default ToDoList;
