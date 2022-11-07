let Var = (function () {
    const service_url = "http://192.168.137.86:8080";
    const cloud_service_type = ["IBMQ", "IONQ", "DWAVE"];
    const user_group = ["INDUSTRY", "RESEARCH", "EDUCATION"];
    const edu_group = ["EMPLOYEE", "GRADUATE", "STUDENT"];
    const inst_list = ["성균관대학교", "고려대학교", "서울대학교", "연세대학교", "POSTECH", "한양대학교", "UNIST", "KAIST"];
    const lineColor = {"IBMQ":"rgb(0, 64, 178)", "IONQ": "rgb(248, 155, 51)", "DWAVE":"rgb(23, 190, 187)"};
    
    return {
        getServiceUrl() {
            return service_url;
        },
        getCloudServiceTypeList() {
            return cloud_service_type;
        },
        getUserGroupList() {
            return user_group;
        },
        getEduGroupList() {
            return edu_group;
        },
        getInstitutionList() {
            return inst_list;
        },
        refreshPage() {
            window.location.reload(false);
        },
        resultData(data) {
            console.log("complete upload data", data);
        },
        Context() {
            const TicketInput = "TicketInputs";
            return {
                TicketInputs() {
                    return TicketInput;
                }
            }
        },
        getLineColor() {
            return lineColor;
        }
    }

})();

export default Var;