import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  companyLogo: {
    type: String,
    default: 'https://th.bing.com/th/id/OIP.CeXsxBBem0rhwfYhStS8WgHaHa?w=196&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7' 
},
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
},
  requirement: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
  },
  applyDeadline: {
    type: Date,
    required: true
  },
  applyLink: {
    type: String,
    required: true
  }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;