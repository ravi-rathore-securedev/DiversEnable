import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Joblist = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/job/getjobs');
                const data = await res.json();
                
                if (res.ok) {
                    setJobs(data); // Update jobs state with fetched data
                    setLoading(false);
                    setError(false);
                } else {
                    setError(true);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setError(true);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <div>
            <div className="sm:flex justify-evenly">
                <div className="m-auto flex flex-col">
            <h1 className="text-4xl  m-5 font-bold text-center">Jobs Opportunities</h1>
                <p className="text-center">Apply to Jobs and Internship and get the hiring opportunities</p>
                <button className="text-center m-auto text-violet-800 font-bold text-xl p-2 ">Apply Now</button>
                </div>
                <img className="md:w-1/4 sm:2/4 w-3/5 m-auto sm:mr-10 rounded h-96 sm:m-3" src="https://images.pexels.com/photos/4065617/pexels-photo-4065617.jpeg?auto=compress&cs=tinysrgb&w=600" alt="job" />
                
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error occurred while fetching jobs</p>}
            {jobs.length === 0 && <p>No jobs available</p>}
            <div className="flex flex-wrap  mt-10 mb-10">
                {jobs.map((job, index) => (
                    <div className="w-1/2 sm:w-1/3 md:w-1/4 p-4" key={index}>
                            {/* <Link to={`/job/getjob/${job._id}`} > */}
                        <div className="border shadow-md rounded-lg overflow-hidden">
                            <img className="w-full h-44 rounded object-cover object-center" src={job.companyLogo} alt="logo" />
                            <div className="p-4">
                                <h2 className="font-bold font-serif text-xl mb-1">{job.company}</h2>
                                <p className="mb-1 font-semibold">{job.jobTitle}</p>
                                <p className="mb-1 text-md font-mono">{job.jobType}</p>
                                <p className="mb-1 text-md">{job.location}</p>
                                 <p className="mb-2 flex justify-between"><p>Apply Deadline:</p>{new Date(job.applyDeadline).toLocaleDateString()}</p>
                                 <div className="flex justify-between w-11/12 m-auto  ">
                                 <Link to={`/job/${job._id}`} >
                                    <button className=" bg-sky-500 text-white w-20 rounded p-1" >View</button></Link> 
                                 <Link to={job.applyLink}>
                                <button className=" bg-sky-500 text-white w-20 rounded p-1">Apply</button>
                                </Link>
                                </div>
                            </div>
                        </div>
                        {/* </Link> */}
                    </div>
                ))}
            </div>
        </div>
    );
};
