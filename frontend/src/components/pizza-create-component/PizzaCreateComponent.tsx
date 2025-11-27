import {type SubmitHandler, useForm} from "react-hook-form";
import type {IPizza} from "../../models/IPizza.ts";
import {useAppDispatch} from "../../hooks/reduxHooks.ts";
import {pizzaActions} from "../../redux/slices/pizza.slice.ts";

const PizzaCreateComponent = () => {
    const {register, handleSubmit} = useForm<IPizza>()
    const dispatch = useAppDispatch()

    const save: SubmitHandler<IPizza> = async (pizza) => {
        dispatch(pizzaActions.create({pizza}))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(save)}>
                <input type="text" placeholder={"name"} {...register("name")} />
                <input type="number" placeholder={"price"} {...register("price")}/>
                <input type="number" placeholder={"diameter"} {...register("diameter")}/>
                <button>Save</button>
            </form>

        </div>
    );
};

export default PizzaCreateComponent;