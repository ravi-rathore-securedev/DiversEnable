import React, { useState, useEffect } from 'react';
import { Button, Textarea, TextInput } from 'flowbite-react';
import { useParams } from 'react-router-dom';

const UpdateDetails = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({});
    const [details, setDetails] = useState(null);
    const [redirectToDetails, setRedirectToDetails] = useState(false);
    const { userId } = useParams();

    useEffect(() => {
        // Fetch user details if userId is available
        const fetchDetails = async () => {
            try {
                const response = await fetch(`/api/details/getMoreDetailById/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch details');
                }
                const data = await response.json();
                setDetails(data);
                setFormData(data); // Set formData to details initially
                setSuccessMessage('');
            } catch (error) {
                console.error('Error fetching details:', error.message);
                setSuccessMessage('Something went wrong');
            }
        };

        if (userId) {
            fetchDetails();
        }
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/details/updateMoreDetail/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to update details');
            }
            setSuccessMessage('Details have been updated successfully');
            // Set redirect flag to true
            setRedirectToDetails(true);
        } catch (error) {
            console.error('Error updating details:', error.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold mb-4">Update User Details</h1>
            {successMessage && (
                <div className="bg-green-600 border border-green-600 text-white px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="UserInfo" className="text-gray-300">User Category:</label>
                    <select
                        id="UserInfo"
                        name="UserInfo"
                        value={formData.UserInfo || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 text-white"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Student">Student</option>
                        <option value="College Student">College Student</option>
                        <option value="Working Professional">Working Professional</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="Gender" className="text-gray-300">Gender:</label>
                    <select
                        id="Gender"
                        name="Gender"
                        value={formData.Gender || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 text-white"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="Age" className="text-gray-300">Age:</label>
                    <input
                        type="number"
                        id="Age"
                        name="Age"
                        value={formData.Age || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label htmlFor="DateOfBirth" className="text-gray-300">Date of Birth:</label>
                    <input
                        type="date"
                        id="DateOfBirth"
                        name="DateOfBirth"
                        value={formData.DateOfBirth || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label htmlFor="Disability" className="text-gray-300">Disability:</label>
                    <select
                        id="Disability"
                        name="Disability"
                        value={formData.Disability || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 text-white"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="DisabilityType" className="text-gray-300">Disability Type:</label>
                    <select
                        id="DisabilityType"
                        name="DisabilityType"
                        value={formData.DisabilityType || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 text-white"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Physical">Physical</option>
                        <option value="Mental">Mental</option>
                        <option value="Visual">Visual</option>
                        <option value="Hearing">Hearing</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="DisabilityPercentage" className="text-gray-300">Disability Percentage:</label>
                    <input
                        type="number"
                        id="DisabilityPercentage"
                        name="DisabilityPercentage"
                        value={formData.DisabilityPercentage || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label htmlFor="Location" className="text-gray-300">Location:</label>
                    <input
                        type="text"
                        id="Location"
                        name="Location"
                        value={formData.Location || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label htmlFor="Education">Highest Qualification:</label>
                    <TextInput
                        id='Education'
                        name='Education'
                        type='text'
                        placeholder='Highest Qualification'
                        onChange={handleInputChange}
                       
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="Experience">Experience:</label>
                    <TextInput
                        id='Experience'
                        name='Experience'
                        type='text'
                        placeholder='Experience'
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="Skills">Skills:</label>
                    <Textarea
                        id='Skills'
                        name='Skills'
                        placeholder='Skills'
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <Button
                    type='submit'
                    gradientDuoTone='purpleToBlue'
                    outline
                    className="w-full"
                >
                    Update Details
                </Button>
            </form>
        </div>
    );
};

export default UpdateDetails;
