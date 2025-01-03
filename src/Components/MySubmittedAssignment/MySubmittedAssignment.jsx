import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlinePendingActions } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';



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
            <h2 className='text-xl md:text-2xl lg:text-4xl font-bold text-center my-5'>Your Submitted Assignment</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Assignment Title</th>
                            <th>Assignment Marks</th>
                            <th>Obtain Marks</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            submitted.map(assignment => <tr key={assignment?._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={assignment?.imgUrl}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{assignment?.title}</div>
                                            <div className="text-base flex justify-start items-center gap-1 opacity-50">{assignment?.status}
                                                <span className={assignment?.status === 'Pending' ? 'text-red-500 text-lg font-semibold' : 'text-green-500 text-lg font-semibold'}>{assignment?.status === 'Pending' ? <MdOutlinePendingActions /> : <TiTick />
                                                }</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    {assignment?.marks}
                                </td>

                                <td>{assignment?.obtainMarks}</td>

                                <th>
                                    <button className="btn btn-ghost btn-xs">{assignment?.feedback}</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySubmittedAssignment;
