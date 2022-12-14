import { NavLink } from "react-router-dom";

function Nav({status}) {

    return (       
        <nav>
            <div className="nav-control">
                {status === 3 ? <NavLink to="/category" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Categories</NavLink> : null}      
                {status === 3 ? <NavLink to="/comments" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Comments</NavLink> : null}
                {status === 3 ? <NavLink to="/admin" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Admin</NavLink> : null}
                {status === 2 || status === 3 || status === 4 ? <NavLink to="/client" end className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Client</NavLink> : null}
                {status === 1 ? <NavLink to="/register" className="nav-link">Register</NavLink> : null}
                {status === 1 ? <NavLink to="/login" className="nav-link">Login</NavLink> : null}
            </div>
            {status !== 1 ? <NavLink to="/logout" className="nav-link">Logout</NavLink> : null}
        </nav>  
    )
}

export default Nav;