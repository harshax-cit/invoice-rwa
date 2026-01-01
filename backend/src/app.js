import express from "express";
import cors from "cors";
import invoiceRoutes from "./routes/invoice.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/invoices", invoiceRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

export default app;
