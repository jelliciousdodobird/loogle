import styled from "@emotion/styled";
import { HoningFields } from "../pages/honing";

// icons:
import {
  MdArrowRightAlt,
  MdKeyboardArrowRight,
  MdDoubleArrow,
  MdRemove,
} from "react-icons/md";
import { ChangeEvent, FocusEventHandler, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GearImage from "./GearImage";

import { MdAdd } from "react-icons/md";

const squareSize = 7;

const Container = styled.div`
  position: relative;
  /* overflow: hidden; */

  width: ${squareSize}rem;
  height: ${squareSize}rem;
  min-width: ${squareSize}rem;
  min-height: ${squareSize}rem;

  background-color: ${({ theme }) => theme.colors.surface.light};
  background-color: ${({ theme }) => theme.colors.surface.lighter};
  background-color: ${({ theme }) => theme.colors.surface.dark};

  border-radius: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PositionContainer = styled.div`
  /* border: 1px solid red; */

  /* overflow: hidden; */

  position: absolute;
  bottom: 0;
  /* width: 100%; */

  border-radius: 16px;
  /* border-top-left-radius: 0px; */
  /* border-bottom-right-radius: 16px; */
  /* border-top-right-radius: 0px; */

  /* background-color: ${({ theme }) => `${theme.colors.background.main}`}; */

  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);

  margin-bottom: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h2`
  /* border: 1px solid red; */

  /* overflow: hidden; */

  height: 2.25rem;
  max-height: 2.25rem;

  position: absolute;
  top: 0;
  /* margin-top: 5px; */
  padding: 0.5rem;
  width: 100%;

  /* background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px); */
  /* background-color: ${({ theme }) => theme.colors.background.main}; */
  background-color: ${({ theme }) => theme.colors.surface.lighter};
  background-color: ${({ theme }) => theme.colors.background.dark};

  border-radius: 16px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;

  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled(motion.div)`
  position: relative;

  /* border-radius: 25px; */

  /* overflow: hidden; */
  /* padding: 0.5rem; */
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border-radius: 2px;

  /* background-color: ${({ theme }) => theme.colors.background.main}; */
  /* background-color: ${({ theme }) => theme.colors.background.lighter}; */
  /* background-color: ${({ theme }) => theme.colors.surface.lighter}; */

  /* border: 1px solid red; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:focus-within {
    input {
      background-color: ${({ theme }) => theme.colors.background.dark};
    }
  }
`;

const Input = styled.input`
  z-index: 1;
  position: relative;

  border-radius: 50%;
  /* border-radius: 6px; */

  font-weight: 600;
  text-align: center;

  width: 90%;
  height: 90%;

  background-color: transparent;

  font-size: 0.8rem;

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

    /* background-color: ${({ theme }) => theme.colors.background.dark}; */
  }

  &::selection {
    background: white;
    color: #222;
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

const ButtonContainer = styled(motion.div)`
  z-index: 0;
  position: absolute;
  width: 100%;

  border-radius: 20px;
  overflow: hidden;

  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  /* filter: blur(5px); */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  /* background-color: ${({ theme }) => theme.colors.background.main}; */
  color: white;
  padding: 0.3rem;

  background-color: transparent;

  width: 100%;
  height: 2.25rem;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* padding: 0.2rem; */

  svg {
    width: 12px;
    height: 12px;
  }
`;

const BottomButton = styled(Button)`
  align-items: flex-end;
`;

type BubbleInputProps = {
  min?: number;
  max?: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  stepper?: (value: number) => void;
};

const BubbleInput = ({
  min = 0,
  max = 15,
  value,
  onChange,
  onBlur,
  stepper,
}: BubbleInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const bubbleAnimProps = {
    variants: {
      initial: {
        scaleY: 0,
        opacity: 0,
        // border: "0px solid white",
      },
      expand: {
        scaleY: 1,
        opacity: 1,
        // border: "3px solid white",
        // scale: 1.1,
      },
    },
    initial: "initial",
    animate: "expand",
    exit: "initial",

    transition: { duration: 0.25 },
  };

  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);

  const increment = () => {
    if (stepper) {
      const t = parseInt(value) ?? 0;
      stepper(clamp(t + 1, min, max));
    }
  };

  const decrement = () => {
    if (stepper) {
      const t = parseInt(value) ?? 0;
      stepper(clamp(t - 1, min, max));
    }
  };

  return (
    <InputContainer
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        // onBlur && onBlur(e);
        setIsFocused(false);
      }}
    >
      <AnimatePresence>
        {isFocused && (
          <ButtonContainer {...bubbleAnimProps}>
            <Button
              type="button"
              onClick={(e) => {
                increment && increment();
              }}
            >
              <MdAdd shapeRendering="crispEdges" />
            </Button>{" "}
            <BottomButton
              type="button"
              onClick={(e) => {
                decrement && decrement();
              }}
            >
              <MdRemove shapeRendering="crispEdges" />
            </BottomButton>
          </ButtonContainer>
        )}
      </AnimatePresence>

      <Input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        // onFocus={() => setIsFocused(true)}
        // onBlur={(e) => {
        //   onBlur && onBlur(e);
        //   setIsFocused(false);
        // }}
        onBlur={(e) => {
          onBlur && onBlur(e);
          // setIsFocused(false);
        }}
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

  const startStepper = (value: number) =>
    handleChange({ ...data, honing_start: value.toString() });

  const endStepper = (value: number) =>
    handleChange({ ...data, honing_end: value.toString() });

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
      {/* <GearImage piece={data.piece} /> */}
      <PositionContainer>
        <BubbleInput
          min={min}
          max={max}
          value={data.honing_start}
          onChange={startHandler}
          onBlur={startBlurHandler}
          stepper={startStepper}
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
          stepper={endStepper}
        />
      </PositionContainer>
    </Container>
  );
};

export default HoningPieceInput;
