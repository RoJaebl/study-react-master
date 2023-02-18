import { Link } from "react-router-dom";
import { users } from "../db";

function Home() {
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
