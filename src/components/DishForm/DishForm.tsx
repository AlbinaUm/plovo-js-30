import type {DishMutation, IDish} from "../../types";
import {useForm} from "react-hook-form";
import {DISH_CATEGORY} from "../../globalConstants.ts";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner.tsx";
import {useCallback, useEffect} from "react";

interface Props {
    onSubmitDish: (newDish: IDish) => void;
    isLoading?: boolean;
    isEdit?: boolean;
    defaultDish?: DishMutation | null;
}

const DishForm: React.FC<Props> = ({onSubmitDish, isEdit=false, isLoading=false, defaultDish = null}) => {

    const getDefaultValue = useCallback(() => {
        return defaultDish ? defaultDish : {
            name: '',
            description: '',
            category: '',
            image: '',
            price: 0,
        };
    }, [defaultDish]);


    const {register, handleSubmit, reset, formState: {errors}} = useForm<DishMutation>({
        defaultValues: getDefaultValue()
    });

    useEffect(() => {
        if (defaultDish) {
            reset(defaultDish);
        }
    }, [defaultDish, reset]);

    const onSubmit = (data: DishMutation) => {
        onSubmitDish({
            ...data,
            price: Number(data.price),
            id: String(new Date().toISOString()),
        });
        reset();
    };

    return (
        <div>
            <h4>Dish form</h4>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group mb-2">
                    <label htmlFor="name">Category</label>
                    <select
                        {...register('category', {
                            required: 'Category is required',
                        })}
                        name="category"
                        id="category"
                        disabled={isLoading}
                        className="form-control"
                    >
                        <option value="" disabled>Select category</option>
                        {DISH_CATEGORY.map(category => (
                            <option key={category.value} value={category.value}>{category.label}</option>
                        ))}
                    </select>

                    {errors.name && (
                        <p className="small text-danger">{errors.name.message}</p>
                    )}
                </div>

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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Price</label>
                    <input
                        type="text"
                        {...register('price', {
                            required: 'Price is required',
                        })}
                        disabled={isLoading}
                        name="price"
                        id="price"
                        className="form-control"
                    />
                    {errors.price && (
                        <p className="small text-danger">{errors.price.message}</p>
                    )}
                </div>

                <button type="submit" className="btn btn-primary mt-2" disabled={isLoading}>
                    {isEdit ? 'Edit' : 'Create'}
                    {isLoading && <ButtonSpinner/>}
                </button>
            </form>
        </div>
    );
};

export default DishForm;