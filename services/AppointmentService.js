const Appointment = require('../models/Appointment');
const AppointmentFactory = require('../factories/AppointmentFactory');
const mailer = require('nodemailer');

class AppointmentService {

    async create(name, email, description, cpf, date, time) {
        const newAppointment = new Appointment({
            name, email, description, cpf, date, time, finished: false, notified: false
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

    async notify() {
        const transporter = mailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 25,
            auth: {
                user: '12b5927d8da9f5',
                pass: '621eb202b57b7f'
            }
        });
        
        const hour = 1000 * 60 * 60;

        let users = await this.getAll(false);
        users = users.filter(user => !user.notified);
        users.forEach(user => {

            const date = user.start;
            const gap = date - Date.now();

            if (gap <= hour) {
                transporter.sendMail({
                    from: 'Gabriel Rodrigues <gabriel.rodrigues.brito@gmail.com>',
                    to: user.email,
                    subject: 'Lembrete de consulta',
                    text: `Olá, ${user.name}! Sua consulta acontecerá em menos de uma hora.`
                }).then(() => {
                    this.setNotified(user.id);
                }).catch(err => {
                    console.log(err);
                })
            }

        });
    }

    async setNotified(userId) {
        await Appointment.updateOne({_id: userId}, {notified: true});
    }

}

module.exports = new AppointmentService();