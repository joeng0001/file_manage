import { Snackbar, Alert } from "@mui/material"

export default function snackbar(props) {
    return (
        <Snackbar onClose={() => props.setSnackbarOpen(false)} open={props.snackbarOpen} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity={props.snackbarSeverity} sx={{ width: '100%' }}>
                {props.snackbarMessage}
            </Alert>
        </Snackbar>
    )
}