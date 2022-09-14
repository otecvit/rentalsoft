import { styled } from "@mui/material/styles";
import {
    Box
} from '@mui/material';

const BoxStyledBorderTopDashed = styled(Box)(({ theme, myColor }) => ({
    marginTop: 10,
    paddingTop: 10,
    borderTop: '1px dashed rgb(221, 225, 227)',
}));

export default BoxStyledBorderTopDashed;