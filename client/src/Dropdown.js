import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {MenuItem}from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { InputLabel } from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles((theme)=>({
    button:{
        display:'block',
        marginTop:theme.spacing(2),
    },
    formControl:{
        margin:theme.spacing(1),
        minWidth:120,
    },
    }
));

export default function Dropdown() {
    const classes = useStyles();
    const [range,setRange] = React.useState('');
    const [open,setOpen] = React.useState(false);
    const handleChange = (event) => {
        setRange(event.target.value);
    };
    const handleClose = () =>{
        setOpen(false);
    };
    const handleOpen = () =>{
        setOpen(true);
    };
    return (
        <div>
        
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Select Range</InputLabel>
        <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select-label"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={range}
        onChange={handleChange}>
        <MenuItem value="">
            <em>None</em>
        </MenuItem>
        <MenuItem value={100}>12hours</MenuItem>
        <MenuItem value={30}>1day</MenuItem>
        <MenuItem value={20}>2days</MenuItem>
        <MenuItem value={15}>1week</MenuItem>
        </Select>
        </FormControl>   
        </div>
    );
}


