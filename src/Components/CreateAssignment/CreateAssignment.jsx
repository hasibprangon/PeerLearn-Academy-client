import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const CreateAssignment = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const title = form?.title?.value;
        const description = form?.description?.value;
        const imgUrl = form?.imgUrl?.value;
        const marks = form?.marks?.value;
        const difficulty = form?.difficulty?.value;
        const dueDate = form?.dueDate?.value;
        const creatorData = {
            creatorEmail: user?.email,
            creatorName: user?.displayName
        };
        const info = {
            title,
            description,
            imgUrl,
            marks,
            difficulty,
            creatorData,
            dueDate
        };
        axiosSecure.post(`/createAssignment`, info)
            .then(res => {
                if (res?.data?.insertedId) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Assignment Created Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                form.reset();
                navigate('/assignments');
            })
            .catch(err => {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `${err}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <div className="container mx-auto my-8 p-4 sm:p-8 rounded-lg shadow-xl">
            <Helmet>
                <title>Create Assignment</title>
            </Helmet>
            <h2 className="text-4xl font-semibold text-center  mb-8">Create Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="form-control">
                    <label className="label text-gray-600 font-medium">Title</label>
                    <input
                        type="text"
                        name='title'
                        placeholder="Enter assignment title"
                        className="input input-bordered border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full py-2 px-3 rounded-md"
                        required
                    />
                </div>

                {/* Description */}
                <div className="form-control">
                    <label className="label text-gray-600 font-medium">Description</label>
                    <textarea
                        placeholder="Enter assignment description"
                        name='description'
                        className="textarea textarea-bordered border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full py-2 px-3 rounded-md"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Marks */}
                <div className="form-control">
                    <label className="label text-gray-600 font-medium">Marks</label>
                    <input
                        type="number"
                        name='marks'
                        placeholder="Enter total marks"
                        className="input input-bordered border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full py-2 px-3 rounded-md"
                        required
                    />
                </div>

                {/* Thumbnail Image URL */}
                <div className="form-control">
                    <label className="label text-gray-600 font-medium">Thumbnail Image URL</label>
                    <input
                        type="url"
                        name='imgUrl'
                        placeholder="Enter image URL"
                        className="input input-bordered border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full py-2 px-3 rounded-md"
                        required
                    />
                </div>

                {/* Difficulty Level */}
                <div className="form-control">
                    <label className="label text-gray-600 font-medium">Difficulty Level</label>
                    <select
                        name='difficulty'
                        className="select select-bordered border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full py-2 px-3 rounded-md"
                        required
                    >
                        <option value="" disabled selected>Select difficulty level</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                {/* Due Date */}
                <div className="form-control">
                    <label className="label text-gray-600 font-medium">Due Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        name='dueDate'
                        className="input input-bordered border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full py-2 px-3 rounded-md"
                        placeholderText="Select due date"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="form-control">
                    <button type="submit" className="btn bg-[#9333EA] w-full py-3 text-white font-semibold rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 transition-all">
                        Create Assignment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAssignment;
