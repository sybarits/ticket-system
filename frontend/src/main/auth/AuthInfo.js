import React, { useEffect } from "react";
import axios from 'axios';
import Var from "../Var";

let AuthInfo = (function() {

    // Kind of role 
    //     "ADMIN",
    //     "CLOUD",
    //     "NEWRESEARCHER",

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

    const setAdminComponents = (a) => {
        sessionStorage.setItem("adminComponents",a);
    }

    const getAdminComponents = () => {
        return sessionStorage.getItem("adminComponents");
    }

    const setCloudServiceComponents = (c) => {
        sessionStorage.setItem("cloudServiceComponents",c);
    }

    const getCloudServiceComponents = () => {
        return sessionStorage.getItem("cloudServiceComponents");
    }

    const setNewResearcherComponents = (n) => {
        sessionStorage.setItem("newResearcherComponents",n);
    }

    const getNewResearcherComponents = () => {
        return sessionStorage.getItem("newResearcherComponents");
    }

    const checkComponentAuth = (role, component) => {
        if (role == undefined || role == null) {
            return false;
        }
        if (!role.startsWith("ROLE")) {
            return false;
        }
        let role_str = role.substr(5);
        if (role_str == "ADMIN" &&  getAdminComponents().includes(component)) {
            return true;
        } else if (role_str == "CLOUD" &&  getCloudServiceComponents().includes(component)) {
            return true;
        } else if (role_str == "NEWRESEARCHER" && getNewResearcherComponents().includes(component)) {
            return true;
        }

        return false;
    }
    if (getAdminComponents() == null || getAdminComponents() == undefined || getAdminComponents() == '') {
        axios
            .get(Var.getServiceUrl() + "/authpage", getAxiosConfig())
            .then(({ data }) => {
                console.log(data);
                setAdminComponents(data.administrator);
                setCloudServiceComponents(data.cloudService);
                setNewResearcherComponents(data.newResearcher);
            });
    }


    return {
        setToken,
        getToken,
        setID,
        getID,
        setRole,
        getRole,
        getAxiosConfig,
        setAdminComponents,
        getAdminComponents,
        setCloudServiceComponents,
        getCloudServiceComponents,
        setNewResearcherComponents,
        getNewResearcherComponents,
        checkComponentAuth,
        
    }

})();

export default AuthInfo;