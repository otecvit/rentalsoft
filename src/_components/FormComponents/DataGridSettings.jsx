import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useMediaQuery from '@mui/material/useMediaQuery';


import { visuallyHidden } from '@mui/utils';


import { CustomersTableCell } from './TableCellComponents/CustomersTableCell';
import { TaxesTableCell } from './TableCellComponents/TaxesTableCell';
import { ConsumablesTableCell } from './TableCellComponents/ConsumablesTableCell';
import { ServicesTableCell } from './TableCellComponents/ServicesTableCell';
import { BundlesTableCell } from './TableCellComponents/BundlesTableCell';

import BoxChipVariants from '../StyledComponent/BoxChipVariants';
import { inventoryActions, customerActions, consumablesActions, servicesActions, bundlesActions } from '../../_actions';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
    const { order, orderBy, rowCount, onRequestSort, headCells } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        sortDirection={orderBy === headCell.id ? order : false}
                        width={headCell.width ? headCell.width : 'auto'}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {

    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (<></>)

    // return (
    //     <Toolbar
    //         sx={{
    //             pl: { sm: 2 },
    //             pr: { xs: 1, sm: 1 },
    //         }}
    //     >
    //         <Typography
    //             sx={{ flex: '1 1 100%' }}
    //             variant="h6"
    //             id="tableTitle"
    //             component="div"
    //         >
    //             Nutrition
    //         </Typography>

    //         <Tooltip title="Filter list">
    //             <IconButton>
    //                 <FilterListIcon />
    //             </IconButton>
    //         </Tooltip>

    //     </Toolbar>
    // );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


export const DataGridSettings = ({ data, handleClear, chTokenCompany, type, headCells }) => {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [currentRow, setCurrent] = useState("");
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();



    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClickMenu = (event, row) => {
        switch (type) {
            case 'taxes': {
                setCurrent(row.chTokenInventory);
            } break;
            case 'customers': {
                setCurrent(row.chTokenCustomer)
            } break;
            case 'consumables': {
                setCurrent(row.chTokenConsumable)
            } break;
            case 'services': {
                setCurrent(row.chTokenService)
            } break;
            case 'bundles': {
                setCurrent(row.chTokenBundle)
            } break;
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        // setCurrent("");
        setAnchorEl(null);
    };


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleClick = (event, name) => {
        // const selectedIndex = selected.indexOf(name);
        // let newSelected = [];

        // if (selectedIndex === -1) {
        //     newSelected = newSelected.concat(selected, name);
        // } else if (selectedIndex === 0) {
        //     newSelected = newSelected.concat(selected.slice(1));
        // } else if (selectedIndex === selected.length - 1) {
        //     newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelected = newSelected.concat(
        //         selected.slice(0, selectedIndex),
        //         selected.slice(selectedIndex + 1),
        //     );
        // }

        // setSelected(newSelected);
        //console.log("name", selected.indexOf(name));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };


    const handleClickEdit = () => {
        let path = `/${type}/detail/${currentRow}`;
        handleClear(); // чистим state перед переходом
        history.push(path);
    }

    const handleClickDelete = () => {
        setOpenDeleteDialog(true);
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleOkDeleteDialog = (e) => {
        //console.log(data);
        switch (type) {
            case 'taxes': {
                dispatch(inventoryActions.remove({
                    chTokenInventory: currentRow,
                    chTokenCompany: chTokenCompany,
                    filesToRemove: data.filter(item => item.chTokenInventory === currentRow)[0].arrFilePath
                }))
            } break;
            case 'customers': {
                dispatch(customerActions.remove({
                    chTokenCustomer: currentRow,
                    chTokenCompany: chTokenCompany,
                    filesToRemove: data.filter(item => item.chTokenCustomer === currentRow)[0].arrFilePath
                }))
            } break;
            case 'consumables': {
                dispatch(consumablesActions.remove({
                    chTokenConsumable: currentRow,
                    chTokenCompany: chTokenCompany,
                    filesToRemove: data.filter(item => item.chTokenConsumable === currentRow)[0].arrFilePath
                }))
            } break;
            case 'services': {
                dispatch(servicesActions.remove({
                    chTokenService: currentRow,
                    chTokenCompany: chTokenCompany,
                    filesToRemove: data.filter(item => item.chTokenService === currentRow)[0].arrFilePath
                }))
            } break;
            case 'bundles': {
                dispatch(bundlesActions.remove({
                    chTokenBundle: currentRow,
                    chTokenCompany: chTokenCompany,
                    filesToRemove: data.filter(item => item.chTokenBundle === currentRow)[0].arrFilePath
                }))
            } break;

        }
        setOpenDeleteDialog(false);
    };


    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, boxShadow: 'none', pb: 3 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            {type === 'taxes' && <TaxesTableCell row={row} />}

                                            <TableCell align="left">
                                                <IconButton
                                                    aria-label="more"
                                                    id={index}
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={(event) => handleClickMenu(event, row)}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            paddingLeft: '8px',
                            paddingRight: '8px',
                            borderRadius: '12px',
                            width: '160px',
                            boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) -20px 20px 40px -4px',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                zIndex: '1',
                                width: '12px',
                                height: '12px',
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                transform: 'rotate(-135deg)',
                                background: 'rgb(255, 255, 255)',
                                borderRadius: '0px 0px 0px 3px',
                                right: '-6px',
                                borderBottom: '1px solid rgba(145, 158, 171, 0.12)',
                                borderLeft: '1px solid rgba(145, 158, 171, 0.12)',
                                top: '20px',
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 160, vertical: 15 }}
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                >
                    <MenuItem variant="datagridmenu" onClick={handleClickEdit}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        Edit
                    </MenuItem>
                    <MenuItem variant="datagridmenu" color="red" onClick={handleClickDelete}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" sx={{ color: 'rgb(255, 72, 66)' }} />
                        </ListItemIcon>
                        Delete
                    </MenuItem>

                </Menu>
            </Paper>
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">
                    Message
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Delete {type}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>No</Button>
                    <Button onClick={handleOkDeleteDialog} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}


