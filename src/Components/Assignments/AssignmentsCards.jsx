import React from 'react';

const AssignmentsCards = ({ assignment }) => {
    const { _id, title, description, imgUrl, marks, difficulty, creatorData, dueDate } = assignment;
    return (
        <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow mx-auto">
            <figure className="relative h-64">
                <img
                    src={imgUrl}
                    alt={title}
                    className="h-full w-full object-cover rounded-t-xl"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-3 py-1 text-white rounded-md">
                    {difficulty}
                </div>
            </figure>
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">{title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                <div className="flex flex-col justify-start items-start mt-4">
                    <div className="text-left">
                        <p className="text-sm">
                            <span className="font-semibold">Marks:</span> {marks}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Due Date:</span> {dueDate}
                        </p>
                    </div>
                    <div className="mt-2">
                        <span className="text-sm font-semibold">Created by:</span>
                        <span className="badge badge-accent ml-3 text-white">
                            {creatorData?.creatorName}
                        </span>
                    </div>
                </div>
                <div className="card-actions justify-center mt-4">
                    <button className="btn btn-info text-white text-base font-semibold w-full">
                        View Details
                    </button>
                    <button
                        className="btn btn-outline btn-warning text-white text-base font-semibold w-5/12"
                    >
                        Update
                    </button>
                    <button
                        className="btn btn-outline btn-error text-white text-base font-semibold w-5/12"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignmentsCards;