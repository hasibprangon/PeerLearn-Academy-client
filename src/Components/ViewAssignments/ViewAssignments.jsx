import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewAssignments = () => {
    const data = useLoaderData()
    const { _id, title, description, imgUrl, marks, difficulty, creatorData, dueDate } = data;
    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto my-8 ">
            <figure className="relative h-64">
                <img
                    src={imgUrl}
                    alt={title}
                    className="h-full w-full object-cover rounded-t-xl"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">{title}</h2>
                <p className="text-sm text-gray-600">{description}</p>
                <div className="mt-4">
                    <p className="text-sm">
                        <span className="font-semibold">Marks:</span> {marks}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Due Date:</span> {dueDate}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Difficulty:</span> {difficulty}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Created by:</span> {creatorData?.creatorName}
                    </p>
                </div>
                <div className="card-actions justify-center mt-4">
                    <button className="btn btn-success text-white w-full">Take Assignment</button>
                </div>
            </div>
        </div>
    );
};

export default ViewAssignments;