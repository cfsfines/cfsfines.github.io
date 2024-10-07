import { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

const slide = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
`;

const AlbumArt = styled.img`
  height: 150px;
  margin: 0 10px;
`;

const Albums = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 100vw;
  min-width: 0;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(to left, rgba(33, 33, 33, 0), rgba(33, 33, 33, 1));
    content: "";
    z-index: 1;
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(to right, rgba(33, 33, 33, 0), rgba(33, 33, 33, 1));
    content: "";
    z-index: 1;
  }
`;

const AlbumSlide = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  animation: 60s ${slide} infinite linear;
  width: 200%;
`;

const ScrollingCarousel = ({ playlistData }) => {
  const {
    tracks: { items },
  } = playlistData;

  const [firstHalfUrls, setFirstHalfUrls] = useState([]);
  const [firstHalfObjects, setFirstHalfObjects] = useState([]);

  useEffect(() => {
    if (items && items.length > 0) {
      const midpoint = Math.ceil(items.length / 2);
      let tempArray = [];
      let firstFifty = items.slice(0, midpoint);
      firstFifty.forEach((item) => {
        tempArray.push(item.track.album.images[1].url);
      });
      setFirstHalfUrls(tempArray);
      setFirstHalfObjects(firstFifty);
    }
  }, [items]);

  return (
    <>
      <Albums>
        <AlbumSlide>
          {firstHalfObjects.map((item, idx) => (
            <AlbumArt key={item.track.id} src={firstHalfUrls[idx]} alt={item.track.name} />
          ))}
          {firstHalfObjects.map((item, idx) => (
            <AlbumArt key={`${item.track.id}-dupe`} src={firstHalfUrls[idx]} alt={`${item.track.name}-dupe`} />
          ))}
        </AlbumSlide>
      </Albums>
    </>
  );
};

export default ScrollingCarousel;
