import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';

export const ViewDetails = () => {
    const { userId } = useParams();
    const [details, setDetails] = useState(null); // Change initial state to null
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false); 

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/details/getMoreDetailById/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch details');
                }
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchDetails();
        }
    }, [userId]);


    const handleToggle = () => {
        setEditMode(!editMode); // Toggle edit mode
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };


    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/details/updateMoreDetail/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            });
            if (!response.ok) {
                throw new Error('Failed to update details');
            }
            const data = await response.json();
            setDetails(data);
            // toggleEditMode(); 
            setEditMode(!editMode); 
            console.log('Details updated successfully:', data);
        } catch (error) {
            console.error('Error updating details:', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/details/deleteMoreDetail/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete details');
            }
            setDetails(null);
            console.log('Details deleted successfully');
        } catch (error) {
            console.error('Error deleting details:', error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    // Check if details is still null
    if (details === null) {
        return null; // or you can return a loading indicator
    }

    return (
        <div className="max-w-3xl mt-2 m-auto p-4 border shadow-md rounded-md mb-5">
            <div className="mb-5 text-center ">
                <p className="text-lg font-semibold">User Details</p>
                <hr className="my-2" />
            </div>
            <div className="space-y-2">
                <div>
                    <p className="font-bold border-b-2 border-dotted mb-2 ">User Category:</p>
                    {editMode ? (
                        // <input
                        //     type="text"
                        //     name="UserInfo"
                        //     value={details.UserInfo}
                        //     onChange={handleInputChange}
                        //     className="border border-gray-400 rounded-md p-1"
                        // />

                        <select
                        id='UserInfo'
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Student">Student</option>
                        <option value="College Student">College Student</option>
                        <option value="Working Professional">Working Professional</option>
                    </select>
                    ) : (
                    <p>{details[0].UserInfo}</p>
                    )}
                </div>
                <div>
                    
                    <p className="font-bold border-b-2 border-dotted mb-2 ">Gender:</p>
                    {editMode ? (
                        // <input
                        //     type="text"
                        //     name="Gender"
                        //     value={details.Gender}
                        //     onChange={handleInputChange}
                        //     className="border border-gray-400 rounded-md p-1"
                        // />
                        <select
                        id='Gender'
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                    ) : (
                    <p>{details[0].Gender}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold border-dotted  border-b-2 mb-2 ">Age:</p>
                {editMode ? (
                        <input
                            type="number"
                            name="Age"
                            value={details.Age}
                            onChange={handleInputChange}
                            className="border border-gray-400 rounded-md p-1"
                        />
                    ) : (
                    <p>{details[0].Age}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold border-dotted border-b-2 mb-2 ">Date of Birth:</p>
                    {editMode ? (
                        <input
                            type="date"
                            name="DateOfBirth"
                            value={details.DateOfBirth}
                            onChange={handleInputChange}
                            className="border border-gray-400 rounded-md p-1"
                        />
                    ) : (
                    <p>{new Date(details[0].DateOfBirth).toLocaleDateString()}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold  border-dotted border-b-2 mb-2">Disability:</p>
                    {editMode ? (
                        // <input
                        //     type="text"
                        //     name="Disability"
                        //     value={details.Disability}
                        //     onChange={handleInputChange}
                        //     className="border border-gray-400 rounded-md p-1"
                        // />
                        <select
                        id='Disability'
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    ) : (
                    <p>{details[0].Disability}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold border-dotted border-b-2 mb-2">Disability Type:</p>
                    {editMode ? (
                        // <input
                        //     type="text"
                        //     name="DisabilityType"
                        //     value={details.DisabilityType}
                        //     onChange={handleInputChange}
                        //     className="border border-gray-400 rounded-md p-1"
                        // />
                        <select
                        id='DisabilityType'
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Physical">Physical</option>
                        <option value="Mental">Mental</option>
                        <option value="Hearing">Hearing</option>
                        <option value="Visual">Visual</option>
                        <option value="Others">Others</option>
                    </select>
                    ) : (
                    <p>{details[0].DisabilityType}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold border-dotted border-b-2 mb-2">Disability Percentage:</p>
                    {editMode ? (
                        <input
                            type="number"
                            name="DisabilityPercentage"
                            value={details.DisabilityPercentage}
                            onChange={handleInputChange}
                            className="border border-gray-400 rounded-md p-1"
                        />
                    ) : (
                    <p>{details[0].DisabilityPercentage}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold border-dotted border-b-2 mb-2">Location:</p>
                    {editMode ? (
                        <input
                            type="text"
                            name="Location"
                            value={details.Location}
                            onChange={handleInputChange}
                            className="border border-gray-400 rounded-md p-1"
                        />
                    ) : (
                    <p>{details[0].Location}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold border-dotted border-b-2 mb-2">Highest Qualification:</p>
                    {editMode ? (
                        <input
                            type="text"
                            name="Education"
                            value={details.Education}
                            onChange={handleInputChange}
                            className="border border-gray-400 rounded-md p-1"
                        />
                    ) : (
                    <p>{details[0].Education}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold border-dotted border-b-2 mb-2">Experience:</p>
                    {editMode ? (
                        <input
                            type="text"
                            name="UserInfo"
                            value={details.Experience}
                            onChange={handleInputChange}
                            className="border border-gray-400 rounded-md p-1"
                        />
                    ) : (
                    <p>{details[0].Experience}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold border-dotted border-b-2 mb-2">Skills:</p>
                    {editMode ? (
                        <input
                            type="text"
                            name="Skills"
                            value={details.Skills}
                            onChange={handleInputChange}
                            className="border border-gray-400 rounded-md p-1"
                        />
                    ) : (
                    <p>{details[0].Skills}</p>
                    )}
                </div>
            </div>
            <div className="mt-4 flex justify-between m-auto">
            {!editMode ?(<Button
                    type='button'
                    gradientDuoTone='purpleToBlue'
                    className="w-1/3"
                    onClick={handleToggle}
                >
                    Update
                </Button>):(
                    <Button
                    type='button'
                    gradientDuoTone='purpleToBlue'
                    className="w-1/3"
                    onClick={handleUpdate}
                >
                    Update
                </Button>
                )}
               {!editMode && 
                <Button
                    type='button'
                    gradientDuoTone='purpleToBlue'
                    className="w-1/3 "
                    onClick={handleDelete}
                >
                    Delete
                </Button> }
            </div>
        </div>
    );
};
