// Created by Spencer Bills
// Runs every 30 seconds and checks.

import cron from "cron";
import Axios from "axios";

const MS_PER_MINUTE = 60000;

const registerSlotManager = async () => {
    const slotResponse = await Axios.get("https://api.cusmartevents.com/api/slots");
    const dates = slotResponse.data.data;

    for (let date of dates) {
        const thirtyEarlier = new Date(Date.parse(date.hide_time) - 30 * MS_PER_MINUTE);
        const job = new cron.CronJob(thirtyEarlier, () => {
            console.log("done");
        });

        job.start();
    }
    
}

export default registerSlotManager;