let AuthInfo = (function() {
    let token, ID, role, axiosConfig;

    const setToken = (t) => {
        sessionStorage.setItem("token", t);
    }

    const getToken = () => {
        return sessionStorage.getItem("token");
    }

    const setID = (i) => {
        sessionStorage.setItem("userId", i);
    }

    const getID = () => {
        return sessionStorage.getItem("userId");
    }

    const setRole = (r) => {
        sessionStorage.setItem("role",r);
    }

    const getRole = () => {
        return sessionStorage.getItem("role");
    }

    const getAxiosConfig = () => {
        return {
            headers: {
                "X-AUTH-TOKEN": sessionStorage.getItem("token")
            }
        }
    }

    return {
        setToken,
        getToken,
        setID,
        getID,
        setRole,
        getRole,
        getAxiosConfig,
    }

})();

export default AuthInfo;