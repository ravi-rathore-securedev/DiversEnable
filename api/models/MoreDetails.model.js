import mongoose from 'mongoose';
// import { required } from 'nodemon/lib/config';
// import { required } from 'nodemon/lib/config';

const moreDetailsSchema = new mongoose.Schema({
    Gender:{
        type: String,
        required: true
    },
    Age:{
        type: Number,
        required:true
    },
    userId: {
        type: String
      },
    DateOfBirth:{
        type: Date,
        required:true
    },
    Disability:{
        type: String,
        required:true
    },
    DisabilityType:{
        type: String,
      
    },
    DisabilityPercentage:{
        type: Number,
        required:true 
    },
    UserInfo:{
       type: String,
       required:true
    },
    Location:{
        type: String,
        required: true
    },
    Education:{
        type: String,
        required: true
    },
    Experience:{
        type: String,
        required: true
    },
    Skills:{
        type: String,
        required: true
    },
}, {timestamps: true });
const MoreDetails = mongoose.model('MoreDetails', moreDetailsSchema);

export default MoreDetails;