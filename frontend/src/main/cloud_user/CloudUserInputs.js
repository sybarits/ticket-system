import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Stack, Button, Select, MenuItem } from '@mui/material';
import * as XLSX from 'xlsx';
import Config from '../config.js';

function CloudUserInputs(props) {

    const [disable, setDisable] = useState(false);
    const [cloudService, setCloudService] = useState("IBMQ");
    const [nameKo, setNameKo] = useState("");
    const [nameUs, setNameUs] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [phone, setPhone] = useState("");
    const [institution, setInstitution] = useState("");
    const [major, setMajor] = useState("");
    const [position, setPosition] = useState("");
    const [adviser, setAdviser] = useState("");
    const [usage, setUsage] = useState("");
    const [quota, setQuota] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [perpose, setPerpose] = useState("");
    const [applicationRoute, setApplicationRoute] = useState("");
    const [etc, setEtc] = useState("");
    const [history, setHistory] = useState("");
    const [privateInfo, setPrivateInfo] = useState("");

    const fileInput = React.useRef(null);
    const ionqUserDataKey = {
        "-(학생 또는 연구원의 경우 해당 시) 지도교수:": "adviser",
        "날짜": "application_date",
        "신청 경로": "application_route",
        "클라우드": "cloud_service",
        "생성날짜": "create_date",
        "소속기관 이메일": "email",
        "기타": "etc",
        "히스토리": "history",
        "-소속기관(국문이름):": "institution",
        "-전공": "major",
        "이름(국문)": "name_ko",
        "이름": "name_ko",
        "이름(영문)": "name_us",
        "연구 및 교육 사용목적 (자세히)": "perpose",
        "휴대폰 번호": "phone",
        "-직급(직위):": "position",
        "개인정보 수집·이용 및 제3자 제공 동의": "private_info",
        "IonQ 양자컴퓨터 클라우드를 처음 접하게 된 계기": "find_out",
        "상태": "status",
        "유저아이디": "user_id",
    }

    const resultData = (data) => {
        console.log("complete upload data", data);
    };

    const uploadData = (data) => {
        axios
            .put(Config.getServiceUrl() + "/user", { "userList": data })
            .then(({ data }) => {
                resultData(data);
                setDisable(false);
            });
    };

    const refreshPage = (e) => {
        window.location.reload(false);
    }

    const handleOnSubmit = () => {
        setDisable(true);
        fileInput.current.click();
    }

    const handleCloudSelectChange = (e) => {
        console.log("select change e", e);
        setCloudService(e.target.value);
    }

    const handleSaveNewUser = (e) => {
        setDisable(true);
        console.log("e", e);
        const data = [{}];
        data[0].cloud_service = cloudService;
        data[0].name_ko = nameKo;
        data[0].name_us = nameUs;
        data[0].email = email;
        data[0].status = status;
        data[0].phone = phone;
        data[0].institution = institution;
        data[0].major = major;
        data[0].position = position;
        data[0].adviser = adviser;
        data[0].usage = usage;
        data[0].quota = quota;
        data[0].application_date = applicationDate;
        data[0].create_date = createDate;
        data[0].perpose = perpose;
        data[0].application_route = applicationRoute;
        data[0].etc = etc;
        data[0].history = history;
        data[0].private_info = privateInfo;
        // console.log("data",data);
        uploadData(data);
    }

    const handleInputChange = (e) => {
        // console.log(e.target);
        // console.log(e.target.files[0]);
        // console.log(e.target.files[0].data);
        const fileReader = new FileReader();
        const file = e.target.files[0];

        const jsonToObjectArray = (rowObj) => {
            const data = rowObj.map(r => {
                const obj = Object.keys(ionqUserDataKey).reduce((object, header, index) => {
                    if (r[header] != undefined) {
                        object[ionqUserDataKey[header]] = r[header];
                    }
                    return object;
                }, {});
                obj["cloud_service"] = cloudService;
                return obj;
            });

            uploadData(data);
        };

        fileReader.onload = function (event) {
            var wb = XLSX.read(fileReader.result, { type: 'binary', cellDates: true, dateNF: 'YYYY-MM-DD' });
            var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            jsonToObjectArray(rowObj);
        };

        fileReader.readAsBinaryString(file);

    };

    return (
        <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
            <Stack spacing={2} direction="row" justifyContent="end" sx={{m:1}} >
                <Select
                    id="cloud-servie-select"
                    value={"IBMQ"}
                    label="Cloud Service"
                    onChange={handleCloudSelectChange}
                >
                    <MenuItem value={"IBMQ"}>IBMQ</MenuItem>
                    <MenuItem value={"IONQ"}>IonQ</MenuItem>
                    <MenuItem value={"DWAVE"}>D-wave</MenuItem>
                </Select>
                <input type="file" accept={".xlsx"} ref={fileInput} onChange={handleInputChange} style={{ display: "none" }} />
                <Button onClick={(e) => { handleOnSubmit(e); }} variant="outlined" disabled={disable}>Upload xlsx</Button>
            </Stack>
            <Stack spacing={2} direction="row" justifyContent="end" sx={{m:1}} >
                <Button variant="outlined" onClick={handleSaveNewUser} disabled={disable}>Save New User</Button>
                <Button variant="outlined" onClick={refreshPage}>Reset</Button>
            </Stack>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="cloud_service"
                        label="Cloud Service"
                        onChange={(v) => setCloudService(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="name_ko"
                        label="Name(KR)"
                        onChange={(v) => setNameKo(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="name_us"
                        label="Name(EN)"
                        onChange={(v) => setNameUs(v.target.value)}
                        defaultValue={""}
                    />
                </div>
                <div>
                    <TextField
                        id="email"
                        label="Email"
                        onChange={(v) => setEmail(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="status"
                        label="Status"
                        onChange={(v) => setStatus(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="Phone"
                        label="phone"
                        onChange={(v) => setPhone(v.target.value)}
                        defaultValue={""}
                    />
                </div>
                <div>
                    <TextField
                        id="institution"
                        label="Institution"
                        onChange={(v) => setInstitution(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="major"
                        label="Major"
                        onChange={(v) => setMajor(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="position"
                        label="Position"
                        onChange={(v) => setPosition(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="adviser"
                        label="Adviser"
                        onChange={(v) => setAdviser(v.target.value)}
                        defaultValue={""}
                    />
                </div>
                <div>
                    <TextField
                        id="usage"
                        label="Usage"
                        onChange={(v) => setUsage(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="quota"
                        label="Quota"
                        onChange={(v) => setQuota(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="application_date"
                        label="Application Date"
                        onChange={(v) => setApplicationDate(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="create_date"
                        label="Create Date"
                        onChange={(v) => setCreateDate(v.target.value)}
                        defaultValue={""}
                    />
                </div>
                <div>
                    <TextField
                        id="perpose"
                        label="Perpose"
                        onChange={(v) => setPerpose(v.target.value)}
                        multiline
                        rows={3}
                        defaultValue={""}
                    />
                    <TextField
                        id="application_route"
                        label="Application Route"
                        onChange={(v) => setApplicationRoute(v.target.value)}
                        multiline
                        rows={3}
                        defaultValue={""}
                    />
                </div>
                <div>
                    <TextField
                        id="etc"
                        label="etc"
                        onChange={(v) => setEtc(v.target.value)}
                        multiline
                        rows={3}
                        defaultValue={""}
                    />
                    <TextField
                        id="history"
                        label="History"
                        onChange={(v) => setHistory(v.target.value)}
                        multiline
                        rows={3}
                        defaultValue={""}
                    />
                </div>
                <div>
                    <TextField
                        id="privateInfo"
                        label="Private Info"
                        onChange={(v) => setPrivateInfo(v.target.value)}
                        defaultValue={""}
                    />
                </div>
            </Box>


        </div>
    );
}

export default CloudUserInputs;