import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Schemelist = () => {
    const [govt, setGovt] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/scheme/getscheme');
                const data = await res.json();

                if (res.ok) {
                    setGovt(data); // Update jobs state with fetched data
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

        fetchSchemes();
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <div>
             <div className="sm:flex justify-evenly">
                <div className="m-auto flex flex-col">
            <h1 className="text-4xl text-center m-5 font-bold">Govt Schemes Opportunities</h1>
            <p className="text-center">Latest Government Schemes to impower Specially Abled People</p>
                <button className="text-center m-auto text-violet-800 font-bold text-xl p-2 ">Apply Now</button>
                </div>
                <img className="md:w-2/5 sm:2/4 w-3/5 m-auto  rounded h-96 sm:m-11" src="https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=600" alt="job" />
                
                </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error occurred while fetching jobs</p>}
            {govt.length > 0 && (
                  <div className="flex flex-wrap mb-10">
                    {govt.map((govt, index) => (
                          <div className="w-1/2 sm:w-1/3 md:w-1/4 p-4" key={index}>
                          <div className="border shadow-md rounded-lg overflow-hidden">
                          <img className="w-full h-44 rounded object-cover object-center" src={govt.Logo} alt="logo" />
                          <div className="p-4">
                          <p className="mb-1 font-semibold">{govt.title}</p>
                          <p className="mb-1 text-md font-mono">{govt.eligibility}</p>
                          <p className="mb-2 flex justify-between"><p>Apply Deadline:</p>{new Date(govt.applyDeadline).toLocaleDateString()}</p>
                                 <div className="flex justify-between w-11/12 m-auto  ">
                                 <Link to={`/govt/${govt._id}`} >
                                    <button className=" bg-sky-500 text-white w-20 rounded p-1" >View</button></Link> 
                                 <Link to={govt.applyLink}>
                                <button className=" bg-sky-500 text-white w-20 rounded p-1">Apply</button>
                                </Link>
                        {/* <li key={index}>{govt.title}</li>  */}
                        {/* <li key={index}>{govt.Logo}</li>  */}
                        {/* <li key={index}>{govt.description}</li>  */}
                        {/* <li key={index}>{govt.benefits}</li>  */}
                        {/* <li key={index}>{govt.eligibility}</li>  */}
                        {/* <li key={index}>{govt.applyDeadline}</li>  */}
                        {/* <li key={index}>{govt.process}</li>  */}
                        {/* <li key={index}>{govt.applyMethod}</li>  */}
                        {/* <li key={index}>{govt.applyLink}</li>  */}
                        </div>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
