import cron from "node-cron";
import { checkLeaseRenewals } from "./controllers/leaseController.js";

// Schedule to check lease renewals daily at 8 AM
cron.schedule("0 8 * * *", () => {
  console.log("Checking for lease renewals...");
  checkLeaseRenewals();
});
