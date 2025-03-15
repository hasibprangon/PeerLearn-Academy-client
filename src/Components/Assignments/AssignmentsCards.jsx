import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

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
                        });
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
    };

    return (
        <div className="relative card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow mx-auto">
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
            <div className="card-body ">
                <div className="flex justify-between w-full mb-3">
                    <Link to={`/updateAssignment/${_id}`} className="relative group  text-2xl font-semibold">
                        <FaRegEdit />
                        {/* Hover Text */}
                        <span className="absolute left-0 top-10 opacity-0 group-hover:opacity-100 transition-opacity text-sm  bg-base-200 px-2 py-1 rounded">
                            Update Assignment
                        </span>
                    </Link>
                    <button
                        className="relative group  text-2xl font-semibold"
                        onClick={() => handleDelete(_id, creatorData?.creatorEmail)}
                    >
                        <MdDeleteOutline />
                        {/* Hover Text */}
                        <span className="absolute left-0 top-10 opacity-0 group-hover:opacity-100 transition-opacity text-sm  bg-base-200 px-2 py-1 rounded">
                            Delete Assignment
                        </span>
                    </button>
                </div>

                <h2 className="card-title text-xl font-bold">{title}</h2>
                <p className="text-sm line-clamp-2">{description}</p>
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
                        <span className="badge bg-gradient-to-r from-[#1E3A8A] to-[#4338CA] ml-3 text-white p-3">
                            {creatorData?.creatorName}
                        </span>
                    </div>
                </div>

                {/* View Assignment Button */}
                <div className="card-actions justify-center mt-4">
                    <Link className="btn bg-[#9333EA] text-white text-base font-semibold w-full" to={`/viewAssignments/${_id}`}>
                        View Assignment
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AssignmentsCards;
