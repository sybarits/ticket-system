import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

function CloudUserInputs(props) {

    const params = useParams();
    const fileInput = React.useRef(null);
    if (props.user != undefined) {
        params.user = props.user;
    }

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

    const uploadData = (params) => {
        const resultData = (data) => {
            console.log("complete upload data", data);
        };
        axios
            .put("http://192.168.137.86:8080/user", { "userList": params })
            .then(({ data }) => resultData(data));
    };

    const handleOnSubmit = () => {
        fileInput.current.click();
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
                obj["cloud_service"] = "IONQ";
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

    if (params.user != undefined || params.user != null) {
        const user = params.user;
        return (
            <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
                <Stack spacing={2} direction="row" justifyContent="end">
                    <input type="file" accept={".xlsx"} ref={fileInput} onChange={handleInputChange} style={{ display: "none" }} />
                    <Button onClick={(e) => { handleOnSubmit(e); }} variant="outlined">Upload xlsx</Button>
                    <Button variant="outlined">Save</Button>
                    <Button variant="outlined">Reset</Button>
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
                            value={user.cloud_service}
                        />
                        <TextField
                            id="name_ko"
                            label="Name(KR)"
                            value={user.name_ko}
                        />
                        <TextField
                            id="name_us"
                            label="Name(EN)"
                            value={user.name_us}
                        />
                    </div>
                    <div>
                        <TextField
                            id="email"
                            label="Email"
                            value={user.email}
                        />
                        <TextField
                            id="status"
                            label="Status"
                            value={user.status}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            value={user.email}
                        />
                    </div>
                    <div>
                        <TextField
                            id="institution"
                            label="Institution"
                            value={user.institution}
                        />
                        <TextField
                            id="major"
                            label="Major"
                            value={user.major}
                        />
                        <TextField
                            id="position"
                            label="Position"
                            value={user.position}
                        />
                        <TextField
                            id="adviser"
                            label="Adviser"
                            value={user.adviser}
                        />
                    </div>
                    <div>
                        <TextField
                            id="application_date"
                            label="Application Date"
                            value={user.application_date}
                        />
                        <TextField
                            id="create_date"
                            label="Create Date"
                            value={user.create_date}
                        />
                    </div>
                    <div>
                        <TextField
                            id="perpose"
                            label="Perpose"
                            multiline
                            rows={3}
                            value={user.perpose}
                        />
                        <TextField
                            id="application_route"
                            label="Application Route"
                            multiline
                            rows={3}
                            value={user.application_route}
                        />
                    </div>
                    <div>
                        <TextField
                            id="etc"
                            label="etc"
                            multiline
                            rows={3}
                            value={user.etc}
                        />
                        <TextField
                            id="history"
                            label="History"
                            multiline
                            rows={3}
                            value={user.history}
                        />
                    </div>
                </Box>


            </div>
        );
    } else {
        return (
            <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
                {/* User # {user._id} */}
                <Stack spacing={2} direction="row" justifyContent="end">
                    <input type="file" accept={".xlsx"} ref={fileInput} onChange={handleInputChange} style={{ display: "none" }} />
                    <Button onClick={(e) => { handleOnSubmit(e); }} variant="outlined">Upload xlsx</Button>
                    <Button variant="outlined">Save</Button>
                    <Button variant="outlined">Reset</Button>
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
                            value={""}
                        />
                        <TextField
                            id="name_ko"
                            label="Name(KR)"
                            value={""}
                        />
                        <TextField
                            id="name_us"
                            label="Name(EN)"
                            value={""}
                        />
                    </div>
                    <div>
                        <TextField
                            id="email"
                            label="Email"
                            value={""}
                        />
                        <TextField
                            id="status"
                            label="Status"
                            value={""}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            value={""}
                        />
                    </div>
                    <div>
                        <TextField
                            id="institution"
                            label="Institution"
                            value={""}
                        />
                        <TextField
                            id="major"
                            label="Major"
                            value={""}
                        />
                        <TextField
                            id="position"
                            label="Position"
                            value={""}
                        />
                        <TextField
                            id="adviser"
                            label="Adviser"
                            value={""}
                        />
                    </div>
                    <div>
                        <TextField
                            id="application_date"
                            label="Application Date"
                            value={""}
                        />
                        <TextField
                            id="create_date"
                            label="Create Date"
                            value={""}
                        />
                    </div>
                    <div>
                        <TextField
                            id="perpose"
                            label="Perpose"
                            multiline
                            rows={3}
                            value={""}
                        />
                        <TextField
                            id="application_route"
                            label="Application Route"
                            multiline
                            rows={3}
                            value={""}
                        />
                    </div>
                    <div>
                        <TextField
                            id="etc"
                            label="etc"
                            multiline
                            rows={3}
                            value={""}
                        />
                        <TextField
                            id="history"
                            label="History"
                            multiline
                            rows={3}
                            value={""}
                        />
                    </div>
                </Box>


            </div>
        );
    }
}

export default CloudUserInputs;