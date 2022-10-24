import Logo from "./Logo";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS } from "./Constants";
import { BiHomeAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoMdNotifications } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Nav>
      <Ul>
        <NavigationLink to={"/"}>
          <Li>
            <Logo />
          </Li>
        </NavigationLink>
        <NavigationLink to={`/`}>
          <Li>
            <BiHomeAlt />
            <Span>Home</Span>
          </Li>
        </NavigationLink>
        <NavigationLink to={`/${currentUser.profile.handle}`}>
          <Li>
            <CgProfile />
            <Span>Profile</Span>
          </Li>
        </NavigationLink>
        <NavigationLink to={`/notifications`}>
          <Li>
            <IoMdNotifications />
            <Span>Notifications</Span>
          </Li>
        </NavigationLink>
        <NavigationLink to={`/bookmarks`}>
          <Li>
            <FaRegBookmark /> <Span>Bookmarks</Span>
          </Li>
        </NavigationLink>
      </Ul>
    </Nav>
  );
};
const Span = styled.span`
  margin-left: 10px;
  display: inline-block;
`;
const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &.active {
    color: ${COLORS.primary};
  }
`;
const Li = styled.li`
  margin-bottom: 20px;
  display: flex;
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Nav = styled.nav`
  display: flex;
  margin-left: 125px;
  margin-top: 30px;
  padding-right: 20px;
  flex-direction: column;
  float: left;
  width: 125px;
  height: 100vh;
  border-right: 1px solid rgb(217, 217, 217);
  &.active {
    color: ${COLORS.primary};
  }
`;

export default Sidebar;
