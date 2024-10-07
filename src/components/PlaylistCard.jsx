import { useEffect, useState } from "react";
import { GenericFlexContainer, TitleText, GenericParagraphText, GenericImage, StyledSpotifyButton } from "./SharedStyles";
import he from "he";
import styled, { keyframes, css } from "styled-components";

const PlaylistCard = ({ playlistData, showCopyID = false, isIdCopied, setIsIdCopied, animationDirection }) => {
  const {
    name,
    description,
    external_urls: { spotify },
    images,
    tracks: { total },
    id,
  } = playlistData;

  const copyID = () => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        setIsIdCopied(true);
        setTimeout(() => setIsIdCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy ID: ", err);
      });
  };

  return (
    <>
      <GenericFlexContainer
        maxWidth="50vw"
        backgroundColor="#181818"
        padding="25px"
        borderRadius="50px"
        flexDirection="row"
        gap="25px"
        width="100%"
        height="100%"
      >
        <GenericFlexContainer>
          <GenericImage borderRadius="50px" src={images[0].url} alt="playlist art" width="250px" />
        </GenericFlexContainer>
        <GenericFlexContainer alignItems="flex-start">
          <GenericParagraphText>Loaded Playlist:</GenericParagraphText>
          <TitleText>{name}</TitleText>
          <GenericParagraphText>{he.decode(description)}</GenericParagraphText>
          <GenericParagraphText margin="15px 0 0 0">Track count: {total}</GenericParagraphText>
          <GenericFlexContainer flexDirection="row" margin="30px 0 0 0">
            <a href={spotify} target="_blank" rel="noopener noreferrer">
              <StyledSpotifyButton>Open in Spotify</StyledSpotifyButton>
            </a>
            {showCopyID && <StyledSpotifyButton onClick={copyID}>{isIdCopied ? "Copied!" : "Copy ID"}</StyledSpotifyButton>}
          </GenericFlexContainer>
        </GenericFlexContainer>
      </GenericFlexContainer>
    </>
  );
};

export default PlaylistCard;
