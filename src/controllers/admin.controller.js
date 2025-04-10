import Admin from "../models/Admin.js";
import { logger } from "../utils/logger.js";


export const getAdmin = async (req, res) => {
    try {

        const admin = await Admin.find();
        res.status(200).json(admin);

    } catch (error) {
        logger.error(`Error getting admin: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}


export const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        res.status(200).json(admin);
    } catch (error) {
        logger.error(`Error getting admin: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }

}


export const createAdmin = async (req, res) => {
    try {
        const admin = await Admin.create(req.body);
        res.status(201).json(admin);
    } catch (error) {
        logger.error(`Error creating admin: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }

}


export const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(admin);
    } catch (error) {
        logger.error(`Error updating admin: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }

}


export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findByIdAndDelete(id);
        res.status(200).json({ message: 'Admin deleted successfully', admin });
    } catch (error) {
        logger.error(`Error deleting admin: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}   