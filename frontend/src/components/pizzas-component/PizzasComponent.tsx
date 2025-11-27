import {PizzaComponent} from "../pizza-component/PizzaComponent.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import {pizzaActions} from "../../redux/slices/pizza.slice.ts";
import {useEffect} from "react";

export const PizzasComponent = () => {
    const {pizzas, trigger} = useAppSelector(state => state.pizzas)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(pizzaActions.getAll())
    }, [dispatch, trigger])

    return (
        <div>
            <h1>Pizzas</h1>
            {pizzas.map((pizza) => <PizzaComponent key={pizza._id} pizza={pizza} />)}
        </div>
    )
}