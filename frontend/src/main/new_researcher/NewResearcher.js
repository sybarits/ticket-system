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
import TrainingHistory from "./TrainingHistory.js";

const NewResearcher = forwardRef((props, ref) => {
    const context = props.context;

    const [disable, setDisable] = useState(false);
    const [id, setId] = useState("");
    const [nameKo, setNameKo] = useState("");
    const [nameUs, setNameUs] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [phone, setPhone] = useState("");
    const [institution, setInstitution] = useState("");
    const [major, setMajor] = useState("");
    const [position, setPosition] = useState("");
    const [adviser, setAdviser] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [perpose, setPerpose] = useState("");
    const [applicationRoute, setApplicationRoute] = useState("");
    const [etc, setEtc] = useState("");
    const [history, setHistory] = useState("");
    const [privateInfo, setPrivateInfo] = useState("");
    const [group, setGroup] = useState("");
    const [userId, setUserId] = useState("");
    const [trainingInstitution, setTrainingInstitution] = useState("");
    const [trainingPart, setTrainingPart] = useState("");
    const [trainingCharge, setTrainingCharge] = useState("");
    const [trainingCost, setTrainingCost] = useState("");
    const [trainingContry, setTrainingContry] = useState("");
    const [trainingStartDate, setTrainingStartDate] = useState("");
    const [trainingExtensionDate, setTrainingExtensionDate] = useState("");
    const [trainingEndDate, setTrainingEndDate] = useState("");
    const [applicationNumber, setApplicationNumber] = useState("");
    const [type, setType] = useState("");

    const [user, setUser] = useState([]);
    const [fileId, setFileId] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState("");
    const [fileDeleteDialogOpen, setFileDeleteDialogOpen] = useState("");
    const [userDeleteDialogOpen, setUserDeleteDialogOpen] = useState("");

    const fileInput = React.useRef(null);
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
        setNameKo(data[0].name_ko);
        setNameUs(data[0].name_us);
        setEmail(data[0].email);
        setStatus(data[0].status);
        setPhone(data[0].phone);
        setInstitution(data[0].institution);
        setMajor(data[0].major);
        setPosition(data[0].position);
        setAdviser(data[0].adviser);
        setApplicationDate(data[0].application_date);
        setCreateDate(data[0].create_date);
        setPerpose(data[0].perpose);
        setApplicationRoute(data[0].application_route);
        setEtc(data[0].etc);
        setHistory(data[0].history);
        setPrivateInfo(data[0].private_info);
        setGroup(data[0].group);
        setUserId(data[0].user_id);
        setFileId(data[0].file_id);
        setFileName(data[0].file_name);
        setTrainingInstitution(data[0].training_institution);
        setTrainingPart(data[0].training_part);
        setTrainingCharge(data[0].training_charge);
        setApplicationNumber(data[0].application_number);
        setTrainingStartDate(data[0].training_start_date);
        setTrainingExtensionDate(data[0].training_extension_date);
        setTrainingEndDate(data[0].training_end_date);
        setTrainingCost(data[0].training_cost);
        setTrainingContry(data[0].training_contry);
        setType(data[0].type);
        setUser(data);
    };

    useEffect(() => {
        if (context == Var.Context().TicketInputs()) {
            setUserData(props.user);
            return;
        }
        axios
            .get(Var.getServiceUrl() + "/newresearcher/" + params.userId, AuthInfo.getAxiosConfig())
            .then(({ data }) => setUserData(data));
    }, []);

    const updateData = async (data) => {
        await axios
            .patch(Var.getServiceUrl() + "/newresearcher", { "newResearcherList": data }, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                resultData(data);
                setUserData(data);
                setDisable(false);
            });
    };

    const insertData = (data) => {
        axios
            .put(Var.getServiceUrl() + "/newresearcher", { "newResearcherList": data }, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                resultData(data);
                setUserData(data);
                setDisable(false);
            });
    };

    const deleteData = (data) => {
        axios
            .delete(Var.getServiceUrl() + "/newresearcher?deleteIdList=" + data, AuthInfo.getAxiosConfig())
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

    const makeNewResearcher = () => {
        const data = {};
        data._id = id;
        data.name_ko = nameKo;
        data.name_us = nameUs;
        data.email = email;
        data.status = status;
        data.phone = phone;
        data.institution = institution;
        data.major = major;
        data.position = position;
        data.adviser = adviser;
        data.application_date = applicationDate;
        data.create_date = createDate;
        data.perpose = perpose;
        data.application_route = applicationRoute;
        data.etc = etc;
        data.history = history;
        data.private_info = privateInfo;
        data.group = group;
        data.user_id = userId;
        data.file_id = fileId;
        data.file_name = fileName;
        data.training_institution = trainingInstitution;
        data.training_part = trainingPart;
        data.training_charge = trainingCharge;
        data.application_number = applicationNumber;
        data.training_start_date = trainingStartDate;
        data.training_extension_date = trainingExtensionDate;
        data.training_end_date = trainingEndDate;
        data.training_cost = trainingCost;
        data.training_contry = trainingContry;
        data.type = type;
        return data;
    }

    useImperativeHandle(ref, () => ({
        getUserData(e) {
            return makeNewResearcher();
        }
    }))

    const handleSaveChanges = (e) => {
        setDisable(true);
        const user = makeNewResearcher();
        const list = [];
        list.push(user);
        updateData(list);
    }

    const handleSaveUser = (e) => {
        setDisable(true);
        const user = makeNewResearcher();
        const list = [];
        list.push(user);
        insertData(list);
    }

    const handleStatusSelectChange = (e) => {
        setStatus(e.target.value);
    }

    const handleOnCloudUploadClick = (e) => {
        setDisable(true);
        fileInput.current.click();
    }

    const handleOnDeleteIconClick = (e, data) => {
        deleteFile(data.fileId);
    }

    const handleFileUploadInputChange = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        uploadFile(formData);
    };


    const uploadFile = async (data) => {
        await axios
            .post(Var.getServiceUrl() + "/file/upload", data, { headers: { "Content-Type": "multipart/form-data", "X-AUTH-TOKEN": AuthInfo.getToken() } })
            .then(({ data }) => {
                setFileId(data._id);
                setFileName(data.filename);
                setDisable(false);
                setFileUploadDialogOpen(true);
            });
    }
    

    const deleteFile = async (file_id) => {
        setFileId("");
        setFileName("");
        await axios
            .delete(Var.getServiceUrl() + "/file/" + file_id, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                resultData(data);
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
        downLoadFile(data.fileId);
    }

    const handleFileUploadDialogDiscard = () => {
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
                                <MenuItem value={"FAIL"}>FAIL</MenuItem>
                                <MenuItem value={"CANCEL"}>CANCEL</MenuItem>
                                <MenuItem value={"READY"}>READY</MenuItem>
                                <MenuItem value={"TRAINING"}>TRAINING</MenuItem>
                                <MenuItem value={"FINISH"}>FINISH</MenuItem>
                                <MenuItem value={"EXTENSION"}>EXTENSION</MenuItem>
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
                        <TextField
                            id="application_date"
                            label="Application Date"
                            onChange={(v) => setApplicationDate(v.target.value)}
                            defaultValue={""}
                            value={applicationDate}
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
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="type-select-label">Type</InputLabel>
                            <Select
                                labelId="type-select-label"
                                id="type-select"
                                value={type}
                                label="Type"
                                onChange={(v) => setType(v.target.value)}
                            >
                                <MenuItem value={"PROJECT"}>PROJECT</MenuItem>
                                <MenuItem value={"INTERNSHIP"}>INTERNSHIP</MenuItem>
                                <MenuItem value={"INSTCOORPERATION"}>INSTCOORPERATION</MenuItem>

                            </Select>
                    </FormControl>
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
                        id="training_institution"
                        label="Training Institution"
                        onChange={(v) => setTrainingInstitution(v.target.value)}
                        defaultValue={""}
                        value={trainingInstitution}
                    />
                    <TextField
                        id="training_part"
                        label="Training Department"
                        onChange={(v) => setTrainingPart(v.target.value)}
                        defaultValue={""}
                        value={trainingPart}
                    />
                    <TextField
                        id="training_contry"
                        label="Training Contry"
                        onChange={(v) => setTrainingContry(v.target.value)}
                        defaultValue={""}
                        value={trainingContry}
                    />
                    <TextField
                        id="training_cost"
                        label="Training Cost"
                        onChange={(v) => setTrainingCost(v.target.value)}
                        defaultValue={""}
                        value={trainingCost}
                    />
                </div>
                <div>
                    <TextField
                        id="application_number"
                        label="Application Number"
                        onChange={(v) => setApplicationNumber(v.target.value)}
                        defaultValue={""}
                        value={applicationNumber}
                    />
                    <TextField
                        id="training_start_date"
                        label="Training Start Date"
                        onChange={(v) => setTrainingStartDate(v.target.value)}
                        defaultValue={""}
                        value={trainingStartDate}
                    />
                    <TextField
                        id="training_extension_date"
                        label="Training Extension Date"
                        onChange={(v) => setTrainingExtensionDate(v.target.value)}
                        defaultValue={""}
                        value={trainingExtensionDate}
                    />
                    <TextField
                        id="training_end_date"
                        label="Training End Date"
                        onChange={(v) => setTrainingEndDate(v.target.value)}
                        defaultValue={""}
                        value={trainingEndDate}
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
                        <input type="file" ref={fileInput} onChange={handleFileUploadInputChange} style={{ display: "none" }} />
                        <div>
                            <IconButton aria-label="delete">
                                {(fileName != null && fileName != "") && <DeleteIcon onClick={(e) => { handleOnDeleteIconClick(e, { fileId }); }} />}
                                {(fileName == null || fileName == "") && <CloudUploadIcon onClick={(e) => { handleOnCloudUploadClick(e); }} />}
                            </IconButton>
                            <Input placeholder="Upload File" value={fileName} onClick={(e) => { handleFileDownload(e, { fileId }); }} sx={{ cursor: 'pointer' }} />
                        </div>
                    </Stack>
                }
                <TrainingHistory researcherId={id} />
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
                    aria-describedby="alert-dialog-file-delete-description"
                >
                    <DialogTitle>A User will be deleted</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-file-delete-description">
                            A user will be deleted.
                            If you click confirm button, the user is going to be deleted.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleUserDeleteDialogConfirm}>Confirm</Button>
                        <Button onClick={handleUserDeleteDialogDiscard}>Discard</Button>
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

NewResearcher.displayName = "NewResearcher";
export default NewResearcher;