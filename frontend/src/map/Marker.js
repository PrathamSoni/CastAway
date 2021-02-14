import React from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
  } from "@chakra-ui/react";

import Button from "react-bootstrap/Button";

import bottle from "./bottle.png";

const Marker = ({zoom, open}) => {
    const width = (zoom > 4) ? zoom/2:0;
    const header = {Authorization: `Bearer ${localStorage.getItem("token")}`};

    return (<Popover>
        <PopoverTrigger>
            <img style={{ width: `${width}vw`}} src={bottle}/>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverHeader>Open this bottle?</PopoverHeader>
            <PopoverBody><Button onClick={open}>Yes</Button></PopoverBody>
        </PopoverContent>
    </Popover>);
    return ;
}

export default Marker;
