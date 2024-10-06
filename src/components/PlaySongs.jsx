import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import loadSavedPlaylistData from "../services/sharedFunctions.js";
import { Howl, Howler } from "howler";
import { TitleText, StyledSpotifyButton, GenericFlexContainer, SpotifyBodyContainer } from "./SharedStyles";
import PausePlayButton from "./PausePlayButton.jsx";
import ProgressBar from "./ProgressBar.jsx";

const PlaySongs = () => {
  const navigate = useNavigate();
  // the playlist data taken from local storage
  const [playlistData, setPlaylistData] = useState(null);
  // boolean if there exists any playlist data
  const [isPlaylistDataLoaded, setIsPlaylistDataLoaded] = useState(false);
  // the current tracks loaded into the current game session. a track is removes every round
  const [currTrackList, setCurrTrackList] = useState([]);
  // boolean to display the audio controls
  const [audioComponents, setAudioComponents] = useState(false);
  // the howler object that handles the audio
  const [currAudio, setCurrAudio] = useState(null);
  // the volume setting
  const [volume, setVolume] = useState(0.25);
  // a list of track objects that are the current choices each round
  const [currChoices, setCurrChoices] = useState(null);
  // a track object that is the correct choice
  const [currCorrectChoice, setCurrCorrectChoice] = useState({});
  // boolean to display the continue button
  const [showContinueButton, setShowContinueButton] = useState(true);
  // the text that will appear inside the continue button
  const [continueButtonText, setContunueButtonText] = useState("Begin");
  // the message that displays if an answer is correct or not
  const [choiceMessage, setChoiceMessage] = useState("Good luck!");
  // the timestamp of the song playhing, used for the progress bar
  const [currentTime, setCurrentTime] = useState(0);
  // boolean checking if the song is currently playing or not
  const [isPlaying, setIsPlaying] = useState(false);
  // the track object that the user selects as their answer
  const [selectedChoice, setSelectedChoice] = useState(null);

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
    // stop the song from playing
    setIsPlaying(false);

    console.log(currTrackList.length);

    // if there is no more songs, hide everything
    if (currTrackList.length === 1) {
      setCurrCorrectChoice(null);
      setShowContinueButton(false);
      setCurrChoices(null);
      setAudioComponents(false);
      return;
    }

    // return a random track from currTrackList while also removing it, returning updatedTrackList
    const { randomTrack: correctRandomTrack, updatedTrackList } = getRandomTrack(currTrackList);
    // show the pause/play button, progress bar, and volume slider
    setAudioComponents(true);
    // hide the continue button
    setShowContinueButton(false);
    // if getRandomTrack returns a track
    if (correctRandomTrack) {
      // set the correct answer
      setCurrCorrectChoice(correctRandomTrack);
      // create playable audio
      createHowler(correctRandomTrack);
      // reset the iser's answer
      setSelectedChoice(null);
      // get 4 random incorrect answers and combine it with the correct answer
      const choices = [...getRandomTracks(updatedTrackList, updatedTrackList), correctRandomTrack];
      const shuffledChoices = shuffleArray(choices);
      // enable the choice buttons
      disableChoiceButtons(false);
      // shuffle the options
      setCurrChoices(shuffledChoices);

      setCurrTrackList(updatedTrackList);
    } else {
      setCurrCorrectChoice(null);
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
      volume: volume,
      onend: () => {
        setIsPlaying(false);
      },
    });
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
      setIsPlaying(false);
    } else {
      currAudio.play();
      setIsPlaying(true);
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
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / progressBar.clientWidth) * currAudio.duration();
    setCurrentTime(newTime);
    currAudio.seek(newTime);
  };

  /*
    Determining if an answer is correct or not
  */
  const handleAnswer = (e) => {
    const selectedTrackName = e.target.value;
    const isCorrect = selectedTrackName === currCorrectChoice.track.name;

    // if the selected choice is incorrect, reset the playlist
    if (!isCorrect) {
      filterTracks(playlistData);
    }

    setSelectedChoice({ name: selectedTrackName, isCorrect });
    setContunueButtonText(isCorrect ? "Next Song" : "Restart");
    setChoiceMessage(isCorrect ? "Correct!" : "Incorrect!");
    setShowContinueButton(true);
    disableChoiceButtons(true);
  };

  const disableChoiceButtons = (isDisabled) => {
    const buttons = document.querySelectorAll("button[name='songOption']");
    buttons.forEach((button) => (button.disabled = isDisabled));
  };

  /*
    TODO:
      - STYLING

  */

  return (
    <>
      <SpotifyBodyContainer rowGap="2em">
        {audioComponents && (
          <>
            <GenericFlexContainer>
              <PausePlayButton
                onClick={() => {
                  pauseAndPlay();
                }}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
              <ProgressBar id="progress" value={currentTime} max={currAudio?.duration()} onClick={handleProgressClick}></ProgressBar>
            </GenericFlexContainer>
          </>
        )}

        {currChoices && (
          <GenericFlexContainer flexDirection="row">
            {currChoices.map((choice) => (
              <StyledSpotifyButton
                name="songOption"
                key={`${choice.added_at}_${choice.track.name}`}
                value={choice.track.name}
                onClick={handleAnswer}
                isSelected={selectedChoice?.name === choice.track.name}
                isCorrect={currCorrectChoice.track.name === choice.track.name}
                showCorrect={selectedChoice && !selectedChoice.isCorrect && currCorrectChoice.track.name === choice.track.name}
              >
                {choice.track.name}
              </StyledSpotifyButton>
            ))}
          </GenericFlexContainer>
        )}

        {showContinueButton && currTrackList.length !== 0 && (
          <GenericFlexContainer>
            <p>{choiceMessage}</p>
            <StyledSpotifyButton onClick={startRound}>{continueButtonText}</StyledSpotifyButton>
          </GenericFlexContainer>
        )}
        {!currCorrectChoice && isPlaylistDataLoaded && currTrackList.length === 1 && <TitleText>You've emptied the playlist. You win!</TitleText>}

        {!isPlaylistDataLoaded && <div>No playlist data found. Please set playlist data.</div>}
        <GenericFlexContainer position="absolute" top="10px" left="50%" transform="translateX(-50%)">
          <StyledSpotifyButton onClick={returnToHome}>Return</StyledSpotifyButton>
        </GenericFlexContainer>
      </SpotifyBodyContainer>
    </>
  );
};

export default PlaySongs;
