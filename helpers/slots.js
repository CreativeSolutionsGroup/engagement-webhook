// Created by Spencer Bills
// Runs every 30 seconds and checks.

import cron from "cron";

const checkSlots = async () => {
    const job = new cron.CronJob("*/30 * * * * *", () => {
        console.log("done");
    });

    job.start();
}

export default checkSlots