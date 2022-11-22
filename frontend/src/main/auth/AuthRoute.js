import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthInfo from "./AuthInfo";


function AuthRoute({ component: Component, ...rest }) {
    const pathMap = {
        "cloud_user_input": "CloudUserInputs",
        "new_researcher_input": "NewResearcherInputs",
        "cloud_user": "CloudUser",
        "new_researcher": "NewResearcher",
    }

    const getPath = (str) => {
        if (str !== undefined) {
            return str
        }
        let path = window.location.pathname.split('/')[1];
        return pathMap[path];
    }

    return (
        (AuthInfo.checkComponentAuth(AuthInfo.getRole(), getPath(Component.type.name))) ? (
            Component
        ) : (
            <Navigate to='/signin' {...alert("접근할 수 없는 페이지")} />
        )
    );
}

export default AuthRoute;