import Dishes from "../../components/Dishes/Dishes.tsx";
import Cart from "../../components/Cart/Cart.tsx";
import type {CartDish, IDish} from "../../types";

interface Props {
    dishes: IDish[];
    onDeleteDish: (id: string) => void;
    addDishToCart: (dish: IDish) => void;
    cart: CartDish[];
    clearCart: () => void;
    onDeleteDishFromCart: (id: string) => void;
}

const Home: React.FC<Props> = ({dishes, onDeleteDish, addDishToCart, cart,clearCart , onDeleteDishFromCart}) => {


    return (
        <>
            <div className="row justify-content-between">
                <div className="col-5">
                    <Dishes
                        dishes={dishes}
                        onDeleteDish={onDeleteDish}
                        addDishToCart={addDishToCart}
                    />
                </div>

                <div className="col-5">
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