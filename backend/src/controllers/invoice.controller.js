import Invoice from "../models/Invoice.js";
import { scoreInvoice } from "../utils/riskScoring.js";

export const createInvoice = async (req, res) => {
  const { msmeName, buyerName, amount, dueDate } = req.body;

  const days =
    (new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24);

  const riskData = scoreInvoice(amount, days);

  const invoice = await Invoice.create({
    msmeName,
    buyerName,
    amount,
    dueDate,
    risk: riskData.risk,
    yieldPercent: riskData.yield
  });

  res.json(invoice);
};

export const getInvoices = async (_, res) => {
  res.json(await Invoice.find());
};
