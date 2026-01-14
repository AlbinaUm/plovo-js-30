import DishItem from "./DishItem/DishItem.tsx";
import type {IDish} from "../../types";

interface Props {
    dishes: IDish[];
    onDeleteDish: (id: string) => void;
    addDishToCart: (dish: IDish) => void;
}

const Dishes: React.FC<Props> = ({dishes, onDeleteDish, addDishToCart}) => {
    return (
        <>
            {dishes.map(dish => (
                <DishItem
                    key={dish.id}
                    dish={dish}
                    onDeleteDish={onDeleteDish}
                    addDishToCart={() => addDishToCart(dish)}
                />))}
        </>
    );
};

export default Dishes;