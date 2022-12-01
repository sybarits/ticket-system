
let Day = (function() {

    const getPrevMonth = (day) => {//day will be 202207
        day = day.toString();
        let mon = day.substring(4, 6);
        let year = day.substring(0, 4);
        mon = parseInt(mon);
        year = parseInt(year);
        return ((mon - 1) == 0) ? String(year - 1) + "12" : String(year) + String(('0' + (mon - 1)).slice(-2));
    }
    
    const getNextMonth = (day) => {//day will be 202207
        day = day.toString();
        let mon = day.substring(4, 6);
        let year = day.substring(0, 4);
        mon = parseInt(mon);
        year = parseInt(year);
        return (mon == 12) ? String(year + 1) + "01" : String(year) + String(('0' + (mon + 1)).slice(-2));
    }

    const getMonthIndex = (monthLabels, application_date) => {//application_date will like "2022-06-02T14:59:08.000Z"
        if (application_date == undefined || application_date == null) return -1;
        const applicationYearMonth = application_date.substring(0, 4) + application_date.substring(5, 7);
        return monthLabels.indexOf(applicationYearMonth);
    }

    const getThisYearMonth = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        return year + month;//202207
    }

    const getMonthLength = (start, end) => {
        start = start.toString();
        end = end.toString();
        if (start.length != 6 || end.length != 6) {
            return -1;
        }
        let startMonth = start.substring(4, 6);
        let startYear = start.substring(0, 4);
        startMonth = parseInt(startMonth);
        startYear = parseInt(startYear);
        let endMonth = end.substring(4, 6);
        let endYear = end.substring(0, 4);
        endMonth = parseInt(endMonth);
        endYear = parseInt(endYear);

        const month = (endMonth - startMonth + 1);
        const year = endYear - startYear;
        const result = year * 12 + month;

        return result < 0 ? -1 : result;
    }

    const makeMonthLabels = () => {
        let yearMonth = getThisYearMonth();
        const monthLabels = [];
        for (let i = 11; i >= 0; i--) {
            monthLabels[i] = yearMonth;
            yearMonth = getPrevMonth(yearMonth);
        }
        return monthLabels;
    }

    
    const makeStartEndMonthLabels = (start, end) => {
        if (start.toString().length != 6 || end.toString().length != 6) {
            return [];
        }
        const len = getMonthLength(start, end);
        if (len < 1) return [];
        let yearMonth = start.toString();
        const monthLabels = [];
        for (let i = 0; i < len; i++) {
            monthLabels[i] = yearMonth;
            yearMonth = getNextMonth(yearMonth);
        }
        return monthLabels;
    }

    const makeMonthSheetNames = (data) => {
        const set = new Set();
        const dataLength = data.length;
        for (let i=0; i<dataLength; i++) {
            if (data[i]["승인일자"] == undefined || data[i]["승인일자"] == null || data[i]["승인일자"] == '') continue;
            let date = data[i]["승인일자"].toISOString();
            let YearMonth = date.substring(0, 4) + date.substring(5, 7);
            set.add(YearMonth);
        }
        return Array.from(set);
    }


    return {
        makeMonthLabels,
        makeStartEndMonthLabels,
        getMonthIndex,
        getMonthLength,
        getThisYearMonth,
        makeMonthSheetNames,
    }

})();

export default Day;