import { Link, useSearchParams } from "react-router-dom";
import { users } from "../db";

function Home() {
    const [readSearchParams, setSearchParams] = useSearchParams();
    setTimeout(() => {
        setSearchParams({
            day: "today",
            tomorrow: "123",
        });
    }, 2000);
    console.log(readSearchParams.get("geo"));
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((users) => (
                    <li key={users.id}>
                        <Link to={`/users/${users.id}`}>{users.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
