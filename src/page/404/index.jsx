import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Button from "component/common/Button";

import { BUTTON_STATE } from "constant/button_state";
import { BUTTON_SIZE } from "constant/size";
import { FONT_SIZE, MAX_WIDTH } from "constant/style";

import SnappyError from "asset/logo-404-343264.png";

const MainLogoWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;


  img {
    width: 50vw;
    max-width: 500px;
    transform: translateX(max(-4vw, -45px));
  }

  .PageNotFound {
    padding-top: 20px;
    padding-bottom: 20px;
    font-weight: 700;
    font-size: ${FONT_SIZE.LARGE};
    color: ${({ theme }) => theme.snGreyMain};

    @media (min-width: ${MAX_WIDTH}) {
      font-size: ${FONT_SIZE.XX_LARGE};
      padding-top: 0px;
    }
  }

  .main-logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    

    @media (min-width: ${MAX_WIDTH}) {
      background-color: ${({ theme }) => theme.snWhite};
      border-radius: 50%;
      padding: 30px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  img {
    width: 30vw;
    max-width: 330px;
    transform: translateX(10vw);
  }

  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  text-align: center;

  .logo2 {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    transform: translateY(10vw);
  }

  .logo3 {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
  }
  .logo4 {
    grid-column: 3 / 4;
    grid-row: 3 / 4;
    transform: translateY(10vw);
  }

  @media (min-width: ${MAX_WIDTH}) {
    visibility: hidden;
  }
`;

export default function NotFoundErrorPage() {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  return (
    <>
      <Wrapper>
        <img src={SnappyError} alt="404 로고 이미지입니다" className="logo1" />
        <img src={SnappyError} alt="404 로고 이미지입니다" className="logo2" />
        <img src={SnappyError} alt="404 로고 이미지입니다" className="logo3" />
        <img src={SnappyError} alt="404 로고 이미지입니다" className="logo4" />
      </Wrapper>
      <MainLogoWrapper>
        <div className="main-logo-container">
          <img
            src={SnappyError}
            alt="404 로고 이미지입니다"
            className="mainlogo"
          />
          <p className="PageNotFound">Page Not Found</p>
          <Button
            className="PrevPageBtn"
            type="button"
            size={BUTTON_SIZE.LARGE_44}
            state={BUTTON_STATE.LARGE_44.ABLED}
            onClick={goback}
          >
            이전 페이지
          </Button>
        </div>
      </MainLogoWrapper>
    </>
  );
}
