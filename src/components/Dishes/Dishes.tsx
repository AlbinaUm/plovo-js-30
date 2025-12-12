import DishItem from "./DishItem/DishItem.tsx";

interface Props {
    dishes: IDish[];
    onDeleteDish: (id: string) => void;
}

const Dishes: React.FC<Props> = ({dishes, onDeleteDish}) => {
    return (
        <>
            <h5>Dishes</h5>
            {dishes.map(dish => <DishItem key={dish.id} dish={dish} onDeleteDish={onDeleteDish}/>)}
        </>
    );
};

export default Dishes;