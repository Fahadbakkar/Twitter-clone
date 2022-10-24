import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import SmallTweetFeed from "./SmallTweetFeed";
import { CurrentUserContext } from "./CurrentUserContext";
import Error from "./Error";
const Home = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [characterCount, setCharacterCount] = useState(280);
  const [homeFeed, setHomeFeed] = useState(null);
  const [value, setValue] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(null);
  //
  //
  useEffect(() => {
    console.log("useEffect was triggered");
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((homeData) => {
        setHomeFeed(homeData);
      })
      .catch((error) => {
        console.error("error:", error);
        setError(true);
      });
  }, [submit]);

  //
  const handleSubmit = (e) => {
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: value }),
    })
      .then((res) => res.json())
      .then(setSubmit(!submit))
      .catch((error) => {
        console.error("error:", error);
        setError(true);
      });
  };

  return error ? (
    <Error />
  ) : (
    <>
      <H>Meow Meow </H>
      {!currentUser ? (
        "loading"
      ) : (
        <>
          <PostDiv>
            <Div>
              <Img src={currentUser.profile.avatarSrc} />

              <Textarea
                placeholder="What's Happening?"
                value={value}
                onChange={(e) => {
                  setCharacterCount(280 - e.target.value.length);
                  setValue(e.target.value);
                }}
              ></Textarea>
            </Div>
            <BottomDiv>
              <Button
                disabled={characterCount < 0 || characterCount === 280}
                onClick={handleSubmit}
              >
                Meow
              </Button>

              <Span
                style={{
                  color:
                    characterCount <= 55 && characterCount >= 0
                      ? "rgb(204, 204, 0)"
                      : characterCount < 0
                      ? "red"
                      : null,
                }}
              >
                {characterCount}
              </Span>
            </BottomDiv>
          </PostDiv>
          <Tweets>
            {homeFeed &&
              Object.values(homeFeed.tweetsById).map((tweet) => (
                <SmallTweetFeed data={tweet} />
              ))}
          </Tweets>
        </>
      )}
    </>
  );
};
const Tweets = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
const PostDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgb(217, 217, 217);
  margin-right: 400px;
`;
const BottomDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const Button = styled.button`
  background-color: hsl(258deg, 100%, 50%);
  border: 1px solid #eee;
  border-radius: 30px;
  color: #fefefe;
  font-size: 18px;
  width: 110px;
  height: 30px;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
    box-shadow: hsl(258deg, 100%, 50%) 0px 3px 5px;
  }
`;
const Span = styled.span`
  padding: 18px 14px;
  font-weight: normal;
`;
const Textarea = styled.textarea`
  border: 0 solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  font-family: "Times New Roman", Times, serif;
  font-size: 13px;
  padding: 15px 12px;
  outline: none;
  width: 100%;
`;
const Div = styled.div`
  font-size: 18px;
  padding: 10px;
  width: 100%;
  /* margin-right: 400px; */
  display: flex;
`;
const Img = styled.img`
  height: 48px;
  width: 48;
  border-radius: 50%;
`;
const H = styled.h1`
  text-align: left;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(217, 217, 217);
  margin-right: 400px;
`;
const P = styled.p`
  color: black;
  font-size: medium;
  display: inline-block;
  margin-left: 5%;
  margin-top: 5%;
`;
export default Home;
