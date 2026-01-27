import CartDishes from "../../components/Cart/CartDishes/CartDishes.tsx";
import {Link, Navigate, Outlet, useLocation} from "react-router-dom";
import {useAppSelector} from "../../app/hooks.ts";
import {selectCartDishes} from "../../app/store/cartSlice.ts";


const Checkout = () => {
    const location = useLocation();
    const cartDishes = useAppSelector(selectCartDishes);

    if (cartDishes.length === 0) {
        return <Navigate to='/'/>;
    }

    return (
        <div className="row">
            <div className="col-4 m-auto">
                <h4>Checkout</h4>
                <CartDishes cartDishes={cartDishes}/>
                {location.pathname === '/checkout' &&
                    <div>
                        <Link className="btn btn-danger" to='/'>Cancel</Link>
                        <Link className="btn btn-primary" to='continue'>Continue</Link>
                    </div>
                }


                <Outlet/>

                {location.pathname === '/checkout/continue' &&
                    <div>
                        <Link className="btn btn-danger" to='/'>Cancel</Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Checkout;