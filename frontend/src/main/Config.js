let Config = (function () {
    const service_url = "http://192.168.137.86:8080";
    const cloud_service_type = ["IBMQ", "IONQ", "DWAVE"];
    
    return {
        getServiceUrl() {
            return service_url;
        },
        getCloudServiceTypeList() {
            return cloud_service_type;
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
        }
    }

})();

export default Config;