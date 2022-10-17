import logo from './ionqLogo.png';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 100%;
`

const Logo = styled.img`
  margin-top: 60px;
  width: 150px;
  height: 150px;
`
const Menu = styled.div`
  margin-top: 40px;
  width: 200px;
  display: flex;
  flex-direction: column;
`

function LeftSideMenu() {
    const menus = [
        { name: "home", path: "/" },
        { name: "tickets", path: "/tickets" },
        { name: "cloud users", path: "/cloud_users" }
    ];
    return (
        <Side>
            <Logo src={logo}></Logo>
            <Menu>
                {menus.map((menu, index) => {
                    return (
                        <Link to={menu.path}
                            key={index}
                            style={{ color: "gray", textDecoration: "none" }}
                            activestyle={{ color: "black" }}>
                            <div> {menu.name} </div>
                        </Link>
                    );
                })}
            </Menu>
        </Side>
    );
}

export default LeftSideMenu;