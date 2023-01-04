import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Stack, Button, Select, MenuItem, InputLabel, FormControl, Input, IconButton } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Var from '../Var.js';
import Util from "../util/Util.js";
import AuthInfo from "../auth/AuthInfo.js";

const CloudUser = forwardRef((props, ref) => {
    const context = props.context;

    const [disable, setDisable] = useState(false);
    const [id, setId] = useState("");
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
    const [group, setGroup] = useState("");
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState([]);
    const [file1Id, setFile1Id] = useState("");
    const [file1Name, setFile1Name] = useState("");
    const [file2Id, setFile2Id] = useState("");
    const [file2Name, setFile2Name] = useState("");
    const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState("");
    const [fileDeleteDialogOpen, setFileDeleteDialogOpen] = useState("");
    const [userDeleteDialogOpen, setUserDeleteDialogOpen] = useState("");
    const [userSaveDialogOpen, setUserSaveDialogOpen] = useState("");
    const [userChangesSaveDialogOpen, setUserChangesSaveDialogOpen] = useState("");

    const [curFileId, setCurFileId] = useState("");

    const fileInput1 = React.useRef(null);
    const fileInput2 = React.useRef(null);
    const saveChangesButton = React.useRef(null);

    const params = useParams();
    if (props.userId != undefined) {
        params.userId = props.userId;
    }

    const refreshPage = (e) => {
        window.location.reload(false);
    }

    const resultData = (data) => {
        console.log("complete upload data", data);
    };


    const setUserData = (data) => {
        setId(data[0]._id);
        setCloudService(data[0].cloud_service);
        setNameKo(data[0].name_ko);
        setNameUs(data[0].name_us);
        setEmail(data[0].email);
        setStatus(data[0].status);
        setPhone(data[0].phone);
        setInstitution(data[0].institution);
        setMajor(data[0].major);
        setPosition(data[0].position);
        setAdviser(data[0].adviser);
        setUsage(data[0].usage);
        setQuota(data[0].quota);
        setApplicationDate(data[0].application_date);
        setCreateDate(data[0].create_date);
        setPerpose(data[0].perpose);
        setApplicationRoute(data[0].application_route);
        setEtc(data[0].etc);
        setHistory(data[0].history);
        setPrivateInfo(data[0].private_info);
        setGroup(data[0].group);
        setUserId(data[0].user_id);
        setFile1Id(data[0].file1_id);
        setFile1Name(data[0].file1_name);
        setFile2Id(data[0].file2_id);
        setFile2Name(data[0].file2_name);
        setUser(data);
    };

    useEffect(() => {
        if (context == Var.Context().TicketInputs()) {
            setUserData(props.user);
            return;
        }
        axios
            .get(Var.getServiceUrl() + "/user/" + params.userId, AuthInfo.getAxiosConfig())
            .then(({ data }) => setUserData(data));
    }, []);

    const updateData = async (data) => {
        await axios
            .patch(Var.getServiceUrl() + "/user", { "userList": data }, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                resultData(data);
                setUserData(data);
                setDisable(false);
            });
    };

    const insertData = (data) => {
        axios
            .put(Var.getServiceUrl() + "/user", { "userList": data }, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                resultData(data);
                setUserData(data);
                setDisable(false);
            });
    };

    const deleteData = (data) => {
        axios
            .delete(Var.getServiceUrl() + "/user?deleteIdList=" + data, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                resultData(data);
                refreshPage();
                // setDisable(false);
            });
    };

    const handleDelete = (e) => {
        setDisable(true);
        setUserDeleteDialogOpen(true);
    }

    const makeUser = () => {
        const data = {};
        data._id = id;
        data.cloud_service = cloudService;
        data.name_ko = nameKo;
        data.name_us = nameUs;
        data.email = email;
        data.status = status;
        data.phone = phone;
        data.institution = institution;
        data.major = major;
        data.position = position;
        data.adviser = adviser;
        data.usage = usage;
        data.quota = quota;
        data.application_date = applicationDate;
        data.create_date = createDate;
        data.perpose = perpose;
        data.application_route = applicationRoute;
        data.etc = etc;
        data.history = history;
        data.private_info = privateInfo;
        data.group = group;
        data.user_id = userId;
        data.file1_id = file1Id;
        data.file1_name = file1Name;
        data.file2_id = file2Id;
        data.file2_name = file2Name;
        return data;
    }

    useImperativeHandle(ref, () => ({
        getUserData(e) {
            return makeUser();
        }
    }))

    const handleSaveChanges = (e) => {
        setUserChangesSaveDialogOpen(true);
    }

    const handleSaveUser = (e) => {
        setUserSaveDialogOpen(true);
        setDisable(true);

    }

    const handleCloudSelectChange = (e) => {
        setCloudService(e.target.value);
    }

    const handleStatusSelectChange = (e) => {
        setStatus(e.target.value);
    }

    const handleOnCloudUpload1Click = (e) => {
        setDisable(true);
        fileInput1.current.click();
    }

    const handleOnCloudUpload2Click = (e) => {
        setDisable(true);
        fileInput2.current.click();
    }

    const handleOnDeleteIcon1Click = (e, data) => {
        deleteFile1(data.file1Id);
    }

    const handleOnDeleteIcon2Click = (e, data) => {
        deleteFile2(data.file2Id);
    }

    const handleFileUploadInput1Change = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        uploadFile1(formData);
    };

    const handleFileUploadInput2Change = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        uploadFile2(formData);
    };

    const uploadFile1 = async (data) => {
        await axios
            .post(Var.getServiceUrl() + "/file/upload", data, { headers: { "Content-Type": "multipart/form-data", "X-AUTH-TOKEN": AuthInfo.getToken() } })
            .then(({ data }) => {
                setFile1Id(data._id);
                setFile1Name(data.filename);
                setCurFileId({ "num": 1, "id": data._id });
                setDisable(false);
                setFileUploadDialogOpen(true);
            });
    }
    const uploadFile2 = async (data) => {
        await axios
            .post(Var.getServiceUrl() + "/file/upload", data, { headers: { "Content-Type": "multipart/form-data", "X-AUTH-TOKEN": AuthInfo.getToken() } })
            .then(({ data }) => {
                setFile2Id(data._id);
                setFile2Name(data.filename);
                setCurFileId({ "num": 2, "id": data._id });
                setDisable(false);
                setFileUploadDialogOpen(true);
            });

    }

    const deleteFile1 = async (file_id) => {
        setFile1Id("");
        setFile1Name("");
        await axios
            .delete(Var.getServiceUrl() + "/file/" + file_id, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                resultData(data);
                setCurFileId({ "num": 1, "id": file_id });
                setDisable(false);
                setFileDeleteDialogOpen(true);
            });
    }

    const deleteFile2 = async (file_id) => {
        setFile2Id("");
        setFile2Name("");
        await axios
            .delete(Var.getServiceUrl() + "/file/" + file_id, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                resultData(data);
                setCurFileId({ "num": 2, "id": file_id });
                setDisable(false);
                setFileDeleteDialogOpen(true);
            });
    }

    const downLoadFile = (file_id) => {
        axios
            .get(Var.getServiceUrl() + "/file/download/" + file_id, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                Util.fileDownload(data);
            });
    }

    const handleFileDownload = (e, data) => {
        if (data.file1Id != null && data.file1Id != "") {
            downLoadFile(data.file1Id);
        } else if (data.file2Id != null && data.file2Id != "") {
            downLoadFile(data.file2Id);
        }
    }

    const handleFileUploadDialogDiscard = () => {
        if (curFileId.num == 1) {
            deleteFile1(curFileId.id);
        } else if (curFileId.num == 2) {
            deleteFile2(curFileId.id);
        }
        setFileUploadDialogOpen(false);
    };

    const handleFileUploadDialogConfirm = () => {
        setFileUploadDialogOpen(false);
        handleSaveChanges();
    }

    const handleFileDeleteDialogConfirm = () => {
        setFileDeleteDialogOpen(false);
        handleSaveChanges();
    }

    const handleUserDeleteDialogConfirm = () => {
        deleteData(id);
        setUserDeleteDialogOpen(false);
    }

    const handleUserDeleteDialogDiscard = () => {
        setUserDeleteDialogOpen(false);
        setDisable(false);
    }

    const handleUserChangesSaveDialogConfirm = () => {
        const user = makeUser();
        const list = [];
        list.push(user);
        updateData(list);
        setUserChangesSaveDialogOpen(false);
    }

    const handleUserSaveDialogConfirm = () => {
        const user = makeUser();
        const list = [];
        list.push(user);
        insertData(list);
        setUserSaveDialogOpen(false);
    }

    if (user.length != 0 || context == Var.Context().TicketInputs()) {
        return (
            <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
                {context != Var.Context().TicketInputs() &&
                    <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }}>
                        <Button variant="outlined" ref={saveChangesButton} onClick={handleSaveChanges} disabled={disable}>Save Changes</Button>
                        <Button variant="outlined" onClick={refreshPage}>Reset</Button>
                        <Button variant="outlined" color="error" onClick={handleDelete} disabled={disable}>Delete</Button>
                    </Stack>
                }
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id="status-select-label">Status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                id="status-select"
                                value={status}
                                label="Status"
                                onChange={handleStatusSelectChange}
                            >
                                <MenuItem value={"APPLICATION"}>APPLICATION</MenuItem>
                                <MenuItem value={"INVITATIONSENT"}>INVITATION SENT</MenuItem>
                                <MenuItem value={"INVITATIONEXPIRED"}>INVITATION EXPIRED</MenuItem>
                                <MenuItem value={"ACTIVATE"}>ACTIVATE</MenuItem>
                                <MenuItem value={"DEACTIVATE"}>DEACTIVATE</MenuItem>
                                <MenuItem value={"REJECT"}>REJECT</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id="cloud-servie-select-label">Cloud Service</InputLabel>
                            <Select
                                labelId="cloud-servie-select-label"
                                id="cloud-servie-select"
                                value={cloudService}
                                label="Cloud Service"
                                onChange={handleCloudSelectChange}
                            >
                                {Var.getCloudServiceTypeList().map((service, index) => {
                                    return (
                                        <MenuItem value={service}>{service}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            id="name_ko"
                            label="Name(KR)"
                            onChange={(v) => setNameKo(v.target.value)}
                            defaultValue={""}
                            value={nameKo}
                        />
                        <TextField
                            id="name_us"
                            label="Name(EN)"
                            onChange={(v) => setNameUs(v.target.value)}
                            defaultValue={""}
                            value={nameUs}
                        />
                    </div>
                    <div>
                        <TextField
                            id="email"
                            label="Email"
                            onChange={(v) => setEmail(v.target.value)}
                            defaultValue={""}
                            value={email}
                        />
                        <TextField
                            id="Phone"
                            label="phone"
                            onChange={(v) => setPhone(v.target.value)}
                            defaultValue={""}
                            value={phone}
                        />
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id="user-group-select-label">Group</InputLabel>
                            {cloudService == "IBMQ" &&
                                <Select
                                    labelId="user-group-select-label"
                                    id="user-group-select"
                                    value={group}
                                    label="Group"
                                    onChange={(v) => setGroup(v.target.value)}
                                >
                                    <MenuItem value={"EMPLOYEE"}>EMPLOYEE</MenuItem>
                                    <MenuItem value={"GRADUATE"}>GRADUATE</MenuItem>
                                    <MenuItem value={"STUDENT"}>STUDENT</MenuItem>

                                </Select>
                            }
                            {cloudService != "IBMQ" &&
                                <Select
                                    labelId="user-group-select-label"
                                    id="user-group-select"
                                    value={group}
                                    label="Group"
                                    onChange={(v) => setGroup(v.target.value)}
                                >
                                    <MenuItem value={"INDUSTRY"}>INDUSTRY</MenuItem>
                                    <MenuItem value={"RESEARCH"}>RESEARCH</MenuItem>
                                    <MenuItem value={"EDUCATION"}>EDUCATION</MenuItem>

                                </Select>
                            }
                        </FormControl>
                        <TextField
                            id="user_id"
                            label="User ID"
                            onChange={(v) => setUserId(v.target.value)}
                            defaultValue={""}
                            value={userId}
                        />
                    </div>
                    <div>
                        <TextField
                            id="institution"
                            label="Institution"
                            onChange={(v) => setInstitution(v.target.value)}
                            defaultValue={""}
                            value={institution}
                        />
                        <TextField
                            id="major"
                            label="Major"
                            onChange={(v) => setMajor(v.target.value)}
                            defaultValue={""}
                            value={major}
                        />
                        <TextField
                            id="position"
                            label="Position"
                            onChange={(v) => setPosition(v.target.value)}
                            defaultValue={""}
                            value={position}
                        />
                        <TextField
                            id="adviser"
                            label="Adviser"
                            onChange={(v) => setAdviser(v.target.value)}
                            defaultValue={""}
                            value={adviser}
                        />
                    </div>
                    <div>
                        <TextField
                            id="usage"
                            label="Usage"
                            onChange={(v) => setUsage(v.target.value)}
                            defaultValue={""}
                            value={usage}
                        />
                        <TextField
                            id="quota"
                            label="Quota"
                            onChange={(v) => setQuota(v.target.value)}
                            defaultValue={""}
                            value={quota}
                        />
                        <TextField
                            id="application_date"
                            label="Application Date"
                            onChange={(v) => setApplicationDate(v.target.value)}
                            defaultValue={""}
                            value={applicationDate}
                        />
                        <TextField
                            id="create_date"
                            label="Create Date"
                            onChange={(v) => setCreateDate(v.target.value)}
                            defaultValue={""}
                            value={createDate}
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
                            value={perpose}
                            sx={{ width: 460 }}
                        />
                        <TextField
                            id="application_route"
                            label="Application Route"
                            onChange={(v) => setApplicationRoute(v.target.value)}
                            multiline
                            rows={3}
                            defaultValue={""}
                            value={applicationRoute}
                            sx={{ width: 460 }}
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
                            value={etc}
                            sx={{ width: 260 }}
                        />
                        <TextField
                            id="history"
                            label="History"
                            onChange={(v) => setHistory(v.target.value)}
                            multiline
                            rows={3}
                            defaultValue={""}
                            value={history}
                            sx={{ width: 660 }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="privateInfo"
                            label="Private Info"
                            onChange={(v) => setPrivateInfo(v.target.value)}
                            defaultValue={""}
                            value={privateInfo}
                            sx={{ width: 940 }}
                        />
                    </div>
                </Box>
                {context == Var.Context().TicketInputs() &&
                    <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }}>
                        <Button variant="outlined" onClick={handleSaveUser} disabled={disable}>Save User</Button>
                    </Stack>
                }
                {context != Var.Context().TicketInputs() &&
                    <Stack spacing={2} direction="row" sx={{ m: 1, justifyContent: 'center' }}>
                        <input type="file" ref={fileInput1} onChange={handleFileUploadInput1Change} style={{ display: "none" }} />
                        <input type="file" ref={fileInput2} onChange={handleFileUploadInput2Change} style={{ display: "none" }} />
                        <div>
                            <IconButton aria-label="delete">
                                {(file1Name != null && file1Name != "") && <DeleteIcon onClick={(e) => { handleOnDeleteIcon1Click(e, { file1Id }); }} />}
                                {(file1Name == null || file1Name == "") && <CloudUploadIcon onClick={(e) => { handleOnCloudUpload1Click(e); }} />}
                            </IconButton>
                            <Input placeholder="Upload File 1" value={file1Name} onClick={(e) => { handleFileDownload(e, { file1Id }); }} sx={{ cursor: 'pointer' }} />
                        </div>
                        <div>
                            <IconButton aria-label="delete">
                                {(file2Name != null && file2Name != "") && <DeleteIcon onClick={(e) => { handleOnDeleteIcon2Click(e, { file2Id }); }} />}
                                {(file2Name == null || file2Name == "") && <CloudUploadIcon onClick={(e) => { handleOnCloudUpload2Click(e); }} />}
                            </IconButton>
                            <Input placeholder="Upload File 2" value={file2Name} onClick={(e) => { handleFileDownload(e, { file2Id }); }} sx={{ cursor: 'pointer' }} />
                        </div>
                    </Stack>
                }
                <Dialog
                    open={fileUploadDialogOpen}
                    // TransitionComponent={Transition}
                    keepMounted
                    // onClose={handleClose}
                    aria-describedby="alert-dialog-upload-description"
                >
                    <DialogTitle>File Has been uploaded</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-upload-description">
                            A file has been uplaoded.
                            If you click the Confirm button, the file will be saved.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFileUploadDialogConfirm}>Confirm</Button>
                        <Button onClick={handleFileUploadDialogDiscard}>Discard</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={fileDeleteDialogOpen}
                    // TransitionComponent={Transition}
                    keepMounted
                    // onClose={handleClose}
                    aria-describedby="alert-dialog-file-delete-description"
                >
                    <DialogTitle>File Has been deleted</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-file-delete-description">
                            A file has been deleted.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFileDeleteDialogConfirm}>Confirm</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={userDeleteDialogOpen}
                    // TransitionComponent={Transition}
                    keepMounted
                    // onClose={handleClose}
                    aria-describedby="alert-dialog-user-delete-description"
                >
                    <DialogTitle>A User will be deleted</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-user-delete-description">
                            A user will be deleted.
                            If you click confirm button, the user is going to be deleted.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleUserDeleteDialogConfirm}>Confirm</Button>
                        <Button onClick={handleUserDeleteDialogDiscard}>Discard</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={userChangesSaveDialogOpen}
                    // TransitionComponent={Transition}
                    keepMounted
                    // onClose={handleClose}
                    aria-describedby="alert-dialog-user-changes-save-description"
                >
                    <DialogTitle>User changes are saved.</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-user-changes-save-description">
                            A user will be saved.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleUserChangesSaveDialogConfirm}>Confirm</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={userSaveDialogOpen}
                    // TransitionComponent={Transition}
                    keepMounted
                    // onClose={handleClose}
                    aria-describedby="alert-dialog-user-save-description"
                >
                    <DialogTitle>A user will be saved.</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-user-save-description">
                            A user will be saved.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleUserSaveDialogConfirm}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    } else {
        return (
            <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
                No User # {params.userId}

            </div>
        );
    }
});

CloudUser.displayName = "CloudUser";
export default CloudUser;