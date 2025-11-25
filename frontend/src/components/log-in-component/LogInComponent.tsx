import {type SubmitHandler, useForm} from "react-hook-form";
import type {IAuth} from "../../models/IAuth.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import {authActions} from "../../redux/slices/auth.slice.ts";
import {useNavigate} from "react-router-dom";

export const LogInComponent = () => {
    const {register, handleSubmit} =  useForm<IAuth>();
    const {error} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const logIn: SubmitHandler<IAuth> = async(user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}))

        if(requestStatus === "fulfilled") {
            navigate("/pizzas")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(logIn)}>
                <input type="text" placeholder={"email"} {...register("email")}/>
                <input type="text" placeholder={"password"} {...register("password")}/>
                <button>Login</button>
                {error && <div>Username or password incorrect</div>}
            </form>
        </div>
    )
}