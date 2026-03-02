import { Router } from "express";
import { importExcel } from "../controllers/importExcel.controller.js";

const router = Router();

router.post("/", importExcel);

export default router;
