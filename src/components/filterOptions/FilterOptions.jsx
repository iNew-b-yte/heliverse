import React, { memo } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const CheckedOptions = ({ id, option, deleteFn }) => {
    return (
        <li className="rounded-pill bg-dark-subtle px-1 mx-1 text-dark custom-font-Size" id={id}>{option}
            <span className='custom-font-Size' onClick={()=>deleteFn(id)}><HighlightOffIcon fontSize="small" /></span>
        </li>
    )
}

export default memo(CheckedOptions);