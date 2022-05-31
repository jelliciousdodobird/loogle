import styled from "@emotion/styled";
import { ReactElement } from "react";

const Container = styled.button`
  border-radius: 5px;
  padding: 0.5rem 1rem;

  background-color: ${({ theme }) => theme.colors.surface.light};

  font-weight: 600;
`;

type Props = {
  className?: string;
  type?: "button" | "reset" | "submit";
  children?: ReactElement | string;
  onClick?: () => void;
  title?: string;
};

const Button = ({
  type = "button",
  children,
  onClick,
  className,
  title,
}: Props) => {
  return (
    <Container
      className={className}
      type={type}
      onClick={onClick}
      title={title}
    >
      {children}
    </Container>
  );
};

export default Button;
