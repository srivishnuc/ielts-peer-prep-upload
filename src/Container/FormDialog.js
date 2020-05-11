import React from 'react'
import {
    Button, withStyles, Dialog, DialogTitle,
    DialogContent, DialogContentText, Grid,
    DialogActions, Paper
} from '@material-ui/core'
import { postData } from '../Utils/Api'
import SnackBar from '../Component/SnackBar'
import Background from '../images/upload_bg.svg'

const useStyles = (theme) => ({
    root: {
        width: 'auto',
        height: 'auto',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    }, btnContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 625,
        margin: 0,
        padding: 0
    },
})
function FormDialog(props) {
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
        if (res.status === "success") {
            setsnackBarType('success')
            setsnackBarMsg(res.msg)
            setshowSnackBar(true)
        }
        else {
            setsnackBarType('error')
            setsnackBarMsg(res.msg)
            setshowSnackBar(true)
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
            <Paper elevation={2} className={props.classes.root} xs={12}>

                <Grid container justify="space-evenly">
                    <Grid item>
                        <div className={props.classes.btnContainer}>
                            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                                Click to Upload
                        </Button>
                        </div>
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
                    </Grid>
                </Grid>
            </Paper>

            <SnackBar open={showSnackBar} autoHideDuration={3000} type={snackBarType} message={snackBarMsg} handleClose={handleSnackBarClose} />
        </div >
    );
}

export default (withStyles)(useStyles)(FormDialog)
