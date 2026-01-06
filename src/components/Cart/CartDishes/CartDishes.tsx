import CartItem from "../CartItem/CartItem.tsx";
import type {CartDish} from "../../../types";

interface Props {
    cartDishes: CartDish[];
    onDeleteDish?: (id: string) => void;
}

const CartDishes: React.FC<Props> = ({cartDishes, onDeleteDish}) => {
    const total = cartDishes.reduce((acc, cartDish) => {
        acc += cartDish.dish.price * cartDish.count;
        return acc;
    }, 0);

    return (
        <>
            {cartDishes.map((cartDish) => (
                <CartItem
                    key={cartDish.dish.name}
                    cartDish={cartDish}
                    onDeleteDish={onDeleteDish}
                />
            ))}

            <div className='card border-0 p-2'>
                <div className="row align-items-center">
                    <div className="col text-right">
                        Total:
                    </div>
                    <div className="col-3 mt-5">
                        <strong>{total}</strong> KGS
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartDishes;