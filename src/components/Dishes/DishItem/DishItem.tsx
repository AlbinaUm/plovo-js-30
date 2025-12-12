import type {IDish} from "../../../types";

interface Props {
    dish: IDish;
    addDishToCart: React.MouseEventHandler;
    onDeleteDish: (id: string) => void;
}

const DishItem: React.FC<Props> = ({dish, onDeleteDish, addDishToCart}) => {
    const picture = dish.image || 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

    return (
        <div className="card mb-2" onClick={addDishToCart}>
            <div className="row no-gutters align-items-center p-2">
                <div className="col-sm-4 rounded-start">
                    <img width="100" height="100" src={picture} alt={dish.name}/>
                </div>
                <div className="col-sm-6">
                    <h5 className="card-title">{dish.name}</h5>
                    <p className="card-text small">{dish.description}</p>
                    <p className="card-text">{dish.price} KGS</p>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-danger" onClick={() => onDeleteDish(dish.id)}>X</button>
                </div>
            </div>
        </div>
    );
};

export default DishItem;