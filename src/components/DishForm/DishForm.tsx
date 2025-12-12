import {useState} from "react";
import {toast} from "react-toastify";

interface Props {
    addDish: (newDish: IDish) => void;
}

const DishForm: React.FC<Props> = ({addDish}) => {
    const [form, setForm] = useState<DishMutation>({
        name: '',
        description: '',
        image: '',
        price: 0,
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if ((form.price === 0 || form.price < 0) && form.name.trim().length === 0) {
            toast.error('Please fill name and price fields');
        } else {
            addDish({
                ...form,
                price: Number(form.price),
                id: String(new Date().toISOString()),
            });
            setForm({name: '', description: '', image: '', price: 0});
            toast.success('Dish created successfully');
        }
    };

    return (
        <div>
            <h4>Dish form</h4>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={onInputChange}
                        id="name"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={onInputChange}
                        id="description"
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Image</label>
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={onInputChange}
                        id="image"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={onInputChange}
                        id="price"
                        min="0"
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-2">Create</button>
            </form>
        </div>
    );
};

export default DishForm;