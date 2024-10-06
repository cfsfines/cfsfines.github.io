import { GenericFlexContainer, TitleText, GenericParagraphText, GenericImage, StyledSpotifyButton } from "./SharedStyles";
import he from "he";

const PlaylistCard = ({ playlistData }) => {
  const {
    name,
    description,
    external_urls: { spotify },
    images,
    tracks: { total },
  } = playlistData;

  return (
    <>
      <GenericFlexContainer backgroundColor="#181818" padding="25px" borderRadius="50px" flexDirection="row" gap="25px" margin="50px 0 0 0">
        <GenericFlexContainer>
          <GenericImage borderRadius="50px" src={images[0].url} alt="playlist art" width="250px" />
        </GenericFlexContainer>
        <GenericFlexContainer alignItems="flex-start">
          <GenericParagraphText>Loaded Playlist:</GenericParagraphText>
          <TitleText>{name}</TitleText>
          <GenericParagraphText>{he.decode(description)}</GenericParagraphText>
          <GenericParagraphText margin="15px 0 0 0">Track count: {total}</GenericParagraphText>
          <a href={spotify} target="_blank" rel="noopener noreferrer">
            <StyledSpotifyButton margin="30px 0 0 0">Open in Spotify</StyledSpotifyButton>
          </a>
        </GenericFlexContainer>
      </GenericFlexContainer>
    </>
  );
};

export default PlaylistCard;
