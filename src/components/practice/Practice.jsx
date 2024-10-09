import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import loadSavedPlaylistData from "../../services/sharedFunctions.js";
import PracticeScrollingCarousel from "./PracticeScrollingCarousel.jsx";
import PracticeButtonCarousel from "./PracticeButtonCarousel.jsx";
import PracticeBlind from "./PracticeBlind.jsx";

const Practice = () => {
  const navigate = useNavigate();
  const [loadedPlaylist, setLoadedPlaylist] = useState(null);

  useEffect(() => {
    loadSavedPlaylistData(setLoadedPlaylist);
  }, []);

  const goBack = () => {
    navigate("/spotify");
  };

  return (
    <>
      <button onClick={goBack}>back</button>
      {/* {loadedPlaylist && loadedPlaylist.tracks.items.length >= 10 && <PracticeScrollingCarousel loadedPlaylist={loadedPlaylist}></PracticeScrollingCarousel>} */}
      {/* {loadedPlaylist && loadedPlaylist.tracks.items.length >= 10 && <PracticeButtonCarousel loadedPlaylist={loadedPlaylist}></PracticeButtonCarousel>} */}
      {loadedPlaylist && loadedPlaylist.tracks.items.length >= 10 && <PracticeBlind loadedPlaylists={loadedPlaylist}></PracticeBlind>}
    </>
  );
};

export default Practice;
