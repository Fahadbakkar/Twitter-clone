import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import styled from "styled-components";
import { useState } from "react";
const ActionBar = ({
  numRetweets,
  handleToggleLike,
  isLiked,
  numLikes,
  Likes,
}) => {
  const [numOfLikes, setNumOfLikes] = useState(Number(numLikes));
  const [isItLiked, setIsItLiked] = useState(isLiked);

  const handleClick = () => {
    if (isItLiked === true) {
      setNumOfLikes(numOfLikes - 1);
      setIsItLiked(false);
    } else {
      setNumOfLikes(numOfLikes + 1);
      setIsItLiked(true);
    }
  };

  return (
    <Wrapper>
      <Button>
        {" "}
        <BiMessageRounded style={{ fontSize: "18px" }} />
      </Button>
      <Div>
        <Button onClick={handleToggleLike}>
          {" "}
          <AiOutlineRetweet style={{ fontSize: "18px" }} />
        </Button>
        <P>{numRetweets >= 1 ? numRetweets : null}</P>
      </Div>
      <Button onClick={handleClick}>
        {" "}
        <BiHeart
          style={{ color: isItLiked === true ? "red" : null, fontSize: "18px" }}
        />{" "}
        <span>{numOfLikes}</span>
      </Button>

      <Button>
        {" "}
        <FiShare style={{ fontSize: "18px" }} />
      </Button>
    </Wrapper>
  );
};
const P = styled.p`
  font-size: 13px;
  margin-left: 3px;
`;
const Div = styled.div`
  display: flex;
`;
const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  backface-visibility: hidden;
  fill: none;
  &:hover {
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px;
  width: 70rem;
`;
export default ActionBar;
