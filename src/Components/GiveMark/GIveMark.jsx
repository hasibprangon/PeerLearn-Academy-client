import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const GIveMark = () => {
    const [assignment, setAssignment] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/pending`)
            .then(res => {
                setAssignment(res.data);
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const obtainMarks = form.obtainMarks.value;
        const feedback = form.feedback.value;
        const status = "Completed";
        const giveMark = { obtainMarks, feedback, status };

        if (assignment[0]?.email === user?.email) {
            return Swal.fire({
                position: "top",
                icon: "error",
                title: "You can not give mark to your own assignment",
                showConfirmButton: false,
                timer: 1500
            });
        }

        if (assignment[0]?.marks < obtainMarks) {
            return Swal.fire({
                position: "top",
                icon: "error",
                title: "You cannot give more marks than the total marks",
                showConfirmButton: false,
                timer: 3000
            });
        }

        axiosSecure.patch(`/giveMark/${id}`, giveMark)
            .then(res => {
                if (res?.data?.modifiedCount) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Mark submitted successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                form.reset();
                navigate('/mySubmission');
            })
    }

    return (
        <div className="container mx-auto my-8 px-4">
            <Helmet>
                <title>Give Mark</title>
            </Helmet>
            <h2 className="text-3xl font-semibold text-center mb-6 ">Mark Assignment</h2>
            <div className="card w-full max-w-2xl mx-auto bg-gradient-to-r from-[#1E3A8A] to-[#4338CA] text-white shadow-lg rounded-lg p-6">
                <div className="card-body space-y-4">
                    <p>
                        <span className="font-semibold">Google Docs Link: </span>
                        <a
                            href={assignment[0]?.googleDocs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 md:text-base text-sm underline"
                        >
                            {assignment[0]?.googleDocs}
                        </a>
                    </p>
                    <p>
                        <span className="font-semibold">Quick Note: </span>
                        <span>{assignment[0]?.quickNote}</span>
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="form-control mb-6">
                    <label className="label text-lg font-medium text-gray-700">Marks</label>
                    <input
                        type="number"
                        name="obtainMarks"
                        placeholder="Enter marks"
                        className="input input-bordered rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full p-3 mt-2"
                        required
                    />
                </div>
                <div className="form-control mb-6">
                    <label className="label text-lg font-medium text-gray-700">Feedback</label>
                    <textarea
                        name="feedback"
                        placeholder="Enter feedback"
                        className="textarea textarea-bordered rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full p-3 mt-2"
                        required
                    ></textarea>
                </div>
                <button className="btn bg-[#9333EA] text-white text-lg w-full py-3 rounded-lg hover:bg-indigo-700 transition duration-300">Submit</button>
            </form>
        </div>
    );
};

export default GIveMark;
