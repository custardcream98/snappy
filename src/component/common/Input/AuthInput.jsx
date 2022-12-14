import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * 로그인, 이메일로 회원가입, 프로필 설정
 */
export default function AuthInput({
  type = "text",
  id,
  labelText,
  useRef,
  ...props
}) {
  return (
    <InputContainer>
      <Label htmlFor={id}>{labelText}</Label>
      <Input type={type} ref={useRef} {...props} />
    </InputContainer>
  );
}

AuthInput.propTypes = {
  type: PropTypes.string.isRequired,
  useRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
};

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

/**
 * 이메일, 비밀번호
 */
const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px; // 15.02px
  color: black;
`;

const Input = styled.input`
  padding-top: 25px;
  margin-bottom: 16px;
  height: 48px;
  border-bottom: 1px solid #dbdbdb;
  :focus {
    border-bottom: 1px solid #33afd8;
  }
`;
