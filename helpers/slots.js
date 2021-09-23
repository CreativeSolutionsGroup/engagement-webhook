// Created by Spencer Bills
// Runs every 30 seconds and checks.

import cron from "cron";

const checkSlots = async () => {
    cron.job("*/30 * * * * *", () => {
        console.log("done");
    })
}

export default checkSlots