import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = async () => {
        setError('')

        if (
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[!@#$%^&*]/.test(password)
        ) {
            setError('Password must be at least 8 characters and contain 1 uppercase, 1 lowercase and 1 special character (!@#$%^&*)')
            return
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email!')
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
            setError(data.error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">Create Account</h1>
                <p className="text-center text-gray-400 text-sm mb-6">Register to get started</p>

                {error && (
                    <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-2 rounded-lg">{error}</p>
                )}

                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-xl mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-xl mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-xl mb-5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full bg-gray-800 text-white p-3 rounded-xl hover:bg-gray-700 disabled:opacity-50 text-sm font-medium transition"
                >
                    {loading ? 'Please wait...' : 'Register'}
                </button>
                <p className="text-center mt-4 text-sm text-gray-400">
                    Already have an account?{' '}
                    <a href="/login" className="text-gray-700 font-medium hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Register
