import React from 'react';
import { useLoaderData } from 'react-router-dom';
import AssignmentsCards from './AssignmentsCards';

const Assignments = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div>
            <h2 className="text-4xl text-center my-9 font-semibold text-zinc-500">All Assignments here</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 container mx-auto my-10'>
                {
                    data?.map(assignment => <AssignmentsCards
                        key={assignment._id}
                        assignment={assignment}
                    ></AssignmentsCards>)
                }
            </div>
        </div>
    );
};

export default Assignments;