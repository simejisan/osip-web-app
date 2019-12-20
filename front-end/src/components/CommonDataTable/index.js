import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import Paper from '@material-ui/core/Paper';
import TableHeader from './TableHeader'
import TablePaginationActions from './TablePaginationActions'

class CommonDataTable extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 0,
            rowsPerPage: 10,
            order: this.props.order,
            orderBy: this.props.orderBy,
        };
    }

    handleChangePage = (event, page) => {
        this.setState({page});
    };
    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.props.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.props.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({data, order, orderBy});
    };

    render() {
        const {order, orderBy, rowsPerPage, page} = this.state;
        const {data, fields} = this.props;

        return (
            <Paper className={"common-data-table"}>
                {this.props.slotOutsideHeader}
                <Table>
                    <TableHeader
                        fields={fields}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => this.props.tableRows(item, index))}
                        {data.length <= 0 && (
                            <TableRow style={{height: 10}}>
                                <TableCell colSpan={fields.length}>
                                    <div className="w-100 text-center font-weight-bold">
                                        Không có dữ liệu nào
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            {
                                this.props.slotTableFooter ?
                                <TableCell colSpan={Math.ceil(fields.length / 2)}>
                                    {this.props.slotTableFooter}
                                </TableCell> : <TableCell />
                            }
                            <TablePagination
                                colSpan={this.props.slotTableFooter ? Math.floor(fields.length / 2) : fields.length}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOptions={[10, 25, 50]}
                                labelRowsPerPage={'Số dòng trên trang:'}
                                labelDisplayedRows={({from, to, count}) => `${from}-${to === -1 ? count : to} của ${count}`}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        );
    }
}

CommonDataTable.defaultProps = {
    order: 'asc',
    orderBy: ''
};

CommonDataTable.propTypes = {
    data: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    tableRows: PropTypes.func.isRequired,
    slotTableFooter: PropTypes.object,
    slotOutsideHeader: PropTypes.object
};

export default CommonDataTable;
