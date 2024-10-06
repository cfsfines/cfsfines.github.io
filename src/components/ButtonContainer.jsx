import styled from "styled-components";
import { StyledButton } from "./SharedStyles";

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75%;
  flex-wrap: wrap;
  gap: 15px;
`;


const ButtonContainer = ({ updateCurrProj, buttons }) => {
  return (
    <>
      <StyledButtonContainer>
        {buttons.map((element, idx) => (
          <StyledButton
            key={element.Title}
            onClick={() => {
              updateCurrProj(buttons[idx]);
            }}
          >
            {element.Title}
          </StyledButton>
        ))}
      </StyledButtonContainer>
    </>
  );
};

export default ButtonContainer;
