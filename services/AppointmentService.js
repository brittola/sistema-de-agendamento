const Appointment = require('../models/Appointment');

class AppointmentService {

    async create(name, email, description, cpf, date, time) {
        const newAppointment = new Appointment({
            name, email, description, cpf, date, time, finished: false
        });
        
        try {
            await newAppointment.save();
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async getAll(getFinished) {

        if (getFinished) {
            return await Appointment.find();
        } else {
            return await Appointment.find({'finished': false});
        }

    }

}

module.exports = new AppointmentService();