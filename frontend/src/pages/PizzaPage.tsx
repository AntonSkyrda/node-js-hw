import { PizzasComponent } from "../components/pizzas-component/PizzasComponent.tsx";
import PizzaCreateComponent from "../components/pizza-create-component/PizzaCreateComponent.tsx";

export const PizzaPage = () => {
    return (
        <div>
            <PizzaCreateComponent/>
            <hr/>
            <PizzasComponent/>
        </div>
    )
}