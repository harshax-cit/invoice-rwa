import express from "express";
import {
  createInvoice,
  getInvoices
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.post("/", createInvoice);
router.get("/", getInvoices);

export default router;
