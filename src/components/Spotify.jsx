import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TitleText, StyledSpotifyButton, GenericFlexContainer, SpotifyBodyContainer } from "./SharedStyles";

const Spotify = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
          <SpotifyBodyContainer>
            <TitleText>Who's Who</TitleText>
            <GenericFlexContainer>
              <StyledSpotifyButton onClick={goToPlay}>Play</StyledSpotifyButton>
              <StyledSpotifyButton onClick={goToPlaylist}>Settings</StyledSpotifyButton>
            </GenericFlexContainer>
          </SpotifyBodyContainer>
        </>
      )}
      <Outlet />
    </>
  );
};

export default Spotify;
