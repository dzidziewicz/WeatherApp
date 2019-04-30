import React, { Component } from 'react';
import { Table, TableBody, TableCell, TablePagination, TableRow, Paper } from '@material-ui/core';
import CustomTableHead from '../CustomTableHead/CustomTableHead';
import TableToolbar from '../TableToolbar/TableToolbar';
import { withStyles } from '@material-ui/core/styles';
import './WeatherTable.css';
import axios from 'axios';

function stableSort(array, cmp) {
    if (array == null) {
        return [];
    }
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) { return order; }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

class WeatherTable extends Component {

    constructor(props) {
        super(props);
        
        const tableHeadLabels = ["City",
            "CountryCode",
            "Temperature [C]",
            "Pressure [hPa]",
            "Rain volume [mm]",
            "Wind speed [m/s]",
            "Date"];

        this.state = {
            order: 'desc',
            orderBy: 'City',
            page: 0,
            rowsPerPage: 5,
            filterText: '',
            tableHeadLabels: tableHeadLabels,
            data: [],
            loading: true,
        };
    };

    componentDidMount() {
        if (this.props.user)
            this.getRecords();
    }

    getRecords = () => {
        axios.get('/weather', {
            headers: {
                Authorization: "Bearer " + this.props.user.token
            }
        })
            .then(response => {
                this.setState({ data: response.data, loading: false });
            })
            .catch(error => {
                console.log('Error while fetching data!', error);
                this.setState({ loading: false });
            })
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
    };

    desc = (a, b, orderBy) => {
        let valueA;
        let valueB;
        const propNumber = this.state.tableHeadLabels.findIndex(l => l === orderBy);
        const propName = Object.keys(a)[propNumber];
        valueA = a[propName];
        valueB = b[propName];

        if (valueB < valueA) {
            return -1;
        }
        if (valueB > valueA) {
            return 1;
        }
        return 0;
    }

    getSorting = (order, orderBy) => {
        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
    }

    onFilterChange = (event) => {
        this.setState({ filterText: event.target.value });
    }

    onFilterHide = () => {
        this.setState({ filterText: '' });
    }

    filterPredicate = (record) => {
        return Object.keys(record).some((propName) => {
            const propValue = record[propName];
            return propValue != null &&
                propValue.toString().toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1;
        });
    }

    render() {
        const tableTitle = "Archival weather"

        const { data, order, orderBy, tableHeadLabels, rowsPerPage, page } = this.state;
        const dataLength = data ? data.length : 0;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataLength - page * rowsPerPage);
        const rows =
            tableHeadLabels.map((key, index) => ({
                id: key,
                disablePadding: false,
                label: key
            }));

        return (
            <Paper className="root">
                <TableToolbar
                    tableTitle={tableTitle}
                    onRefresh={this.getRecords}
                    onFilterChange={this.onFilterChange}
                    onFilterHide={this.onFilterHide}
                />
                <div className="tableWrapper">
                    <Table className="table" aria-labelledby="tableTitle">
                        <CustomTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={dataLength}
                            rows={rows}
                        />
                        <TableBody>
                            {stableSort((this.state.data || []).filter(this.filterPredicate), this.getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((n, elementIndex) => {
                                    return (
                                        <TableRow
                                            hover={true}
                                            tabIndex={-1}
                                            key={elementIndex}
                                        >
                                            {
                                                Object.keys(n).map((value, index) => {
                                                    if (index === 0) {
                                                        return (
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                                padding={"dense"}
                                                                key={index} >
                                                                {n[value] != null ? n[value].toString() : null}
                                                            </TableCell>
                                                        );
                                                    }
                                                    return (
                                                        <TableCell align="left" padding="dense" key={index}>
                                                            {n[value] != null ? n[value].toString() : null}
                                                        </TableCell>
                                                    );
                                                })
                                            }
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }} >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="table-nav">
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={dataLength}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </div>
            </Paper>
        );
    }
}

const styles = (theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: '1020px',
    },
    tableWrapper: {
        overflow: 'auto',
    },
});

export default (withStyles(styles)(WeatherTable));