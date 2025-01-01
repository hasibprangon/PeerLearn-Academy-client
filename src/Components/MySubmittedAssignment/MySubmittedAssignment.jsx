import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlinePendingActions } from "react-icons/md";
import { TiTick } from "react-icons/ti";



const MySubmittedAssignment = () => {
    const [submitted, setSubmitted] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/mySubmission?email=person1@gmail.com')
            .then(res => {
                console.log(res.data);
                setSubmitted(res.data);
            })
    }, [])
    return (
        <div>
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
                            submitted.map(assignment => <tr>
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
