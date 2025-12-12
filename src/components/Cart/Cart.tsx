import CartItem from "./CartItem/CartItem.tsx";
import type {CartDish} from "../../types";
import Modal from "../UI/Modal/Modal.tsx";
import {useState} from "react";

interface Props {
    cartDishes: CartDish[];
    onClearCart: () => void;
    onDeleteDish: (id: string) => void;
}

const Cart: React.FC<Props> = ({cartDishes, onClearCart, onDeleteDish}) => {
    const [showModal, setShowModal] = useState(false);
    const total = cartDishes.reduce((acc, cartDish) => {
        acc += cartDish.dish.price * cartDish.count;
        return acc;
    }, 0);

    let cartInner = (
        <p className="text-center my-4 font-bold">
            No dishes in cart yet
        </p>
    );

    if (cartDishes.length > 0) {
        cartInner = (
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
                    <button
                        onClick={() => setShowModal(true)}
                        type="button"
                        className="btn btn-primary mt-2"
                    >Order</button>
                    <button
                        onClick={onClearCart}
                        type="button"
                        className="btn btn-secondary mt-2"
                    >Clear cart</button>
                </div>
            </>
        )
    }

    return (
        <div>
            <h5>Cart</h5>
            <Modal show={showModal} title='Preview order' onClose={() => setShowModal(false)}>
                <p>my content</p>
                <div className="row justify-content-end ms-5 mx-2 my-2">
                    <button className="btn btn-primary col-4">Order</button>
                    <button className="btn btn-danger col-4 ms-2" onClick={() => setShowModal(false)}>Close</button>
                </div>
            </Modal>
            {cartInner}
        </div>
    );
};

export default Cart;