import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loadSavedPlaylistData from "../services/sharedFunctions.js";
import { TitleText, StyledSpotifyButton, GenericFlexContainer, InputField, GenericParagraphText } from "./SharedStyles";
import PlaylistCard from "./PlaylistCard.jsx";
import { usePlaylistHook } from "./usePlaylistHook.js";
import ButtonCarousel from "./ButtonCarousel.jsx";

const SearchPlaylist = ({ token }) => {
  // the fetched playlist object the user searches for
  const [playlistData, setPlaylistData] = useState(null);
  // a list of default playlist objects
  const [defaultPlaylists, setDefaultPlaylists] = useState([]);
  // the error for the user fetched playlist object
  const [error, setError] = useState(null);
  // a boolean that indicated the user searched playlist is currently fetching
  const [loading, setLoading] = useState(false);
  // a boolean that indicated the default playlists are currently fetching
  const [defaultPlaylistLoading, setDefaultPlaylistLoading] = useState(false);
  // the error for the default fetched playlists
  const [defaultPlaylistError, setDefaultPlaylistError] = useState(false);
  // the text inputted inside the input field
  const [inputValue, setInputValue] = useState("");
  // navigation to a different page
  const navigate = useNavigate();
  // params passed when fetching spotify data. if i ever decide to use different
  // endpoints, this params will need to be filled accordingly
  const params = {};

  const { fetchPlaylist } = usePlaylistHook(token, "playlists", setPlaylistData, setError, setLoading, setInputValue);

  const { fetchPlaylist: fetchPlaylistDefault } = usePlaylistHook(
    token,
    "playlists",
    setDefaultPlaylists,
    setDefaultPlaylistError,
    setDefaultPlaylistLoading,
    null,
    true
  );

  useEffect(() => {
    loadSavedPlaylistData(setPlaylistData);
  }, []);

  /*
    Load all default playlists and save them into local storage. 
    usePlaylistHook does not save the default playlist. This function does.
  */
  useEffect(() => {
    const defaultPlaylistIds = ["16NicYyJBTLGbO5KvTihgJ", "6YFxJuybds6nSEllCJpIt7", "2EoheVFjqIxgJMb8VnDRtZ", "37i9dQZF1DXdfOcg1fm0VG"];
    const params = {};
    if (!loadSavedPlaylistData(setDefaultPlaylists, "defaultPlaylists")) {
      console.log("default playlists not found in local storage. fetching...");

      /*
        TODO: in the event one of these fetches fail, the whole thing fails.
        Make it so that even if one fails, it will simply be excluded in the results array
        before being saved into local storage and set to defaultPlaylists
      */

      Promise.all(defaultPlaylistIds.map((id) => fetchPlaylistDefault(id, params)))
        .then((results) => {
          localStorage.setItem("defaultPlaylists", JSON.stringify(results));
          setDefaultPlaylists(results);
        })
        .catch((error) => {
          console.error("Error fetching default playlists:", error);
        });
    }
  }, [fetchPlaylistDefault]);

  /*
    If there exists saved playlist data, and that playlist data's id is equal to the input value, don't do anything.
    Otherwise fetch it.
  */
  const handleClick = () => {
    if (playlistData && playlistData.id === inputValue) {
      setError(null);
      return;
    }
    fetchPlaylist(inputValue, params);
  };

  const returnToHome = () => {
    navigate("/spotify");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError(null);
  };

  /*
    TODO: show the thumbnail of the playlist loaded.
      - loading screen styling when fetching playlists
      - give indication on how to get spotify playlist id, and the condition that they need to be public
  */

  return (
    <>
      <GenericFlexContainer margin="100px 0 0 0">
        <GenericFlexContainer rowGap="20px">
          <TitleText>Settings</TitleText>
          <GenericFlexContainer flexDirection="row" gap="10px">
            <InputField id="spotifyPlaylistId" placeholder="Enter Spotify Playlist ID" value={inputValue} onChange={(e) => handleInputChange(e)} />
            <StyledSpotifyButton onClick={handleClick}>Fetch Playlist</StyledSpotifyButton>
          </GenericFlexContainer>
          <StyledSpotifyButton width="auto" onClick={returnToHome}>
            Return
          </StyledSpotifyButton>
        </GenericFlexContainer>

        <GenericFlexContainer margin="50px 0 0 0">
          {playlistData && playlistData.id === inputValue && <GenericParagraphText>Playlist already loaded!</GenericParagraphText>}
          {error && (!playlistData || playlistData.id !== inputValue) && <GenericParagraphText>Fetch Failed! {error.message}</GenericParagraphText>}
          {!playlistData && <TitleText>No playlist loaded!</TitleText>}
          {loading && <TitleText>Loading...</TitleText>}
          {playlistData && <PlaylistCard playlistData={playlistData}></PlaylistCard>}
        </GenericFlexContainer>

        <GenericFlexContainer margin="150px 0 200px 0">
          <TitleText margin="0 0 50px 0">Can't think of a playlist? Pick one from here!</TitleText>
          {defaultPlaylistLoading && <TitleText>Loading defaults...</TitleText>}
          {defaultPlaylistError && !defaultPlaylists && <TitleText>Error fetching defualt playlists!</TitleText>}
          {defaultPlaylists.length !== 0 && <ButtonCarousel defaultPlaylists={defaultPlaylists}></ButtonCarousel>}
        </GenericFlexContainer>
      </GenericFlexContainer>
    </>
  );
};

export default SearchPlaylist;
