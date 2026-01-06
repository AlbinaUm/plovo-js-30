import CartDishes from "../../components/Cart/CartDishes/CartDishes.tsx";
import type {CartDish} from "../../types";
import * as React from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import {Navigate} from "react-router-dom";

interface Props {
    cartDishes: CartDish[];
}


const Checkout: React.FC<Props> = ({cartDishes}) => {
    const location = useLocation();

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