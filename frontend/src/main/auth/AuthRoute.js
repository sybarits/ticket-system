import { Route, Navigate } from "react-router-dom";
import AuthInfo from "./AuthInfo";


function AuthRoute({ component: Component, ...rest }) {
    console.log("AuthRoute ID", AuthInfo.getID());
    console.log("AuthRoute token", AuthInfo.getToken());
    return (
        (AuthInfo.getRole() === "USER") ? (
            Component
        ) : (
            <Navigate to='/signin' {...alert("접근할 수 없는 페이지")} />
        )
    );
}

export default AuthRoute;