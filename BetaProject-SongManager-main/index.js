// A simple Node.js program for managing songs

const songs = [];

// Function to add a song
function addSong(title, artist) {
    songs.push({ title, artist });
    console.log(`Added song: \"${title}\" by ${artist}`);
}

// Function to remove a song
function removeSong(title) {
    const index = songs.findIndex(song => song.title === title);
    if (index !== -1) {
        const removedSong = songs.splice(index, 1)[0];
        console.log(`Removed song: \"${removedSong.title}\" by ${removedSong.artist}`);
    } else {
        console.log(`Song \"${title}\" not found.`);
    }
}

// Function to list all songs
function listSongs() {
    if (songs.length === 0) {
        console.log("No songs in the list.");
    } else {
        console.log("Song List:");
        songs.forEach((song, index) => {
            console.log(`${index + 1}. \"${song.title}\" by ${song.artist}`);
        });
    }
}

// Export functions (if integrating with other modules)
module.exports = { addSong, removeSong, listSongs };