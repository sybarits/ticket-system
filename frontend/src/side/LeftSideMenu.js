import logo from './ionqLogo.png';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import AuthInfo from '../main/auth/AuthInfo';
import Var from '../main/Var';

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
        { name: "cloud users", path: "/cloud_users" },
        { name: "new researcher", path: "/new_researcher_table" },
        { name: "statistics", path: "/statistics_total" },
        { name: "settlement", path: "/settlement_task" },
    ];

    const nevigate = useNavigate();
    
    const handleLogin = () => {
        nevigate('/signin');
    }
    
    const handleLogout = () => {
        AuthInfo.setID("");
        AuthInfo.setRole("");
        AuthInfo.setToken("");
        alert("Logout Success!");
        nevigate('/signin');
    }

    return (
        <Side>
            <Link to={"/"} key={"logo"} >
                <Logo src={logo}></Logo>
            </Link>
            <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }} >
                {(AuthInfo.getToken() == null || AuthInfo.getToken() === "") && <Button variant="outlined" onClick={handleLogin}>Login</Button>}
                {(AuthInfo.getToken() != null && AuthInfo.getToken() != "") && <Button variant="outlined" onClick={handleLogout}>Logout</Button>}
            </Stack>
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