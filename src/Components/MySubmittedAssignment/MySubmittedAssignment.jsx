import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlinePendingActions } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const MySubmittedAssignment = () => {
    const [submitted, setSubmitted] = useState([]);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/mySubmission?email=${user?.email}`)
            .then(res => {
                setSubmitted(res.data);
            })
    }, [user?.email]);

    return (
        <div className='my-10'>
            <Helmet>
                <title>Submitted Assignments</title>
            </Helmet>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-center my-5 '>Your Submitted Assignments</h2>
            <div className="overflow-x-auto  shadow-xl rounded-lg p-6">
                <table className="table table-zebra w-full text-sm">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Assignment Title</th>
                            <th className="px-4 py-2 text-left">Assignment Marks</th>
                            <th className="px-4 py-2 text-left">Obtain Marks</th>
                            <th className="px-4 py-2 text-left">Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            submitted.map(assignment => (
                                <tr key={assignment?._id} className="">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={assignment?.imgUrl}
                                                        alt="Assignment Thumbnail" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-semibold ">{assignment?.title}</div>
                                                <div className="text-xs  flex items-center gap-1">
                                                    <span className={assignment?.status === 'Pending' ? 'text-red-500' : 'text-green-500'}>
                                                        {assignment?.status === 'Pending' ? <MdOutlinePendingActions /> : <TiTick />}
                                                    </span>
                                                    {assignment?.status}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">{assignment?.marks}</td>
                                    <td className="px-4 py-3 text-center">{assignment?.obtainMarks}</td>
                                    <td className="px-4 py-3 text-center">
                                        <button className=" py-2 px-4 rounded-full transition duration-200">
                                            {assignment?.feedback || 'No Feedback'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySubmittedAssignment;
