import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import Tickets from './ticket/Tickets.js';
import Ticket from './ticket/Ticket.js';
import CloudUsers from './cloud_user/CloudUsers.js';
import CloudUser from './cloud_user/CloudUser.js';
import CloudUserInputs from './cloud_user/CloudUserInputs.js';
import NotFound from '../NotFound.js';
import styled from "styled-components";
import TicketInputs from './ticket/TicketInputs.js';

const Body = styled.div`
  display: flex;
  margin: 0px 0px 0px 0px;
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
                <Route path="/ticket/:ticketId" element={<Ticket />}></Route>
                <Route path="/tickets/*" element={<Tickets />}></Route>
                <Route path="/ticket_input" element={<TicketInputs />}></Route>
                <Route path="/cloud_users/*" element={<CloudUsers />}></Route>
                <Route path="/cloud_user/:userId" element={<CloudUser />}></Route>
                <Route path="/cloud_user_input" element={<CloudUserInputs />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Body>
    );
}

export default MainBody;