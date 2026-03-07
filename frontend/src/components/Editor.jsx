// import react hooks
import { useState } from "react";

// Import ReactQuill component for rich text editing
import ReactQuill from "react-quill-new";

// import ReactQuill styles
import "react-quill-new/dist/quill.snow.css";

// Import API instance
import API from "../api/api";

// Editor component for creating and editing notes
export default function Editor({ refresh }) {

    // State to store note title
    const [title, setTitle] = useState("");

    // State to store note content
    const [content, setContent] = useState("");

    // Function to create a new note
    const createNote = async () => {

        // Validate if content or titke is empty
        if (!title || !content) {
            alert("Please enter title and content. Title and content cannot be empty");
            return;
        }

        try {

            // Send post request to the backend API to create a new note
            await API.post("/notes", { 
                title, 
                content 
            });

            // clear the input fields after saving
            setTitle("");
            setContent("");

            // After creating the note, call refresh to reload the note page
            refresh();
        } catch (error) {

            // Log error if note creation fails
            console.error("Error creating note:", error);

            // Show alert to user if note creation fails
            alert("Failed to create note. Please try again.");
        }
    };

    return (

        <div className="border p-4 mb-6 bg-white shadow">

            {/* Editor title */}
            <h2 className="text-xl mb-2">Create Note</h2>

            {/* Input field for note title */}
            <input
                className="border p-2 w-full mb-3"
                placeholder="Note Title"

                // Controlled input value
                value={title}

                // Update title state when typing
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* Rich text editor */}
            <ReactQuill
                theme="snow"

                // Content value stored in state
                value={content}

                // Update content when user types
                onChange={setContent}
            />

            {/* Save button */}
            <button
                onClick={createNote}
                className="bg-green-500 text-white px-4 py-2 mt-3"
            >
                Save Note
            </button>

        </div>
    )
}