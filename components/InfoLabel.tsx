import styled from "@emotion/styled";
import { ReactNode, useState } from "react";
import DynamicPortal from "./DynamicPortal";

const Container = styled.div`
  position: relative;

  user-select: none;

  font-size: 0.8rem;
  font-weight: 600;
  font-style: italic;
  /* color: #222; */

  padding: 0.35rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.onBackground.darker};
  background-color: ${({ theme }) => theme.colors.background.main};

  border-top-left-radius: 13px;
  border-bottom-right-radius: 13px;

  display: flex;
  gap: 0.25rem;

  span {
    color: inherit;
    font-size: 0.8rem;
    white-space: nowrap;
    font-style: normal;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const TooltipContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid red;
`;

type Props = { children: ReactNode; tooltipText?: string };

const InfoLabel = ({ children, tooltipText }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const show = tooltipText !== undefined && showTooltip;

  return (
    <Container
      tabIndex={0}
      onClick={() => setShowTooltip((v) => !v)}
      // onBlur={() => setShowTooltip(false)}
    >
      {show && (
        <DynamicPortal portalId="app" backdrop>
          <TooltipContainer>
            <Container>{children}</Container>
            {tooltipText}
          </TooltipContainer>
        </DynamicPortal>
      )}
      {children}
    </Container>
  );
};

export default InfoLabel;
