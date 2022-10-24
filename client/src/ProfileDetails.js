import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import ActionBar from "./ActionBar";
import Home from "./Home";
import Error from "./Error";
import SmallTweetFeed from "./SmallTweetFeed";
// import { NavLink } from "react-router-dom";
// import { COLORS } from "./Constants";
const ProfileDetails = () => {
  const { profileId } = useParams();
  //useContext
  const { currentUser, status, setStatus } = useContext(CurrentUserContext);
  //
  const [error, setError] = useState(null);
  const [newProfile, setNewProfile] = useState(null);
  const [feed, setFeed] = useState(null);
  //
  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((profileData) => {
        console.log(profileData);
        setNewProfile(profileData);
        console.log(newProfile);
      })
      .catch((error) => {
        console.error("error:", error);
        setError(true);
      });
  }, [profileId]);
  //
  //

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((profileFeed) => {
        setFeed(profileFeed);
        console.log(feed);
      })
      .catch((error) => {
        console.error("error:", error);
        setError(true);
      });
  }, [profileId]);
  //

  let date = null;
  if (newProfile) {
    date = moment(newProfile.profile.joined).format("MMM Do YYYY");
  }
  console.log(date);
  const follows = () => {
    if (newProfile.profile.isFollowingYou === true) {
      return "Follows you";
    }
    return null;
  };
  ///
  //
  return error === true ? (
    <Error />
  ) : !newProfile ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <MainWrapper>
        <BannerDiv>
          <img src={newProfile.profile.bannerSrc} alt="banner" />
        </BannerDiv>
        <Img src={newProfile.profile.avatarSrc} alt="avatar" />
        <NameDiv>
          <ButtonLine>
            <P>{newProfile.profile.displayName}</P>
            <FollowButton>
              {newProfile.profile.ifBeingFollowedByYou ? "Following" : "Follow"}
            </FollowButton>
          </ButtonLine>
          <Para>
            @{newProfile.profile.handle}{" "}
            {newProfile.profile.isFollowingYou ? "Follows you" : null}
          </Para>
          <Bio>{newProfile.profile.bio}</Bio>
          <Pa>
            {newProfile.profile.location && <MdLocationOn />}{" "}
            {newProfile.profile.location}
            {"  "}
            <Span>
              <GoCalendar /> Joined {date}
            </Span>
          </Pa>
        </NameDiv>
        <div>
          <PofFollower>
            {newProfile.profile.numFollowing} <Follow>Following </Follow>
            <SpanOfFollow>
              {newProfile.profile.numFollowers} <Follow>Followers</Follow>
            </SpanOfFollow>
          </PofFollower>
        </div>
        <DivofTypes>
          <p>Tweets</p>
          <p>Media</p>

          <p>Likes</p>
        </DivofTypes>
        {!feed ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {feed &&
              Object.values(feed.tweetsById).map((tweet) => (
                <SmallTweetFeed data={tweet} />
              ))}
          </>
        )}
      </MainWrapper>
    </>
  );
};

const LowerDiv = styled.div`
  margin-top: 20px;
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
const Div = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  margin-top: 5px;
  border-bottom: 1px solid rgb(217, 217, 217);
`;
const Name = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 0px 16px;
`;
const Footer = styled.div`
  margin-top: 10px;
`;
const SpecialDiv = styled.div`
  margin-right: 50px;
`;
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Date = styled.p`
  font-size: 12px;
  color: rgb(101, 119, 134);
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
`;

const AvatarSrc = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-left: 10px;
`;

const ButtonLine = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FollowButton = styled.button`
  background-color: hsl(258deg, 100%, 50%);
  color: white;
  border: none;
  border-radius: 5px;
`;

const DivofTypes = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  width: 70rem;
  color: grey;
  border-bottom: 1px solid rgb(217, 217, 217);
`;
const PofFollower = styled.p`
  font-size: 13px;
  margin-left: 5px;
`;
const Follow = styled.span`
  color: rgb(101, 119, 134);
`;
const SpanOfFollow = styled.span`
  margin-left: 7px;
`;
const Pa = styled.p`
  color: rgb(101, 119, 134);
`;
const Span = styled.span`
  margin-left: 5px;
`;
const Bio = styled.p`
  font-size: 18px;
  font-weight: lighter;
  margin-bottom: 5px;
`;
const Para = styled.p`
  color: rgb(101, 119, 134);
  font-size: 18px;
  margin-bottom: 5px;
`;
const P = styled.p`
  font-weight: bold;
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
`;
const NameDiv = styled.div`
  position: relative;
  top: -20px;
  margin-left: 5px;
`;
const MainWrapper = styled.div`
  height: 100vh;
  width: 80vw;
`;
const BannerDiv = styled.div`
  img {
    width: 500px;
    height: 200px;
  }
`;
const Img = styled.img`
  width: 78px;
  height: 78px;
  border-radius: 50%;
  margin-left: 10px;
  position: relative;
  top: -30px;
`;
export default ProfileDetails;
