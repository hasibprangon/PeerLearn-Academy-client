import React, { useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const ViewAssignments = () => {
    const data = useLoaderData()
    const { _id, title, description, imgUrl, marks, difficulty, creatorData, dueDate } = data;
    const { user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(false)

    const handleAssignmentSubmit = e => {
        e.preventDefault()
        const form = e.target;
        const googleDocs = form?.googleDocs?.value;
        const email = form?.email?.value;
        const quickNote = form?.quickNote?.value;

        if (user?.email === email) {
            setError(true);
            return 
        };

        const submittedData = {
            assignmentId: _id,
            googleDocs,
            email,
            quickNote,
            status: 'Pending'
        };

        axios.post(`http://localhost:5000/submittedAssignment`, submittedData)
            .then(res => {
                if (res?.data?.insertedId) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "You have successfully submitted the assignment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                form.reset();
                navigate('/assignments')
            })
            .catch(err => {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `${err}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })

        document.getElementById('my_modal_4').close();
    };


    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto my-8 ">
            <figure className="relative h-64">
                <img
                    src={imgUrl}
                    alt={title}
                    className="h-full w-full object-cover rounded-t-xl"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">{title}</h2>
                <p className="text-sm text-gray-600">{description}</p>
                <div className="mt-4">
                    <p className="text-sm">
                        <span className="font-semibold">Marks:</span> {marks}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Due Date:</span> {dueDate}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Difficulty:</span> {difficulty}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Created by:</span> {creatorData?.creatorName}
                    </p>
                </div>
                <div className="card-actions justify-center mt-4">
                    <button onClick={() => document.getElementById('my_modal_4').showModal()} className="btn btn-success text-white w-full">Take Assignment</button>
                </div>

                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <form onSubmit={handleAssignmentSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Google Docs Link</span>
                                </label>
                                <input type="url" name='googleDocs' placeholder="Google Docs Link" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label htmlFor="quickNote" className="block">Quick Note</label>
                                <textarea
                                    name='quickNote'
                                    id="quickNote"
                                    className="textarea textarea-bordered w-full"
                                    rows="4"
                                    required
                                />
                            </div>
                                {
                                    error && <p className='text-red-500 text-sm'>You Can not take Your own Assignment</p>
                                }
                            <div className="modal-action form-control">
                                <button className="btn" type='submit'>Submit Assignment</button>
                            </div>
                        </form>

                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ViewAssignments;