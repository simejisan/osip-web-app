import React from 'react';
import {Card, CardBody, CardHeader} from "reactstrap";
import {connect} from "react-redux";
import PromotionCard from "../../../promotion/components/PromotionCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import PromotionFrameDialog from "../../../promotion/components/PromotionFrameDialog";

class Favorite extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            filterFavorites: [],
            isFiltering: false,
        };
    }

    handleSearchValueChange = event => {
        const newValue = event.target.value;

        this.setState({
            searchValue: newValue
        });

        this.handleFilterFavorite(event, newValue);
    };

    handleFilterFavorite = (event, value = this.state.searchValue) => {
        event.preventDefault();

        if (value !== '') {
            this.setState({
                filterFavorites: this.props.allFavorites.filter(favorite => {
                    let title = favorite.title ? favorite.title.toLowerCase() : "";
                    let store = favorite.store ? favorite.store.toLowerCase() : "";

                    return (
                        title.includes(value.toLowerCase()) ||
                        store.includes(value.toLowerCase())
                    )
                }),
                isFiltering: true
            })
        } else {
            this.setState({
                filterFavorites: [],
                isFiltering: false
            })
        }
    };

    render() {
        const {favoriteLoader, allFavorites} = this.props;

        return (
            <Card className="shadow border-0">
                <CardHeader className="bg-white">
                    <h4 className="font-weight-bold text-primary m-0">Khuyến mại ưu thích</h4>
                </CardHeader>
                <CardBody>
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <form className="m-0 border border-warning" role="search">
                                <div className="search-bar">
                                    <div className="form-group">
                                        <input type="search" className="form-control form-control-lg border-0"
                                               placeholder="Tìm kiếm tên hoặc cửa hàng khuyến mại trong danh sách ưu thích..."
                                               onChange={this.handleSearchValueChange}/>
                                        <button className="search-icon" onClick={this.handleFilterFavorite}>
                                            <i className="zmdi zmdi-search zmdi-hc-lg"/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {
                                favoriteLoader &&
                                <div className="loader-view mt-4">
                                    <CircularProgress/>
                                </div>
                            }
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                {
                                    (this.state.isFiltering ? this.state.filterFavorites : allFavorites).map(favorite => (
                                        <div className="col-lg-3 col-md-4 col-sm-6" key={favorite.id}>
                                            <PromotionCard item={favorite}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </CardBody>

                <PromotionFrameDialog/>
            </Card>
        )
    }
}

const mapStateToProps = ({favorite}) => {
    const {favoriteLoader, allFavorites} = favorite;
    return {favoriteLoader, allFavorites}
};

export default connect(mapStateToProps)(Favorite);
