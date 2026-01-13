import React, {useState} from 'react';
import type {CartDish, Customer, OrderDataMutation} from "../../types";
import {Navigate, useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import {toast} from "react-toastify";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

interface Props {
    cartDishes: CartDish[];
    clearCart: () => void
}

const Order: React.FC<Props> = ({cartDishes, clearCart}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [customer, setCustomer] = useState<Customer>({
        name: '',
        address: '',
        phone: ''
    });

    if (cartDishes.length === 0) {
        return <Navigate to='/'/>;
    }

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const order: OrderDataMutation = {
            customer,
            dishes: cartDishes,
        };

        try {
            await axiosApi.post('/orders.json', order);
            toast.success('Order was send successfully');
            navigate('/');
            setCustomer({name: '', address: '', phone: ''});
            clearCart();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setCustomer(prevState => ({...prevState, [name]: value}));
    };

    let form = (
        <form onSubmit={onFormSubmit}>
            <div className="form-group">
                <label htmlFor="name">Client name</label>
                <input
                    id="name" type="text" name="name"
                    className="form-control"
                    value={customer.name}
                    onChange={onInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    id="address" type="text" name="address"
                    className="form-control"
                    value={customer.address}
                    onChange={onInputChange}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone" type="text" name="phone"
                    className="form-control"
                    value={customer.phone}
                    onChange={onInputChange}
                />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                Place order
            </button>
        </form>
    );

    if (loading) form = <Spinner/>

    return (
        <div className="row mt-4">
            <div className="col">
                {form}
            </div>
        </div>

    );
};

export default Order;