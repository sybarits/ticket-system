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
import NewResearchersTable from './new_researcher/NewResearchersTable.js';
import NewResearcher from './new_researcher/NewResearcher.js';
import NewResearcherInputs from './new_researcher/NewResearcherInputs.js';
import NewResearcherStatistics from './new_researcher/NewResearcherStatistics.js';
import StatisticsTotal from './statistics/StatisticsTotal.js';
import SettlementTask from './settlement/SettlementTask.js';

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
                {/* <Route path="/signup" element={<SignUp />}></Route> */}
                <Route path="/ticket/:ticketId" element={<AuthRoute component={<Ticket />} />}></Route>
                <Route path="/tickets/*" element={<AuthRoute component={<Tickets />} />}></Route>
                <Route path="/ticket_input" element={<AuthRoute component={<TicketInputs />} />}></Route>
                <Route path="/cloud_users/*" element={<AuthRoute component={<CloudUsers />} />}></Route>
                <Route path="/cloud_user/:userId" element={<AuthRoute component={<CloudUser />} />}></Route>
                <Route path="/cloud_user_input" element={<AuthRoute component={<CloudUserInputs />} />}></Route>
                <Route path="/new_researcher_table/*" element={<AuthRoute component={<NewResearchersTable />} />}></Route>
                <Route path="/new_researcher/:userId" element={<AuthRoute component={<NewResearcher />} />}></Route>
                <Route path="/new_researcher_input" element={<AuthRoute component={<NewResearcherInputs />} />}></Route>
                <Route path="/new_researcher_statistics" element={<AuthRoute component={<NewResearcherStatistics />} />}></Route>
                <Route path="/statistics_total" element={<StatisticsTotal />}></Route>
                <Route path="/settlement_task" element={<SettlementTask />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Body>
    );
}

export default MainBody;