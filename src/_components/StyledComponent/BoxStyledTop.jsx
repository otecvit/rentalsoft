import { styled } from "@mui/material/styles";
import {
    Box
} from '@mui/material';

const BoxStyled = styled(Box)(({ theme, myColor }) => ({
    marginTop: 5,
}));

export default BoxStyled;