import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import {authService} from "../../services/auth.service.ts";
import {authActions} from "../../redux/slices/auth.slice.ts";
import {Link} from "react-router-dom";

export const HeaderComponent = () => {
    const {me} = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    if (authService.getAccessToken() && !me) {
        dispatch(authActions.me())
    }

    return (
        <div>
            {
                me ?
                <div>
                    {me.name}
                </div>
                :
                <div>
                    <Link to={"/login"}>Log In</Link>
                    <Link to={"/register"}>Register</Link>
                </div>
            }
        </div>
    )
}