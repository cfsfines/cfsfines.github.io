import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Spotify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToPlaylist = () => {
    navigate("/spotify/playlist");
  };

  const goToPlay = () => {
    navigate("/spotify/play");
  };

  /*

    // TODO: create common styling across all three pages
        - page title
        - button container
        - colors
        - fonts 

  */

  return (
    <>
      {location.pathname === "/spotify" && (
        <>
          <button onClick={goToPlaylist}>to playlists</button>
          <button onClick={goToPlay}>to play</button>
        </>
      )}
      <Outlet />
    </>
  );
};

export default Spotify;
