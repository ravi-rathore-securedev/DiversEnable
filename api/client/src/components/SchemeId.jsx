import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const SchemeId = () => {
    const { govtId } = useParams();
    const [govt, setGovt] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`/api/scheme/getscheme/${govtId}`);
                const data = await response.json();
                setGovt(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchJob();
    }, [govtId]);

    if (!govt) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <div className=" mx-auto mt-8 p-8 shadow-lg rounded-lg">
            <img className=" rounded bg-white w-full h-96 mx-auto mb-4 object-contain" src={govt.Logo} alt="Scheme Logo" />
            <h1 className="text-4xl font-bold  mb-4">{govt.title}</h1>

            <hr className="mb-4" />
            <div className="mb-8">
                <p className="font-semibold text-xl mb-2">Description:</p>
                <p>{govt.description}</p>
            </div>
          
            <div className="mb-8">
                <p className="font-semibold text-xl  mb-2">Eligibility:</p>
                <p>{govt.eligibility}</p>
            </div>

            <div className="mb-8">
                <p className="font-semibold text-xl  mb-2">Benefits:</p>
                <p>{govt.benefits}</p>
            </div>
            <div className="mb-8">
                <p className="font-semibold text-xl  mb-2">How To Apply:</p>
                <p>{govt.applyMethod}</p>
            </div>
            <div className="mb-8">
                <p className="font-semibold text-xl  mb-2">Apply Deadline:</p>
                <p>{new Date(govt.applyDeadline).toDateString()}</p>
            </div>
            <div className="mb-8">
                <Link to={govt.applyLink}>
                    <button className=" bg-sky-500 text-white w-40 rounded p-2">Apply</button>
                </Link>
            </div>
        </div>
    );
};
