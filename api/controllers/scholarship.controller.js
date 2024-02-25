import Scholarship from '../models/scholarship.model.js';

// Create a new job
export const createScholar = async (req, res) => {
  try {
    const { Title, Type, company, Logo, location, description, requirement, eligibility,benefits, process, applyMethod, applyDeadline, applyLink } = req.body;

    if (!Title || !Type || !eligibility || !location || !description || !requirement  || !applyLink || !benefits || !process) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const newScholarship = new Scholarship({ Title, Type, company, Logo, location, description, requirement, eligibility,benefits, process, applyMethod, applyDeadline, applyLink });

    const savedScholar = await newScholarship.save();
    res.status(201).json(savedScholar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all jobs
export const getScholar = async (req, res) => {
  try {
    const Scholarships = await Scholarship.find();
    res.status(200).json(Scholarships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getScholarById = async (req, res) => {
  try {
    const ScholarshipbyId = await Scholarship.findById(req.params.id);
    if (!ScholarshipbyId) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }
    res.status(200).json(ScholarshipbyId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







// Delete a job
// export const deleteJob = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Job.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Job deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Update a job
// export const updateJob = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description } = req.body;
//     const updatedJob = await Job.findByIdAndUpdate(id, { title, description }, { new: true });
//     res.status(200).json(updatedJob);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
