import mongoose from 'mongoose';

const govtSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
  }, 
  Logo: {
    type: String,
    default:'https://th.bing.com/th/id/OIP.CeXsxBBem0rhwfYhStS8WgHaHa?w=196&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7' 
},
  description: {
    type: String,
    required: true
},
  benefits: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
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

const Govt = mongoose.model('Govt', govtSchema);

export default Govt;