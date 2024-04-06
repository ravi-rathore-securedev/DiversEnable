import { Button, Select, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export const MoreDetails = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({});
    const [newformData, setNewFormData] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    useEffect(() => {
        if (currentUser) {
            setNewFormData({ ...formData, userId: currentUser._id });
        }
    }, [currentUser, formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/details/createMoreDetail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...newformData, ...formData }),
            });

            
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Server error');
            }

            const data = await response.json();
            console.log(data);
            console.log("data added successfully");
            setSuccessMessage('Details have been added successfully');
        } catch (error) {
            console.error('Error:', error.message);
            setSuccessMessage('Something went wrong');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Fill More Details </h1>
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="UserInfo">User Category:</label>
                    <Select
                        id='UserInfo'
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Student">Student</option>
                        <option value="College Student">College Student</option>
                        <option value="Working Professional">Working Professional</option>
                    </Select>
                </div>
                <div>
                    <label htmlFor="Gender">Gender:</label>
                    <Select
                        id='Gender'
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </Select>
                </div>
                <div>
                    <label htmlFor="Age">Age:</label>
                    <TextInput
                        id='Age'
                        type='number'
                        placeholder='Age'
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="DateOfBirth">Date of Birth:</label>
                    <TextInput
                        id='DateOfBirth'
                        type='date'
                        placeholder='Date of Birth'
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="Disability">Disability:</label>
                    <Select
                        id='Disability'
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Select>
                </div>
                <div>
                    <label htmlFor="DisabilityType">Disability Type:</label>
                    <Select
                        id='DisabilityType'
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Physical">Physical</option>
                        <option value="Mental">Mental</option>
                        <option value="Hearing">Hearing</option>
                        <option value="Visual">Visual</option>
                        <option value="Others">Others</option>
                    </Select>
                </div>
                <div>
                    <label htmlFor="DisabilityPercentage">Disability Percentage(%):</label>
                    <TextInput
                        id='DisabilityPercentage'
                        type='number'
                        placeholder='Disability Percentage'
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="Location">Location:</label>
                    <TextInput
                        id='Location'
                        type='text'
                        placeholder='Location'
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="Education">Highest Qualification:</label>
                    <TextInput
                        id='Education'
                        type='text'
                        placeholder='Highest Qualification'
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="Experience">Experience:</label>
                    <TextInput
                        id='Experience'
                        type='text'
                        placeholder='Experience'
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="Skills">Skills:</label>
                    <Textarea
                        id='Skills'
                        placeholder='Skills'
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <Button
                    type='submit'
                    gradientDuoTone='purpleToBlue'
                    outline
                    className="w-full mt-5"
                >
                    Submit
                </Button>
            </form>
            <Link to={`/viewDetails/${newformData.userId}`} className='text-xs text-cyan-600 hover:underline'>
            <Button
                    type='submit'
                    gradientDuoTone='purpleToBlue'
                    outline
                    className="w-full mt-5"
                >
                    View
                </Button>
            </Link>
        </div>
    );
};
