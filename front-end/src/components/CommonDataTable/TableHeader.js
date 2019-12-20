import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

/*

* EXAMPLE COLUMNN FIELDS

    const fields = [
        {id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)'},
        {id: 'calories', numeric: true, disablePadding: false, label: 'Calories'},
        {id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)'},
        {id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)'},
        {id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)'},
    ];

*/

class TableHeader extends React.Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy} = this.props;

        return (
            <TableHead>
                <TableRow>
                    {this.props.fields.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                align={column.numeric ? "right" : "left"}
                                padding={column.disablePadding ? 'none' : 'default'}
                                className={column.style}
                            >
                                <Tooltip
                                    title="Sắp xếp"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

TableHeader.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired
};

export default TableHeader;
