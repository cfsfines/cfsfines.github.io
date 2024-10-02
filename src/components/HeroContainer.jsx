import { useEffect, useState } from "react";
import styled from "styled-components";
import skills from "../assets/skills.json";
import StyledButton from "./StyledButton";

const ResizedIcons = styled.img`
  width: 50px;
`;

const ResizedButtonIcons = styled.img`
  width: 30px;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50vw;
`;

const ParentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Skills = styled.div`
  display: flex;
  gap: 10px;
`;

const Pfp = styled.img`
  width: 15vw;
  border: 2px #626f86 solid;
  border-radius: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const H4Hero = styled.h4`
  font-size: 2em;
  margin-bottom: 20px;
`;

const NameHero = styled.h1`
  font-size: 4em;
  font-weight: 600;
  margin-bottom: 20px;
`;

const HeroContainer = () => {
  const [gitHubData, setGithubData] = useState([]);
  useEffect(() => {
    fetch("https://api.github.com/users/cfsfines")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setGithubData(data);
      });
  }, []);

  const handleResumeClick = () => {
    window.open("/Christopher Fines Resume.pdf", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/christopher-fines-133637194/", "_blank");
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/cfsfines", "_blank");
  };

  return (
    <>
      <ParentContainer>
        <MainContainer>
          <H4Hero>Hello, my name is</H4Hero>
          <NameHero>Christopher Fines</NameHero>
          <H4Hero>{gitHubData.bio}</H4Hero>

          <ButtonContainer>
            <StyledButton onClick={handleResumeClick}>Resume</StyledButton>
            <StyledButton onClick={handleLinkedInClick}>
              <ResizedButtonIcons
                id="linkedIn"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg"
              />
            </StyledButton>
            <StyledButton onClick={handleGitHubClick}>
              <ResizedButtonIcons
                id="github"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
              />
            </StyledButton>
          </ButtonContainer>

          <h3>Skills</h3>

          <Skills>
            {skills.map(({ src, alt }) => (
              <ResizedIcons key={src} src={src} alt={alt} />
            ))}
          </Skills>
        </MainContainer>

        <div>
          <Pfp src={gitHubData.avatar_url} alt="gitHub PFP" />
        </div>
      </ParentContainer>
    </>
  );
};

export default HeroContainer;
