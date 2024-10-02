import styled from "styled-components";
import HeroContainer from './components/HeroContainer';
import InfoContainer from './components/InfoContainer';
import StyledCardContainer from "./components/CardContainer";
import ButtonContainer from "./components/ButtonContainer";
import TitleContainer from "./components/TitleContainer";
import AboutMe from "./assets/aboutme";
import proj1 from "./assets/proj-and-exp/proj1.json"
import proj2 from "./assets/proj-and-exp/proj2.json"
import proj3 from "./assets/proj-and-exp/proj3.json"
import proj4 from "./assets/proj-and-exp/proj4.json"
import proj5 from "./assets/proj-and-exp/proj5.json"
import exp1 from "./assets/proj-and-exp/exp1.json"
import exp2 from "./assets/proj-and-exp/exp2.json"
import exp3 from "./assets/proj-and-exp/exp3.json"
import eduMS from "./assets/education/eduMS.json"
import eduBS from "./assets/education/eduBS.json"
import { useState } from "react";

const StyledCenterContainer = styled.div`
    text-align: center;
    flex-direction: column;
    width: 65vw;
    margin: auto;
    padding-top: 5vh;
    padding-bottom: 5vh;
`;

const Spacer = styled.div`
  margin-top: 30%;
`
const Spacer2 = styled.div`
  margin-top: 25%;
`

const LinkStyling = styled.p`
font-size: 2em;
font-weight: 500;
`

const UopLogo = styled.img`
width: 200px;
`

function App() {
  const projList = [proj1, proj2, proj3, proj4, proj5]
  const expList = [exp1, exp2, exp3]

  const [currProj, updateCurrProj] = useState(proj5)
  const [currExp, updateCurrExp] = useState(exp1)

  return (
    <>
      <HeroContainer />
      <StyledCenterContainer>

        <TitleContainer id="about-me-jump" title={'About Me'} description={''} />
        <AboutMe />

        <Spacer />

        <StyledCardContainer>
          <TitleContainer id="projects-jump" title={'Projects'} description={'My ability to build high quality software and solutions with real-world applications'} />
          <ButtonContainer currProj={currProj} updateCurrProj={updateCurrProj} buttons={projList} />
          <InfoContainer info={currProj} />
        </StyledCardContainer>

        <Spacer2 />

        <StyledCardContainer>
          <TitleContainer id="experience-jump" title={'Experience'} description={'My involvement in the office'} />
          <ButtonContainer currProj={currExp} updateCurrProj={updateCurrExp} buttons={expList} />
          <InfoContainer info={currExp} />
        </StyledCardContainer>

        <Spacer2 />

        <StyledCardContainer>
          <TitleContainer id="education-jump" title={'Education'} description={'The foundation of my technical expertise'} />
          <InfoContainer info={eduMS} />
          <InfoContainer info={eduBS} />
        </StyledCardContainer>
        <UopLogo src="/assets/images/uop.png" alt="uop" />

        <Spacer2 />

        <StyledCardContainer>
          <TitleContainer title={'Let\'s Connect!'} description={''} />
          <a href="mailto:cfsfines99@gmail.com">
            <LinkStyling>
              E-mail me here
            </LinkStyling>
          </a>
        </StyledCardContainer>

        <Spacer2 />

      </StyledCenterContainer>
    </>
  );
}

export default App;
