import { useEffect, useState } from "react";
import "./PracticeScrollingCarouselStyles.css";

const PracticeScrollingCarousel = ({ loadedPlaylist }) => {
  const {
    tracks: { items },
  } = loadedPlaylist;

  const [sampleImages, setSampleImages] = useState([]);

  useEffect(() => {
    /*
      document.querySelector("class-name-here") specifies the name of the class
      .cloneNode(true) will create a copy of that element
      document.querySelector("class-name-here").appendChold("duped-object")
        - adds the node to the end of its list of children
    */
    const dupes = document.querySelector(".carousel-slider").cloneNode(true);
    document.querySelector(".carousel-container").appendChild(dupes);
  });

  useEffect(() => {
    if (items && items.length > 0) {
      const midpoint = Math.ceil(items.length / 70);
      let tempArray = [];
      let firstFifty = items.slice(0, midpoint);
      firstFifty.forEach((item) => {
        tempArray.push(item.track.album.images[1].url);
      });
      setSampleImages(tempArray);
    }
  }, [items]);

  return (
    <div className="carousel-container">
      <div className="carousel-slider">
        {sampleImages.map((image) => (
          <img key={image} alt="sample" src={image}></img>
        ))}
      </div>
    </div>
  );
};

export default PracticeScrollingCarousel;
