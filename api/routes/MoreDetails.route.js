import express from "express";
import { createMoreDetail, deleteMoreDetail, getAllMoreDetails, getMoreDetailById, updateMoreDetail } from "../controllers/MoreDetails.controller.js";

const router = express.Router();

router.post("/createMoreDetail", createMoreDetail);
router.get("/getAllMoreDetail", getAllMoreDetails);
router.get("/getMoreDetailById/:userId", getMoreDetailById);
router.put("/updateMoreDetail/:userId", updateMoreDetail);
router.delete("/deleteMoreDetail/:userId", deleteMoreDetail);

export default router;