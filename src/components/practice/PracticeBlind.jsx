import { useEffect, useState } from "react";
import "./PracticeBlind.css";

const PracticeBlind = ({ loadedPlaylists }) => {
  const [selected, setSelected] = useState(null);

  const {
    tracks: { items },
  } = loadedPlaylists;

  useEffect(() => {
    const dupes = document.querySelector(".blind-carousel-slider").cloneNode(true);
    document.querySelector(".blind-carousel-container").appendChild(dupes);
  }, []);

  const handleClick = (e) => {
    setSelected(e.target.src);
  };

  return (
    <>
      <div className="blind-carousel-container">
        <div className="blind-carousel-slider" name="name">
          {items.map((item) => (
            <img key={item.track.id} src={item.track.album.images[0].url} alt="icon"></img>
          ))}
        </div>
      </div>

      <div className="selector">
        {items.map((item) => (
          <img
            onClick={handleClick}
            key={item.track.id}
            src={item.track.album.images[0].url}
            alt="icon"
            className={selected === item.track.album.images[0].url ? "selected" : ""}
          ></img>
        ))}
      </div>
      <div>
        <h3>{selected}</h3>
      </div>
    </>
  );
};

export default PracticeBlind;
