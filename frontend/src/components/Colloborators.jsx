// Import React hook for managing component state
import { useState } from "react";

// Import custom Axios API instance for backend requests
import API from "../api/api";

// Collaborator component
// Props received:
// noteId -> ID of the note where collaborator will be added
// refresh -> function to reload notes after adding collaborator
export default function Collaborator({ noteId, refresh }) {

    // State to store collaborator email input
    const [email, setEmail] = useState("");

    // Function to add collaborator
    const addCollaborator = async () => {

        // Validation: check if email field is empty
        if (!email) {
        alert("Enter collaborator email");
        return;
        }

        try {

        // Send POST request to backend to add collaborator
        // Example: /notes/123/collaborator
        await API.post(`/notes/${noteId}/collaborator`, {
            email: email
        });

        // Show success message
        alert("Collaborator added");

        // Clear input field
        setEmail("");

        // Reload notes list to reflect changes
        refresh();

        } catch (error) {

        // Log error in console
        console.log(error);

        // Show error message to user
        alert("Failed to add collaborator");

        }

    };

    return (

        <div className="mt-3">

        {/* Email input field */}
        <input
            className="border p-1 mr-2"
            placeholder="Collaborator email"

            // Controlled input value
            value={email}

            // Update email state when typing
            onChange={(e) => setEmail(e.target.value)}
        />

        {/* Button to add collaborator */}
        <button
            className="bg-purple-500 text-white px-2 py-1"
            onClick={addCollaborator}
        >
            Add
        </button>

        </div>

    );
}