import React, { useState, useEffect } from "react";
import NewResearcherStatistics from "../new_researcher/NewResearcherStatistics";
import CloudUserChart from "./CloudUserChart";


function StatisticsTotal() {

    return (
        <div>
            <CloudUserChart />
            <NewResearcherStatistics />
        </div>
    );

}

export default StatisticsTotal;