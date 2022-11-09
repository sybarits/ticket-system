let AuthInfo = (function() {
    let token, ID, role, axiosConfig;

    const setToken = (t) => {
        token = t;
    }

    const getToken = () => {
        return token;
    }

    const setID = (i) => {
        ID = i;
    }

    const getID = () => {
        return ID;
    }

    const setRole = (r) => {
        role = r;
    }

    const getRole = () => {
        return role;
    }

    const getAxiosConfig = () => {
        return {
            headers: {
                "X-AUTH-TOKEN": token
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