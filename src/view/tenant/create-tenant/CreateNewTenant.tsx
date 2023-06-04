import { Button, Typography, TextField, Grid, InputAdornment, Snackbar, Alert } from "@mui/material";
import MainCard from "../../../components/cards/MainCard";
import tenantApi from "../../../services/tenantApi";
import { useEffect, useState } from "react";
import { IconSettingsAutomation } from "@tabler/icons-react";
import { useNavigate } from "react-router";

interface CreateTenantFormValues {
    tenantCode: string;
    tenantName: string;
    tenantAddress: string;
    website: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
}

const CreateNewTenant = () => {
    const [formValues, setFormValues] = useState<CreateTenantFormValues>({
        tenantCode: "",
        tenantName: "",
        tenantAddress: "",
        website: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
    });

    const [formErrors, setFormErrors] = useState<Partial<CreateTenantFormValues>>({});
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const createTenant = (data: CreateTenantFormValues) => {
        tenantApi
            .createTenant(data)
            .then((res) => {
                // Handle success response
                console.log(res.data.payload);
                setSuccessMessage("Thêm doanh nghiệp đối tác thành công");
                setErrorMessage("");
                setIsSnackbarOpen(true);
                setTimeout(() => {
                    navigate("/"); // Redirect to the dashboard after a delay
                  }, 3000);
            })
            .catch((e) => {
                // Handle error response
                console.log(e.response.data.message);
                setSuccessMessage("");
                setErrorMessage(e.response.data.message);
                setIsSnackbarOpen(true);
            });
    };

    const handleFormSubmit = () => {
        const errors: Partial<CreateTenantFormValues> = {};

        // Validate form fields
        if (!formValues.tenantCode) errors.tenantCode = "Vui lòng bấm nút để tạo mã";
        if (!formValues.tenantAddress) errors.tenantAddress = "Địa chỉ doanh nghiệp không được bỏ trống";
        if (!formValues.website) errors.website = "Website không được bỏ trống";
        if (!formValues.contactName) errors.contactName = "Tên người liên hệ không được bỏ trống";
        if (!formValues.contactPhone) errors.contactPhone = "Số điện thoại không được bỏ trống";
        if (!formValues.contactEmail) errors.contactEmail = "Email không được bỏ trống";


        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            // Call createTenant function with formValues
            createTenant(formValues);
        }
    };

    const generateCode = () => {
        const generatedCode = tenantApi.generateTenantCode(); // Replace with your actual code generation logic
        setFormValues((prevValues) => ({
            ...prevValues,
            tenantCode: generatedCode,
        }));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };

    useEffect(() => {
        const tenantNameFromLocalStorage = localStorage.getItem("companyName");
        const contactNameFromLocalStorage = localStorage.getItem("fullName");
        if (tenantNameFromLocalStorage) {
            setFormValues((prevValues) => ({
                ...prevValues,
                tenantName: tenantNameFromLocalStorage,
                contactName: contactNameFromLocalStorage || "",
            }));
        }
    }, []);

    return (
        <MainCard title="Tạo doanh nghiệp của bạn">
            <Typography variant="body2" sx={{ marginBottom: '2rem' }}>
                Vui lòng nhập chính xác các thông tin sau:
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        name="tenantCode"
                        label="Mã doanh nghiệp"
                        value={formValues.tenantCode}
                        error={!!formErrors.tenantCode}
                        helperText={formErrors.tenantCode}
                        onChange={handleInputChange}
                        fullWidth
                        disabled // Disable the TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={generateCode} variant="outlined" startIcon={<IconSettingsAutomation />}>
                                        Generate Code
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="tenantName"
                        label="Tên doanh nghiệp"
                        value={formValues.tenantName}
                        onChange={handleInputChange}
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="tenantAddress"
                        label="Địa chỉ"
                        value={formValues.tenantAddress}
                        error={!!formErrors.tenantAddress}
                        helperText={formErrors.tenantAddress}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="website"
                        label="Website"
                        value={formValues.website}
                        error={!!formErrors.website}
                        helperText={formErrors.website}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="contactName"
                        label="Tên người liên hệ"
                        value={formValues.contactName}
                        error={!!formErrors.contactName}
                        helperText={formErrors.contactName}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="contactPhone"
                        label="Số điện thoại liên hệ"
                        value={formValues.contactPhone}
                        error={!!formErrors.contactPhone}
                        helperText={formErrors.contactPhone}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="contactEmail"
                        label="Email liên hệ"
                        value={formValues.contactEmail}
                        error={!!formErrors.contactEmail}
                        helperText={formErrors.contactEmail}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleFormSubmit} variant="contained" color="primary">
                        Tạo doanh nghiệp
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Alert severity={successMessage ? "success" : "error"} onClose={handleSnackbarClose}>
                    {successMessage || errorMessage}
                </Alert>
            </Snackbar>
        </MainCard>
    );
};

export default CreateNewTenant;
