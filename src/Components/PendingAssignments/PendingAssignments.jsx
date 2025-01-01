import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const PendingAssignments = () => {
    const [pending, setPending] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        axios.get(`http://localhost:5000/pending?email=${user?.email}`)
            .then(res => {
                setPending(res.data);
            })
    }, [])
    return (
        <div>
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