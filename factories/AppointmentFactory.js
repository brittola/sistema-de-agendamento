class AppointmentFactory {

    Build(rawAppointment) {

        const day = rawAppointment.date.getDate();
        const month = rawAppointment.date.getMonth();
        const year = rawAppointment.date.getFullYear();

        const hour = parseInt(rawAppointment.time.split(':')[0]);
        const minutes = parseInt(rawAppointment.time.split(':')[1]);

        const start = new Date(year, month, day, hour, minutes, 0, 0);
        // Corrigindo horário para horário brasileiro
        start.setHours(start.getHours() - 3);

        const appointment = {
            id: rawAppointment._id,
            title: rawAppointment.name + " - " + rawAppointment.description,
            start,
            end: start
        }

        return appointment;
    }

}

module.exports = new AppointmentFactory();