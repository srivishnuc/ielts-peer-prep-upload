import React from 'react'
import {
    Button, withStyles, Dialog, DialogTitle,
    DialogContent, DialogContentText,
    TextField, DialogActions
} from '@material-ui/core'
import { postData } from '../Utils/Api'
import SnackBar from '../Component/SnackBar'

const useStyles = (theme) => ({
    root: {
        width: 800,
        height: 600,
    },
})
function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState();
    const [showSnackBar, setshowSnackBar] = React.useState(false)
    const [snackBarType, setsnackBarType] = React.useState("")
    const [snackBarMsg, setsnackBarMsg] = React.useState("")


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelect = e => {
        setFile(e.target.files[0])
    }


    const handleUpload = () => {
        const data = new FormData();
        data.append('pic', file)
        postData('/fileupload', data, afterUpload)
    }


    const afterUpload = (res) => {
        handleClose()
        if (res.status == "success") {
            setshowSnackBar(true)
            setsnackBarType('success')
            setsnackBarMsg(res.msg)
        }
        else {
            setshowSnackBar(true)
            setsnackBarType('error')
            setsnackBarMsg(res.msg)
        }
    }


    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setshowSnackBar(false)
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Click to Upload
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose the picture</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Kindly select the image file less than 1MB
                    </DialogContentText>
                    <input
                        id="image"
                        label="Image Path"
                        type="file"
                        accept="image/*"
                        onChange={handleSelect}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                 </Button>
                    <Button onClick={handleUpload} color="primary">
                        Upload
                 </Button>
                </DialogActions>
            </Dialog>
            <SnackBar open={showSnackBar} autoHideDuration={3000} type={snackBarType} message={snackBarMsg} handleClose={handleSnackBarClose} />
        </div>
    );
}

export default FormDialog
