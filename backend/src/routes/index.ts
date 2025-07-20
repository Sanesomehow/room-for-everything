import express, { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
    console.log('Health Check');
    res.json({status: "Backend is running"});
})
