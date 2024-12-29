import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthContextProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Register = () => {
    const { setUser, handleCreateUser } = useContext(AuthContext)

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photoUrl.value;
        const email = form.email.value;
        const password = form.password.value;
        handleCreateUser(email, password)
        .then(result => {
            const user = result.user;
            setUser(user);
            Swal.fire({
                position: "end",
                icon: "success",
                title: "You have Successfully Registered",
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
    }
    return (
        <div className="hero bg-base-200 min-h-screen p-5 my-5">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-4xl font-bold mb-8 text-center">Register now!</h1>
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
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