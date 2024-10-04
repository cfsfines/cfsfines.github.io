import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import loadSavedPlaylistData from "../services/sharedFunctions.js";
import { Howl, Howler } from "howler";

const PlaySongs = () => {
  const navigate = useNavigate();
  const [playlistData, setPlaylistData] = useState(null);
  const [isPlaylistDataLoaded, setIsPlaylistDataLoaded] = useState(false);
  const [currTrackList, setCurrTrackList] = useState([]);
  const [currRoundTrack, setCurrRoundTrack] = useState(null);
  const [audioComponents, setAudioComponents] = useState(false);
  const [currAudio, setCurrAudio] = useState(null);
  const [volume, setVolume] = useState(0.25);
  const [currChoices, setCurrChoices] = useState(null);
  const [currCorrectChoice, setCurrCorrectChoice] = useState({});
  const [showContinueButton, setShowContinueButton] = useState(true);
  const [continueButtonText, setContunueButtonText] = useState("Begin");
  const [choiceMessage, setChoiceMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

  /*
    Unload howler object
  */
  const unloadHowler = useCallback(() => {
    if (currAudio) {
      currAudio.unload();
      setCurrAudio(null);
    }
  }, [currAudio]);

  /*
    Save the volume setting
  */
  const saveVolumeSetting = useCallback(() => {
    localStorage.setItem("volume", JSON.stringify(volume));
  }, [volume]);

  /*
    Return to the home screen
  */
  const returnToHome = () => {
    unloadHowler();
    saveVolumeSetting();
    navigate("/spotify");
  };

  /*
    If the user clicks the back button, unload the audio.
    this is a hacky way to get this to work because popstate wont fire as expected.
    so i manually pushed a history state for popstate to fire when the back button is triggered
    so it can stop the audio and save the volume setting
    https://stackoverflow.com/questions/29500484/window-onpopstate-is-not-working-nothing-happens-when-i-navigate-back-to-page
  */

  useEffect(() => {
    const handlePopState = (event) => {
      unloadHowler();
      saveVolumeSetting();
      navigate("/spotify");
    };

    window.history.pushState({}, "", "/spotify/play");
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, saveVolumeSetting, unloadHowler]);

  /*
    Filter out null preview urls
  */
  const filterTracks = useCallback(({ tracks: { items } }) => {
    const filteredTracks = items.filter((item) => item.track.preview_url !== null);
    setCurrTrackList(filteredTracks);
  }, []);

  /*
    Return a random song from currTrackList. 
  */
  const getRandomTrack = (currentTracks) => {
    if (currentTracks && currentTracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * currentTracks.length);
      const randomTrack = currentTracks[randomIndex];
      const updatedTrackList = currentTracks.filter((_, index) => index !== randomIndex);
      return { randomTrack, updatedTrackList };
    }
    return null;
  };

  /*
    Return random songs from currTrackList. These will be the incorrect answers.
    If there is less than 4 tracks, just return the entire track list
  */
  const getRandomTracks = (currentTracks, remainingTracks) => {
    const uniqueIndexes = new Set();
    if (remainingTracks.length <= 4) {
      return remainingTracks;
    } else {
      while (uniqueIndexes.size < 4) {
        const randomIndex = Math.floor(Math.random() * currentTracks.length);
        uniqueIndexes.add(randomIndex);
      }
    }
    const randomTracks = Array.from(uniqueIndexes).map((index) => currentTracks[index]);
    return randomTracks;
  };

  /*
    Fisher-Yates shuffle algorithm.
  */
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  /*
    Start the round
  */
  const startRound = () => {
    // if there is no more songs, hide everything
    if (currTrackList.length === 0) {
      setCurrRoundTrack(null);
      setShowContinueButton(false);
      setCurrChoices(null);
      setAudioComponents(false);
      return;
    }

    const { randomTrack: correctRandomTrack, updatedTrackList } = getRandomTrack(currTrackList);
    setAudioComponents(true);
    setShowContinueButton(false);
    if (correctRandomTrack) {
      setCurrRoundTrack(correctRandomTrack);
      createHowler(correctRandomTrack);

      const choices = [...getRandomTracks(updatedTrackList, updatedTrackList), correctRandomTrack];
      const shuffledChoices = shuffleArray(choices);
      setCurrChoices(shuffledChoices);
      setCurrCorrectChoice(correctRandomTrack);

      setCurrTrackList(updatedTrackList);
    } else {
      setCurrRoundTrack(null);
      setAudioComponents(false);
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
    song.volume(volume);
    setCurrAudio(song);
  };

  /*
    Load saved volume setting
  */
  const loadVolume = () => {
    const volumeSetting = localStorage.getItem("volume");
    if (volumeSetting) {
      const parsedVolumeSetting = JSON.parse(volumeSetting);
      setVolume(parsedVolumeSetting);
    }
  };

  /*
    First, load the songs from local storage
  */
  useEffect(() => {
    const isLoaded = loadSavedPlaylistData(setPlaylistData);
    setIsPlaylistDataLoaded(isLoaded);
    loadVolume();
  }, []);

  /*
    Second, filter the tracks
  */
  useEffect(() => {
    if (isPlaylistDataLoaded) {
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
        setCurrentTime(0);
        clearInterval(intervalId);
      };
    }
  }, [currAudio]);

  /*
    When the user clicks on the progress bar, jump to that position in the song
  */
  const handleProgressClick = (event) => {
    const progressBar = event.target;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickPosition = (clickX / progressBar.offsetWidth) * currAudio.duration();
    currAudio.seek(clickPosition);
  };

  const handleAnswer = (e) => {
    console.log(e.target.value);
    if (e.target.value === currCorrectChoice.track.name) {
      setContunueButtonText("Next Song");
      setChoiceMessage("Correct!");
    } else {
      setContunueButtonText("Restart");
      setChoiceMessage("Incorrect!");
    }
    setShowContinueButton(true);
  };

  /*
    TODO:
      - STYLING

  */

  return (
    <>
      <button onClick={returnToHome}>return</button>

      {currRoundTrack && <div>{currRoundTrack.track.name}</div>}

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
          <button onClick={pauseAndPlay}>play song</button>
        </>
      )}

      {currChoices && (
        <div>
          {currChoices.map((choice) => (
            <button key={`${choice.added_at}_${choice.track.name}`} value={choice.track.name} onClick={handleAnswer}>
              {choice.track.name}
            </button>
          ))}
        </div>
      )}

      {!currRoundTrack && isPlaylistDataLoaded && currTrackList.length === 0 && <div>no more songs!</div>}

      {showContinueButton && currTrackList.length !== 0 && (
        <div>
          <p>{choiceMessage}</p>
          <button onClick={startRound}>{continueButtonText}</button>
        </div>
      )}

      {!isPlaylistDataLoaded && <div>No playlist data found. Please set playlist data.</div>}
    </>
  );
};

export default PlaySongs;
