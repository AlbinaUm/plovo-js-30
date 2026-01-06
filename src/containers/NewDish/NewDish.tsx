import DishForm from "../../components/DishForm/DishForm.tsx";
import type {IDish} from "../../types";

interface Props {
    addDish: (newDish: IDish) => void;
}

const NewDish: React.FC<Props> = ({addDish}) => {
    return (
        <div className="row mt-2">
            <div className="col-4">
                <DishForm addDish={addDish}/>
            </div>

        </div>
    );
};

export default NewDish;