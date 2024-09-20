const Car = require('../models/carModel');

exports.createCar = async (req, res) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json({ success: true, data: car });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json({ success: true, data: cars });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: car });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.status(204).json({ success: true, data: null });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getCarsJSON = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
