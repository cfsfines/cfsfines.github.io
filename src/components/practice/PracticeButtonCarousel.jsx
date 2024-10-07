import { sample } from "lodash";
import "./PracticeButtonCarouselStyles.css";
import { useEffect, useState } from "react";

const PracticeButtonCarousel = ({ loadedPlaylist }) => {
  const {
    tracks: { items },
  } = loadedPlaylist;

  const [sampleImages, setSampleImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (items && items.length > 0) {
      const midpoint = Math.ceil(items.length / 80);
      let tempArray = [];
      let firstFifty = items.slice(0, midpoint);
      firstFifty.forEach((item) => {
        tempArray.push(item.track.album.images[1].url);
      });
      setSampleImages(tempArray);
      setSelectedImage(tempArray[0]);
    }
  }, [items]);

  const handleClick = (e) => {
    setSelectedImage(e.target.src);
  };

  return (
    <>
      <div className="main-container">
        <div className="clickable-container">
          {sampleImages && sampleImages.map((image, idx) => <img onClick={(e) => handleClick(e)} key={idx} src={image} alt="album art"></img>)}
        </div>
        <div>{selectedImage && <p>{selectedImage}</p>}</div>
      </div>
    </>
  );
};

export default PracticeButtonCarousel;
