import mongoose from 'mongoose';

const ScholarshipSchema = new mongoose.Schema({
  
  Title: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  company: {
    type: String,
  },
  Logo: {
    type: String,
    default: 'https://th.bing.com/th/id/OIP.CeXsxBBem0rhwfYhStS8WgHaHa?w=196&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7' 
},
  location: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
},
  requirement: {
    type: String,
  },
  benefits: {
    type: String,
    required: true
  },
  process: {
    type: String,
    required: true
},
applyMethod: {
    type: String,
  },
  applyDeadline: {
    type: Date,

  },
  applyLink: {
    type: String,
    required: true
  }
});

const Scholarship = mongoose.model('Scholarship', ScholarshipSchema);

export default Scholarship;