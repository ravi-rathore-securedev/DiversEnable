import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';

export const ViewDetails = () => {
    const { userId } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/details/getMoreDetailById/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch details');
                }
                const data = await response.json();
                // console.log(data);
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



    // const handleUpdate = async () => {
    //     try {
    //         const response = await fetch(`/api/details/updateMoreDetail/${userId}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(details),
    //         });
    //         const data = await response.json();
            
    //         if (!response.ok) {
    //             throw new Error(data.message || 'Failed to update details');
    //         }
            
    //         setDetails(data);
    //         setSuccessMessage('Details have been updated successfully');
    //         console.log('Details updated successfully:', data);
    //     } catch (error) {
    //         console.error('Error updating details:', error.message);
    //     }
    // };
    

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
            setSuccessMessage('Details have been deleted successfully');
        } catch (error) {
            console.error('Error deleting details:', error.message);
        }
    };

    if (loading) {
        return <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-1/3 align-middle m-auto mb-5 mt-10">Loading...</p>;
    }

    if (error) {
        return <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-1/3 align-middle m-auto mb-5 mt-10">Error: {error}</p>;
    }

    if (!details) {
        return <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-1/3 align-middle m-auto mb-5 mt-10">No details found for this user.</p>;
    }

    return (
        <div className="max-w-3xl mt-2 m-auto p-4 border shadow-md rounded-md mb-5">
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
            <div className="mb-5 text-center ">
                <p className="text-lg font-semibold">User Details</p>
                <hr className="my-2" />
            </div>
            <div className="space-y-2 ">
                <div className=' flex justify-around border-b-2 border-dotted mb-2'>
                    <p className="font-bold ">User Category:</p>
                        <p>{details[0].UserInfo}</p>
                    
                </div>
                <div className=' flex justify-around border-b-2 border-dotted mb-2'>
                    <p className="font-bold ">Gender:</p>
                 
                  
                        <p>{details[0].Gender}</p>
                 
                </div>
                <div className=' flex justify-around border-b-2 border-dotted mb-2'>
                    <p className="font-bold ">Age:</p>
                  
                   
              
                        <p>{details[0].Age}</p>
                 
                </div>
                <div className=' flex justify-around border-b-2 border-dotted mb-2'>
                    <p className="font-bold  ">Date of Birth:</p>
                  
                     
                  
                        <p>{new Date(details[0].DateOfBirth).toLocaleDateString()}</p>
                  
                </div>
                <div className=' flex justify-around border-b-2 border-dotted mb-2'>
                    <p className="font-bold ">Disability:</p>
                 
                        <p>{details[0].Disability}</p>
                 
                </div>
                <div className=' flex justify-around border-b-2 border-dotted mb-2'>
                    <p className="font-bold ">Disability Type:</p>
                     
                      <p>{details[0].DisabilityType}</p>
                  
                </div>
                <div className=' flex justify-around border-b-2 border-dotted mb-2'>
                    <p className="font-bold ">Disability Percentage:</p>
                      
                        <p>{details[0].DisabilityPercentage}%</p>
                 
                </div>
                <div className=' flex justify-around border-b-2 border-dotted mb-2'>
                    <p className="font-bold ">Location:</p>
                      
                       <p>{details[0].Location}</p>
                  
                </div>
            </div>
            <div className="mt-4 flex justify-between m-auto">
                  <Link to={`updateDetails/${userId}`}>
                    <Button
                        type='button'
                        gradientDuoTone='purpleToBlue'
                        className=" w-48"
                       
                    >
                        Update
                    </Button>
                    </Link>
               
              
                    <Button
                        type='button'
                        gradientDuoTone='purpleToBlue'
                        className="w-1/3 "
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
             
            </div>
        </div>
    );
};
