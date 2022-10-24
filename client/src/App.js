import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import ProfileDetails from "./ProfileDetails";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
const App = () => {
  //useEffect for fetch
  const { status, setStatus, setCurrentUser, currentUser } =
    useContext(CurrentUserContext);

  return (
    <>
      {status === "loading" ? (
        <h1>Loading...</h1>
      ) : (
        <Div>
          <GlobalStyles />
          <Router>
            <Sidebar />
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/tweet/:tweetId" element={<TweetDetails />} />
                <Route path="/:profileId" element={<ProfileDetails />} />
              </Routes>
            </div>
          </Router>
        </Div>
      )}
    </>
  );
};
const Div = styled.div`
  display: flex;
`;
export default App;
