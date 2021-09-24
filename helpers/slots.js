// Created by Spencer Bills
// Schedules a CronJob that notifies the user that their event is soon.

import cron from "cron";
import Axios from "axios";

const MS_PER_MINUTE = 60000;

var alreadyRegistered = [];

export const registerSlotManager = () => {
    scheduleSlots();
    setInterval(scheduleSlots, 1 * MS_PER_MINUTE);
}

const scheduleSlots = async () => {
    const slotResponse = await Axios.get(`${process.env.API_URL}/api/slots`);
    const dates = slotResponse.data.data;

    for (let date of dates) {
        if (alreadyRegistered.includes(date._id)) {
            continue;
        }

        alreadyRegistered.push(date._id);

        const thirtyEarlier = new Date(Date.parse(date.hide_time) - 30 * MS_PER_MINUTE);
        if (thirtyEarlier.getMilliseconds() > Date.now()) {
            const job = new cron.CronJob(thirtyEarlier, () => {
                console.log("done");
            });
            job.start();
        }
    }
}
