import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TitleText, StyledSpotifyButton, GenericFlexContainer, GenericParagraphText } from "./SharedStyles";
import { useEffect, useState } from "react";
import loadSavedPlaylistData from "../services/sharedFunctions.js";
import ScrollingCarousel from "./ScrollingCarousel.jsx";

const Spotify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loadedPlaylist, setLoadedPlaylist] = useState(null);

  useEffect(() => {
    loadSavedPlaylistData(setLoadedPlaylist);
    console.log("loaded playlist");
  }, [location]);

  const goToPlaylist = () => {
    navigate("/spotify/playlist");
  };

  const goToPlay = () => {
    navigate("/spotify/play");
  };

  const goToPractice = () => {
    navigate("/spotify/practice");
  };

  return (
    <>
      {location.pathname === "/spotify" && (
        <>
          <GenericFlexContainer height="100vh">
            <GenericFlexContainer width="25em" rowGap="10px">
              <TitleText>Who's Who</TitleText>
              <GenericParagraphText margin="0 0 10px 0 ">remade in React!</GenericParagraphText>
              <StyledSpotifyButton onClick={goToPlay}>
                Play
              </StyledSpotifyButton>
              <StyledSpotifyButton onClick={goToPlaylist}>Settings</StyledSpotifyButton>
              <StyledSpotifyButton onClick={goToPractice}>React Practice</StyledSpotifyButton>
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
