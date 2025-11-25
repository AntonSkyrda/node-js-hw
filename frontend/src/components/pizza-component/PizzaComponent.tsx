import type {IPizza} from "../../models/IPizza.ts";
import type {FC} from "react";

type PizzaPropsType = {
    pizza: IPizza
}

export const PizzaComponent: FC<PizzaPropsType> = ({pizza}) => {
    return (
        <div>
            <h2>{pizza.name}</h2>
        </div>
    )
}