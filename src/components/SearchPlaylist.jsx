import styled from "styled-components";
import fetchFromSpotify from "../services/spotify.ts";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadSavedPlaylistData from "../services/sharedFunctions.js";

/*
    TODO: add type safety by creating interfaces of the entire return object.
    refer to the docs on its shape and types: https://developer.spotify.com/documentation/web-api/reference/get-playlist
*/
const usePlaylistHook = (token, endpoint, setPlaylistData, setError, setLoading) => {
  const fetchPlaylist = async (playlistID, params) => {
    setLoading(true);
    let combinedFetches = {
      tracks: {
        items: [],
        next: null,
      },
    };
    try {
      /* 
        This is the initial fetch of the given playlist id
        The expected return includes:
        - Playlist information: id, name, description, playlist image
        - Tracks: items.track (name, preview_url)
        - Album: images (of different sizes)
        - Artists: name
        */
      const response = await fetchFromSpotify({ token: token, endpoint: `${endpoint}/${playlistID}`, params: params });
      combinedFetches = {
        ...response,
        tracks: {
          ...response.tracks,
          items: [...response.tracks.items],
        },
      };

      /* 
        If available, fetch the next page of tracks
      */
      let nextPageUrl = response.tracks.next;
      while (nextPageUrl) {
        const nextPageResponse = await axios.get(nextPageUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        combinedFetches.tracks.items = combinedFetches.tracks.items.concat(nextPageResponse.data.items);
        nextPageUrl = nextPageResponse.data.next;
      }

      /*
        Update the state of the fetched playlist data and save it into local storage after all requests are complete
      */
      setPlaylistData(combinedFetches);
      localStorage.setItem("playlistData", JSON.stringify(combinedFetches));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchPlaylist };
};

const SearchPlaylist = ({ token }) => {
  const [playlistData, setPlaylistData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadSavedPlaylistData(setPlaylistData);
  }, []);

  const { fetchPlaylist } = usePlaylistHook(token, "playlists", setPlaylistData, setError, setLoading);

  const playlistID = "2TgYLH4cs29NT2BNo0XsuX";
  const params = {};

  const handleClick = () => {
    if (playlistData && playlistData.id === playlistID) {
      console.log("playlist already saved");
      return;
    }
    fetchPlaylist(playlistID, params);
  };

  const returnToHome = () => {
    navigate("/spotify");
  };

  /*
    TODO: show the thumbnail of the playlist loaded.
      - create a text input for both the secret key and the playlist link
      - loading screen styling when fetching playlists
      - give indication on how to get spotify playlist id, and the condition that they need to be public
  */

  return (
    <>
      <button onClick={handleClick}>get playlists</button>
      <button onClick={returnToHome}>return</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {playlistData && playlistData.tracks.items.map((item) => <div key={`${item.added_at}_${item.track.name}`}>{item.track.name}</div>)}
    </>
  );
};

export default SearchPlaylist;
