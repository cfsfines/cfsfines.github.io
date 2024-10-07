import { styled, createGlobalStyle } from "styled-components";
import { createShouldForwardProp } from "@styled-system/should-forward-prop";

const shouldForwardProp = createShouldForwardProp([
  "alignItems",
  "backgroundColor",
  "borderRadius",
  "bottom",
  "flexDirection",
  "flexWrap",
  "gap",
  "height",
  "isCorrect",
  "isSelected",
  "justifyContent",
  "left",
  "margin",
  "marginBottom",
  "marginTop",
  "maxWidth",
  "opacity",
  "overflow",
  "padding",
  "position",
  "rowGap",
  "showCorrect",
  "top",
  "transform",
  "whiteSpace",
  "width",
]);

export const BackgroundColor = createGlobalStyle`

:root {
  --background-color: #212121;
  --text-color: #b3b3b3;
  --font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  --button-background-color: #535353;
  --button-text-color: white
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;

export const TitleText = styled("h1").withConfig({
  shouldForwardProp,
})`
  margin: ${({ margin }) => margin || 0};
`;

export const GenericParagraphText = styled("p").withConfig({
  shouldForwardProp,
})`
  margin: ${({ margin }) => margin || 0};
  max-width: ${({ maxWidth }) => maxWidth || "100%"};
`;

// https://getcssscan.com/css-buttons-examples button 17
export const StyledButton = styled.button`
  align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px, rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: 0.25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform, opacity;
  z-index: 0;

  &:hover {
    background: #f6f9fe;
    color: #174ea6;
  }

  &:focus {
    outline: none;
    border: 2px solid #4285f4;
  }
`;

export const StyledCardContainer = styled.div`
  /* background-color: gray; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

/* Button 27 */
export const StyledSpotifyButton = styled("button").withConfig({
  shouldForwardProp,
})`
  appearance: none;
  align-items: center;
  background-color: ${({ isCorrect, isSelected, showCorrect }) => {
    if (showCorrect) {
      return "green";
    }
    if (isSelected) {
      return isCorrect ? "green" : "red";
    }
    return "var(--button-background-color)";
  }};
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: var(--button-text-color);
  cursor: pointer;
  display: flex;
  flex: 1;
  font-family: var(--font-family);
  font-size: 16px;
  font-weight: 600;
  height: ${({ height }) => height || "auto"};
  justify-content: center;
  line-height: normal;
  margin: ${({ margin }) => margin || 0};
  min-height: 60px;
  min-width: 0;
  opacity: ${({ opacity }) => opacity || 1};
  outline: none;
  padding: ${({ padding }) => padding || "16px 24px"};
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  white-space: ${({ whiteSpace }) => whiteSpace || "normal"};
  width: ${({ width }) => width || "100%"};
  will-change: transform;

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

export const GenericFlexContainer = styled("div").withConfig({
  shouldForwardProp,
})`
  align-items: ${({ alignItems }) => alignItems || "center"};
  background-color: ${({ backgroundColor }) => backgroundColor || "transparent"};
  border-radius: ${({ borderRadius }) => borderRadius || 0};
  bottom: ${({ bottom }) => bottom || "auto"};
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
  flex-wrap: ${({ flexWrap }) => flexWrap || "nowrap"};
  gap: ${({ gap }) => gap || 0};
  height: ${({ height }) => height || "auto"};
  justify-content: ${({ justifyContent }) => justifyContent || "space-evenly"};
  left: ${({ left }) => left || "auto"};
  margin: ${({ margin }) => margin || 0};
  max-width: ${({ maxWidth }) => maxWidth || "none"};
  overflow: ${({ overflow }) => overflow || "visible"};
  padding: ${({ padding }) => padding || 0};
  position: ${({ position }) => position || "static"};
  row-gap: ${({ rowGap }) => rowGap || 0};
  top: ${({ top }) => top || "auto"};
  transform: ${({ transform }) => transform || "none"};
  width: ${({ width }) => width || "auto"};
`;

export const GenericImage = styled("img").withConfig({
  shouldForwardProp,
})`
  width: ${({ width }) => width || "auto"};
  margin: ${({ margin }) => margin || 0};
  border-radius: ${({ borderRadius }) => borderRadius || 0};
`;

/*
  https://copy-paste-css.com/form-input-text
*/
export const InputField = styled.input`
  flex: 1;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  border-radius: 2px;
  font-size: 16px;
  font-weight: normal;
  line-height: 18px;
  min-height: 36px;
  min-width: 30ch;
  padding: 0 8px;
  transition: all 0.2s ease-in-out 0s;
  vertical-align: middle;
  width: 100%;
  &:focus {
    border: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
    outline: none;
  }
`;
