import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import {Card, CardBody} from "reactstrap";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {connect} from "react-redux";
import {getAllSuggestion, hideSuggestionLoader, showSuggestionLoader} from 'actions/Suggestion';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import __ from "helpers/globalHelpers";

class Suggestion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
        };
    }

    componentDidMount() {
        this.props.hideSuggestionLoader();
    }

    handleSearchValueChange = event => {
        this.setState({
            searchValue: event.target.value
        });
    };

    handleGetSuggestion(keyword) {
        this.props.showSuggestionLoader();
        this.props.getAllSuggestion(keyword);
    }

    render() {
        const {suggestionLoader, allSuggestions} = this.props;
        const {searchValue} = this.state;

        return (
            <div className="app-wrapper animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.suggestion"/>}/>
                <Card className="shadow border-0">
                    <CardBody>
                        <div className={`suggestion-header ${searchValue !== "" ? "" : "waiting"}`}>
                            <div className="suggestion-header--content"/>
                        </div>
                        <div className="card shadow border-0 bg-white p-2">
                            <form className="m-0" role="search">
                                <div className="search-bar">
                                    <div className="form-group">
                                        <input type="search" autoFocus className="form-control form-control-lg border-0"
                                               placeholder="Hãy cho chúng tôi biết từ khoá bạn muốn tìm kiếm..."
                                               onChange={this.handleSearchValueChange}/>
                                        <button className="search-icon" onClick={event => {
                                            event.preventDefault();

                                            this.handleGetSuggestion(this.state.searchValue);
                                        }}>
                                            <i className="zmdi zmdi-search zmdi-hc-lg"/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {
                            suggestionLoader &&
                            <div className="loader-view mt-3">
                                <CircularProgress/>
                            </div>
                        }
                        <List dense>
                            {
                                allSuggestions.map((suggestion, index) => {
                                    const shopInfo = __.getShopInfoByType(suggestion.source);

                                    return (
                                        <ListItem button key={index} onClick={() => {
                                            window.open(shopInfo.search + searchValue, '_blank');
                                        }}>
                                            <ListItemText primary={suggestion.keyword}
                                                          secondary={shopInfo.name}/>
                                            <ListItemAvatar>
                                                <Avatar src={shopInfo.image}
                                                        className="size-30"/>
                                            </ListItemAvatar>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </CardBody>
                </Card>
            </div>
        );
    }
}


const mapStateToProps = ({suggestion}) => {
    const {suggestionLoader, allSuggestions} = suggestion;
    return {suggestionLoader, allSuggestions}
};

export default connect(mapStateToProps, {
    getAllSuggestion,
    showSuggestionLoader,
    hideSuggestionLoader
})(Suggestion);
