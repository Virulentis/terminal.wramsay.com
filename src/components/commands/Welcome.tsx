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


                      ,,    ,,    ,,    ,,                             
\`7MMF\'     A     \`7MF\'db  \`7MM  \`7MM    db                             
  \`MA     ,MA     ,V        MM    MM                                   
   VM:   ,VVM:   ,V \`7MM    MM    MM  \`7MM   ,6"Yb.  \`7MMpMMMb.pMMMb.  
    MM.  M\' MM.  M\'   MM    MM    MM    MM  8)   MM    MM    MM    MM  
    \`MM A\'  \`MM A\'    MM    MM    MM    MM   ,pm9MM    MM    MM    MM  
     :MM;    :MM;     MM    MM    MM    MM  8M   MM    MM    MM    MM  
      VF      VF    .JMML..JMML..JMML..JMML.\`Moo9^Yo..JMML  JMML  JMML.
                                                                       
                                                                       
                                                                       
                                                                       
\`7MM"""Mq.                                                             
  MM   \`MM.                                                            
  MM   ,M9   ,6"Yb.  \`7MMpMMMb.pMMMb.  ,pP"Ybd  ,6"Yb.\`7M\'   \`MF\'      
  MMmmdM9   8)   MM    MM    MM    MM  8I   \`" 8)   MM  VA   ,V        
  MM  YM.    ,pm9MM    MM    MM    MM  \`YMMMa.  ,pm9MM   VA ,V         
  MM   \`Mb. 8M   MM    MM    MM    MM  L.   I8 8M   MM    VVV          
.JMML. .JMM.\`Moo9^Yo..JMML  JMML  JMML.M9mmmP\' \`Moo9^Yo.  ,V           
                                                         ,V            
                                                      OOb"             



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
