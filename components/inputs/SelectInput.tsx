import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { MdArrowDropDown } from "react-icons/md";

const Container = styled.div`
  z-index: 2;
  position: relative;
`;

const Options = styled(motion.ul)`
  z-index: 1;

  position: absolute;
  width: 100%;
  margin-top: 0.5rem;

  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.surface.main};
  background-color: ${({ theme }) => theme.colors.surface.dark};
`;

const Option = styled.li`
  cursor: pointer;
  color: white;
  border-radius: 5px;
  padding: 0.5rem;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.darker};
    font-weight: 600;
  }
`;

const SelectedOption = styled.div`
  z-index: 2;
  position: relative;

  cursor: pointer;
  user-select: none;

  border-radius: 5px;
  padding: 0.5rem;
  /* padding-right: 0; */

  background-color: ${({ theme }) => theme.colors.surface.dark};

  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 0.5rem; */
`;

const SelectedText = styled.p`
  /* color: white; */
  /* border: 1px solid red; */

  flex: 1;
  font-weight: 600;
  white-space: nowrap;
`;

const ArrowIcon = styled(motion.span)`
  /* border: 1px solid red; */
  /* width: 2rem;
  height: 2rem; */

  background-color: ${({ theme }) => theme.colors.surface.lighter};
  border-radius: 3px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    /* width: 100%;
    height: 100%; */
  }
`;

type Props = {
  items: string[];
  selected: string;
  handleChange: (value: string) => void;
  className?: string;
};

const SelectInput = ({ items, selected, handleChange, className }: Props) => {
  const [showOptions, setShowOptions] = useState(false);

  const iconAnimProps = {
    variants: {
      initial: {
        rotate: 0,
      },
      expand: {
        rotate: 180,
      },
    },
    initial: "initial",
    animate: showOptions ? "expand" : "initial",

    // transition: { duration: 0.5 },
  };
  const optionsAnimProps = {
    variants: {
      initial: {
        y: -80,
        opacity: 0,
      },
      expand: {
        y: 0,
        opacity: 1,
      },
    },
    initial: "initial",
    animate: showOptions ? "expand" : "initial",
    exit: "initial",

    // transition: { duration: 0.5 },
  };

  const toggleShowOptions = () => setShowOptions((v) => !v);

  return (
    <Container className={className}>
      <SelectedOption onClick={toggleShowOptions}>
        <SelectedText>{selected}</SelectedText>
        <ArrowIcon {...iconAnimProps}>
          <MdArrowDropDown />
        </ArrowIcon>
      </SelectedOption>
      <AnimatePresence>
        {showOptions && (
          <Options
            {...optionsAnimProps}
            role="listbox"
            aria-activedescendant={selected}
          >
            {items.map((v) => (
              <Option
                key={v}
                role="option"
                aria-selected={selected === v}
                onClick={() => {
                  handleChange(v);
                  setShowOptions(false);
                }}
              >
                {v}
              </Option>
            ))}
          </Options>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default SelectInput;
