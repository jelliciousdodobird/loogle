import styled from "@emotion/styled";

const Container = styled.footer`
  /* border-top: 1px solid ${({ theme }) => theme.colors.background.main}; */

  height: 20rem;
  padding-top: 3rem;
  padding-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.background.main};
  background-color: ${({ theme }) => theme.colors.background.dark};
  background-color: ${({ theme }) => theme.colors.surface.main};
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-top: 1px solid ${({ theme }) => theme.colors.background.light};

  /* background-color: ${({ theme }) => theme.colors.surface.main}; */
`;

const Content = styled.div`
  width: 55%;
  margin: 0 auto;
  /* color: black; */
`;

const Footer = () => {
  return (
    <Container>
      <Content>Footer</Content>
    </Container>
  );
};

export default Footer;
