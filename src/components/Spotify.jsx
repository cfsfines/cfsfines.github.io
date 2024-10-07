import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TitleText, StyledSpotifyButton, GenericFlexContainer } from "./SharedStyles";
import { useEffect, useState } from "react";
import loadSavedPlaylistData from "../services/sharedFunctions.js";
import ScrollingCarousel from "./ScrollingCarousel.jsx";

const Spotify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loadedPlaylist, setLoadedPlaylist] = useState(null);

  useEffect(() => {
    loadSavedPlaylistData(setLoadedPlaylist);
  }, []);

  const goToPlaylist = () => {
    navigate("/spotify/playlist");
  };

  const goToPlay = () => {
    navigate("/spotify/play");
  };

  return (
    <>
      {location.pathname === "/spotify" && (
        <>
          <GenericFlexContainer height="100vh">
            <GenericFlexContainer width="25em" rowGap="10px">
              <TitleText margin="0 0 40px 0">Who's Who</TitleText>
              <StyledSpotifyButton margin="0 0 10px 0" onClick={goToPlay}>
                Play
              </StyledSpotifyButton>
              <StyledSpotifyButton onClick={goToPlaylist}>Settings</StyledSpotifyButton>
            </GenericFlexContainer>

            {loadedPlaylist && loadedPlaylist.tracks.items.length >= 10 && <ScrollingCarousel playlistData={loadedPlaylist}></ScrollingCarousel>}
          </GenericFlexContainer>
        </>
      )}
      <Outlet />
    </>
  );
};

export default Spotify;
