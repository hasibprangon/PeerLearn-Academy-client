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
    }, [user?.email]);

    return (
        <div className='my-10 px-4 md:px-8'>
            <Helmet>
                <title>Pending</title>
            </Helmet>
            <h2 className='text-xl md:text-2xl lg:text-4xl font-bold text-center my-5'>
                All pending Assignment
            </h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-xs sm:text-base">Assignment Name</th>
                            <th className="text-xs sm:text-base">Assignment Marks</th>
                            <th className="text-xs sm:text-base">Examinee Name</th>
                            <th className="text-xs sm:text-base">Give Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {pending.map(assignment => (
                            <tr key={assignment?._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={assignment?.imgUrl}
                                                    alt="Assignment Thumbnail"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm sm:text-base">{assignment?.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-sm sm:text-base">{assignment?.marks}</td>
                                <td className="text-sm sm:text-base">{assignment?.name}</td>
                                <td className="text-sm sm:text-base">
                                    <Link
                                        to={`/giveMark/${assignment?._id}`}
                                        className="block p-2 rounded-xl hover:bg-[#af7cdf] bg-[#9333EA] text-white text-center w-full sm:w-auto"
                                    >
                                        Give Mark
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingAssignments;
