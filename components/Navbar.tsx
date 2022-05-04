import styled from "@emotion/styled";

const Container = styled.nav`
  border: 1px solid blue;

  height: 5rem;

  color: white;
`;

const List = styled.ul`
  /* border: 2px dashed orange; */

  width: 55%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Item = styled.li`
  color: white;
`;

const items = [];

const Navbar = () => {
  return (
    <Container>
      <List>
        <Item>dfkj</Item>
        <Item>dfkj</Item>
        <Item>dfkj</Item>
        <Item>dfkj</Item>
        <Item>dfkj</Item>
        <Item>dfkj</Item>
        <Item>dfkj</Item>
        <Item>dfkj</Item>
        <Item>dfkj</Item>
      </List>
    </Container>
  );
};

export default Navbar;
