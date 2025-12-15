import {toast} from "react-toastify";
import type {DishMutation, IDish} from "../../types";
import {useForm} from "react-hook-form";

interface Props {
    addDish: (newDish: IDish) => void;
}

const DishForm: React.FC<Props> = ({addDish}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<DishMutation>({
        defaultValues: {
            name: '',
            description: '',
            image: '',
            price: 0,
        }
    });

    const onSubmit = (data: DishMutation) => {
        addDish({
            ...data,
            price: Number(data.price),
            id: String(new Date().toISOString()),
        });
        toast.success('Dish created successfully');
        reset();
    };

    return (
        <div>
            <h4>Dish form</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {value: 3, message: 'Name must be more than 3 symbols'}
                        })}
                        name="name"
                        id="name"
                        className="form-control"
                    />
                    {errors.name && (
                        <p className="small text-danger">{errors.name.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Description</label>
                    <textarea
                        {...register('description', {required: 'Description is required'})}
                        name="description"
                        id="description"
                        className='form-control'
                    />
                    {errors.name && (
                        <p className="small text-danger">{errors.description?.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Image</label>
                    <input
                        type="text"
                        {...register('image')}
                        name="image"
                        id="image"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Price</label>
                    <input
                        type="text"
                        {...register('price', {
                            required: 'Price is required',
                            validate: {
                                positive: (v) => v > 0 || "Must be positive",
                                notTooBig: (v) => v > 1000 && "Too exp",
                                isNumber: (v) => !(isNaN(Number(v))) || 'Price must be integer'
                            }
                        })}
                        name="price"
                        id="price"
                        className="form-control"
                    />
                    {errors.price && (
                        <p className="small text-danger">{errors.price.message}</p>
                    )}
                </div>

                <button type="submit" className="btn btn-primary mt-2">Create</button>
            </form>
        </div>
    );
};

export default DishForm;