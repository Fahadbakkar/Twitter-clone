import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import ActionBar from "./ActionBar";
import { CurrentUserContext } from "./CurrentUserContext";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
const TweetDetails = () => {
  let navigate = useNavigate();
  const { tweetId } = useParams();

  const [tweetDetail, setTweetDetail] = useState(null);
  const { status, setStatus } = useContext(CurrentUserContext);
  const [error, setError] = useState(null);
  // const [isLiked, setIsLiked] = setIsLiked(false);
  // const [likes, setLikes] = setLikes(tweetDetail.tweet.numLikes);
  useEffect(() => {
    setStatus("loading");

    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setTweetDetail(data);
      })
      .catch((error) => {
        console.error("error:", error);
        setError(true);
      });
    setStatus("idle");
  }, []);

  // likebutton

  return error ? (
    <Error />
  ) : status === "loading" ? (
    <h1>Loading...</h1>
  ) : (
    <>
      {tweetDetail && (
        <>
          <Wrapper>
            <AvatarSrc src={tweetDetail.tweet.author.avatarSrc} alt=" avatar" />
            <SpecialDiv>
              <Div>
                <Name>
                  <DisplayName>
                    {tweetDetail.tweet.author.displayName}
                  </DisplayName>
                  <Username
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/${tweetDetail.tweet.author.handle}`);
                    }}
                  >
                    @{tweetDetail.tweet.author.handle}
                  </Username>
                </Name>
              </Div>
              <LowerDiv>
                <MainContent>
                  <P>{tweetDetail.tweet.status}</P>
                  {tweetDetail.tweet.media.length > 0 && (
                    <Media
                      alt="Media"
                      src={tweetDetail.tweet.media[0].url}
                    ></Media>
                  )}
                  <Date>
                    {" "}
                    {moment(tweetDetail.tweet.timestamp).format(
                      "h:mm a - MMMM Do YYYY - "
                    )}{" "}
                    Critter web app
                  </Date>
                </MainContent>
                <Footer>
                  <ActionBar
                    numLikes={tweetDetail.tweet.numLikes}
                    isLiked={tweetDetail.tweet.isLiked}
                  />
                </Footer>
              </LowerDiv>
            </SpecialDiv>
          </Wrapper>
        </>
      )}
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
  font-size: 20px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;

  text-align: left;
`;
const Div = styled.div`
  display: flex;
`;
const Media = styled.img`
  width: 500px;
  height: 300px;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const Date = styled.p`
  font-size: 12px;
  color: rgb(101, 119, 134);
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(217, 217, 217); ;
`;
const Wrapper = styled.header`
  display: flex;

  margin-bottom: 10px;
  margin-top: 10px;

  border-right: 1px solid rgb(217, 217, 217);
  margin-right: 400px;
`;
const Name = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 0px 16px;
`;
const Username = styled.p`
  color: rgb(101, 119, 134);
  font-size: 12px;
  margin-right: 5px;
`;
const DisplayName = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin-right: 5px;
  display: block;
`;
const AvatarSrc = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-left: 10px;
`;
export default TweetDetails;
