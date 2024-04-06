import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const ScholarId = () => {
    const { scholarId } = useParams();
    const [scholar, setScholar] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`/api/scholar/getscholar/${scholarId}`);
                const data = await response.json();
                setScholar(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchJob();
    }, [scholarId]);

    if (!scholar) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <div className=" mx-auto mt-8 p-8 shadow-lg rounded-lg">
            <img className=" rounded bg-white w-full h-96 mx-auto mb-4 object-contain" src={scholar.Logo} alt="Scholar Logo" />
            <h1 className="text-4xl font-bold text-center mb-4">{scholar.company}</h1>
            <p className="text-xl font-semibold mb-2">{scholar.Title}</p>
            <div className="flex justify-between text-gray-600 text-lg mb-4">
                <p>{scholar.Type}</p>
                <p>{scholar.location}</p>
            </div>
            <hr className="mb-4" />
            <div className="mb-8">
                <p className="font-semibold text-xl mb-2">Description:</p>
                <p>{scholar.description}</p>
            </div>
            <div className="mb-8">
                <p className="font-semibold text-xl  mb-2">Eligibility:</p>
                <p>{scholar.eligibility}</p>
            </div>
            <div className="mb-8">
                <p className="font-semibold text-xl mb-2">Requirements:</p>
                <p>{scholar.requirement}</p>
            </div>
            <div className="mb-8">
                <p className="font-semibold text-xl  mb-2">Benefits:</p>
                <p>{scholar.benefits}</p>
            </div>
            <div className="mb-8">
                <p className="font-semibold text-xl  mb-2">Application Process:</p>
                <p>{scholar.process}</p>
            </div>
            <div className="mb-8">
                <p className="font-semibold text-xl  mb-2">How To Apply:</p>
                <p>{scholar.applyMethod}</p>
            </div>
            <div className="mb-8">
                <p className="font-semibold text-xl  mb-2">Apply Deadline:</p>
                <p>{new Date(scholar.applyDeadline).toDateString()}</p>
            </div>
            <div className="mb-8 ">
                <Link to={scholar.applyLink}>
                    <button className=" bg-sky-500 text-white w-40 rounded p-2 ">Apply</button>
                </Link>
            </div>
        </div>
    );
};
