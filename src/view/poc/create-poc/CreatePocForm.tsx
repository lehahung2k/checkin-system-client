import React, {useEffect, useState} from "react";
import SubCard from "../../../components/cards/SubCard";
import { Grid, TextField, Button } from "@mui/material";
import MuiNotification from "../../../components/Notification";
import {useNavigate} from "react-router";
import pocApi from "../../../services/pocApi";

interface CreatePocFormValues {
    pointCode: string;
    eventCode: string;
    pointName: string;
    pointNote: string;
}

interface EventCodeProps {
    eventCode: string;
}

const CreatePocForm: React.FC<EventCodeProps> = ({ eventCode }) => {
    const [formValues, setFormValues] = useState<CreatePocFormValues>({
        pointCode: '',
        eventCode: eventCode,
        pointName: '',
        pointNote: '',
    });
    const [formErrors, setFormErrors] = useState<Partial<CreatePocFormValues>>({});

    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
        }));
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const errors: Partial<CreatePocFormValues> = {};
        if (!formValues.pointCode) errors.pointCode = "Bấm nút để tạo mã cho quầy check-in";
        if (!formValues.pointName) errors.pointName = "Tên quầy không được để trống";

        if (Object.keys(errors).length > 0) setFormErrors(errors);
        else {
            const pocData: CreatePocFormValues = {
                ...formValues
            }
            setIsLoading(true);
            pocApi
                .addNewPoc(pocData)
                .then((res) => {
                    setIsSnackbarOpen(true);
                    setSuccessMessage("Tạo sự kiện thành công");
                    setErrorMessage("");
                    console.log(pocData);
                    setTimeout(() => {
                        setIsLoading(false);
                        navigate("/poc/view-poc"); // Redirect to the dashboard after a delay
                    }, 2000);
                })
                .catch((err) => {
                    setIsSnackbarOpen(true);
                    setSuccessMessage("");
                    setErrorMessage(err.data.message);
                    setIsLoading(false);
                })
        }
    };

    return (
        <SubCard title="Tạo mới gian hàng">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} sx={{ maxHeight: '80vh', overflow: 'auto' }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name={"pointCode"}
                            label="Mã quầy check-in"
                            value={formValues.pointCode}
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                            error={!!formErrors.pointCode}
                            helperText={formErrors.pointCode}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name={"eventCode"}
                            label="Mã sự kiện"
                            variant="outlined"
                            fullWidth
                            disabled
                            value={eventCode}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name={"pointName"}
                            label="Tên quầy check-in"
                            variant="outlined"
                            fullWidth
                            value={formValues.pointName}
                            onChange={handleInputChange}
                            error={!!formErrors.pointName}
                            helperText={formErrors.pointName}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name={"pointNote"}
                            label="Ghi chú"
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                            value = {formValues.pointNote}
                            error={!!formErrors.pointNote}
                            helperText={formErrors.pointNote}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ backgroundColor: 'secondary.dark' }}
                            disabled={isLoading}
                        >
                            {isLoading ? "Đang tạo..." : "Tạo mới"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <MuiNotification
                isOpen={isSnackbarOpen}
                successMessage={successMessage}
                errorMessage={errorMessage}
                onClose={handleSnackbarClose}
            />
        </SubCard>
    );
};

export default CreatePocForm;
