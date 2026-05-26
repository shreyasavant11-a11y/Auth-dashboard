import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const name = localStorage.getItem('name')
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
                <h1 className="text-lg font-bold text-gray-800">Auth Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-gray-800 text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-700 transition"
                >
                    Logout
                </button>
            </nav>

            <div className="flex items-center justify-center mt-24">
                <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-96">
                    <div className="text-4xl mb-4">👋</div>
                    <h2 className="text-2xl font-bold text-gray-800">Welcome, {name}!</h2>
                    <p className="text-gray-400 text-sm mt-2">You are successfully logged in.</p>
                    <div className="mt-6 border-t pt-4">
                        <p className="text-xs text-gray-300">Secured with JWT Authentication</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
