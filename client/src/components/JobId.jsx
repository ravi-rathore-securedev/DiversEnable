import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const JobId = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`/api/job/getjob/${jobId}`);
                const data = await response.json();
                setJob(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchJob();
    }, [jobId]);

    if (!job) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <div className=" mx-auto mt-8 p-8 shadow-lg rounded-lg">
            <img className=" rounded bg-white w-full h-96 mx-auto mb-4 object-contain" src={job.companyLogo} alt="Company Logo" />
            <h1 className="text-4xl font-bold text-center mb-4">{job.company}</h1>
            <p className="text-xl font-semibold mb-2">{job.jobTitle}</p>
            <div className="flex justify-between text-gray-600 text-lg mb-4">
                <p>{job.jobType}</p>
                <p>{job.location}</p>
            </div>
            <hr className="mb-4" />
            <div className="mb-8">
                <p className="font-semibold text-xl mb-2">Description:</p>
                <p>{job.description}</p>
            </div>
            <div className="mb-8">
                <p className="font-semibold text-xl mb-2">Requirements:</p>
                <p>{job.requirement}</p>
            </div>
            <div className="mb-8">
                <p className="font-semibold text-xl  mb-2">Eligibility:</p>
                <p>{job.eligibility}</p>
            </div>
            <div className="mb-8">
                <p className="font-semibold text-xl  mb-2">Apply Deadline:</p>
                <p>{new Date(job.applyDeadline).toDateString()}</p>
            </div>
            <div className="mb-8">
                <Link to={job.applyLink}>
                    <button className=" bg-sky-500 text-white w-40 rounded p-2">Apply</button>
                </Link>
            </div>
        </div>
    );
};
