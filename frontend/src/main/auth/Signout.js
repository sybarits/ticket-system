import { Route, Navigate } from "react-router-dom";
import AuthInfo from "./AuthInfo";


function SignOut({ component: Component, ...rest }) {
    console.log("sign out id", AuthInfo.getID());
    console.log("sign out token", AuthInfo.getToken());

    AuthInfo.setID("");
    AuthInfo.setRole("");
    AuthInfo.setToken("");

    return (
        <Navigate to='/' {...alert("로그아웃 되었습니다.")} />
    );
}

export default SignOut;