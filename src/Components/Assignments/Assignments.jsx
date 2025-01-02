import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import AssignmentsCards from './AssignmentsCards';
import axios from 'axios';

const Assignments = () => {
    const data = useLoaderData();
    const [assignments, setAssignments] = useState(data);
    const [difficulty, setDifficulty] = useState('all');
    const [search, setSearch] = useState('');
    console.log(search);

    const handleDeleteAssignments = id => {
        const remaining = assignments.filter(info => info._id !== id);
        setAssignments(remaining)
    };

    useEffect(() => {
        if (search !== null && search !== undefined) {
            fetch(
                `http://localhost:5000/search?search=${search}`
            )
                .then((res) => res.json())
                .then((data) => setAssignments(data));
        }

    }, [search])

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
            <h2 className="lg:text-4xl md:text-2xl text-xl text-center my-9 font-semibold text-zinc-500">All Assignments here</h2>

            <div  className="flex items-center justify-center gap-5 mb-5">
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

                <form className="flex gap-2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search assignments"
                        className="input input-bordered"
                    />
                    <button type="submit" className="btn btn-primary">
                        Search
                    </button>
                </form>
            </div>

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