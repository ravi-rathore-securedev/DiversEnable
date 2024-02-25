import React, { useState, useEffect } from 'react';
import { Button, Select, TextInput, Textarea } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


const UpdateDetails = () => {
    const [formData, setFormData] = useState({});
    const [details, setDetails] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const { userId } = useParams();

    useEffect(() => {
        // Fetch user details if currentUser is available
        const fetchDetails = async () => {
            try {
                const response = await fetch(`/api/details/getMoreDetailById/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch details');
                }
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error('Error fetching details:', error.message);
            }
        };

        if (userId) {
            fetchDetails();
        }
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/details/createMoreDetail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, userId: currentUser._id }),
            });
            if (!response.ok) {
                throw new Error('Failed to create details');
            }
            const data = await response.json();
            setDetails(data);
            console.log('Details created successfully:', data);
        } catch (error) {
            console.error('Error creating details:', error.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/details/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to update details');
            }
            const data = await response.json();
            setDetails(data);
            console.log('Details updated successfully:', data);
        } catch (error) {
            console.error('Error updating details:', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/details/delete/${currentUser._id}`, {
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



    return (
        <div className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        {details ? (
            <div>
                <p><strong>User Category:</strong> {details.UserInfo}</p>
                <p><strong>Gender:</strong> {details.Gender}</p>
                <p><strong>Age:</strong> {details.Age}</p>
                <p><strong>User Category:</strong> {details.UserInfo}</p>
                <p><strong>Date of Birth:</strong> {details.DateOfBirth}</p>
                <p><strong>Disability:</strong> {details.Disability}</p>
                <p><strong>Disability Type:</strong> {details.DisabilityType}</p>
                <p><strong>Disability Percentage:</strong> {details.DisabilityPercentage}</p>
                <p><strong>Location:</strong> {details.Location}</p>
                <p><strong>Highest Qualification:</strong> {details.Education}</p>
                <p><strong>Experience:</strong> {details.Experience}</p>
                <p><strong>Skills:</strong> {details.Skills}</p>
                <Button
                    type='button'
                    gradientDuoTone='purpleToBlue'
                    className="w-full mt-2"
                    onClick={handleUpdate}
                >
                    Update
                </Button>
                <Button
                    type='button'
                    gradientDuoTone='redToOrange'
                    className="w-full mt-2"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="UserInfo">User Category:</label>
                    <Select
                        id='UserInfo'
                        onChange={handleChange}
                        value={formData.UserInfo || ''}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="uncategorized">Select</option>
                        <option value="Student">Student</option>
                        <option value="College Student">College Student</option>
                        <option value="Working Professional">Working Professional</option>
                    </Select>
                </div>
                {/* Add other form fields similarly */}
                <Button
                    type='submit'
                    gradientDuoTone='purpleToBlue'
                    outline
                    className="w-full"
                >
                    Submit
                </Button>
            </form>
        )}
    </div>
);
};

export default UpdateDetails;
