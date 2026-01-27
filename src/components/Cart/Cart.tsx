import Modal from "../UI/Modal/Modal.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import CartDishes from "./CartDishes/CartDishes.tsx";
import {useSelector} from "react-redux";
import {clearCart, deleteDishFromCart, selectCartDishes} from "../../app/store/cartSlice.ts";
import {useAppDispatch} from "../../app/hooks.ts";


const Cart = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const cartDishes = useSelector(selectCartDishes);
    const dispatch = useAppDispatch();

    let cartInner = (
        <p className="text-center my-4 font-bold">
            No dishes in cart yet
        </p>
    );

    const onDeleteDish = (id: string) => {
      dispatch(deleteDishFromCart(id));
    };

    if (cartDishes.length > 0) {
        cartInner = (
            <>
                <CartDishes cartDishes={cartDishes} onDeleteDish={onDeleteDish}/>
                <button
                    onClick={() => setShowModal(true)}
                    type="button"
                    className="btn btn-primary mt-2"
                >Order</button>
                <button
                    onClick={() => dispatch(clearCart())}
                    type="button"
                    className="btn btn-secondary mt-2"
                >Clear cart</button>
            </>
        )
    }

    return (
        <div>
            <h5>Cart</h5>
            <Modal show={showModal} title='Preview order' onClose={() => setShowModal(false)}>
                <p>Do you want to continue to checkout?</p>
                <div className="row justify-content-end ms-5 mx-2 my-2">
                    <button className="btn btn-primary col-4"
                    onClick={() => navigate('/checkout')}>Checkout</button>
                    <button className="btn btn-danger col-4 ms-2" onClick={() => setShowModal(false)}>Close</button>
                </div>
            </Modal>
            {cartInner}
        </div>
    );
};

export default Cart;