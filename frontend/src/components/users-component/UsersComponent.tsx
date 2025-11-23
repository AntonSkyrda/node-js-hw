import { UserComponent } from "../user-component/UserComponent.tsx";
import { useGetUsers } from "../../hooks/useGetUsers.ts";

export const UsersComponent = () => {
    const users = useGetUsers();

    return(
        <div>
            <h1>Users</h1>
            {users.map((user) => <UserComponent key={user._id} user={user}/>)}
        </div>
    )
}