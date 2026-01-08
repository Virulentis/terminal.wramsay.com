import { useEffect, useState } from "react";
import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
} from "../styles/About.styled";
import { getCVData, CVData } from "../../utils/cvData";

const About: React.FC = () => {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCVData = async () => {
      try {
        const data = await getCVData();
        setCvData(data);
      } catch (error) {
        console.error('Failed to load CV data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCVData();
  }, []);

  if (loading) {
    return (
      <AboutWrapper data-testid="about">
        <p>Loading...</p>
      </AboutWrapper>
    );
  }

  const name = cvData?.cv?.name || "William Ramsay";
  const location = cvData?.cv?.location || "Vancouver, British Columbia";

  return (
    <AboutWrapper data-testid="about">
      <p>
        Hi, my name is <HighlightSpan>{name}</HighlightSpan>!
      </p>
      <p>
        I'm <HighlightAlt>a programer</HighlightAlt> based in {location}.
      </p>
      <p>
        I am passionate about servers and <br />
        tinkering to solve real-life challenges.
      </p>
    </AboutWrapper>
  );
};

export default About;
