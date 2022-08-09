import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/style.css';

const Nav = () => {
    const navigate = useNavigate();
    const logout = async () => {
        await axios.get("api/logout", {
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((result) => {
            localStorage.clear();
            navigate('/');
        }).catch((err) => {
            console.log(err);
        });

    };

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-nav">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link className="nav-link active text-white" to="/dashboard">Dashboard</Link>
                            </li>                          
                          
                        </ul>
                        <div className="d-flex">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white text-capitalize" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.name}
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <center>
                                    <button className="btn btn-danger text-white" onClick={logout} type="submit">Logout</button>
                                    </center>
                                    

                                </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Nav;