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
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">Auth Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </nav>
            <div className="flex items-center justify-center mt-20">
                <div className="bg-white p-10 rounded-lg shadow-md text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome, {name}! 👋
                    </h2>
                    <p className="text-gray-500 mt-2">
                        You are successfully logged in.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;