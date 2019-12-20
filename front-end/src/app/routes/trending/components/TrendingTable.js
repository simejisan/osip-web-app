import React from 'react';
import CommonDataTable from 'components/CommonDataTable'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import ShopImageHeader from "./ShopImageHeader";
import __ from "helpers/globalHelpers";

class TrendingTable extends React.Component {

    render() {
        const fields = [
            {id: 'index', numeric: false, disablePadding: false, label: '#', style: 'w-10'},
            {id: 'description', numeric: false, disablePadding: false, label: 'HOT KEY', style: 'w-45'},
            {id: 'count', numeric: false, disablePadding: false, label: 'SỐ LƯỢT TÌM KIẾM', style: 'w-45'}
        ];
        const {data, type} = this.props;
        const shopInfo = __.getShopInfoByType(type);

        return (
            <div className="mb-4">
                <CommonDataTable
                    data={data ? data : []}
                    fields={fields}
                    tableRows={(item, index) =>
                        <TableRow hover key={item.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <a href={shopInfo.search + item.name} target="_blank"
                                   rel="noopener noreferrer">{item.name}</a>
                            </TableCell>
                            <TableCell>{item.count}</TableCell>
                        </TableRow>
                    }
                    slotOutsideHeader={
                        <ShopImageHeader image={shopInfo.image} type={type} link={shopInfo.link}/>
                    }
                />
            </div>
        )
    }
}

export default TrendingTable;

TrendingTable.propTypes = {
    data: PropTypes.array,
    type: PropTypes.string.isRequired
};
