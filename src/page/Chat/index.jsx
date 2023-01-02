import styled from "styled-components";
import { Link } from "react-router-dom";

import SmallProfile from "component/common/SmallProfile/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";

import useTopNavSetter from "hook/useTopNavSetter";

import { FONT_SIZE } from "constant/style";
import { PROFILE_SIZE } from "constant/size";
import ProfileImg from "asset/profile-img-42.png";

const ChatList = styled.ul`
  width: min(800px, 100%);
  margin: 15px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  li {
    margin-bottom: 16px;
  }
  li:last-child {
    margin-right: 0px;
  }
`;
const Time = styled.p`
  align-self: flex-end;
  line-height: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.snGreyOff};
  font-size: ${FONT_SIZE.SMALL};
`;

export default function ChatPage() {
  useTopNavSetter({
    title: "채팅 목록 페이지",
    left: <TopNavElement.GoBackButton />,
    right: <TopNavElement.MoreButton />,
  });

  return (
    <ChatList>
      <li>
        <Link to="/chat/chatroom">
          <SmallProfile
            src={ProfileImg}
            size={PROFILE_SIZE.SMALL}
            isNotifying={true}
          >
            <SmallProfile.Side
              left={
                <SmallProfile.Side.Title
                  title="최고의 사진작가 "
                  subtitle="세상에서 가장 자연스러운 일상을 담아드립니다."
                  gap={6}
                />
              }
              right={<Time>2020.10.25</Time>}
            />
          </SmallProfile>
        </Link>
      </li>
    </ChatList>
  );
}
