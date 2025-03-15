import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import AssignmentsCards from './AssignmentsCards';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const Assignments = () => {
    const data = useLoaderData();
    const [assignments, setAssignments] = useState(data);
    const [difficulty, setDifficulty] = useState('all');
    const [search, setSearch] = useState('');

    const handleDeleteAssignments = id => {
        const remaining = assignments.filter(info => info._id !== id);
        setAssignments(remaining)
    };

    useEffect(() => {
        if (search !== null && search !== undefined) {
            fetch(
                `https://peer-learn-academy-server.vercel.app/search?search=${search}`
            )
                .then((res) => res.json())
                .then((data) => setAssignments(data));
        }

    }, [search])

    const handleDifficulty = e => {
        const options = e.target.value;
        setDifficulty(options);

        axios.get(`https://peer-learn-academy-server.vercel.app/filter?difficulty=${options}`)
            .then(res => {
                setAssignments(res.data)
            })
    }

    return (
        <div>
            <Helmet>
                <title>Assignments</title>
            </Helmet>
            <h2 className="text-center text-xl md:text-2xl lg:text-4xl font-semibold my-6">All Assignments Here</h2>

            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-4 mb-6 container mx-auto px-6">
                <div className="flex items-center gap-3">
                    <label className="font-bold lg:text-lg text-base">Filter By Difficulty :</label>
                    <select
                        value={difficulty}
                        onChange={handleDifficulty}
                        className="select select-bordered w-full sm:max-w-xs"
                    >
                        <option value="all">All</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <form className="flex gap-2 w-full md:w-auto">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search assignments"
                        className="input input-bordered w-full"
                    />
                    <button type="submit" className="btn bg-[#9333EA] text-white">
                        Search
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto my-10">
                {
                    assignments?.map(assignment => (
                        <AssignmentsCards
                            key={assignment._id}
                            assignment={assignment}
                            handleDeleteAssignments={handleDeleteAssignments}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Assignments;
