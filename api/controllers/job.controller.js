import Job from '../models/job.model.js';

// Create a new job
export const createJob = async (req, res) => {
  try {
    const { jobTitle, jobType, company, companyLogo, location, description, requirement, eligibility, applyDeadline, applyLink } = req.body;

    if (!jobTitle || !jobType || !company || !location || !description || !requirement || !applyDeadline || !applyLink) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const newJob = new Job({ jobTitle, jobType, company, companyLogo, location, description, requirement, eligibility, applyDeadline, applyLink });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
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
