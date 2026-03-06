// Import usestate hook
import { useState } from "react";

// import the custom axios instance already created
import API from "../api/api";

// import usenavigate from react-router-dom
import { useNavigate } from "react-router-dom";

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

        // Send post request to the backend API to register the user with name, email and password
        await API.post("/auth/register", { name, email, password });

        // Show successfull message when form submit successfully
        alert("Registration successful! Please login.");

        // Navigate to login page after successful registration
        navigate("/login");
    };

    // jsx UI for the registration form
    return (

        // Center the form on the page
        <div className="flex justify-center items-center h-screen">

            {/* Form container */}
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow w-80">

                {/* Form title */}
                <h2 className="text-xl mb-4">Register</h2>

                {/* Name input field */}
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)} // update name state on input change
                />

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
                    Register
                </button>
            </form>
        </div>
    );
}