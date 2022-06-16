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

const CustomFullContainer = styled.div`
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
`;

const CustomBackdrop = styled.div`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.1);
`;

const Info = styled.div`
  background-color: ${({ theme }) => theme.colors.background.light};
  background-color: rgba(0, 0, 0, 0.5);

  /* border-top-left-radius: 13px;
  border-bottom-right-radius: 13px; */
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  overflow: hidden;
`;

const InfoHeader = styled.span`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.light};

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;
  padding: 0.5rem;
`;

const InfoTitle = styled.span`
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 700;
`;
const InfoDescription = styled.span`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;

  font-size: 0.8rem;
  font-weight: 600;
`;
// decide on whether or not you want the component passed in to be forced into
// an Info style or if we will allow them to just put it in with their own styles

type Props = {
  children: ReactNode;
  tooltipTitle?: string;
  tooltipDescription?: string;
  tooltipComponent?: ReactNode;
};

const InfoLabel = ({
  children,
  tooltipTitle,
  tooltipDescription,
  tooltipComponent,
}: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const show =
    (tooltipTitle !== undefined || tooltipComponent !== undefined) &&
    showTooltip;

  return (
    <Container
      tabIndex={0}
      onClick={() => setShowTooltip((v) => !v)}
      // onBlur={() => setShowTooltip(false)}
    >
      {show && (
        // <DynamicPortal portalId="app" backdrop>
        <DynamicPortal portalId="app">
          <CustomFullContainer>
            <CustomBackdrop />
            <TooltipContainer>
              <Info>
                <InfoHeader>
                  <Container>{children}</Container>
                  {tooltipTitle !== undefined ? (
                    <InfoTitle>{tooltipTitle}</InfoTitle>
                  ) : null}
                </InfoHeader>
                {tooltipDescription !== undefined ? (
                  <InfoDescription>{tooltipDescription}</InfoDescription>
                ) : null}
                {tooltipComponent !== undefined ? tooltipComponent : null}
              </Info>
            </TooltipContainer>
          </CustomFullContainer>
        </DynamicPortal>
      )}
      {children}
    </Container>
  );
};

export default InfoLabel;
