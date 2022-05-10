import styled from "@emotion/styled";

const Container = styled.footer`
  /* border-top: 1px solid ${({ theme }) => theme.colors.background.main}; */

  height: 20rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background.main};
  margin-top: 2rem;
`;

const Content = styled.div`
  width: 55%;
  margin: 0 auto;
  color: black;
`;

const Footer = () => {
  return (
    <Container>
      <Content>Footer</Content>
    </Container>
  );
};

export default Footer;
