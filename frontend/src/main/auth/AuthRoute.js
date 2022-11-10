import { Route, Navigate } from "react-router-dom";
import AuthInfo from "./AuthInfo";


function AuthRoute({ component: Component, ...rest }) {
    console.log("AuthInfo Role ", AuthInfo.getRole())
    console.log("AuthRoute Component ",Component.type.name);
    return (
        (AuthInfo.getRole() === "ROLE_USER") ? (
            Component
        ) : (
            <Navigate to='/signin' {...alert("접근할 수 없는 페이지")} />
        )
    );
}

export default AuthRoute;