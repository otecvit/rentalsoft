import { styled } from "@mui/material/styles";
import {
    Box
} from '@mui/material';

const BoxStyledTextEditor = styled(Box)(({ theme, myColor }) => ({
    marginTop: 8,
    borderRadius: 8,
    border: "1px solid rgba(145, 158, 171, 0.32)",
}));

export default BoxStyledTextEditor;