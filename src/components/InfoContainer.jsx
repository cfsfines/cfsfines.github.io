import styled from "styled-components";

const StyledContainer = styled.div`
  border: #626f86 solid;
  border-radius: 30px;
  text-align: center;
  padding: 0px 20px 0px 20px;
  margin: 1%;
  text-align: left;
  width: 75%;
`;

const ResizedIcons = styled.img`
  width: 50px;
`;

const StyledTitleSpan = styled.span`
  font-size: 1.5em;
  font-weight: 500;
  letter-spacing: 1px;
`;

const StyledCompanySpan = styled.span`
  font-size: 1.2em;
  font-weight: 500;
`;

const StyledDatesSpan = styled.span`
  font-size: 1em;
  font-weight: 500;
`;

const StyledBulletPoints = styled.ul`
  font-size: 1.1em;
  letter-spacing: 1px;
`;
const StyledIconDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 5px;
`;

const InfoContainer = ({ info }) => {
  return (
    <>
      <StyledContainer>
        <p>
          <StyledTitleSpan>{info.Title}</StyledTitleSpan>
          <StyledCompanySpan> - {info.Company}</StyledCompanySpan>
          <br />
          <StyledDatesSpan>{info.Dates}</StyledDatesSpan>

          {"GPA" in info ? (
            <>
              <StyledDatesSpan>&emsp; GPA: {info.GPA}</StyledDatesSpan>
            </>
          ) : undefined}
        </p>

        {info.bulletPoints === undefined ? undefined : (
          <StyledBulletPoints>
            {info.bulletPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </StyledBulletPoints>
        )}

        {info.Demo === "" && info.toolsUsed.length === 0 ? undefined : (
          <>
            <a href={info.Demo} target="_blank" rel="noreferrer">
              Check it out here
            </a>
            <p>Tools Used:</p>
            <StyledIconDiv>
              {info.toolsUsed.map((tool) => (
                <ResizedIcons
                  src={tool.src}
                  alt={tool.alt}
                  key={`${tool.src}-${tool.alt}`}
                />
              ))}
            </StyledIconDiv>
          </>
        )}
      </StyledContainer>
    </>
  );
};

export default InfoContainer;
