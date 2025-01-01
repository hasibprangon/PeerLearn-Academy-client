import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import AssignmentsCards from './AssignmentsCards';

const Assignments = () => {
    const data = useLoaderData();
    const [assignments, setAssignments] = useState(data)
    const handleDeleteAssignments = id => {
        const remaining = assignments.filter(info => info._id !== id);
        setAssignments(remaining)
    }
    return (
        <div>
            <h2 className="text-4xl text-center my-9 font-semibold text-zinc-500">All Assignments here</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 container mx-auto my-10'>
                {
                    assignments?.map(assignment => <AssignmentsCards
                        key={assignment._id}
                        assignment={assignment}
                        handleDeleteAssignments={handleDeleteAssignments}
                    ></AssignmentsCards>)
                }
            </div>
        </div>
    );
};

export default Assignments;