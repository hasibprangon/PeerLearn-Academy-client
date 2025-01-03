import React, { useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const ViewAssignments = () => {
    const data = useLoaderData()
    const { _id, title, description, imgUrl, marks, difficulty, creatorData, dueDate } = data;
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleAssignmentSubmit = e => {
        e.preventDefault()
        const form = e.target;
        const name = form?.name?.value;
        const googleDocs = form?.googleDocs?.value;
        const email = user?.email;
        const quickNote = form?.quickNote?.value;


        const submittedData = {
            assignmentId: _id,
            name,
            googleDocs,
            email,
            quickNote,
            status: 'Pending',
            obtainMarks: "",
            feedback: "",
            marks
        };
        axiosSecure.post(`/submittedAssignment`, submittedData)
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
        <div>
            <Helmet>
                <title>View Assignment</title>
            </Helmet>
            <h2 className='text-xl md:text-2xl lg:text-4xl font-bold text-center my-5'>Assignment Details</h2>
            <div className="card w-96 md:w-[420px] lg:w-[500px] bg-base-100 shadow-xl mx-auto my-8 ">
                <figure className="relative h-96">
                    <img
                        src={imgUrl}
                        alt={title}
                        className="h-full w-full object-cover rounded-t-xl"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-xl md:text-2xl lg:text-4xl font-bold">{title}</h2>
                    <p className="text-sm md:text-base lg:text-lg">{description}</p>
                    <div className="mt-4">
                        <p className="text-sm md:text-base lg:text-lg">
                            <span className="font-semibold">Marks:</span> {marks}
                        </p>
                        <p className="text-sm md:text-base lg:text-lg">
                            <span className="font-semibold">Due Date:</span> {dueDate}
                        </p>
                        <p className="text-sm md:text-base lg:text-lg">
                            <span className="font-semibold">Difficulty:</span> {difficulty}
                        </p>
                        <p className="text-sm md:text-base lg:text-lg">
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
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="Enter Your Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Google Docs Link</span>
                                    </label>
                                    <input type="url" name='googleDocs' placeholder="Google Docs Link" className="input input-bordered" required />
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
                                <div className="modal-action form-control">
                                    <button className="btn" type='submit'>Submit Assignment</button>
                                </div>
                            </form>

                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default ViewAssignments;