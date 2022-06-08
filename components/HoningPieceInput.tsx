import styled from "@emotion/styled";
import { HoningFields } from "../pages/honing";

// icons:
import {
  MdArrowRightAlt,
  MdKeyboardArrowRight,
  MdDoubleArrow,
} from "react-icons/md";
import { ChangeEvent, FocusEventHandler, useEffect, useState } from "react";
import { motion } from "framer-motion";
import GearImage from "./GearImage";

const Container = styled.div`
  position: relative;

  width: 7rem;
  height: 7rem;
  min-width: 7rem;
  min-height: 7rem;

  background-color: ${({ theme }) => theme.colors.surface.dark};
  background-color: ${({ theme }) => theme.colors.background.light};
  background-color: ${({ theme }) => theme.colors.surface.light};
  /* background-color: ${({ theme }) => theme.colors.surface.main}; */

  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;

  border-radius: 16px;

  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PositionContainer = styled.div`
  /* border: 1px solid red; */

  overflow: hidden;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);

  position: absolute;
  bottom: 0;
  /* width: 100%; */
  margin-bottom: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h2`
  /* border: 1px solid red; */

  overflow: hidden;

  position: absolute;
  top: 0;
  margin-top: 5px;
  padding: 0.5rem;
  width: 90%;

  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 16px;

  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled(motion.div)`
  /* padding: 0.5rem; */
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  /* background-color: ${({ theme }) => theme.colors.background.main}; */
  /* background-color: ${({ theme }) => theme.colors.background.lighter}; */
  /* background-color: ${({ theme }) => theme.colors.surface.lighter}; */

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border-radius: 50%;

  font-weight: 600;
  text-align: center;

  width: 100%;
  height: 100%;

  background-color: transparent;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  &[type="number"] {
    appearance: textfield; /* Firefox */
  }
  &:focus {
    /* border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border: 2px solid ${({ theme }) => theme.colors.onSurface.main}; */
  }
`;

const ArrowIcon = styled.span`
  width: 1.25rem;
  height: 1.25rem;
  min-width: 1.25rem;
  min-height: 1.25rem;

  border-radius: 50%;
  /* background-color: #fff; */

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

type BubbleInputProps = {
  min?: number;
  max?: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
};

const BubbleInput = ({
  min = 0,
  max = 15,
  value,
  onChange,
  onBlur,
}: BubbleInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const bubbleAnimProps = {
    variants: {
      initial: {
        border: "0px solid white",
      },
      expand: {
        border: "3px solid white",
        // scale: 1.1,
      },
    },
    initial: "initial",
    animate: isFocused ? "expand" : "initial",

    transition: { duration: 0.1 },
  };

  return (
    <InputContainer {...bubbleAnimProps}>
      <Input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          onBlur && onBlur(e);
          setIsFocused(false);
        }}
        // onBlur={() => {
        //   if (isNaN(values.honing_start))
        //     handleChange({ ...data, honing_start: 0 });
        // }}
      />
    </InputContainer>
  );
};

type HoningPieceProps = {
  min?: number;
  max?: number;
  data: HoningFields;
  handleChange: (value: HoningFields) => void;
};

const HoningPieceInput = ({
  min = 0,
  max = 15,
  data,
  handleChange,
}: HoningPieceProps) => {
  const numToStr = (value: number) => (isNaN(value) ? "" : value.toString());
  // const strToNum = (value: string) => (isNaN(value) ? "" : value.toString());

  const validateInput = (value: string) => {
    const num = parseInt(value);

    if (num < min) return min;
    else if (num > max) return max;
    else if (isNaN(num)) return 0;
    else return num;
  };

  const updateField = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const rawInput = e.target.value;
    const newValue = validateInput(rawInput);

    handleChange({
      ...data,
      [key]: rawInput === "" ? "" : numToStr(newValue),
      // honing_end: numToStr(newEnd),
    });
  };

  const startHandler = (e: ChangeEvent<HTMLInputElement>) =>
    updateField(e, "honing_start");

  const endHandler = (e: ChangeEvent<HTMLInputElement>) =>
    updateField(e, "honing_end");

  const startBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { honing_start, honing_end } = data;

    const start = validateInput(honing_start);
    const end = validateInput(honing_end);

    const newEnd = start >= end ? start : end;

    handleChange({
      ...data,
      honing_start: honing_start === "" ? honing_end : honing_start,
      honing_end: numToStr(newEnd),
    });
  };

  const endBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { honing_end, honing_start } = data;

    const start = validateInput(honing_start);
    const end = validateInput(honing_end);

    const newStart = start >= end ? end : start;

    handleChange({
      ...data,
      honing_end: honing_end === "" ? honing_start : honing_end,
      honing_start: numToStr(newStart),
    });
  };

  return (
    <Container>
      <Header>{data.piece}</Header>
      <GearImage piece={data.piece} />
      <PositionContainer>
        <BubbleInput
          min={min}
          max={max}
          value={data.honing_start}
          onChange={startHandler}
          onBlur={startBlurHandler}
        />

        <ArrowIcon>
          <MdDoubleArrow />
        </ArrowIcon>
        <BubbleInput
          min={min}
          max={max}
          value={data.honing_end}
          onChange={endHandler}
          onBlur={endBlurHandler}
        />
      </PositionContainer>
    </Container>
  );
};

export default HoningPieceInput;
