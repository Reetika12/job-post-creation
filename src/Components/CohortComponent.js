import React, { Component } from 'react';
import withWidth from '@material-ui/core/withWidth';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import _get from 'lodash/get';
import qs from 'qs';
import ComponentHeader from '../../Components/ComponentHeader';
import Pagination from '../../Components/Pagination';
import styleSheet from '../Styles/LayoutStyles';
import { Creators as GetCohortsCreators } from '../../Redux/GetCohortRedux';
import Table from '../../Components/DefaultTable';
import Loading from '../Loading';
import { parseUrl } from '../../Lib/Utilities';
import { Creators as GetCohortByIdCreators } from '../../Redux/GetCohortByIdRedux';
import { Creators as GetCohortByGradeAndSyllabusCreators } from '../../Redux/GetCohortByGradeandSyllabus';

class Cohorts extends Component {
    constructor(props) {
        super(props);
        let { classes } = props;
        this.state = {
            json: [
                { key: 'id', label: 'Cohort Id' },
                { key: 'idnumber', label: 'Cohort Id Number', columnWidth: '200px' },
                { key: 'name', label: 'Cohort Name', columnWidth: '200px' },
                { key: 'grade', label: 'Grade', columnWidth: '200px' },
                { key: 'syllabus', label: 'Syllabus', columnWidth: '200px' },
                {
                    renderRow: (row) => (
                        <Button
                            variant="contained"
                            href={`/cohorts/${row.id}`}
                            className={classes.indexTableButtonStyle}
                        >
                            View Info
            </Button>
                    )
                }
            ],
            selectedGrade: 'all',
            selectedSyllabus: 'all',
            isMobileView: false
        };
    }

    componentDidMount() {
        let urlParams = parseUrl() || {};
        let page = urlParams.page || 1;
        this.props.fetchGetCohorts({ ...urlParams });
        this.props.fetchGetCohortsByGradeAndSyllabus({ page });
    }

    componentDidUpdate(prevProps, prevState) {
        let urlParams = parseUrl() || {};
        let page = urlParams.page || 1;
        page = parseInt(page, 10);
        if (this.props.location.search !== prevProps.location.search) {
            this.props.fetchGetCohorts({ ...urlParams });
        }
    }

    fetchFilteredCohortData = (selectMenuType, selectedMenuValue) => {
        let params = {
            page: 1
        };
        if (selectMenuType === 'grades') {
            let { selectedSyllabus } = this.state;
            if (selectedSyllabus === 'all') {
                if (selectedMenuValue !== 'all') {
                    params.grade = selectedMenuValue;
                } else {
                    params.grade = selectedMenuValue;
                }
            } else {
                params.grade = selectedMenuValue;
                params.syllabus = selectedSyllabus;
            }
            this.setState({
                selectedGrade: selectedMenuValue
            });
        } else {
            let { selectedGrade } = this.state;
            if (selectedGrade === 'all') {
                if (selectedMenuValue !== 'all') {
                    params.syllabus = selectedMenuValue;
                }
            } else {
                params.grade = selectedGrade;
                params.syllabus = selectedMenuValue;
            }
            this.setState({
                selectedSyllabus: selectedMenuValue
            });
        }
        params = qs.stringify(params);
        this.props.history.push(`?${params}`);
    };

    onChangePage = (page) => {
        let urlParams = parseUrl() || {};
        let params = {
            page
        };
        let currentPage = _get(this.props.cohorts, 'data.meta.current_page') || 1;
        if (currentPage !== page) {
            if (urlParams.grade) {
                params.grade = urlParams.grade;
            }
            if (urlParams.syllabus) {
                params.grade = urlParams.syllabus;
            }
            params = qs.stringify(params);
            this.props.history.push(`?${params}`);
        }
    };

    handleDrawerToggle = () => {
        this.setState({
            isMobileView: true
        });
    };

    hideLeftDrawer = () => {
        this.setState({
            isMobileView: false
        });
    };

    render() {
        let { selectedGrade, selectedSyllabus } = this.state;
        let cohortsData = _get(this.props, 'cohorts.data.cohorts') || [];
        let meta = _get(this.props, 'cohorts.data.meta') || {};
        let cohortDataByGrade =
            _get(this.props, 'CohortByGradeAndSyllabus.data.grades') || [];
        let cohortDataBySyllabus =
            _get(this.props, 'CohortByGradeAndSyllabus.data.syllabuses') || [];
        let finalData = [];
        let cohortGradeData = [];
        let syllabusData = [];
        if (cohortDataByGrade.length > 0) {
            finalData = cohortDataByGrade[0].list.concat(cohortDataByGrade[1].list);
            finalData.map((item) =>
                cohortGradeData.push({ label: `${item}`, value: `${item}` })
            );
            cohortGradeData.push({ label: 'Grades', value: 'all' });
        }
        if (cohortDataBySyllabus.length > 0) {
            cohortDataBySyllabus.map((item) =>
                syllabusData.push({ label: `${item}`, value: `${item}` })
            );
            syllabusData.push({ label: 'Syllabus', value: 'all' });
        }
        if (this.props.cohorts.fetching) {
            return <Loading />;
        }
        return (
            <React.Fragment>
                <ComponentHeader
                    title="Manage Cohorts"
                    isDropDownEnabled1={true}
                    cohortGradeData={cohortGradeData}
                    isDropDownEnabled2={true}
                    syllabusData={syllabusData}
                    selectedGrade={selectedGrade}
                    selectedSyllabus={selectedSyllabus}
                    handleSelectMenu={this.fetchFilteredCohortData}
                />
                <Table json={this.state.json} data={[...cohortsData]} />
                <Pagination
                    initialPage={meta.current_page}
                    totalPages={meta.total_pages}
                    totalCount={meta.total_count}
                    onChangePage={this.onChangePage}
                />
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    cohorts: state.cohorts,
    cohortById: state.cohortById,
    subjects: state.subjects,
    CohortByGradeAndSyllabus: state.cohortByGradeAndSyllabus
});
const mapDispatchToProps = (dispatch) => ({
    fetchGetCohorts: (p) => dispatch(GetCohortsCreators.request(p)),
    fetchGetCohortsById: (id) => dispatch(GetCohortByIdCreators.request(id)),
    fetchGetCohortsByGradeAndSyllabus: (id) =>
        dispatch(GetCohortByGradeAndSyllabusCreators.request(id))
});

export default compose(
    withStyles(styleSheet),
    withWidth(),
    connect(mapStateToProps, mapDispatchToProps)
)(Cohorts);
