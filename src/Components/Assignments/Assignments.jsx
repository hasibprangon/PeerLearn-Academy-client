import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import AssignmentsCards from './AssignmentsCards';
import axios from 'axios';

const Assignments = () => {
    const data = useLoaderData();
    const [assignments, setAssignments] = useState(data);
    const [difficulty, setDifficulty] = useState('all');
    
    const handleDeleteAssignments = id => {
        const remaining = assignments.filter(info => info._id !== id);
        setAssignments(remaining)
    };

    const handleDifficulty = e => {
        const options = e.target.value;
        setDifficulty(options);

        axios.get(`http://localhost:5000/filter?difficulty=${options}`)
        .then(res => {
            setAssignments(res.data)
        })
    }


    return (
        <div>
            <h2 className="text-4xl text-center my-9 font-semibold text-zinc-500">All Assignments here</h2>

            <select
                value={difficulty}
                onChange={handleDifficulty}
                className="select select-bordered w-full max-w-xs"
            >
                <option value="all">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

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