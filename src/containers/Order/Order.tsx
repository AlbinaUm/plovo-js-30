import React from 'react';

const Order = () => {
    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (

        <div className="row mt-4">

            <div className="col">

                <form onSubmit={onFormSubmit}>

                    <div className="form-group">

                        <label htmlFor="name">Client name</label>

                        <input

                            id="name" type="text" name="name"

                            className="form-control"

                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="address">Address</label>

                        <input

                            id="address" type="text" name="address"

                            className="form-control"

                        />

                    </div>

                    <div className="form-group mb-3">

                        <label htmlFor="phone">Phone</label>

                        <input

                            id="phone" type="text" name="phone"

                            className="form-control"

                        />

                    </div>

                    <button type="submit" className="btn btn-primary">

                        Place order

                    </button>

                </form>

            </div>

        </div>

    );
};

export default Order;