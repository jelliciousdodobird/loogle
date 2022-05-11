import styled from "@emotion/styled";
import Link from "next/link";

const Container = styled.a`
  font-weight: 700;
  font-size: 1.2rem;
`;

type Props = { className?: string };

const Logo = ({ className }: Props) => {
  return (
    <Link href={`/`} passHref>
      <Container className={className}>LOOGLE</Container>
    </Link>
  );
};

export default Logo;
