import fetchFromSpotify from "../services/spotify.ts";
import { useCallback } from "react";
import axios from "axios";
/*
    TODO: add type safety by creating interfaces of the entire return object.
    refer to the docs on its shape and types: https://developer.spotify.com/documentation/web-api/reference/get-playlist
*/
export const usePlaylistHook = (token, endpoint, setPlaylistData, setError, setLoading, setInputValue, isDefault = false, localStorageName = "playlistData") => {
  const fetchPlaylist = useCallback(
    async (playlistID, params) => {
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

        setError(null);
        setInputValue("")

        /*
          For manually loading a playlist: Update the state of the fetched playlist data and save it into local storage after all requests are complete
          For loading a default playlist: saving to local storage is handled in SearchPlaylist
          */
        if (!isDefault) {
          setPlaylistData(combinedFetches);
          localStorage.setItem(localStorageName, JSON.stringify(combinedFetches));
        }

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
        if (isDefault) {
          return combinedFetches
        }
      }
    },
    [endpoint, isDefault, localStorageName, setError, setInputValue, setLoading, setPlaylistData, token]
  );

  return { fetchPlaylist };
};
