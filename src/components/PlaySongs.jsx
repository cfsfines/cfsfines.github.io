import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import loadSavedPlaylistData from "../services/sharedFunctions.js";
import { Howl, Howler } from "howler";
import { click } from "@testing-library/user-event/dist/click.js";

const PlaySongs = () => {
  const navigate = useNavigate();
  const [playlistData, setPlaylistData] = useState(null);
  const [isPlaylistDataLoaded, setIsPlaylistDataLoaded] = useState(false);
  const [currTrackList, setCurrTrackList] = useState(0);
  const [currRoundTrack, setCurrRoundTrack] = useState(null);
  const [audioComponents, setAudioComponents] = useState(false);
  const [currAudio, setCurrAudio] = useState(null);
  const [volume, setVolume] = useState(0.25);

  /*
    TODO: save current volume position into local storage
  */

  const [currentTime, setCurrentTime] = useState(0);

  /*
    Return to the home screen
  */
  const returnToHome = () => {
    unloadHowler();
    navigate("/spotify");
  };

  /*
    Filter out null preview urls
  */
  const filterTracks = useCallback(({ tracks: { items } }) => {
    const filteredTracks = items.filter((item) => item.track.preview_url !== null);
    setCurrTrackList(filteredTracks);
  }, []);

  /*
    Remove a song from the currTrackList
  */
  const removeTrack = (trackIndex) => {
    setCurrTrackList((prevTrackList) => {
      const updatedTrackList = [...prevTrackList];
      updatedTrackList.splice(trackIndex, 1);
      return updatedTrackList;
    });
  };

  /*
    Return a random song from currTrackList
  */
  const getRandomTrack = (currentTracks) => {
    if (currentTracks && currentTracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * currentTracks.length);
      const randomTrack = currentTracks[randomIndex];
      removeTrack(randomIndex);
      return randomTrack;
    }
    return null;
  };

  /*
    Start the round
  */
  const startRound = () => {
    const randomTrack = getRandomTrack(currTrackList);
    setAudioComponents(true);
    if (randomTrack) {
      setCurrRoundTrack(randomTrack);
      createHowler(randomTrack);

      /*
        TODO: grab four random tracks from currTrackList and get their artists
          - put them in an array probably as another state, shuffle it, render them onto buttons
          - implement logic to determine the correct answer and display if the selected item was correct or not
              - show the correct answer if wrong

        when the user presses the back button, the audio still plays. fix that.
      */
    } else {
      setCurrRoundTrack(null);
      setAudioComponents(false);
    }
  };

  /*
    Unload howler object
  */
  const unloadHowler = () => {
    if (currAudio) {
      currAudio.unload();
      setCurrAudio(null);
    }
  };

  /*
    Audio control using Howler.js
    Docs: https://github.com/goldfire/howler.js?tab=readme-ov-file#volumevolume
  */
  const createHowler = ({ track }) => {
    unloadHowler();
    const song = new Howl({
      src: [`${track.preview_url}`],
      html5: true,
    });
    setCurrAudio(song);
  };

  /*
    First, load the songs from local storage
  */
  useEffect(() => {
    console.log("loading songs from local storage");
    const isLoaded = loadSavedPlaylistData(setPlaylistData);
    setIsPlaylistDataLoaded(isLoaded);
  }, []);

  /*
    Second, filter the tracks
  */
  useEffect(() => {
    if (isPlaylistDataLoaded) {
      console.log("filtering tracks");
      filterTracks(playlistData);
    }
  }, [filterTracks, isPlaylistDataLoaded, playlistData]);

  /*
    Controls pausing and playing the audio
  */
  const pauseAndPlay = () => {
    if (currAudio.playing()) {
      currAudio.pause();
    } else {
      currAudio.play();
    }
  };

  /*
    Controls the current volume of the audio
  */
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    currAudio.volume(newVolume);
  };

  /*
    Controls the progress bar of the audio, checking the current position of the playing song evert 200 ms
  */
  useEffect(() => {
    if (currAudio) {
      const intervalId = setInterval(() => {
        setCurrentTime(currAudio.seek());
      }, 200);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [currAudio]);

  /*
    When the user clicks on the progress bar, jump to that position in the songks
  */
  const handleProgressClick = (event) => {
    const progressBar = event.target;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickPosition = (clickX / progressBar.offsetWidth) * currAudio.duration();
    currAudio.seek(clickPosition);
  };

  /*
    TODO:
      - conditional rendering to hide the continue button during an unanswered round
      - create separate component for styling and stuff once mvp is working

  */

  return (
    <>
      <button onClick={returnToHome}>return</button>

      {currRoundTrack && <div>{currRoundTrack.track.name}</div>}
      {audioComponents && <button onClick={pauseAndPlay}>play song</button>}

      {audioComponents && (
        <>
          <div>
            <label htmlFor="volume">Volume: </label>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
          </div>
          <div>
            <label htmlFor="progress">Progress: </label>
            <progress id="progress" value={currentTime} max={currAudio.duration()} onClick={handleProgressClick}></progress>
          </div>
        </>
      )}

      {!currRoundTrack && currTrackList.length === 0 && <div>no more songs!</div>}

      <button onClick={startRound}>begin</button>

      {!isPlaylistDataLoaded && <div>No playlist data found. Please set playlist data.</div>}
    </>
  );
};

export default PlaySongs;
