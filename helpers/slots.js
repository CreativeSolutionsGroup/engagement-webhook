// Created by Spencer Bills
// Schedules a CronJob that notifies the user that their event is soon.

import cron from "cron";
import Axios from "axios";
import AWS from "aws-sdk";

const documentClient = new AWS.DynamoDB.DocumentClient()

const MS_PER_MINUTE = 60000;

var alreadyRegistered = [];

export const registerSlotManager = async () => {
    scheduleSlots();
    setInterval(scheduleSlots, 1 * MS_PER_MINUTE);
}

const getSlot = async (slot) => {
    const ticketResponse = await Axios.get(`${process.env.API_URL}/api/slots/${slot._id}/tickets`);
    const studentIds = ticketResponse.data.map(ticket => ticket.student_id);


}

const scheduleSlots = async () => {
    // get all the slots.
    const slotResponse = await Axios.get(`${process.env.API_URL}/api/slots`);
    const slots = slotResponse.data.data;

    const filteredSlots = slots.filter(s => !alreadyRegistered.includes(s._id));

    for (let slot of filteredSlots) {
        getSlot(slot);
        // Push the slot to the "unique id" register.
        alreadyRegistered.push(slot._id);

        // Gets the date thirty minutes earlier, then schedules the task.
        const thirtyEarlier = new Date(Date.parse(slot.hide_time) - 30 * MS_PER_MINUTE);
        if (thirtyEarlier.getMilliseconds() > Date.now()) {
            const job = new cron.CronJob(thirtyEarlier, () => {
                console.log("done");
                getSlot(slot);
            });
            job.start();
        }
    }
}
