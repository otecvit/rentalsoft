import React from 'react';
import { styled } from "@mui/material/styles";
import {
    Box
} from '@mui/material';


const BoxChipVariants = ({ type, text, style = {} }) => {

    let boxStyle = {};

    switch (type) {
        case "success":
            boxStyle = {
                height: '22px',
                minWidth: '22px',
                lineHeight: '0',
                borderRadius: '6px',
                cursor: 'default',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                justifyContent: 'center',
                padding: '0px 8px',
                color: 'rgb(34, 154, 22)',
                fontSize: '0.75rem',
                backgroundColor: 'rgba(84, 214, 44, 0.16)',
                fontWeight: '700',
                textTransform: 'capitalize',
                ...style
            }
            break;
        case "quantity":
            boxStyle = {
                height: '22px',
                minWidth: '22px',
                lineHeight: '0',
                borderRadius: '6px',
                cursor: 'default',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                justifyContent: 'center',
                padding: '0px 8px',
                color: '#2064D1',
                fontSize: '0.75rem',
                backgroundColor: '#bbdfff',
                fontWeight: '700',
                textTransform: 'capitalize',
                ...style
            }
            break;
        case "redcolor":
            boxStyle = {
                height: '22px',
                minWidth: '22px',
                lineHeight: '0',
                borderRadius: '6px',
                cursor: 'default',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                justifyContent: 'center',
                padding: '0px 8px',
                color: 'rgb(183, 33, 54)',
                fontSize: '0.75rem',
                backgroundColor: 'rgba(255, 72, 66, 0.16)',
                fontWeight: '700',
                textTransform: 'capitalize',
                ...style
            }
            break;
        default:
            boxStyle = {};
    }

    return (
        <Box component="span" sx={boxStyle}>
            {text}
        </Box>
    );
}

export default BoxChipVariants;

// const BoxStyled = styled(Box)(({ theme, myColor }) => ({
//     marginTop: 24,
// }));

// export default BoxStyled;