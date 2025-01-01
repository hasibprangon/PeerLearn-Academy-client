import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContextProvider';
import Swal from 'sweetalert2';

const Header = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                toast.error(`${err.message}`);
            })
    };

    const [info, setInfo] = useState(false);

    const handleMouseHover = () => {
        setInfo(true);
    };

    const handleMouseHoverOut = () => {
        setInfo(false);
    }

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/assignments'>Assignments</NavLink></li>
        {
            user && user?.email && 
            <li><NavLink to='/createAssignment'>Create Assignment</NavLink></li>
        }
        {
            user && user?.email && 
            <li><NavLink to='/mySubmission'>My Submitted Assignment</NavLink></li>
        }
    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <a className="text-xl">PeerLearn Academy</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.email ? (
                            <>
                                <div>
                                    <img
                                        onMouseEnter={handleMouseHover}
                                        onMouseDownCapture={handleMouseHoverOut}
                                        className="w-10 h-10 border rounded-full mr-3"
                                        src={user?.photoURL}
                                        alt=''
                                    />
                                    {info && (
                                        <div
                                            className="absolute right-2  mt-4 w-44 bg-white rounded-lg shadow-lg z-10"
                                            onMouseEnter={handleMouseHover}
                                            onMouseLeave={handleMouseHoverOut}
                                        >
                                            <div className="p-4 border-b text-center">
                                                <p className="text-sm text-gray-700">{user?.displayName}</p>
                                            </div>
                                            <div className='text-center'>
                                                <button className="btn" onClick={handleSignOut}>
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className='flex'>
                                <Link to='/signIn' className="btn mr-3  mt-3">
                                   Sign In
                                </Link>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Header;