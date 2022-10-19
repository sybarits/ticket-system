var Config = (function () {
    const service_url = "http://192.168.137.86:8080";

    return {
        getServiceUrl() {
            return service_url;
        },

    }

})();

export default Config;