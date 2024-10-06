import styled from "styled-components";
import { useRef, useState } from "react";
import HeroContainer from "./HeroContainer";
import InfoContainer from "./InfoContainer";
import {StyledCardContainer} from "./SharedStyles";
import ButtonContainer from "./ButtonContainer";
import TitleContainer from "./TitleContainer";
import AboutMe from "../assets/aboutme";
import proj1 from "../assets/proj-and-exp/proj1.json";
import proj2 from "../assets/proj-and-exp/proj2.json";
import proj3 from "../assets/proj-and-exp/proj3.json";
import proj4 from "../assets/proj-and-exp/proj4.json";
import proj5 from "../assets/proj-and-exp/proj5.json";
import exp1 from "../assets/proj-and-exp/exp1.json";
import exp2 from "../assets/proj-and-exp/exp2.json";
import exp3 from "../assets/proj-and-exp/exp3.json";
import eduMS from "../assets/education/eduMS.json";
import eduBS from "../assets/education/eduBS.json";

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
`;

const Spacer2 = styled.div`
  margin-top: 25%;
`;

const LinkStyling = styled.p`
  font-size: 2em;
  font-weight: 500;
`;

const UopLogo = styled.img`
  width: 200px;
`;

const NavHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 7vh;
  background: #8590a2;
  border-bottom: 5px solid #626f86;
  z-index: 1;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  width: 35%;
  margin-right: 2%;
`;

const NavElement = styled.a`
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  border: none;
  color: white;
  text-decoration: none;
  &:hover {
    filter: brightness(75%);
  }
`;

const Home = () => {
  const projList = [proj5, proj4, proj1, proj2, proj3];
  const expList = [exp1, exp2, exp3];

  const [currProj, updateCurrProj] = useState(proj5);
  const [currExp, updateCurrExp] = useState(exp1);

  const aboutMeRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const scrollToRef = (ref) =>
    window.scrollTo({ top: ref.current.offsetTop - 120, behavior: "smooth" });
  return (
    <>
      <NavHeader>
        <NavContainer>
          <div>
            <NavElement onClick={() => scrollToRef(aboutMeRef)}>
              About Me
            </NavElement>
          </div>
          <div>
            <NavElement onClick={() => scrollToRef(projectsRef)}>
              Projects
            </NavElement>
          </div>
          <div>
            <NavElement onClick={() => scrollToRef(experienceRef)}>
              Experience
            </NavElement>
          </div>
          <div>
            <NavElement onClick={() => scrollToRef(educationRef)}>
              Education
            </NavElement>
          </div>
        </NavContainer>
      </NavHeader>

      <HeroContainer />
      <StyledCenterContainer>
        <div ref={aboutMeRef} />
        <TitleContainer title={"About Me"} description={""} />
        <AboutMe />

        <Spacer />

        <StyledCardContainer>
          <div ref={projectsRef} />
          <TitleContainer
            title={"Projects"}
            description={
              "My ability to build high quality software and solutions with real-world applications"
            }
          />
          <ButtonContainer
            currProj={currProj}
            updateCurrProj={updateCurrProj}
            buttons={projList}
          />
          <InfoContainer info={currProj} />
        </StyledCardContainer>

        <Spacer2 />

        <StyledCardContainer>
          <div ref={experienceRef} />
          <TitleContainer
            id="experience-jump"
            title={"Experience"}
            description={"My involvement in the office"}
          />
          <ButtonContainer
            currProj={currExp}
            updateCurrProj={updateCurrExp}
            buttons={expList}
          />
          <InfoContainer info={currExp} />
        </StyledCardContainer>

        <Spacer2 />

        <StyledCardContainer>
          <div ref={educationRef} />
          <TitleContainer
            id="education-jump"
            title={"Education"}
            description={"The foundation of my technical expertise"}
          />
          <InfoContainer info={eduMS} />
          <InfoContainer info={eduBS} />
        </StyledCardContainer>
        <UopLogo src="/assets/images/uop.png" alt="uop" />

        <Spacer2 />

        <StyledCardContainer>
          <TitleContainer title={"Let's Connect!"} description={""} />
          <a href="mailto:cfsfines99@gmail.com">
            <LinkStyling>E-mail me here</LinkStyling>
          </a>
        </StyledCardContainer>

        <Spacer2 />
      </StyledCenterContainer>
    </>
  );
};

export default Home;
