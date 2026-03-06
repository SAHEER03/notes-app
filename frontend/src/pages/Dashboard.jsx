// Import rect hooks 
// useState -> store data in the component
// useEffect -> run code when component loads

import { useState, useEffect } from "react";

// import the custom axios instance already created
import API from "../api/api";

// import NoteCard component to display each note
import NoteCard from "../components/NoteCard";

// register the component
export default function Dashboard() {

    // State to store the list of notes recieved from backend
    const [notes, setNotes] = useState([]);

    // State to store search input value
    const [search, setSearch] = useState("");

    // fetch all notes from the backend 
    const fetchNotes = async () => {

        // Send get request to the backend API to fetch all notes
        const response = await API.get("/notes");

        // Update the notes state with the data recieved from backend
        setNotes(response.data);
    };

    // useEffect hook to fetch notes when component loads
    useEffect(() => {

        // call the function to load notes
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchNotes();
    }, []);

    // function to search notes
    const handleSearch = async () => {

        // Send search request with query parameter
        const response = await API.get(`/notes/search?query=${search}`);

        // Update the notes state with the search results
        setNotes(response.data);
    }

    // jsx UI for the dashboard page
    return (

        <div className="p-6">

            {/* Page title */}
            <h1 className="text-2xl font-bold mb-4">My Notes</h1>

            {/* Search input and button */}
            <div className="flex gap-2 mb-4">

                <input
                    className="border p-2"
                    placeholder="Search notes..."

                    // update search state on input change
                    onChange={(e) => setSearch(e.target.value)} 
                />

                <button
                    className="bg-blue-500 text-white px-4"

                    // call search function on button clicked
                    onClick={handleSearch} 
                >
                    Search
                </button>

                <div>

                    {/* Notes grid layoout */}
                    <div className="grid grid-cols3 gap-4">

                        {/* loop through the notes state and render a NoteCard for each note */}
                        {notes.map((note) => (

                            // Render NoteCard component for each note, passing the note data as a prop
                            <NoteCard key={note.id} note={note} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )


}