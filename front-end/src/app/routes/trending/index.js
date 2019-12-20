import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import {connect} from "react-redux";
import TrendingTable from './components/TrendingTable'
import {getAllHotwords, hideHotwordsLoader, showHotwordsLoader} from 'actions/Hotwords';
import CircularProgress from "@material-ui/core/CircularProgress";

class Trending extends React.Component {

    componentDidMount() {
        this.props.hideHotwordsLoader();
        this.handleGetAllHotwords();
    }

    handleGetAllHotwords() {
        this.props.showHotwordsLoader();
        this.props.getAllHotwords();
    }

    render() {
        const {hotwordsLoader, allHotwords} = this.props;
        const {sendo, shoppe, tiki, google} = allHotwords;

        return (
            <div className="app-wrapper animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.trending"/>}/>

                <div className="row">
                    <div className="col-md-6">
                        <TrendingTable
                            data={google}
                            type="google"
                        />
                    </div>
                    <div className="col-md-6">
                        <TrendingTable
                            data={shoppe}
                            type="shopee"
                        />
                    </div>
                    <div className="col-md-6">
                        <TrendingTable
                            data={sendo}
                            type="sendo"
                        />
                    </div>
                    <div className="col-md-6">
                        <TrendingTable
                            data={tiki}
                            type="tiki"
                        />
                    </div>
                </div>

                {
                    hotwordsLoader &&
                    <div className="loader-view">
                        <CircularProgress/>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({hotwords}) => {
    const {hotwordsLoader, allHotwords} = hotwords;
    return {hotwordsLoader, allHotwords}
};

export default connect(mapStateToProps, {
    getAllHotwords,
    showHotwordsLoader,
    hideHotwordsLoader
})(Trending);
