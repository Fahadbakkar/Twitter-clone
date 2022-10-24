import styled from "styled-components";
import moment from "moment";
import ActionBar from "./ActionBar";
import { useNavigate } from "react-router-dom";

const SmallTweetFeed = ({ data }) => {
  let navigate = useNavigate();

  const date = moment(data.timestamp).format(" MMMM Do ");

  return (
    <>
      <Wrapper>
        <AvatarSrc alt="feed" src={data.author.avatarSrc} />

        <SpecialDiv>
          <Div>
            <Name>
              <DisplayName>{data.author.displayName}</DisplayName>
              <Username
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/${data.author.handle}`);
                }}
              >
                @{data.author.handle}
              </Username>
              <Date>- {date}</Date>
            </Name>
          </Div>
          <LowerDiv>
            <MainContent onClick={() => navigate(`/tweet/${data.id}`)}>
              <P>{data.status}</P>
              {data.media.length > 0 && (
                <Media alt="Media" src={data.media[0].url}></Media>
              )}
            </MainContent>
          </LowerDiv>
          <Footer>
            <ActionBar
              numRetweets={data.numRetweets}
              isLiked={data.isLiked}
              numLikes={data.numLikes}
            />
          </Footer>
        </SpecialDiv>
      </Wrapper>
    </>
  );
};

const SpecialDiv = styled.div`
  margin-right: 50px;
`;
const LowerDiv = styled.div`
  margin-top: 20px;
`;
const Footer = styled.div`
  margin-top: 10px;
`;
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const P = styled.p`
  font-size: 15px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: flex-start;
  margin-left: 54px;
  text-align: left;
`;
const Div = styled.div`
  display: flex;
`;
const Media = styled.img`
  display: flex;
  width: 400px;
  height: 300px;
  display: block;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
  margin-top: 5px;
`;
const Date = styled.p`
  font-size: 14px;
  color: rgb(101, 119, 134);
`;
const Wrapper = styled.header`
  display: flex;

  margin-bottom: 10px;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(217, 217, 217);
  border-right: 1px solid rgb(217, 217, 217);
  margin-right: 400px;
`;

const AvatarSrc = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-left: 10px;
`;

const Name = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  padding: 0px 16px;
`;

const DisplayName = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-right: 5px;
`;

const Username = styled.p`
  color: rgb(101, 119, 134);
  font-size: 16px;
  margin-right: 5px;
`;

export default SmallTweetFeed;
