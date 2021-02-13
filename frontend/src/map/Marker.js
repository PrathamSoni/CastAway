import React from 'react';

import bottle from "./bottle.png";

const Marker = ({zoom}) => {
    const width = (zoom > 4) ? zoom/2:0;
    return <img style={{ width: `${width}vw`}} src={bottle}/>;
}

export default Marker;
