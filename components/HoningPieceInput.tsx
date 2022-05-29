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

const Container = styled.div`
  position: relative;

  width: 7rem;
  height: 7rem;

  background-color: ${({ theme }) => theme.colors.surface.dark};
  background-color: ${({ theme }) => theme.colors.background.light};
  background-color: ${({ theme }) => theme.colors.surface.light};
  /* background-color: ${({ theme }) => theme.colors.surface.main}; */

  border-radius: 5px;
`;

const PositionContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 5px;

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

  background-color: ${({ theme }) => theme.colors.background.main};
  background-color: ${({ theme }) => theme.colors.background.lighter};
  background-color: ${({ theme }) => theme.colors.surface.lighter};
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
  data: HoningFields;
  handleChange: (value: HoningFields) => void;
};

const HoningPieceInput = ({ data, handleChange }: HoningPieceProps) => {
  const numToStr = (value: number) => (isNaN(value) ? "" : value.toString());
  // const strToNum = (value: string) => (isNaN(value) ? "" : value.toString());

  const validateInput = (value: string) => {
    const num = parseInt(value);

    if (num < 0) return 0;
    else if (num > 15) return 15;
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
      <PositionContainer>
        <BubbleInput
          value={data.honing_start}
          onChange={startHandler}
          onBlur={startBlurHandler}
        />

        <ArrowIcon>
          <MdDoubleArrow />
        </ArrowIcon>
        <BubbleInput
          value={data.honing_end}
          onChange={endHandler}
          onBlur={endBlurHandler}
        />
      </PositionContainer>
    </Container>
  );
};

export default HoningPieceInput;
