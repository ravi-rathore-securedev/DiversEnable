import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Scholarlist = () => {
  const [scholar, setScholar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/scholar/getscholar");
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setScholar(data); // Update jobs state with fetched data
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
  }, []);
  return (
    <div>
      <div className="sm:flex justify-evenly">
        <div className="m-auto flex flex-col">
          <h1 className="text-4xl text-center m-5 font-bold">
            Scholarship Opportunities
          </h1>
          <p className="text-center">
            Scholarship Related information opportunities for Specially Abled
            Students
          </p>
          <button className="text-center m-auto text-violet-800 font-bold text-xl p-2 ">
            Apply Now
          </button>
        </div>
        <img
          className="md:w-2/5 sm:2/4 w-3/5 m-auto  sm:m-11  rounded h-96"
          src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="job"
        />
      </div>
      {loading && <p className="bg-green-100 border align-middle border-green-400 text-green-700 px-4 py-3 rounded relative w-1/3 m-auto mb-5 mt-10">Loading...</p>}
      {error && <p className="bg-green-100 border align-middle border-green-400 text-green-700 px-4 py-3 rounded relative w-1/3 m-auto mb-5 mt-10">Error occurred while fetching jobs</p>}
      {scholar.length > 0 && (
        <div className="flex flex-wrap mb-10">
          {scholar.map((scholar, index) => (
            <div className="w-full sm:w-1/3 md:w-1/4 p-4" key={index}>
              <div className="border shadow-md rounded-lg overflow-hidden">
                <img
                  className="w-full h-44 rounded object-cover object-center"
                  src={scholar.Logo}
                  alt="logo"
                />
                <div className="p-4">
                  {scholar.Type === "private" && (
                    <h2 className="font-bold font-serif text-xl mb-1">
                      {scholar.company}
                    </h2>
                  )}
                  <p className="mb-1 font-semibold">{scholar.Title}</p>
                  <p className="mb-1 font-semibold">{scholar.Type}</p>
                  {scholar.Type === "private" && (
                    <p className="font-bold font-serif text-xl mb-1">
                      {scholar.location}
                    </p>
                  )}
                  <p className="mb-2 flex justify-between">
                    <p>Apply Deadline:</p>
                    {new Date(scholar.applyDeadline).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between w-11/12 m-auto  ">
                    <Link to={`/scholar/${scholar._id}`}>
                      <button className="bg-sky-500 text-white w-20 rounded p-1  hover:scale-105 hover:shadow-md transition duration-300 ease-in-out">
                        View
                      </button>
                    </Link>

                    <Link to={scholar.applyLink}>
                      <button className="bg-sky-500 text-white w-20 rounded p-1  hover:scale-105 hover:shadow-md transition duration-300 ease-in-out">
                        Apply
                      </button>
                    </Link>

                    {/* <li key={index}>{scholar.Title}</li>  */}
                    {/* <li key={index}>{scholar.Type}</li>  */}
                    {/* <li key={index}>{scholar.company}</li>  */}
                    {/* <li key={index}>{scholar.Logo}</li>  */}
                    {/* <li key={index}>{scholar.location}</li>  */}
                    {/* <li key={index}>{scholar.eligibility}</li>  */}
                    {/* <li key={index}>{scholar.description}</li>  */}
                    {/* <li key={index}>{scholar.requirement}</li>  */}
                    {/* <li key={index}>{scholar.benefits}</li>  */}
                    {/* <li key={index}>{scholar.process}</li>  */}
                    {/* <li key={index}>{scholar.applyMethod}</li>  */}
                    {/* <li key={index}>{scholar.applyDeadline}</li>  */}
                    {/* <li key={index}>{scholar.applyLink}</li>  */}
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
