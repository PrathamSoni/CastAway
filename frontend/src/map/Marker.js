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

const Marker = ({id, zoom, setId, open}) => {
    const width = (zoom > 4) ? zoom/2:0;
    const header = {Authorization: `Bearer ${localStorage.getItem("token")}`};

    const openModal = () => {
        open(id);
    };

    return (<Popover>
        <PopoverTrigger>
            <img style={{ width: `${width}vw`}} src={bottle}/>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverHeader>Open this bottle?</PopoverHeader>
            <PopoverBody><Button onClick={openModal}>Yes</Button></PopoverBody>
        </PopoverContent>
    </Popover>);
}

export default Marker;
