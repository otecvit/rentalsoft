import React from 'react';
import {
    Box
} from '@mui/material';

import { BundleComponent } from '../BundlesPage/BundleComponent';

const NewBundlePage = () => {

    return (
        <Box>
            <BundleComponent actions="add" />
        </Box>
    );

}

export { NewBundlePage };