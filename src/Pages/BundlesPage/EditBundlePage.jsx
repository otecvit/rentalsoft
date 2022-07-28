import React from 'react';
import { useParams } from "react-router-dom";
import {
    Box
} from '@mui/material';

import { BundleComponent } from '../BundlesPage/BundleComponent';

const EditBundlePage = () => {
    let { chTokenBundle } = useParams();

    return (
        <Box>
            <BundleComponent chTokenBundle={chTokenBundle} actions="edit" />
        </Box>
    );

}

export { EditBundlePage };