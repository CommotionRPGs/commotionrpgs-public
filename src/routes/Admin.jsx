import { Outlet } from 'react-router-dom'
import { NavLink } from "react-router-dom";

const Admin = () => {
    return (
        <div>
            {'Admin - '}
            <NavLink 
                to={'spells'}
            >
                {"Spells"}
            </NavLink>
            <Outlet />
        </div>
    )
}
export default Admin;