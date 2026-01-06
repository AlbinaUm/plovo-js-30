import type {CartDish} from "../../../types";

interface Props {
    cartDish: CartDish;
    onDeleteDish?: (id: string) => void;
}

const CartItem: React.FC<Props> = ({cartDish, onDeleteDish}) => {
    return (
        <div className="card mb-2 p-2">
            <div className="row align-items-center justify-content-between">
                <div className="col">{cartDish.dish.name}</div>
                <div className="col-2">x{cartDish.count}</div>
                <div className="col-3 text-right">
                    {cartDish.count * cartDish.dish.price} KGS
                </div>
                {onDeleteDish && <div className="col-2">
                    <button className="btn" onClick={() => onDeleteDish(cartDish.dish.id)}>x</button>
                </div>}
            </div>
        </div>
    );
};

export default CartItem;