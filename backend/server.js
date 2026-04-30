const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
dotenv.config();

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));  
app.use(express.json());

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Too many attempts, try after 15 minutes' }
})

app.get("/", (req, res) => {
    res.json({ message: "Auth server is running" });
});

app.use('/api/auth/login', loginLimiter);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});