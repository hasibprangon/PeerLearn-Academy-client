import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const UpdateAssignment = () => {
    const [data, setData] = useState(null);
    const params = useParams()
    const [startDate, setStartDate] = useState(null);
    const axiosSecure = useAxiosSecure();

    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    useEffect(() => {
        if (data?.difficulty) {
            setSelectedDifficulty(data.difficulty);
        }
    }, [data]);

    useEffect(() => {
        axiosSecure.get(`/assignments/${params.id}`)
            .then(res => {
                setData(res?.data)
            })
    }, [params.id])

    useEffect(() => {
        if (data?.dueDate) {
            setStartDate(new Date(data.dueDate)); 
        }
    }, [data?.dueDate]);


    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const title = form?.title?.value;
        const description = form?.description?.value;
        const imgUrl = form?.imgUrl?.value;
        const marks = form?.marks?.value;
        const difficulty = form?.difficulty?.value;
        const dueDate = form?.dueDate?.value;

        const updateInfo = {
            title, description, imgUrl, marks, difficulty, dueDate
        };

        axiosSecure.put(`/update/${params.id}`, updateInfo)
            .then(res => {
                if (res?.data?.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Assignment Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })


    }

    return (
        <div className="card w-full max-w-md mx-auto shadow-xl rounded-lg p-6 my-5">
            <Helmet>
                <title>Update Assignment</title>
            </Helmet>
            <h2 className='text-xl md:text-3xl font-bold text-center'>Update Assignment</h2>
            <form onSubmit={handleUpdate} className="space-y-5">
                {/* title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        name='title'
                        defaultValue={data?.title}
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
                        defaultValue={data?.description}
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
                        defaultValue={data?.marks}
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
                        defaultValue={data?.imgUrl}
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
                        value={selectedDifficulty || ''}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
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
                    <button className="btn bg-[#9333EA] text-white">
                        Update Assignment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateAssignment;