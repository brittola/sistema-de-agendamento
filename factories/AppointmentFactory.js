class AppointmentFactory {

    Build(rawAppointment) {

        const day = rawAppointment.date.getUTCDate();
        const month = rawAppointment.date.getUTCMonth();
        const year = rawAppointment.date.getUTCFullYear();

        const hour = parseInt(rawAppointment.time.split(':')[0]);
        const minutes = parseInt(rawAppointment.time.split(':')[1]);

        const start = new Date(year, month, day, hour, minutes, 0, 0);

        const appointment = {
            id: rawAppointment._id,
            title: rawAppointment.name + " - " + rawAppointment.description,
            start,
            end: start,
            notified: rawAppointment.notified,
            name: rawAppointment.name,
            email: rawAppointment.email
        }

        return appointment;
    }

}

module.exports = new AppointmentFactory();