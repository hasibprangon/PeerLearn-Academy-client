import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AssignmentsCards = ({ assignment, handleDeleteAssignments }) => {
    const { _id, title, description, imgUrl, marks, difficulty, creatorData, dueDate } = assignment;
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id, email) => {
        if (user?.email === email) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/assignments/${id}`)
                        .then(res => {
                            if (res?.data?.deletedCount > 0) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                                handleDeleteAssignments(id);
                            }
                        })

                }
            });
        }
        else {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "You are not the assignment creator",
                showConfirmButton: false,
                timer: 1500
            });
        }

    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow mx-auto">
            <figure className="relative h-64">
                <img
                    src={imgUrl}
                    alt={title}
                    className="h-full w-full object-cover rounded-t-xl"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-3 py-1 text-white rounded-md">
                    {difficulty}
                </div>
            </figure>
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">{title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                <div className="flex flex-col justify-start items-start mt-4">
                    <div className="text-left">
                        <p className="text-sm">
                            <span className="font-semibold">Marks:</span> {marks}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Due Date:</span> {dueDate}
                        </p>
                    </div>
                    <div className="mt-2">
                        <span className="text-sm font-semibold">Created by:</span>
                        <span className="badge badge-accent ml-3 text-white">
                            {creatorData?.creatorName}
                        </span>
                    </div>
                </div>
                <div className="card-actions justify-center mt-4">
                    <Link className="btn btn-info text-white text-base font-semibold w-full" to={`/viewAssignments/${_id}`}>
                        <button>
                            View Assignment
                        </button>
                    </Link>
                    <Link to={`/updateAssignment/${_id}`}
                        className="btn btn-outline btn-warning text-white text-base font-semibold w-5/12"
                    >
                        Update
                    </Link>
                    <button
                        className="btn btn-outline btn-error text-white text-base font-semibold w-5/12"
                        onClick={() => handleDelete(_id, creatorData?.creatorEmail)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignmentsCards;