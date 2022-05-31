import styled from "@emotion/styled";

// icons:
import { MdMap, MdShoppingBasket, MdPlusOne, MdCheckBox } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import { GiStoneSphere } from "react-icons/gi";
import NavItem from "./NavItem";
import NavbarItem from "./NavbarItem";
import Logo from "./Logo";

const Container = styled.nav`
  height: 5rem;

  background-color: ${({ theme }) => theme.colors.background.dark};

  display: flex;
  justify-content: center;
`;

const List = styled.ul`
  /* border: 2px dashed orange; */

  width: 55%;
  margin: 0 auto;

  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 1rem;
`;

const Item = styled.li`
  color: white;
`;

const StretchedItem = styled(Item)`
  flex: 1;
`;

const links = [
  // { name: "Home", link: "/", order: 0, color: "#428ae8", icon: MdMap },
  { name: "Map", link: "/map", order: 0, color: "#19b28e", icon: MdMap },
  {
    name: "Market",
    link: "/market",
    order: 1,
    color: "#fee257",
    icon: RiAuctionFill,
  },
  {
    name: "Mari's Shop",
    link: "/mari",
    order: 3,
    color: "#f99155",
    icon: MdShoppingBasket,
  },
  {
    name: "Daily Tracker",
    link: "/dailies",
    order: 2,
    color: "#ff3939",
    icon: MdCheckBox,
  },
  {
    name: "Stone Cutter",
    link: "/stone-cutter",
    order: 5,
    color: "#b237d7",
    icon: GiStoneSphere,
  },
  {
    name: "Honing Calculator",
    link: "/honing",
    order: 4,
    color: "#217aff",
    icon: MdPlusOne,
  },
];

const Navbar = () => {
  return (
    <Container>
      <List>
        <StretchedItem>
          <Logo />
        </StretchedItem>

        {links.map((link) => (
          <Item key={link.name}>
            <NavbarItem
              key={link.name}
              name={link.name}
              // color={link.color}
              // icon={link.icon}
              link={link.link}
            />
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default Navbar;
