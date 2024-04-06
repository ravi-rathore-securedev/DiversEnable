import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const JobCard = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
          const res = await fetch('/api/job/getjobs');
          const data = await res.json();
          setJobs(data);
        };
        fetchJobs();
      }
      , []);

  return (
    <>
     <div className='flex flex-wrap mb-10 '>
        {jobs.slice(0, 3).map((job, index) => (
          <div className='sm:w-1/2 md:w-1/3 p-4' key={index}>
            <div className=' border-cyan-600 border shadow-md rounded-lg overflow-hidden transition-all'>
              <img
                className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'
                src={job.companyLogo}
                alt='logo'
              />
              <div className='p-4'>
                <h2 className='font-bold font-serif text-xl mb-1'>{job.company}</h2>
                <p className='mb-1 font-semibold'>{job.jobTitle}</p>
                <p className='mb-1 text-md font-mono'>{job.jobType}</p>
                <p className='mb-1 text-md'>{job.location}</p>
                <p className='mb-2 flex justify-between'>
                  <span>Apply Deadline:</span>
                  {new Date(job.applyDeadline).toLocaleDateString()}
                </p>
                <div className='flex justify-between w-11/12 m-auto'>
                  <Link to={`/job/${job._id}`}>
                    <button className='bg-sky-500 text-white w-20 rounded p-1'>View</button>
                  </Link>
                  <a href={job.applyLink} target='_blank' rel='noopener noreferrer'>
                    <button className='bg-sky-500 text-white w-20 rounded p-1'>Apply</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
