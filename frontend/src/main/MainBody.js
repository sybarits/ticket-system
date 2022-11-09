import {Routes, Route} from 'react-router-dom';
import Home from './Home.js';
import Tickets from './ticket/Tickets.js';
import Ticket from './ticket/Ticket.js';
import CloudUsers from './cloud_user/CloudUsers.js';
import CloudUser from './cloud_user/CloudUser.js';
import CloudUserInputs from './cloud_user/CloudUserInputs.js';
import NotFound from '../NotFound.js';
import styled from "styled-components";
import TicketInputs from './ticket/TicketInputs.js';
import AuthRoute from './auth/AuthRoute.js';
import SignIn from './auth/SignIn.js';
import SignOut from './auth/Signout.js';

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
                <Route path="/signin" element={<SignIn />}></Route>
                <Route path="/signout" element={<SignOut />}></Route>
                {/* <Route path="/signup" element={<SignUp />}></Route> */}
                <Route path="/ticket/:ticketId" element={<AuthRoute component={<Ticket />} />}></Route>
                <Route path="/tickets/*" element={<AuthRoute component={<Tickets />} />}></Route>
                <Route path="/ticket_input" element={<AuthRoute component={<TicketInputs />} />}></Route>
                <Route path="/cloud_users/*" element={<AuthRoute component={<CloudUsers />} />}></Route>
                <Route path="/cloud_user/:userId" element={<AuthRoute component={<CloudUser />} />}></Route>
                <Route path="/cloud_user_input" element={<AuthRoute component={<CloudUserInputs />} />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Body>
    );
}

export default MainBody;