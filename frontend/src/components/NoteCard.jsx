// Import API instance
import API from "../api/api";

// Import Colloborators tpo colloborate each others
import Colloborators from "./Colloborators";

// NoteCard component to display individual note details
export default function NoteCard({ note, refresh }) {

    // Function to handle delete button click
    const deleteNote = async () => {

        // Send delete request to the backend API to delete the note
        await API.delete(`/notes/${note._id}`);

        // After deleting the note, call refresh to reload the note page
        refresh();
    }

    return (

        <div className="border p-4 shadow">

            {/*Display note title*/}
            <h2 className="text-lg font-bold">{note.title}</h2>

            <div 
                dangerouslySetInnerHTML={{ __html: note.content }}
                className="mt-2"
            />

            {/*Delete button*/}
            <button className="bg-red-500 text-white px-3 mt-2" 
                
                // when clicked run deleteNote function
                onClick={deleteNote}
            >
                Delete
            </button>

            <Colloborators noteId={note._id} refresh={refresh}/>

            <div className="mt-2 text-sm text-gray-600">
                <strong>Collaborators:</strong>

                {note.collaborators && note.collaborators.length > 0 ? (
                    <ul className="list-disc ml-5">
                    {note.collaborators.map((user) => (
                        <li key={user._id}>
                        {user.email}
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p>No collaborators</p>
                )}
                </div>
        </div>
    )
}