import {Link, Outlet} from "react-router-dom";

const Layout = () => {

    return(
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contactus">Contact Us</Link></li>
                <li><Link to="/savedwords">Saved Words</Link></li>
                <li><Link to="/createdeck">Create New Deck</Link></li>
            </ul>
            <hr/>
            <Outlet />

        </div>
    );
};
export default Layout