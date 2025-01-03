import React, { useContext, useState } from 'react';
import animation from '../../../assets/Animation/Login Animation.json'
import Lottie from 'lottie-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthContextProvider';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const SignIn = () => {
    const { setUser, handleSignInUser, signInWithGoogle } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const handleGoogleRegister = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                setUser(user)
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Register Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state ? location?.state : "/");
            })
            .catch(err => {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Oops...",
                    text: `${err.message}`,
                });
            })

    };

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email?.value;
        const password = form.password?.value;
        handleSignInUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                Swal.fire({
                    position: "end",
                    icon: "success",
                    title: "You have Successfully Signed In",
                    showConfirmButton: false,
                    timer: 1500
                });
                e.target.reset();
                navigate(location?.state ? location?.state : "/")
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    };
    return (
        <div className="hero bg-base-200 min-h-screen my-5">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie
                        animationData={animation}
                        loop={true}
                    ></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-4xl text-center mt-5 font-bold">Sign In now!</h1>
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPass ? 'text' : 'password'}  name='password' placeholder="password" className="input input-bordered" required />
                            <button type='button' onClick={() => setShowPass(!showPass)} className='absolute right-2 top-12 btn btn-xs'>
                                {
                                    showPass ? <FaEyeSlash /> : <FaEye />
                                }
                            </button>
                        </div>
                        <div className="form-control mt-6">
                            <button type='button' onClick={handleGoogleRegister} className='flex justify-center items-center gap-3 px-3 py-2 bg-gray-400 rounded-lg mb-4 text-white font-semibold'><FcGoogle className='text-lg' />Register With Google</button>
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p className='text-center font-semibold mb-3'>New To this website? Please <Link to='/register' className='text-blue-500 font-bold'>Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
