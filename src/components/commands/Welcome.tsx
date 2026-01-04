import {
  Cmd,
  HeroContainer,
  Link,
  PreImg,
  PreName,
  PreNameMobile,
  PreWrapper,
  Seperator,
} from "../styles/Welcome.styled";
import { useTerminalConfig } from "../../hooks/useTerminalConfig";

const Welcome: React.FC = () => {
  const { config } = useTerminalConfig();
  
  return (
    <HeroContainer data-testid="welcome">
      <div className="info-section">
        <PreName>
          {`
▄▄▌ ▐ ▄▌▪  ▄▄▌  ▄▄▌  ▪   ▄▄▄· • ▌ ▄ ·.   ▄▄▄   ▄▄▄· • ▌ ▄ ·. .▄▄ ·  ▄▄▄·  ▄· ▄▌
██· █▌▐███ ██•  ██•  ██ ▐█ ▀█ ·██ ▐███▪  ▀▄ █·▐█ ▀█ ·██ ▐███▪▐█ ▀. ▐█ ▀█ ▐█▪██▌
██▪▐█▐▐▌▐█·██ ▪ ██ ▪ ▐█·▄█▀▀█ ▐█ ▌▐▌▐█·  ▐▀▀▄ ▄█▀▀█ ▐█ ▌▐▌▐█·▄▀▀▀█▄▄█▀▀█ ▐█▌▐█▪
▐█▌██▐█▌▐█▌▐█▌ ▄▐█▌ ▄▐█▌▐█▪ ▐▌██ ██▌▐█▌  ▐█•█▌▐█▪ ▐▌██ ██▌▐█▌▐█▄▪▐█▐█▪ ▐▌ ▐█▀·.
 ▀▀▀▀ ▀▪▀▀▀.▀▀▀ .▀▀▀ ▀▀▀ ▀  ▀ ▀▀  █▪▀▀▀  .▀  ▀ ▀  ▀ ▀▀  █▪▀▀▀ ▀▀▀▀  ▀  ▀   ▀ • 

                                                                `}
        </PreName>
        <PreWrapper>
          <PreNameMobile>
            {`


 ________ __ __ __ __                     
|  |  |  |__|  |  |__|.---.-.--------.    
|  |  |  |  |  |  |  ||  _  |        |    
|________|__|__|__|__||___._|__|__|__|    
                                          
 ______                                   
|   __ \.---.-.--------.-----.---.-.--.--.
|      <|  _  |        |__ --|  _  |  |  |
|___|__||___._|__|__|__|_____|___._|___  |
                                   |_____|

                
          `}
          </PreNameMobile>
        </PreWrapper>
        <div>Welcome to my terminal portfolio. (Version {config.version})</div>
        <Seperator>----</Seperator>
        <div>
          This project's source code can be found in this project's{" "}
          <Link href={config.repositoryUrl}>
            GitHub repo
          </Link>
          .
        </div>
        <Seperator>----</Seperator>
        <div>
          For a list of available commands, type `<Cmd>help</Cmd>`.
        </div>
      </div>
    </HeroContainer>
  );
};

export default Welcome;
