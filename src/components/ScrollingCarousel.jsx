import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

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
  position: relative;
  width: 100vw;

  &::before {
    position: absolute;
    top: 0;
    width: 40%;
    height: 100%;
    content: "";
    z-index: 1;
    left: 0;
    background: linear-gradient(to right, #212121, transparent);
  }

  &::after {
    position: absolute;
    top: 0;
    width: 40%;
    height: 100%;
    content: "";
    z-index: 1;
    right: 0;
    background: linear-gradient(to left, #212121, transparent);
  }
`;

const AlbumSlide = styled.div`
  display: flex;
  flex-direction: row;
  animation: ${slide} 200s linear infinite;
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
        if (item.track !== null) {
          tempArray.push(item.track.album.images[1].url);
        }
      });
      setFirstHalfUrls(tempArray);
      setFirstHalfObjects(firstFifty);
    }
  }, [items]);

  useEffect(() => {
    const albumSlideElement = document.querySelector(".album-slide");
    if (albumSlideElement) {
      const dupes = document.querySelector(".album-slide").cloneNode(true);
      document.querySelector(".album-container").appendChild(dupes);
    }
  }, [firstHalfObjects]);

  return (
    <>
      <Albums className="album-container">
        <AlbumSlide className="album-slide">
          {firstHalfObjects.map((item, idx) => {
            if (!item.track) {
              return undefined;
            }
            return <AlbumArt key={item.track.id} src={firstHalfUrls[idx]} alt={item.track.name} />;
          })}
        </AlbumSlide>
      </Albums>
    </>
  );
};

export default ScrollingCarousel;
