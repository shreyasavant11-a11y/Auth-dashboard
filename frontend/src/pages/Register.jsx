import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)  
    const navigate = useNavigate()

    const handleRegister = async () => {
        if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[!@#$%^&*]/.test(password)
) {
    alert('Password must be at least 8 characters and contain 1 uppercase, 1 lowercase and 1 special character (!@#$%^&*)')
    return
}
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email!')
            return
        }

        setLoading(true)  
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
        const data = await response.json()
        setLoading(false)  

        if (data.message === 'User registered successfully') {
            navigate('/login')
        } else {
            alert(data.error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                />
                <button
                    onClick={handleRegister}
                    disabled={loading}  
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Please wait...' : 'Register'}  
                </button>
            </div>
        </div>
    )
}

export default Register;