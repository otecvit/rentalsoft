import React, { useState } from "react";


import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';


export const DialogSelectCategory = ({ data, handleOk, handleClose }) => {

    const [open, setOpen] = useState(true);
    const [currentCategory, setCategory] = useState('Uncategorized');

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
          {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
        </TreeItem>
    );

    const handleChangeTree = (event, nodes) => {
        setCategory(nodes);
    };

    const handleCloseChild = (event, reason) => {
        handleClose();
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleOkChild = () => {
        setOpen(false);
        handleOk(currentCategory); // функция callback родителя
    }
   
    return (
        <Dialog disableEscapeKeyDown open={open} onClose={handleCloseChild}>
            <DialogTitle>Categories</DialogTitle>
            <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    onNodeSelect={handleChangeTree}
                    sx={{ height: 180, flexGrow: 1, maxWidth: 400, minWidth: 250, overflowY: 'auto' }}
                    >
                    {renderTree(data)}
                </TreeView>
                </FormControl>
            </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseChild}>Cancel</Button>
            <Button onClick={handleOkChild}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}