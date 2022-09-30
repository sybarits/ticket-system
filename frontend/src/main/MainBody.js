import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import Tickets from './Tickets.js';
import CloudUsers from './CloudUsers.js';
import NotFound from '../NotFound.js';
import styled from "styled-components";

const Body = styled.div`
  display: flex;
  margin: 60px 0px 0px 0px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 305px);
  height: 100%;
`

function MainBody() {

    return (
        <Body>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/tickets/*" element={<Tickets />}></Route>
                <Route path="/cloud_users/*" element={<CloudUsers />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Body>
    );
}

export default MainBody;