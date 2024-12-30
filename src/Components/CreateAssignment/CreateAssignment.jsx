import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreateAssignment = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useAuth();
    const navigate = useNavigate()
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
        }
        const info = {
            title,
            description,
            imgUrl,
            marks,
            difficulty,
            creatorData,
            dueDate
        }

        axios.post(`http://localhost:5000/createAssignment`, info)
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
            })
    };


    return (
        <div className="card w-full max-w-md mx-auto shadow-xl rounded-lg p-6 my-5">
            <h2 className="text-3xl font-bold text-center mb-6">Create Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        name='title'
                        placeholder="Enter assignment title"
                        className="input input-bordered border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-300"
                        required
                    />
                </div>
                {/* description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        placeholder="Enter assignment description"
                        name='description'
                        className="textarea textarea-bordered border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-300"
                        rows="4"
                        required
                    ></textarea>
                </div>
                {/* marks */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Marks</span>
                    </label>
                    <input
                        type="number"
                        name='marks'
                        placeholder="Enter total marks"
                        className="input input-bordered border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-300"
                        required
                    />
                </div>
                {/* Thumbnail Image */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Thumbnail Image URL</span>
                    </label>
                    <input
                        type="url"
                        name='imgUrl'
                        placeholder="Enter image URL"
                        className="input input-bordered border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-300"
                        required
                    />
                </div>
                {/* Difficulty */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Difficulty Level</span>
                    </label>
                    <select
                        name='difficulty'
                        className="select select-bordered border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-300"
                        required
                    >
                        <option value="" disabled selected>
                            Select difficulty level
                        </option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                {/* dueDate */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Due Date</span>
                    </label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        name='dueDate'
                        className="input input-bordered border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
                        placeholderText="Select due date"
                        required
                    />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-outline btn-accent">
                        Create Assignment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAssignment;
