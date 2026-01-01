import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    msmeName: String,
    buyerName: String,
    amount: Number,
    dueDate: Date,
    risk: String,
    yieldPercent: Number,
    status: {
      type: String,
      default: "Minted"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
