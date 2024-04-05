
import MoreDetails from "../models/MoreDetails.model.js";

export const createMoreDetail = async (req, res) => {
  try {
    const { Gender, Age, DisabilityType, DateOfBirth, Disability, DisabilityPercentage, UserInfo, Location, Education, Experience, Skills, userId } = req.body;
    // console.log(req.body)
    
    if (!Age || !Gender || !DateOfBirth || !Disability || !UserInfo || !Location ) {
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
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const { Gender, Age, DisabilityType, DateOfBirth, Disability, DisabilityPercentage, UserInfo, Location, Education, Experience, Skills } = req.body;

    // Find the document by userId and update it
    const updatedMoreDetail = await MoreDetails.findOneAndUpdate(
      { userId }, // Find document by userId
      { Gender, Age, DisabilityType, DateOfBirth, Disability, DisabilityPercentage, UserInfo, Location, Education, Experience, Skills },
      { new: true } // Return the updated document
    );

    if (!updatedMoreDetail) {
      return res.status(404).json({ error: 'MoreDetail not found' });
    }

    res.json(updatedMoreDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'something went wrong' });
  }
};



// Delete a MoreDetail by ID
 export const deleteMoreDetail = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log(userId);
    const deletedMoreDetail = await MoreDetails.findOneAndDelete({ userId });
    if (!deletedMoreDetail) {
      return res.status(404).json({ error: 'MoreDetail not found' });
    }
    res.json({ message: 'MoreDetail deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'something went wrong' });
  }
};


