import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function searchLyrics(e: { preventDefault: () => void; }) {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      .then((res) => {
        setLyrics(res.data.lyrics);
        setLoading(false);
      })
      .catch((_error) => {
        setError("Lyrics not found. Please try again.");
        setLoading(false);
      });
  }

  return (
    <div className="container">
      <h1>Search Lyrics</h1>
      <form onSubmit={searchLyrics}>
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
            id="artistInput"
          />
          <input
            type="text"
            placeholder="Song"
            value={song}
            onChange={(e) => setSong(e.target.value)}
            required
            id="songInput"
          />
          <button type="submit"disabled={loading} id="searchBtn">
            {loading ? "Searching..." : "Search"}
          </button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="lyrics" id="lyricsContainer">{lyrics}</div>
    </div>
  );
}

export default App;
