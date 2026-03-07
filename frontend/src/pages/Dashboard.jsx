// Import react hooks
// useState -> store data in the component
// useEffect -> run code when component loads

import { useState, useEffect } from "react";


// import the custom axios instance already created
import API from "../api/api";

// import NoteCard component to display each note
import NoteCard from "../components/NoteCard";

// import Editor component to create new notes
import Editor from "../components/Editor";

// register the component
export default function Dashboard() {

    // State to store the list of notes recieved from backend
    const [notes, setNotes] = useState([]);

    // State to store search input value
    const [search, setSearch] = useState("");

    // fetch all notes from the backend 
    const fetchNotes = async () => {

        try {

            // Send get request to the backend API to fetch all notes
            const res = await API.get("/notes");

            // Update the notes state with the data recieved from backend
            setNotes(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    // useEffect hook to fetch notes when component loads
    useEffect(() => {

        // call the function to load notes
        (async () => {
            await fetchNotes();
        })();

    }, []);

    // function to search notes
    const handleSearch = async () => {

        try {

            // If search input empty reload all notes
            if (!search) {
                fetchNotes();
                return;
            }

            // Send search request with query parameter
            const res = await API.get(`/notes/search?q=${search}`);

            // Update the notes state with the search results
            setNotes(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    // Logout function
    const handleLogout = () => {

        // Remove JWT token from localStorage
        localStorage.removeItem("token");

        // Redirect user to login page
        window.location.href = "/login";
    };

    // jsx UI for the dashboard page
    return (

        // Full page background + center layout
        <div className="min-h-screen bg-gray-100 flex justify-center">

            {/* Main container */}
            <div className="w-full max-w-5xl p-6">

                {/* Page title */}
                <h1 className="text-3xl font-bold mb-6 text-center">
                    My Notes
                </h1>

                

                {/* Editor for creating notes */}
                <Editor refresh={fetchNotes} />

                {/* Search input and button */}
                <div className="flex justify-center gap-2 mb-6">

                    <input
                        className="border p-2 rounded w-60"
                        placeholder="Search notes..."

                        // update search state on input change
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"

                        // call search function on button clicked
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

                {/* Notes grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* loop through the notes state and render a NoteCard for each note */}
                    {notes.map((note) => (

                        // Render NoteCard component for each note
                        <NoteCard
                            key={note._id}   // MongoDB uses _id
                            note={note}
                            refresh={fetchNotes}
                        />

                    ))}
                </div>
            </div>
        </div>
    );
}