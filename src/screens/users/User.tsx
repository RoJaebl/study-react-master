import { Link, Outlet, useParams } from "react-router-dom";
import { users } from "../../db";

function User() {
    const { userid } = useParams();
    return (
        <div>
            <h1>
                User with it {userid} ios named:{" "}
                {users[Number(userid) - 1].name}
            </h1>
            <hr />
            <Link to="followers">See followers</Link>
            <Outlet />
        </div>
    );
}
export default User;
