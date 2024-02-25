// import MoreDetail from '../models/MoreDetail.model.js';

import MoreDetails from "../models/MoreDetails.model.js";

// Create a new MoreDetail
// export const createMoreDetail = async (req, res) => {
//   try {
//     const { Gender,Age, DisabilityType,  DateOfBirth, Disability, DisabilityPercentage, UserInfo, Location, Education, Experience, Skills } = req.body;
//     console.log(req.body)
    
//     if (!Age || !Gender || !DateOfBirth || !Disability || !DisabilityType || !UserInfo || !Location ) {
//       return res.status(400).json({ error: 'All Fields are required' });
//     }

//     const newMoreDetail = new MoreDetails({ Gender,Age, DisabilityType, DateOfBirth, Disability, DisabilityPercentage, UserInfo, Location, Education, Experience, Skills });
//     const savedMoreDetail = await newMoreDetail.save();
//     res.status(201).json(savedMoreDetail);
//   } catch (error) {
//     res.status(500).json({ error: 'Error while creating more details' });
//   }
// };
// Create a new MoreDetail

export const createMoreDetail = async (req, res) => {
  try {
    const { Gender, Age, DisabilityType, DateOfBirth, Disability, DisabilityPercentage, UserInfo, Location, Education, Experience, Skills, userId } = req.body;
    
    if (!Age || !Gender || !DateOfBirth || !Disability || !DisabilityType || !UserInfo || !Location ) {
      return res.status(400).json({ error: 'All Fields are required' });
    }

    const newMoreDetail = new MoreDetails({ Gender, Age, DisabilityType, DateOfBirth, Disability, DisabilityPercentage, UserInfo, Location, Education, Experience, Skills, userId});
    const savedMoreDetail = await newMoreDetail.save();
    res.status(201).json(savedMoreDetail);
  } catch (error) {
    res.status(500).json({ error: 'Error while creating more details' });
  }
};


// Get all MoreDetails
export const getAllMoreDetails = async (req, res) => {
  try {
    const moreDetails = await MoreDetails.find();
    res.json(moreDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching all details' });
  }
};

// Get a single MoreDetail by ID
// export const getMoreDetailById = async (req, res) => {
//   try {
//     const moreDetail = await MoreDetails.findById(req.params.id);
//     if (!moreDetail) {
//       return res.status(404).json({ error: 'More Details not found' });
//     }
//     res.json(moreDetail);
//   } catch (error) {
//     res.status(500).json({ error: 'error while finding more details' });
//   }
// };

export const getMoreDetailById = async (req, res) => {
  try {
    const { userId } = req.params;
    const moreDetails = await MoreDetails.find({ userId });
    if (!moreDetails || moreDetails.length === 0) {
      return res.status(404).json({ error: 'No More Details found for the provided userId' });
    }
    res.json(moreDetails);
  } catch (error) {
    console.error('Error fetching more details by userId:', error.message);
    res.status(500).json({ error: 'Error fetching more details by userId' });
  }
};


// Update a MoreDetail by ID
export const updateMoreDetail = async (req, res) => {
  try {
    const { userId } = req.params;
    const { Gender,Age, DisabilityType, DateOfBirth, Disability, DisabilityPercentage, UserInfo, Location, Education, Experience, Skills } = req.body;
    const updatedMoreDetail = await MoreDetails.findByIdAndUpdate(
      { userId },
      { Gender,Age, description, DateOfBirth, Disability, DisabilityPercentage, UserInfo, Location, Education, Experience, Skills },
      { new: true }
    );
    if (!updatedMoreDetail) {
      return res.status(404).json({ error: 'MoreDetail not found' });
    }
    res.json(updatedMoreDetail);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a MoreDetail by ID
 export const deleteMoreDetail = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedMoreDetail = await MoreDetails.findByIdAndDelete({ userId });
    if (!deletedMoreDetail) {
      return res.status(404).json({ error: 'MoreDetail not found' });
    }
    res.json({ message: 'MoreDetail deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


