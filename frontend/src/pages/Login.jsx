// Import usestate hook
import { useState } from "react";

// import the custom axios instance already created
import API from "../api/api";

// import usenavigate from react-router-dom
import { useNavigate, Link } from "react-router-dom";

// register the component
export default function Login() {

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

            // Send login request to the backend API with email and password
            const res = await API.post("/auth/login", { email, password });

            // Store the Jwt token returned from backend in local storage for authenticated requests
            localStorage.setItem("token", res.data.token);

            // Show successfull message when login successfully
            alert("Login successful!");
            
            // Navigate to home page after successful login
            navigate("/");
        // eslint-disable-next-line no-unused-vars
        } catch (error) {

            // show error message to user if login fails
            alert("Login failed. Invalid email or password.");
        }
        
    };

    // jsx UI for the login form
    return (

        // Center the form on the page
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

            {/* Form container */}
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl space-y-6">

                {/* Form title */}
                <h2 className="text-3xl font-bold text-center text-gray-800">Welcome</h2>
                
                {/* Email input field */}
                <div className="flex flex-col gap-2">

                    <label className="text-sm font-medium text-gray-600">Enter email</label>
                    <input
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Enter your email"
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
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)} // update password state on input change
                        required
                    />
                </div>

                {/* Submit button */}
                <button type="submit" className="w-700 bg-blue-600 items-center text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200">
                    Login
                </button>

                {/* Link to registration page */}
                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}