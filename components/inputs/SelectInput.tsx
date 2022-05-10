import styled from "@emotion/styled";
import { useState } from "react";

import { MdArrowDropDown } from "react-icons/md";

const Container = styled.div`
  z-index: 2;
  position: relative;
`;

const Options = styled.ul`
  position: absolute;
  width: 100%;

  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.surface.main};
`;

const Option = styled.li`
  cursor: pointer;
  color: white;
  border-radius: 5px;
  padding: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const SelectedOption = styled.div`
  cursor: pointer;

  border-radius: 5px;
  padding: 0.5rem;

  background-color: ${({ theme }) => theme.colors.primary.main};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const SelectedText = styled.p`
  color: white;
  white-space: nowrap;
`;

const ArrowIcon = styled.span`
  /* border: 1px solid red; */
  /* width: 2rem;
  height: 2rem; */

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

  const toggleShowOptions = () => setShowOptions((v) => !v);

  return (
    <Container className={className}>
      <SelectedOption onClick={toggleShowOptions}>
        <SelectedText>{selected}</SelectedText>
        <ArrowIcon>
          <MdArrowDropDown />
        </ArrowIcon>
      </SelectedOption>
      {showOptions && (
        <Options role="listbox" aria-activedescendant={selected}>
          {items.map((v) => (
            <Option
              key={v}
              role="option"
              aria-selected={selected === v}
              onClick={() => handleChange(v)}
            >
              {v}
            </Option>
          ))}
        </Options>
      )}
    </Container>
  );
};

export default SelectInput;
