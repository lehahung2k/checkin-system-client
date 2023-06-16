import { Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from "react";

interface NotificationSnackbarProps {
    isOpen: boolean;
    successMessage: string;
    errorMessage: string;
    onClose: () => void;
}

const MuiNotification: React.FC<NotificationSnackbarProps> = ({ isOpen, successMessage, errorMessage, onClose }) => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(isOpen);

    useEffect(() => {
        setIsSnackbarOpen(isOpen);
    }, [isOpen]);

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
        onClose();
    };

    return (
        <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <Alert
                severity={successMessage ? "success" : "error"}
                onClose={handleSnackbarClose}
                sx={{
                    backgroundColor: successMessage ? "success.light" : "error.light",
                    fontWeight: "bold",
                    color: successMessage ? "dark.paper" : "primary.light",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
                }}
            >
                {successMessage || errorMessage}
            </Alert>
        </Snackbar>
    );
};

export default MuiNotification;
