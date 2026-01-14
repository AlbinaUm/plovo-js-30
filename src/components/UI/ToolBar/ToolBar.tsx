import {NavLink} from "react-router-dom";
import './Toolbar.css';

const ToolBar = () => {
    return (
        <nav className="py-3 bg-primary">
            <div className="container">
                <div className="row justify-content-between row-cols-6 align-items-center">
                    <div>
                        <NavLink to='/' className="navbar-brand text-white fs-4">Plovo</NavLink>
                    </div>
                    <ul className="toolbar-items ms-auto">
                        <li>
                            <NavLink
                                to='/'
                            >Home</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/new-dish'
                            >New dish</NavLink>
                        </li>

                        <li>
                            <NavLink
                                to='/admin/order-data'
                            >Orders</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default ToolBar;