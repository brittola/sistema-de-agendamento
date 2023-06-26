const Appointment = require('../models/Appointment');
const AppointmentFactory = require('../factories/AppointmentFactory');

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
            const rawAppointments = await Appointment.find({'finished': false});
            const appointments = [];

            rawAppointments.forEach(appointment => {
                // Trata apenas consultas com data definida
                if (appointment.date && appointment.time) {
                    appointments.push(AppointmentFactory.Build(appointment));
                }
            });

            return appointments;
        }

    }

    async getById(id) {
        try {
            return await Appointment.findOne({'_id': id});
        } catch(err) {
            console.log(err);
        }
    }

    async finish(id) {
        try {
            await Appointment.findByIdAndUpdate(id, {'finished': true});
        } catch(err) {
            console.log(err);
        }
    }

    async search(query) {
        try {
            return await Appointment.find().or([{email: query}, {cpf: query}]);
        } catch(err) {
            console.log(err);
            return undefined;
        }    
    }

}

module.exports = new AppointmentService();