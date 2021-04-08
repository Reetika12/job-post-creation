import React, { Component } from 'react';
import withWidth from '@material-ui/core/withWidth';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import _get from 'lodash/get';
import moment from 'moment';
import styleSheet from '../Styles/LayoutStyles';
import Pagination from '../../Components/Pagination';
import Loading from '../Loading';
import { Creators as FetchRawTopicsCreators } from '../../Redux/FetchRawTopics';
import { parseUrl } from '../../Lib/Utilities';
import Table from '../../Components/DefaultTable';
import SearchBar from '../../Components/SearchBar';
import Button from '../../Components/Button';
import './Styles/RawTopicsStyles.css';

class RawTopicsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: [
                {
                    label: 'ID',
                    columnWidth: '50px',
                    renderRow: (row) => (
                        <div>
                            <a href={`/raw_topics/${row.id}`}>{row.id}</a>{' '}
                        </div>
                    )
                },
                { key: 'name', label: 'Name', columnWidth: '90px' },
                {
                    label: 'Created at',
                    renderRow: (row) => (
                        <div> {moment(row.created_at * 1000).format('YYYY-MM-DD')}</div>
                    ),
                    columnWidth: '70px'
                },
                {
                    label: 'Updated at',
                    renderRow: (row) => (
                        <div> {moment(row.updated_at * 1000).format('YYYY-MM-DD')}</div>
                    ),
                    columnWidth: '80px'
                }
            ],
            searchTerm: ''
        };
    }

    componentDidMount() {
        let urlParams = parseUrl() || {};
        const page = urlParams.page || 1;
        const searchKey = urlParams.search_key || '';
        let params = { page };
        if (searchKey) {
            params['search[name]'] = searchKey;
            this.setState({
                searchTerm: searchKey
            });
        }
        this.props.fetchRawTopics(params);
    }

    handleSearchKeywordChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    filterTopics = (event) => {
        event.preventDefault();

        let { searchTerm = '' } = this.state;
        searchTerm = searchTerm.trim();

        let urlParams = parseUrl() || {};
        let rawTopicInURL = urlParams.search_key;

        if (rawTopicInURL === searchTerm) {
            return;
        }
        let params = {
            page: 1,
            'search[name]': searchTerm
        };

        this.props.fetchRawTopics(params);
        this.props.history.push(`?search_key=${searchTerm}`);
    };

    handleCreateRawTopic = () => {
        this.props.history.push('/raw_topics/new');
    };

    onChangePage = (page) => {
        let currentPage =
            _get(this.props.rawTopicsList, 'data.meta.current_page') || 1;
        let urlParams = parseUrl() || {};
        let params = { page };
        if (urlParams.search_key) {
            params['search[name]'] = urlParams.search_key;
        }
        if (currentPage && currentPage !== page) {
            this.props.fetchRawTopics(params);
        }
    };

    render() {
        if (this.props.rawTopicsList.fetching) {
            return <Loading />;
        }
        let rawTopicsData = _get(this.props, 'rawTopicsList.data.raw_topics') || [];
        let meta = _get(this.props, 'rawTopicsList.data.meta') || {};
        return (
            <div style={{ backgroundColor: '#f6f6f6' }}>
                <div className="video-list-header">
                    <SearchBar
                        searchTerm={this.state.searchTerm}
                        onChange={this.handleSearchKeywordChange}
                        onSubmit={this.filterTopics}
                    />
                    <div>
                        <Button
                            label="Create New Topic"
                            type="primary"
                            size="md"
                            onClick={this.handleCreateRawTopic}
                        />
                    </div>
                </div>

                {rawTopicsData.length ? (
                    <Table tabletitle={true} json={this.state.json} data={[...rawTopicsData]} />
                ) : (
                        <div className="emptyMsg">No Records to Display!</div>
                    )}

                <Pagination
                    initialPage={meta.current_page}
                    totalPages={meta.total_pages}
                    totalCount={meta.total_count}
                    onChangePage={this.onChangePage}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    rawTopicsList: state.rawTopics
});
const mapDispatchToProps = (dispatch) => ({
    fetchRawTopics: (params) => dispatch(FetchRawTopicsCreators.request(params))
});

export default compose(
    withStyles(styleSheet),
    withWidth(),
    connect(mapStateToProps, mapDispatchToProps)
)(RawTopicsList);
