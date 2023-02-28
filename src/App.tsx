import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";
import { useForm } from "react-hook-form";
import { InformationEvent } from "http";

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
*{
    box-sizing: border-box;
}
body{
font-family: '메이플스토리', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
background-color: ${(props) => props.theme.bgColor};
color: ${(props) => props.theme.textColor};
}
a{
    text-decoration: none;
	color: inherit;
}
`;
interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    password1: string;
    extraError?: string;
}
function App() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        },
    });
    const onValid = (data: IForm) => {
        if (data.password !== data.password1) {
            setError(
                "password1",
                { message: "Password are not the same" },
                { shouldFocus: true }
            );
        }
        //setError("extraError", { message: "Server offline." });
    };
    console.log(errors);
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <GlobalStyle />
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    onSubmit={handleSubmit(onValid)}
                >
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                                message: "Only naver.com emails allowed",
                            },
                        })}
                        placeholder="Email"
                    />
                    <span>{errors.email?.message}</span>
                    <input
                        {...register("firstName", {
                            required: "Write here",
                            validate: {
                                noNico: (value) =>
                                    value.includes("nico")
                                        ? "no nicos allowed"
                                        : true,
                                noNick: (value) =>
                                    value.includes("nick")
                                        ? "no nick allowed"
                                        : true,
                            },
                        })}
                        placeholder="First Name"
                    />
                    <span>{errors.firstName?.message}</span>
                    <input
                        {...register("lastName", { required: "Write here" })}
                        placeholder="Last Name"
                    />
                    <span>{errors.lastName?.message}</span>
                    <input
                        {...register("userName", {
                            required: "Write here",
                            minLength: 10,
                        })}
                        placeholder="User Name"
                    />
                    <span>{errors.userName?.message}</span>
                    <input
                        required
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 5,
                                message: "Your password is too short.",
                            },
                        })}
                        placeholder="Password"
                    />
                    <span>{errors.password?.message}</span>
                    <input
                        {...register("password1", {
                            required: "Password is required",
                            minLength: {
                                value: 5,
                                message: "Your password is too short.",
                            },
                        })}
                        placeholder="Password1"
                    />
                    <span>{errors.password1?.message}</span>
                    <button>Add</button>
                    <span>{errors.extraError?.message}</span>
                </form>
            </ThemeProvider>
        </>
    );
}

export default App;
