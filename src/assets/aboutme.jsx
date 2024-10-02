import styled from "styled-components";

const AboutMeBody = styled.p`
  font-size: 1.5em;
  letter-spacing: 1px;
`;

const aboutme = () => {
  return (
    <>
      <AboutMeBody>
        As an avid problem solver, hungry to learn new things, I typically
        gravitate towards bouldering, automation games, and puzzle games in my
        free time. What do those have in common? Turns out, it's breaking down
        complex situations into simpler steps when finding a solution!
        Naturally, my hobbies have led me to pursue software development.
      </AboutMeBody>
    </>
  );
};

export default aboutme;
