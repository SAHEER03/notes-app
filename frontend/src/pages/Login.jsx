// Import usestate hook
import { useState } from "react";

// import the custom axios instance already created
import API from "../api/api";

// import usenavigate from react-router-dom
import { useNavigate } from "react-router-dom";

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

        // Send login request to the backend API with email and password
        const response = await API.post("/auth/login", { email, password });

        // Store the Jwt token returned from backend in local storage for authenticated requests
        localStorage.setItem("token", response.data.token);

        // Show successfull message when login successfully
        alert("Login successful!");
        
        // Navigate to home page after successful login
        navigate("/");
    };

    // jsx UI for the login form
    return (

        // Center the form on the page
        <div className="flex justify-center items-center h-screen">

            {/* Form container */}
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow w-80">

                {/* Form title */}
                <h2 className="text-xl mb-4">Login</h2>
                
                {/* Email input field */}
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} // update email state on input change
                />
                
                {/* Password input field */}
                <input
                    type="password"
                    className="border p-2 w-full mb-4"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} // update password state on input change
                />

                {/* Submit button */}
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">
                    Login
                </button>
            </form>
        </div>
    );
}