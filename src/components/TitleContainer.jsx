import styled from "styled-components";

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleWeight = styled.h2`
  font-weight: 700;
  letter-spacing: 1px;
`;

const DescriptionWeight = styled.p`
  font-weight: 600;
  letter-spacing: 1.5px;
`;

const TitleContainer = ({ title, description }) => {
  return (
    <StyledTitleContainer>
      <TitleWeight>{title}</TitleWeight>
      <DescriptionWeight>{description}</DescriptionWeight>
    </StyledTitleContainer>
  );
};

export default TitleContainer;
