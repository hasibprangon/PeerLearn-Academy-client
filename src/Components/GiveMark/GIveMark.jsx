import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const GIveMark = () => {
    const [assignment, setAssignment] = useState([]);
    const { id } = useParams();
    const navigate  =  useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/pending/${id}`)
            .then(res => {
                setAssignment(res.data);
            })
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const obtainMarks = form.obtainMarks.value; 
        const feedback = form.feedback.value;
        const status = "Completed";
        const giveMark = {
            obtainMarks,
            feedback,
            status
        }

        if(assignment?.email === user?.email) {
            return  Swal.fire({
                position: "top",
                icon: "error",
                title: "You can not give mark to your own assignment",
                showConfirmButton: false,
                timer: 1500
              });
        };

        if(assignment?.marks < obtainMarks) {
            return Swal.fire({
                position: "top",
                icon: "error",
                title: "You can not give more mark than the main mark",
                showConfirmButton: false,
                timer: 3000
              });
        }

       axios.patch(`http://localhost:5000/giveMark/${id}`, giveMark)
        .then(res => {
            if(res?.data?.modifiedCount){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Mark submitted successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            form.reset();
            navigate('/mySubmission');
          
        })

    }

    return (
        <div className="container mx-auto my-8">
            <h2 className="text-2xl font-bold mb-4">Mark Assignment</h2>
            <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                    <p>
                        <span className="font-semibold">Google Docs Link: </span>
                        <a
                            href={assignment?.googleDocs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            {assignment?.googleDocs}
                        </a>
                    </p>
                    <p>
                        <span className="font-semibold">Quick Note: </span>
                        {assignment?.quickNote}
                    </p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-control mb-4">
                    <label className="label">Marks</label>
                    <input type="number" name="obtainMarks" placeholder="Enter marks" className="input input-bordered" required
                    />
                </div>
                <div className="form-control mb-4">
                    <label className="label">Feedback</label>
                    <textarea name="feedback" placeholder="Enter feedback" className="textarea textarea-bordered" required
                    ></textarea>
                </div>
                <button className="btn btn-success w-full">Submit</button>
            </form>
        </div>
    );
};

export default GIveMark;