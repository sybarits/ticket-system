var Config = (function () {
    const service_url = "http://192.168.137.86:8080";
    const cloud_service_type = ["IBMQ", "IONQ", "DWAVE"];

    return {
        getServiceUrl() {
            return service_url;
        },
        getCloudServiceTypeList() {
            return cloud_service_type;
        },
    }

})();

export default Config;