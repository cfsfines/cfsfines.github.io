import styled from "styled-components";
import { useEffect } from "react";

/*
    From https://codepen.io/samiullah1989/pen/zELqPd
*/

const PlayButton = styled.div`
  position: relative;
  top: 37%;
  left: 44%;
  transform: translate(-50%, -50%);
  width: 74px;
  height: 74px;
  box-sizing: border-box;
  border-style: solid;
  border-width: 37px 0px 37px 74px;
  border-color: transparent transparent transparent steelblue;
  transition: all 100ms ease-in-out;
  cursor: pointer;
  &.pause {
    border-style: double;
    border-width: 0px 0px 0px 60px;
  }
`;

const Background = styled.div`
  position: flex;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PausePlayButton = ({ onClick, isPlaying, setIsPlaying }) => {
  const handleToggle = (e) => {
    setIsPlaying(!isPlaying);
    e.target.classList.toggle("pause");
    if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    const playButton = document.querySelector(".play-button");
    if (isPlaying) {
      playButton.classList.add("pause");
    } else {
      playButton.classList.remove("pause");
    }
  }, [isPlaying]);

  return (
    <Background>
      <PlayButton onClick={handleToggle} className={`play-button ${isPlaying ? "pause" : ""}`} />
    </Background>
  );
};

export default PausePlayButton;
