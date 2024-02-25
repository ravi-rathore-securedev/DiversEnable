import { Link } from 'react-router-dom';
// import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import fullscroll from '../../assets/fullscroll.jpg'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

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
    <div>
     <div className='w-full justify-evenly sm:flex sm:flex-row-reverse p-1 my-2'>

  <div className='w-full sm:w-1/2 flex justify-center'>

    <img className='w-full  my-2' src='https://images.pexels.com/photos/6248989/pexels-photo-6248989.jpeg?auto=compress&cs=tinysrgb&w=600' alt='fullscroll'/>

  </div>


  <div className='  w-full sm:w-1/3 flex flex-col  text-center '>

    <h1 className='text-center p-3 font-bold text-5xl  lg:text-7xl m-auto text-blue-700'>
      A Special Community
    </h1>

    <div className='  w-full flex justify-center p-1'>

    <p className='  text-xs font-thin p-2 w-full flex sm:text-sm sm:w-80 sm:text-center lg:text-xl lg:w-96'>
    Diverse Enable is a community designed to empower and support specially-abled individuals. Our platform provides a space for sharing opportunities, interacting with each other, and fostering a sense of belonging. Join us today and be part of a community that goes beyond barriers
    </p>

    </div>

  </div>

</div>

<div className=' w-full flex-col'>

<div className=' mt-8 text-6xl font-semibold p-2 text-center'>Features</div>
<div className=' text-sm text-center '>Discover the key features of Diverse Enable</div>

<Link to={'/search'}>
<div className='border-sky-700 border-2 w-4/6 m-auto py-1 px-5 rounded-2xl my-8 transform hover:scale-105 transition duration-500'>
  <h1 className=' text-3xl font-semibold'>Explore</h1>
  <p className=' text-sm font-thin'>Explore Post of Individuals</p>
</div>
</Link>
<Link to={'/joblist'}>
<div className='border-sky-700 border-2 w-4/6 m-auto py-1 px-5 rounded-2xl my-8 transform hover:scale-105 transition duration-500'>
  <h1 className=' text-3xl font-semibold'>Jobs/Internships</h1>
  <p className=' text-sm font-thin'>Opportunities related to Jobs, Internships </p>
</div>
</Link>


<Link to={'/schemelist'}>
<div className='border-sky-700 border-2 w-4/6 m-auto  py-1 px-5  rounded-2xl my-8 transform hover:scale-105 transition duration-500'>
<h1 className=' text-3xl font-semibold'>Government Schemes </h1>
  <p className=' text-sm font-thin'>Government Schemes for Specially Abled</p>
</div>  
</Link>

<Link to={'/scholarlist'}>
<div className='border-sky-700 border-2 w-4/6 m-auto  py-1 px-5  rounded-2xl transform hover:scale-105 transition duration-500'>
<h1 className=' text-3xl font-semibold'>Scholarship Opportunities</h1>
  <p className=' text-sm font-thin'>Scholarship Related information opportunities for Specially Abled Students</p>
</div>
</Link>

</div>

<div className=' sm:flex sm:flex-row-reverse mt-20 px-2 justify-evenly'>

      <img className='rounded sm:w-2/5 w-full m-auto' src='https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600' alt='about image'/>
   

    <div >
    <div className='text-center pb-3 font-bold text-5xl  lg:text-7xl m-auto mt-0 text-blue-700'> About Us</div>

    <div className=' border-sky-700 border-2 rounded-lg text-xs font-thin p-3 w-full flex sm:text-sm sm:w-3/5 sm:text-center lg:text-xl m-auto'> Our project aims to create an inclusive online platform tailored specifically for individuals with disabilities. Through a user-friendly interface, we provide a comprehensive range of resources, support, and opportunities to empower and uplift the disabled community. Our platform comprises three main sections: Opportunities, Explore, and Community Forum.
    <br/>
        <br/>
 We foster a supportive and engaging space for individuals with disabilities to connect, share experiences, and seek advice from peers and empowerment within the disabled community.<br/>
 <br/>
 The primary goal of this platform is to provide a supportive environment where members of the disabled community can access resources, support, and opportunities to enhance their well-being and empowerment. </div>
    </div>
    
</div>




<div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.slice(0, 3).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>
              View all posts
            </Link>
          </div>
        )}
      </div>

      <h2 className='text-2xl font-semibold text-center m-auto'>Recent Jobs/Internships</h2>
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

      <Link to={'/joblist'}>
        <div className='w-1/6 p-3 text-lg text-teal-500 hover:underline m-auto '>View all Jobs</div>
      </Link>
      <div>
  <div>
   <h1 className='mt-16 text-6xl font-semibold p-2 text-center'>Community</h1>
   <p className=' text-sm text-center mb-10 '>See how our community comes togetherSee Some Of The Inspiring Stories From Our Community
</p>
  </div>
  <div className='sm:grid sm:grid-cols-3 gap-2 mb-10'>
    <img src='https://images.pexels.com/photos/2026764/pexels-photo-2026764.jpeg?auto=compress&cs=tinysrgb&w=600' alt='community image'/>
    <img className='w-full' src='https://images.pexels.com/photos/4064418/pexels-photo-4064418.jpeg?auto=compress&cs=tinysrgb&w=300' alt='community image'/>
    <img src='https://images.pexels.com/photos/3009792/pexels-photo-3009792.jpeg?auto=compress&cs=tinysrgb&w=600' alt='community image'/>
    {/* <img className='sm:block hidden' src='https://images.pexels.com/photos/3912992/pexels-photo-3912992.jpeg?auto=compress&cs=tinysrgb&w=600'  alt='community image'/>
    <img className=' sm:block hidden' src='https://images.pexels.com/photos/4064696/pexels-photo-4064696.jpeg?auto=compress&cs=tinysrgb&w=600' alt='community image'/>
    <img className='sm:block hidden' src='https://images.pexels.com/photos/4063733/pexels-photo-4063733.jpeg?auto=compress&cs=tinysrgb&w=600' alt='community image'/> */}
  </div>
</div>
    </div>
    
  );
}