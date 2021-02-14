import React from 'react';

import bottle from "./bottle.png";

const Marker = ({zoom, onClick}) => {
    const width = (zoom > 4) ? zoom/2:0;
    const header = {Authorization: `Bearer ${localStorage.getItem("token")}`};
    return <img onClick={onClick} style={{ width: `${width}vw`}} src={bottle}/>;
}

export default Marker;
