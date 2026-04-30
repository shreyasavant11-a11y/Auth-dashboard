const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' })
        }
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' })
        }

        const { rows } = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error.message);  // ✅ fixed
        res.status(500).json({ error: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const { rows } = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });  // ✅ fixed
        }

        const isMatch = await bcrypt.compare(password, rows[0].password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });  // ✅ fixed
        }

        const token = jwt.sign(
            { id: rows[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: rows[0].id,
                name: rows[0].name,
                email: rows[0].email
            }
        });

    } catch (error) {
        console.error(error.message);  // ✅ fixed
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { register, login };