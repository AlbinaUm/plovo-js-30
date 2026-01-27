import Dishes from "../../components/Dishes/Dishes.tsx";
import Cart from "../../components/Cart/Cart.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {NavLink, useParams} from "react-router-dom";
import {DISH_CATEGORY} from "../../globalConstants.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addDishToCart} from "../../app/store/cartSlice.ts";
import {
    deleteDishById,
    fetchAllDishes,
    selectAllDishes, selectDeleteDishLoading,
    selectFetchDishesLoading
} from "../../app/store/dishesSlice.ts";

const Home = () => {
    const params = useParams();
    const dishes = useAppSelector(selectAllDishes);
    const isFetchLoading = useAppSelector(selectFetchDishesLoading);
    const isDeleteLoading = useAppSelector(selectDeleteDishLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (params.idCategory) {
            dispatch(fetchAllDishes(params.idCategory));
        } else {
            dispatch(fetchAllDishes());
        }
    }, [dispatch, params.idCategory]);

    const onDeleteDish = (id: string) => {
      dispatch(deleteDishById(id));
    };

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

                {(isFetchLoading || isDeleteLoading) ? <Spinner/> :
                    <>
                        <div className="col-5">

                            {dishes.length === 0 && <h5>No dishes yet</h5>}
                            {dishes.length > 0 &&
                                <>
                                    <h5>{getPageTitle(params.idCategory)}</h5>
                                    <Dishes
                                        dishes={dishes}
                                        onDeleteDish={onDeleteDish}
                                        addDishToCart={dish =>  dispatch(addDishToCart(dish)) }
                                    />
                                </>

                            }
                        </div>

                        <div className="col-4">
                            <Cart/>
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default Home;