import {useGetPizza} from "../../hooks/useGetPizza.ts";
import {PizzaComponent} from "../pizza-component/PizzaComponent.tsx";

export const PizzasComponent = () => {
    const pizzas = useGetPizza()

    return (
        <div>
            <h1>Pizzas</h1>
            {pizzas.map((pizza) => <PizzaComponent key={pizza._id} pizza={pizza} />)}
        </div>
    )
}