import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import { clearSnackbar } from "../actions/snackbarActions";
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

//https://browntreelabs.com/snackbars-in-react-redux-and-material-ui/
export default function SnackbarComponent() {
  
  const dispatch = useDispatch();  
  const { successSnackbarMessage, successSnackbarOpen,snackbarBackgroundcolor } = useSelector(
        state => state.ui
   );

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}      
      open={successSnackbarOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      aria-describedby="client-snackbar"    
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        ><CloseIcon fontSize="small" />      
        </IconButton>
      ]}
    >
      <SnackbarContent style={{
          backgroundColor: snackbarBackgroundcolor,
        }}
      message={
            <span id="client-snackbar">         
              {successSnackbarMessage}
            </span>
          }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        ><CloseIcon fontSize="small" />      
        </IconButton>
      ]}
      />
    </Snackbar>
  );
}