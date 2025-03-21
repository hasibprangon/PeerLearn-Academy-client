import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContextProvider';
import Swal from 'sweetalert2';
import img from '../../../src/assets/peerLearnAcademy.png'
import { styles } from '../../Styles/styles';

const Header = ({ handleTheme }) => {
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
    const handleClick = () => {
        setInfo(prev => !prev); // Toggle the info visibility on click for small devices
    };

    const links = <>
        <li><NavLink className={styles.navLinks} to='/'>Home</NavLink></li>
        <li><NavLink className={styles.navLinks} to='/assignments'>Assignments</NavLink></li>

        {
            user && user?.email &&
            <li><NavLink className={styles.navLinks} to='/pendingAssignments'>Pending Assignments</NavLink></li>
        }
        <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onClick={handleTheme} className="theme-controller" value="synthwave" />

            {/* sun icon */}
            <svg
                className="swap-off h-5 w-5 mt-1 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
                className="swap-on h-5 w-5 mt-1 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
        </label>
    </>
    return (
        <div className='sticky top-0 z-50 bg-gradient-to-r from-[#1E3A8A] to-[#4338CA] '>
            <div className="navbar text-white">
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
                            className="menu menu-sm dropdown-content bg-gradient-to-r from-[#1E3A8A] to-[#4338CA]  rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <img src={img} className='w-16' alt="" />
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
                            <div className="relative">
                            <img
                                onClick={handleClick}  // Toggle on click for small devices
                                onMouseEnter={handleMouseHover}  // Hover behavior for larger devices
                                onMouseDownCapture={handleMouseHoverOut}  // Hover out behavior for larger devices
                                className="w-10 h-10 border rounded-full cursor-pointer"
                                src={user?.photoURL}
                                alt="User"
                            />
                            {info && (
                                <div 
                                    className="absolute right-0 mt-4 w-48 bg-white shadow-lg rounded-lg py-2"
                                    onMouseEnter={handleMouseHover}  // Keep dropdown open on hover for larger screens
                                    onMouseLeave={handleMouseHoverOut}  // Close dropdown on hover out for larger screens
                                >
                                    <p className="text-center text-sm font-semibold text-gray-700">{user?.displayName}</p>
                                    <div className="text-center">
                                        <NavLink className="block px-4 py-2 text-black hover:bg-[#1E3A8A] hover:text-white" to="/createAssignment">
                                            Create Assignment
                                        </NavLink>
                                        <NavLink className="block px-4 py-2 text-black hover:bg-[#1E3A8A] hover:text-white" to="/mySubmission">
                                            My Submissions
                                        </NavLink>
                                        <button className="w-full px-4 py-2 text-red-600 hover:bg-gray-200" onClick={handleSignOut}>
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        ) : (
                            <div className='flex'>
                                <Link to='/signIn' className="btn mr-3 bg-[#9333EA] text-white mt-3">
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