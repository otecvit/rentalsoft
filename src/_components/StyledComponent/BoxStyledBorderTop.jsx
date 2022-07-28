import { styled } from "@mui/material/styles";
import {
    Box
} from '@mui/material';

const BoxStyledBorderTop = styled(Box)(({ theme, myColor }) => ({
    marginTop: 15,
    paddingTop: 15,
    borderTop: '1px solid rgb(221, 225, 227)',
}));

export default BoxStyledBorderTop;