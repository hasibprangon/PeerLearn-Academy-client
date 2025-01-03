import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const PendingAssignments = () => {
    const [pending, setPending] = useState([]);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get(`/pending`)
        .then(res => {
            setPending(res.data);
        })
    }, [user?.email])
    return (
        <div className='my-10'>
            <Helmet>
                <title>Pending</title>
            </Helmet>
            <h2 className='text-xl md:text-2xl lg:text-4xl font-bold text-center my-5'>All pending Assignment</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Assignment Name</th>
                            <th>Assignment Marks</th>
                            <th>Examinee Name</th>
                            <th>Give Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            pending.map(assignment => <tr key={assignment?._id}>
                              
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={assignment?.imgUrl}
                                                    alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{assignment?.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                   {assignment?.marks}
                                </td>
                                <td>{assignment?.name}</td>
                                <th>
                                    <Link to={`/giveMark/${assignment?._id}`} className="btn  btn-xs">Give Mark</Link>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingAssignments;