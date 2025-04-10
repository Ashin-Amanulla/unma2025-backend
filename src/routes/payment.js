import express from 'express';
import razorpayInstance from '../utils/razorpay.js';


const router = express.Router();

// Endpoint to create an order
router.post('/create-order', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const options = {
            amount: amount * 100, // Convert amount to smallest currency unit
            currency: currency || 'INR',
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating RazorPay order');
    }
});

router.post('/verify-payment', async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    try {
        const payment = await razorpayInstance.payments.fetch(razorpay_payment_id);
        console.log(payment);
        res.status(200).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verifying RazorPay payment');
    }
});



export default router;