import Dishes from "../../components/Dishes/Dishes.tsx";
import Cart from "../../components/Cart/Cart.tsx";
import type {CartDish, DishMutation, IDish, IDishAPI} from "../../types";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {NavLink, useParams} from "react-router-dom";
import {DISH_CATEGORY} from "../../globalConstants.ts";
import {useCallback, useEffect, useState} from "react";
import axiosApi from "../../axiosApi.ts";
import {toast} from "react-toastify";
import reformatObjectToArrayFireBase from "../../utils/dataApiToArray.ts";

interface Props {
    addDishToCart: (dish: IDish) => void;
    cart: CartDish[];
    clearCart: () => void;
    onDeleteDishFromCart: (id: string) => void;
    updateCart?: (dishes: IDish[]) => void;
}

const Home: React.FC<Props> = ( {addDishToCart, cart,clearCart ,updateCart, onDeleteDishFromCart}) => {
    const [dishes, setDishes] = useState<IDish[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const params = useParams();

    const fetchDishes = useCallback(async (categoryId?: string | undefined) => {
        let url = '/dishes.json';

        if (categoryId) url += `?orderBy="category"&equalTo="${categoryId}"`;

        try {
            setLoading(true);
            const response = await axiosApi.get<IDishAPI | null>(url);
            const dishesObject = response.data;

            if (dishesObject !== null) {
                const dishesArray = reformatObjectToArrayFireBase<DishMutation>(dishesObject);
                setDishes(dishesArray);
                if (updateCart) updateCart(dishesArray);
            }

        } finally {
            setLoading(false);
        }
    }, [updateCart]);

    const onDeleteDish = async (id: string) => {
        try {
            await axiosApi.delete(`/dishes/${id}.json`);
            toast.success('Dish deleted successfully');
            await fetchDishes();
            clearCart();
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        if (params.idCategory) {
            void fetchDishes(params.idCategory);
        } else {
            void fetchDishes();
        }
    }, [fetchDishes, params.idCategory]);

    const getPageTitle = (id: string | undefined) => {
        if (id) {
            const category = DISH_CATEGORY.find(category => category.value === id);
            return category?.label || '';
        } else {
            return 'All dishes';
        }
    };

    return (
        <>
            <div className="row justify-content-between">
                <div className="col-1">
                    <ul>
                       <li><NavLink to='/'>All</NavLink></li>
                        {DISH_CATEGORY.map(category => (
                            <li key={category.value}>
                                <NavLink to={`/dishes/${category.value}`} >{category.label}</NavLink>
                            </li>
                        ))}
                    </ul>

                </div>

                <div className="col-5">
                    {isLoading ? <Spinner/>  :
                        <>
                            {dishes.length === 0 && <h5>No dishes yet</h5>}
                            {dishes.length > 0 &&
                                <>
                                    <h5>{getPageTitle(params.idCategory)}</h5>
                                    <Dishes
                                        dishes={dishes}
                                        onDeleteDish={onDeleteDish}
                                        addDishToCart={addDishToCart}
                                    />
                                </>

                               }
                        </>
                    }
                </div>

                <div className="col-4">
                    <Cart
                        cartDishes={cart}
                        onClearCart={clearCart}
                        onDeleteDish={onDeleteDishFromCart}
                    />
                </div>
            </div>
        </>
    );
};

export default Home;