// Song Manager for BetaProject
// Manages songs by interacting with BetaProject repository's songs.json file

const fs = require('fs');
const path = require('path');

// Path to BetaProject repository's songs.json file
// Can be overridden by setting BETAPROJECT_SONGS_PATH environment variable
const SONGS_FILE_PATH = process.env.BETAPROJECT_SONGS_PATH || path.join(__dirname, '../BetaProject/data/songs.json');

// Function to read songs from the BetaProject repository
function readSongs() {
    try {
        const data = fs.readFileSync(SONGS_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading songs file: ${error.message}`);
        return [];
    }
}

// Function to write songs to the BetaProject repository
function writeSongs(songs) {
    try {
        fs.writeFileSync(SONGS_FILE_PATH, JSON.stringify(songs, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing songs file: ${error.message}`);
        return false;
    }
}

// Function to add a song
function addSong(title, artist) {
    const songs = readSongs();
    songs.push({ title, artist });
    
    if (writeSongs(songs)) {
        console.log(`Added song: "${title}" by ${artist}`);
        return true;
    } else {
        console.error(`Failed to add song: "${title}" by ${artist}`);
        return false;
    }
}

// Function to delete a song by title
function deleteSong(title) {
    const songs = readSongs();
    const index = songs.findIndex(song => song.title === title);
    
    if (index !== -1) {
        const removedSong = songs.splice(index, 1)[0];
        if (writeSongs(songs)) {
            console.log(`Deleted song: "${removedSong.title}" by ${removedSong.artist}`);
            return true;
        } else {
            console.error(`Failed to delete song: "${removedSong.title}" by ${removedSong.artist}`);
            return false;
        }
    } else {
        console.log(`Song "${title}" not found.`);
        return false;
    }
}

// Export functions
module.exports = { addSong, deleteSong, readSongs };