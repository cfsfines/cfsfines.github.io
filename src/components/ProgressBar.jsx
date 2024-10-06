import styled from "styled-components";

const ProgressBarContainer = styled.div`
  animation: load 3s normal forwards;
  background: rgba(255, 255, 255, 0.1);
  justify-content: flex-start;
  border-radius: 100px;
  align-items: center;
  position: relative;
  padding: 0 5px;
  display: flex;
  height: 40px;
  width: 500px;
  cursor: pointer;
`;

const Progress = styled.div`
  border-radius: 100px;
  background: steelblue;
  height: 30px;
  width: var(--progress-width);
`;

const ProgressBar = ({ value, max, onClick }) => {
  // allows for dynamic updates witout generating a large number of classes
  const widthPercentage = (value / max) * 100;
  return (
    <ProgressBarContainer onClick={onClick} style={{ "--progress-width": `${widthPercentage}%` }}>
      <Progress></Progress>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
