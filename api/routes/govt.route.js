import express from 'express';

import { createScheme, getScheme, getSchemeById } from "../controllers/govt.controller.js";

const router = express.Router();


router.post('/createscheme', createScheme);
router.get('/getscheme', getScheme);
router.get('/getscheme/:id', getSchemeById);

export default router;