import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { categoryActions } from '../../_actions';
import { FormInputText } from "../FormComponents/FormInputText";

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const [open, setOpen] = useState(false);
  const [openNewNode, setOpenNewNode] = useState(false);
  const [openAlertDialog, setAlertDialog] = useState(false);
  
  const dispatch = useDispatch();

  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: { 
        name: label,
        newNode: "",
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenNewNode = () => {
    setOpenNewNode(true);
  }

  const handleClickOpenAlert = () => {
    setAlertDialog(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseNewNode = () => {
    setOpenNewNode(false);
  }

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event) => {
    handleSelection(event);
  };

  const handleEditCategory = ({ name }) => {
    //dispatch(categoryActions.edit(findAndChange(nodeId, name, data)));
    dispatch(categoryActions.edit({id: nodeId, newValue: name}));
    setOpen(false);
  }

  const handleNewCategory = ({ newNode }) => {
    //console.log(newNode);
    dispatch(categoryActions.add({id: nodeId, value: newNode}));
    setOpenNewNode(false);
  }

  const handleClickNo = () => {
    console.log("No");
    setAlertDialog(false);
  }

  const handleClickYes = () => {
    dispatch(categoryActions.remove({ id: nodeId }));
    setAlertDialog(false);
  }


  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {label}    
          </Typography>
          <Stack direction="row" justifyContent="end">
          <IconButton aria-label="edit" onClick={handleClickOpen}>
                <EditIcon fontSize="small"/>
            </IconButton>
            <IconButton aria-label="add" onClick={handleClickOpenNewNode}>
                <AddCircleOutlineIcon fontSize="small"/>
            </IconButton>
            <IconButton aria-label="delete" onClick={handleClickOpenAlert}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
          </Stack>
        </Box>
      </Typography>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <FormInputText name="name" control={control} label="Name" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(handleEditCategory)}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openNewNode} onClose={handleCloseNewNode}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <FormInputText name="newNode" control={control} label="Name" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewNode}>Cancel</Button>
          <Button onClick={handleSubmit(handleNewCategory)}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAlertDialog} onClose={handleClickNo}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickNo}>No</Button>
          <Button onClick={handleClickYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

CustomContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  displayIcon: PropTypes.node,
  expansionIcon: PropTypes.node,
  icon: PropTypes.node,
  label: PropTypes.node,
  nodeId: PropTypes.string.isRequired,
};

const CustomTreeItem = (props) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
);

const getTreeItemsFromData = treeItems => {
  return treeItems.map(treeItemData => {
    let children = undefined;
    if (treeItemData.children && treeItemData.children.length > 0) {
      children = getTreeItemsFromData(treeItemData.children);
    }
    return (
      <CustomTreeItem
        key={treeItemData.id}
        nodeId={treeItemData.id}
        label={treeItemData.name}
        children={children}
      />
    );
  });
};

export const TreeViewCategory = () => {

  const category = useSelector(state => state.category);

  console.log(category);

  return (
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
        {getTreeItemsFromData(category)}
    </TreeView>
  );
}
