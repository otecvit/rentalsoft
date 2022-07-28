import { styled } from "@mui/material/styles";
import {
    Box
} from '@mui/material';

const BoxStyled = styled(Box)(({ theme, myColor }) => ({
    margin: 0,
    padding: 0,
}));

export default BoxStyled;