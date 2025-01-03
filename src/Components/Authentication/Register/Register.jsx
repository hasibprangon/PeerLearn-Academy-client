import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthContextProvider';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import animation from '../../../assets/Animation/Register Animation.json'
import Lottie from 'lottie-react';

const Register = () => {
    const { setUser, handleCreateUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState(false);

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
                navigate('/');
            })
            .catch(err => {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Oops...",
                    text: `${err.message}`,
                });
            })

    }

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photoUrl.value;
        const email = form.email.value;
        const password = form.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Password must be contains at least an Uppercase, a Lowercase, and be at least 6 characters long",
                showConfirmButton: false,
                timer: 2000
            });
            setError(true)
            return;
        };

        handleCreateUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Registration Successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        e.target.reset();
                        navigate('/');
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: "error",
                            title: `${err.message}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })

            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }
    return (
        <div className="hero p-5 my-5">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left lg:w-[500px] md:w-[400px] w-64">
                    <Lottie
                        animationData={animation}
                        loop={true}
                    ></Lottie>
                </div>
                <div className="card bg-base-100 lg:w-[500px] md:w-[450px]  mr-8 shrink-0 shadow-2xl">
                    <h1 className="text-4xl font-bold my-8 text-center">Register now!</h1>
                    <form onSubmit={handleRegister} className="card-body">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" name='name' className="input input-bordered" required />
                        </div>
                        {/* Photo Url */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input type="text" placeholder="Photo Url" name='photoUrl' className="input input-bordered" required />
                        </div>
                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Enter Your Email" name='email' className="input input-bordered" required />
                        </div>
                        {/* Password */}
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPass ? 'text' : 'password'} placeholder="password" name='password' className="input input-bordered" required />
                            <button type='button' onClick={() => setShowPass(!showPass)} className='absolute right-2 top-12 btn btn-xs'>
                                {
                                    showPass ? <FaEyeSlash /> : <FaEye />
                                }
                            </button>
                        </div>
                        {
                            error && <p className='text-red-600'>Password must be contains at least an Uppercase, a Lowercase, and be at least 6 characters long</p>
                        }
                        <div className="form-control mt-6">
                            <button type='button' onClick={handleGoogleRegister} className='flex justify-center items-center gap-3 px-3 py-2 bg-gray-400 rounded-lg mb-4 text-white font-semibold'><FcGoogle className='text-lg' />Register With Google</button>
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <p className='text-center font-semibold mb-3'>Already Have an Account? Please <Link to='/signIn' className='text-blue-500 font-bold'>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;