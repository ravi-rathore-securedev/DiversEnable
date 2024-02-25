import express from "express";
import { createJob, getJobById, getJobs } from "../controllers/job.controller.js";

const router = express.Router();


router.post('/createjob', createJob);
router.get('/getjobs', getJobs);
router.get('/getjob/:id', getJobById);

export default router;