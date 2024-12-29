import React, { useContext } from 'react';
import animation from '../../../assets/Animation/Login Animation.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthContextProvider';
import Swal from 'sweetalert2';

const SignIn = () => {
    const { setUser, handleSignInUser } = useContext(AuthContext)
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
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
