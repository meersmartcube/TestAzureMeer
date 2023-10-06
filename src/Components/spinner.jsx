import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { hideSpinner } from "../actions/spinnerAction";

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#b2dfdb',
  },
  barColorPrimary: {
    backgroundColor: '#00695c',
  },
})(LinearProgress);

export default function Spinner() {
  
  const dispatch = useDispatch();  
  const { showSpinner } = useSelector(
        state => state.spinner
   );

  function handleClose() {
    dispatch(hideSpinner());
  }

    return (
        <div>
          {/* <ColorLinearProgress /> */}
          { showSpinner ? <ColorLinearProgress /> : "" }
        </div>
    )
}