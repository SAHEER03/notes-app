// Import usestate hook
import { useState } from "react";

// import the custom axios instance already created
import API from "../api/api";

// import usenavigate from react-router-dom
import { useNavigate, Link } from "react-router-dom";

// register the component
export default function Register() {

    // State to store the name input value
    const [name, setName] = useState("");

    // State to store the email input value
    const [email, setEmail] = useState("");

    // State to store the password input value
    const [password, setPassword] = useState("");

    // Hook used to navigate to pages
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {

        // Prevent the page from refreshing when form submitted
        e.preventDefault();

        try {

            // Send post request to the backend API to register the user with name, email and password
            await API.post("/auth/register", { name, email, password });

            // Show successfull message when form submit successfully
            alert("Registration successful! Please login.");

            // Navigate to login page after successful registration
            navigate("/login");
        // eslint-disable-next-line no-unused-vars
        } catch (error) {

            // show error message to user if registration fails
            alert("Registration failed. Please try again.");
        }
        
    };

    // jsx UI for the registration form
    return (

        // Center the form on the page
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

            {/* Form container */}
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl space-y-6">

                {/* Form title */}
                <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>

                {/* Name input field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-600">
                        Full Name
                    </label>
                    <input
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        placeholder="Enter your full name"
                        onChange={(e) => setName(e.target.value)} // update name state on input change
                        required
                    />
                </div>

                {/* Email input field */}
                <div className="flex flex-col gap-2">
                    <label  className="text-sm font-medium text-gray-600">
                        Enter email address
                    </label>
                    <input
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        placeholder="Enter valid email"
                        onChange={(e) => setEmail(e.target.value)} // update email state on input change
                        required
                    />
                </div>

                {/* Password input field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-600">
                        Enter password
                    </label>
                    <input
                        type="password"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        placeholder="Create a password"
                        onChange={(e) => setPassword(e.target.value)} // update password state on input change
                    />
                </div>

                {/* Submit button */}
                <button type="submit" className="w-800 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-200">
                    Register
                </button>

                {/* Link to login page */}
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}