import express from 'express';
import { createScholar, getScholar, getScholarById } from "../controllers/scholarship.controller.js";

const router = express.Router();


router.post('/createscholar', createScholar);
router.get('/getscholar', getScholar);
router.get('/getscholar/:id', getScholarById);

export default router;