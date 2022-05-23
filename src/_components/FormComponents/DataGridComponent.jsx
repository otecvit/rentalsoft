import * as React from 'react';
import { useHistory } from "react-router-dom";


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
import { visuallyHidden } from '@mui/utils';


import BoxChipVariants from '../StyledComponent/BoxChipVariants';


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

const headCells = [
    {
        id: 'id',
        numeric: false,
        label: '#',
        align: 'left',
        width: 30,
    },
    {
        id: 'chName',
        numeric: false,
        label: 'Name',
        align: 'left',
    },
    {
        id: 'chCountItem',
        numeric: true,
        label: 'Quantity',
        align: 'left',
    },
    {
        id: 'rentprice',
        numeric: true,
        label: 'Rent Price',
        align: 'left',
    },
    {
        id: 'status',
        numeric: true,
        label: 'Status',
        align: 'left',
    },
    {
        id: 'actions',
        numeric: true,
        label: '',
        align: 'left',
        width: 5,
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, rowCount, onRequestSort } =
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


export const DataGridComponent = ({ data, handleClear }) => {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [currentInventory, setCurrent] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickMenu = (event, chTokenInventory) => {

        setCurrent(chTokenInventory);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setCurrent("");
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

    const handleClickView = () => {
        let path = `/inventory/view/${currentInventory}`;
        handleClear(); // чистим state перед переходом
        history.push(path);
    }

    const handleClickEdit = () => {
        let path = `/inventory/detail/${currentInventory}`;
        handleClear(); // чистим state перед переходом
        history.push(path);
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, boxShadow: 'none', pb: 3 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
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
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.chTokenInventory}
                                            selected={isItemSelected}
                                        >

                                            <TableCell align="left"><Typography variant="subtitle2">#{row.iNom}</Typography></TableCell>
                                            <TableCell align="left">
                                                <Stack direction="row" justifyContent="flex-start" alignItems="center">
                                                    {/* <Avatar alt={row.chName} src={row.arrFilePath ? row.arrFilePath[0].file : ""} variant="avatartable" /> */}
                                                    <Typography variant="subtitle2">{row.chName}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="left">
                                                <BoxChipVariants type="quantity" text={row.chCountItem} />
                                            </TableCell>
                                            <TableCell align="left">Starting at $20.00</TableCell>
                                            <TableCell align="left">
                                                <BoxChipVariants type="success" text="active" />
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton
                                                    aria-label="more"
                                                    id={index}
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={(event) => handleClickMenu(event, row.chTokenInventory)}
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
                    <MenuItem variant="datagridmenu" onClick={handleClickView}>
                        <ListItemIcon>
                            <VisibilityIcon fontSize="small" />
                        </ListItemIcon>
                        View
                    </MenuItem>
                    <MenuItem variant="datagridmenu" onClick={handleClickEdit}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        Edit
                    </MenuItem>
                    <MenuItem variant="datagridmenu" color="red">
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" sx={{ color: 'rgb(255, 72, 66)' }} />
                        </ListItemIcon>
                        Delete
                    </MenuItem>

                </Menu>
            </Paper>
        </Box>
    );
}


