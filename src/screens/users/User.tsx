import { useParams } from "react-router-dom";
import { users } from "../../db";

function User() {
    const { userid } = useParams();
    return (
        <h1>
            User with it {userid} ios named: {users[Number(userid) - 1].name}
        </h1>
    );
}
export default User;
