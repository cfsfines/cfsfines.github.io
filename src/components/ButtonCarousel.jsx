import { GenericFlexContainer, StyledSpotifyButton } from "./SharedStyles";
import PlaylistCard from "./PlaylistCard";
import { useState } from "react";

const ButtonCarousel = ({ defaultPlaylists }) => {
  const [visiblePlaylist, setVisiblePlaylist] = useState(defaultPlaylists[0]);
  const [isIdCopied, setIsIdCopied] = useState(false);

  const handleClick = (playlist) => {
    if (playlist.id !== visiblePlaylist.id) {
      setIsIdCopied(false);
      setVisiblePlaylist(playlist);
    }
  };

  return (
    <>
      <GenericFlexContainer flexDirection="row" alignItems="stretch" margin="0 0 50px 0">
        {defaultPlaylists.map((playlist) => (
          <StyledSpotifyButton
            opacity={playlist.name === visiblePlaylist.name ? "1" : "0.3"}
            key={playlist.name}
            onClick={() => handleClick(playlist)}
          >
            {playlist.name}
          </StyledSpotifyButton>
        ))}
      </GenericFlexContainer>

      <GenericFlexContainer>
        <PlaylistCard playlistData={visiblePlaylist} showCopyID={true} isIdCopied={isIdCopied} setIsIdCopied={setIsIdCopied}></PlaylistCard>
      </GenericFlexContainer>
    </>
  );
};

export default ButtonCarousel;
