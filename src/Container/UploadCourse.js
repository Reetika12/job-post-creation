import React, { Component } from 'react';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import moment from 'moment';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { createStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Creators as GetCohortRequisiteCreators } from '../../Redux/GetCohortRequisiteRedux';
import { Creators as GetCourseUploadCreators } from '../../Redux/GetCoursesUploadRedux';
import { Creators as PostCoursesCreators } from '../../Redux/PostCoursesRedux';
import ToastMessage from '../../Components/ToastMessage';
import { parseUrl } from '../../Lib/Utilities';
import Table from '../../Components/DefaultTable';
import Pagination from '../../Components/Pagination';
import Loading from '../Loading';
import '../Styles/inputStyles.css';

import AppHeader from '../../Components/AppHeader';

import SelectMenu from '../SelectMenu';
import CardLayout from '../../Components/CardLayout';
import styleSheet from '../Styles/LayoutStyles';

const CustomRadio = withStyles({
    root: {
        color: '#826AFF',
        '&$checked': {
            color: '#826AFF'
        }
    },
    checked: {}
})((props) => <Radio color="default" {...props} />);

const styles = createStyles({
    formControlLabel: {
        fontSize: '18px',
        fontFamily: 'Gotham-Book',
        color: '#757373',
        '& label': { fontSize: '18px', fontFamily: 'Gotham-Book', color: '#757373' }
    }
});

class UploadCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseName: '',
            cohortId: '',
            selectedCourseType: '',
            mandatorySessionCount: '',
            optionalSessionCount: '',
            startDate: '',
            endDate: '',
            pastTopicCount: '',
            openToast: false,
            toastMsg: '',
            disableUploadOnClick: false,
            enabledForFreeUsers: false,
            enabledForPremiumUsers: false,
            courseTag: '',
            mediumOfInstruction: '',
            batch: '',
            courseSubTag: ''
        };
        this.json = [
            { key: 'id', label: 'ID', columnTopicWidth: '20px' },
            {
                key: 'optional_params',
                label: 'Optional Params',
                columnTopicWidth: '340px',
                overflowWrap: 'anywhere'
            },
            { key: 'started_by', label: 'Started by', columnTopicWidth: '90px' },
            { key: 'status', label: 'Status', columnTopicWidth: '60px' },
            {
                key: 'reason_for_failure',
                label: 'Reason for Failure',
                columnTopicWidth: '230px'
            },
            {
                label: 'Created at',
                renderRow: (row) => (
                    <div>
                        {' '}
                        {moment(row.created_at * 1000).format('DD MMM YYYY HH:mm')}
                    </div>
                ),
                columnTopicWidth: '80px'
            },
            {
                label: 'Updated at',
                renderRow: (row) => (
                    <div>
                        {' '}
                        {moment(row.updated_at * 1000).format('DD MMM YYYY HH:mm')}
                    </div>
                ),
                columnTopicWidth: '80px'
            },
            {
                label: 'Upload File',
                renderRow: (row) => <a href={row.uploaded_file_url}>Uploaded file </a>,
                columnTopicWidth: '90px'
            },
            {
                label: 'Processed File',
                renderRow: (row) => (
                    <div>
                        {row.download_file_url ? (
                            <a href={row.download_file_url}>Processed file </a>
                        ) : (
                                ''
                            )}{' '}
                    </div>
                ),
                columnTopicWidth: '90px'
            }
        ];
        this.courseTagList = [
            { label: 'Classroom', value: 'classroom' },
            { label: 'Free trial', value: 'free_trial' },
            { label: 'Masterclass', value: 'masterclass' },
            { label: 'Bootcamp', value: 'bootcamp' }
        ];
        this.mediumOfInstructionList = [
            { label: 'English', value: 'English' },
            { label: 'Hindi', value: 'Hindi' },
            { label: 'Hindi + English', value: 'Hindi + English' }
        ];
        this.batchList = [
            { label: '11th', value: '11th' },
            { label: '12th', value: '12th' },
            { label: '12th Repeat', value: '12th Repeat' },
            { label: 'N/A', value: 'N/A' }
        ];
        this.courseSubTagList = [
            { label: 'Regular', value: 'Regular' },
            { label: 'Crash', value: 'Crash' }
        ];
        this.nameForFile = '';
    }

    componentWillMount() {
        this.props.fetchGetCohortRequisiteGroups();
        this.getCourseUploadData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.postCoursesUpload.fetching === true &&
            this.props.postCoursesUpload.fetching === false
        ) {
            if (_get(this.props.postCoursesUpload, 'error')) {
                this.setState({
                    toastMsg:
                        _get(this.props.postCoursesUpload, 'error.error.message') ||
                        'Invalid File Type',
                    openToast: true
                });
            } else {
                this.setState({
                    toastMsg: 'File uploaded successfully',
                    dialogOpen: false,
                    openToast: true,
                    disableUploadOnClick: true
                });

                this.setState({
                    courseName: '',
                    cohortId: '',
                    selectedCourseType: '',
                    mandatorySessionCount: '',
                    optionalSessionCount: '',
                    startDate: '',
                    endDate: '',
                    pastTopicCount: '',
                    enabledForFreeUsers: false,
                    enabledForPremiumUsers: false,
                    courseTag: '',
                    mediumOfInstruction: '',
                    batch: '',
                    courseSubTag: ''
                });
                document.getElementById('csvContainer').value = null;
            }
            this.getCourseUploadData();
        }
    }

    getCourseUploadData() {
        let urlParams = parseUrl() || {};
        let page = urlParams.page || 1;
        this.props.fetchGetCourseUpload({ page });
    }

    courseHandling = () => {
        this.props.history.push('/?page=1');
    };

    handleChangeCourseType = (event) => {
        this.setState({
            selectedCourseType: event.target.value,
            disableUploadOnClick: false
        });
    };

    handleChangeForFreeUsers = () => {
        this.setState({
            enabledForFreeUsers: !this.state.enabledForFreeUsers,
            disableUploadOnClick: false
        });
    };

    handleChangeForPremiumUsers = () => {
        this.setState({
            enabledForPremiumUsers: !this.state.enabledForPremiumUsers,
            disableUploadOnClick: false
        });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        const files = document.getElementById('csvContainer');
        if (!files.files || !files.files[0]) {
            this.setState({
                toastMsg: 'Please upload a file',
                openToast: true
            });
            return;
        }
        let formData = new FormData();
        formData.append('file', files.files[0]);
        formData.append('course_name', this.state.courseName);
        formData.append('cohort_id', this.state.cohortId);
        formData.append('start_at', this.state.startDate);
        formData.append('end_at', this.state.endDate);
        formData.append('course_type', this.state.selectedCourseType);
        formData.append(
            'mandatory_sessions_count',
            this.state.mandatorySessionCount
        );
        formData.append('optional_sessions_count', this.state.optionalSessionCount);
        formData.append('enabled_for_free_users', this.state.enabledForFreeUsers);
        formData.append(
            'enabled_for_premium_users',
            this.state.enabledForPremiumUsers
        );
        formData.append('course_tag', this.state.courseTag);
        if (this.state.mediumOfInstruction.length > 1) {
            formData.append('medium_of_instruction', this.state.mediumOfInstruction);
        }
        if (this.state.batch.length > 1 && this.state.batch !== 'N/A') {
            formData.append('course_batch', this.state.batch);
        }
        if (this.state.courseSubTag.length > 1) {
            formData.append('course_sub_tag', this.state.courseSubTag);
        }
        this.props.postCourses(formData);
        this.setState({
            disableUploadOnClick: true
        });
        this.getCourseUploadData();
    };

    handleCloseToast = () => {
        this.setState({ openToast: false, toastMsg: '' });
    };

    onChangePage = (page) => {
        let currentPage =
            _get(this.props.getCourseUpload, 'data.meta.current_page') || 1;
        if (currentPage && currentPage !== page) {
            this.props.fetchGetCourseUpload({ page });
            this.props.history.push(`?page=${page}`);
        }
    };

    fileHandleChange = () => {
        const files = document.getElementById('csvContainer');
        if (files.files[0]) {
            this.nameForFile = files.files[0].name || '';
        }
    };

    render() {
        let { session, width, classes } = this.props;
        let RequisiteCohortData =
            _get(this.props, 'cohortRequisite.data.cohorts') || [];
        let coursesUploadData =
            _get(this.props, 'getCourseUpload.data.uploads') || [];
        let meta = _get(this.props, 'getCourseUpload.data.meta') || {};
        let courseUpdatedData = coursesUploadData.map((data) => ({
            ...data,
            optional_params: JSON.stringify(data.optional_params)
        }));
        let cohortCourseData = [];
        let { openToast, toastMsg, disableUploadOnClick } = this.state;
        if (!coursesUploadData) {
            return <Loading />;
        }
        if (RequisiteCohortData) {
            cohortCourseData = RequisiteCohortData.map((item) => ({
                label: `${item.id}-${item.idnumber}-${item.name}`,
                value: `${item.id}`
            }));
        }
        let drawerDocked = isWidthUp('lg', width) || isWidthUp('md', width);
        return (
            <React.Fragment>
                <AppHeader user={session} drawerDocked={drawerDocked} />
                <div
                    className={classes.CourseHandlingStyle}
                    onClick={this.courseHandling.bind(this)}
                >
                    {'< Courses'}
                </div>
                <div className={classes.uploadCourseStyle}>Upload Courses</div>
                <CardLayout
                    title="Upload"
                    cardStyle={classNames(
                        classes.uploadCoursePageCardStyle,
                        classes.uploadHeaderStyle
                    )}
                >
                    <div className={classes.parentPadding}>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile}>Course name*</div>
                            <input
                                className={classes.rectangleCopyChild}
                                type="text"
                                id="courseName"
                                value={this.state.courseName}
                                onChange={(e) =>
                                    this.setState({
                                        courseName: e.target.value,
                                        disableUploadOnClick: false
                                    })
                                }
                            />
                        </div>
                        <div className={classes.uploadStyle}>
                            <label className={classes.uploadCourseFile}>Course File*</label>
                            <div className={classes.inputCsvStyle}>
                                <input
                                    id="csvContainer"
                                    className="custom-file-input"
                                    onChange={this.fileHandleChange}
                                    type="file"
                                    accept=".csv"
                                />
                            </div>
                        </div>
                        <div className={classes.linkStyle}>
                            <div className={classes.uploadCourseFile} />
                            <a
                                style={{ color: '#2e5cb8', textDecoration: 'underline' }}
                                href="https://tnl-uploads.s3.ap-southeast-1.amazonaws.com/production/ac341422-ad00-46db-9b2c-e57da3cf88d3.csv"
                            >
                                Sample Upload File(New Format)
              </a>
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile}>Cohort*</div>
                            <div className={classes.cohortSelectMenuStyle}>
                                <SelectMenu
                                    value={this.state.cohortId}
                                    title=""
                                    handleChange={(e) =>
                                        this.setState({
                                            cohortId: e.target.value,
                                            disableUploadOnClick: false
                                        })
                                    }
                                    options={cohortCourseData}
                                />
                            </div>
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile}>Course Type*</div>
                            <RadioGroup
                                aria-label="coursetype"
                                value={this.state.selectedCourseType}
                                onChange={this.handleChangeCourseType}
                                name="coursetype"
                                className={classes.radioButtonStyle}
                            >
                                <FormControlLabel
                                    id="one_to_many"
                                    value="one_to_many"
                                    control={<CustomRadio />}
                                    label={
                                        <Typography style={styles.formControlLabel}>
                                            One-To-Many
                    </Typography>
                                    }
                                />
                                <FormControlLabel
                                    id="one_to_mega"
                                    value="one_to_mega"
                                    control={<CustomRadio />}
                                    label={
                                        <Typography style={styles.formControlLabel}>
                                            One-To-Mega
                    </Typography>
                                    }
                                />
                            </RadioGroup>
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile}>
                                Mandatory Sessions per week*
              </div>
                            <input
                                className={classes.rectangleCopyChild}
                                type="number"
                                id="mandatorySession"
                                value={this.state.mandatorySessionCount}
                                onChange={(e) =>
                                    this.setState({
                                        mandatorySessionCount: e.target.value,
                                        disableUploadOnClick: false
                                    })
                                }
                            />
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile}>
                                Optional Sessions per week*
              </div>
                            <input
                                className={classes.rectangleCopyChild}
                                type="number"
                                id="optionalSessions"
                                value={this.state.optionalSessionCount}
                                onChange={(e) =>
                                    this.setState({
                                        optionalSessionCount: e.target.value,
                                        disableUploadOnClick: false
                                    })
                                }
                            />
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile}>Course start date*</div>
                            <input
                                className={classes.rectangleCopyChild}
                                type="date"
                                id="courseStartDate"
                                value={this.state.startDate}
                                onChange={(e) =>
                                    this.setState({
                                        startDate: e.target.value,
                                        disableUploadOnClick: false
                                    })
                                }
                            />
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile}>Course end date*</div>
                            <input
                                className={classes.rectangleCopyChild}
                                type="date"
                                id="courseEndDate"
                                value={this.state.endDate}
                                onChange={(e) =>
                                    this.setState({
                                        endDate: e.target.value,
                                        disableUploadOnClick: false
                                    })
                                }
                            />
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile}>
                                Past Topics Count(Fill unless all post topics)
              </div>
                            <input
                                className={classes.rectangleCopyChild}
                                type="number"
                                id="topicCount"
                                value={this.state.pastTopicCount}
                                onChange={(e) =>
                                    this.setState({
                                        pastTopicCount: e.target.value,
                                        disableUploadOnClick: false
                                    })
                                }
                            />
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile} />
                            <input
                                type="checkbox"
                                id="chk1"
                                className="chk11"
                                checked={this.state.enabledForFreeUsers}
                                onChange={this.handleChangeForFreeUsers}
                            />
                            <label className={classes.labelCheckBoxStyle}>
                                Enabled for free users*
              </label>
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile} />
                            <input
                                type="checkbox"
                                id="chk2"
                                className="chk22"
                                checked={this.state.enabledForPremiumUsers}
                                onChange={this.handleChangeForPremiumUsers}
                            />
                            <label className={classes.labelCheckBoxStyle}>
                                Enabled for premium users*
              </label>
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile}>Course Tag*</div>
                            <div className={classes.cohortSelectMenuStyle}>
                                <SelectMenu
                                    title=""
                                    value={this.state.courseTag}
                                    handleChange={(e) =>
                                        this.setState({
                                            courseTag: e.target.value,
                                            disableUploadOnClick: false
                                        })
                                    }
                                    options={this.courseTagList}
                                />
                            </div>
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile}>Course Sub Tag*</div>
                            <div className={classes.cohortSelectMenuStyle}>
                                <SelectMenu
                                    title=""
                                    value={this.state.courseSubTag}
                                    handleChange={(e) =>
                                        this.setState({
                                            courseSubTag: e.target.value,
                                            disableUploadOnClick: false
                                        })
                                    }
                                    options={this.courseSubTagList}
                                />
                            </div>
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile}>
                                Medium of instruction*
              </div>
                            <div className={classes.cohortSelectMenuStyle}>
                                <SelectMenu
                                    title=""
                                    value={this.state.mediumOfInstruction}
                                    handleChange={(e) =>
                                        this.setState({
                                            mediumOfInstruction: e.target.value,
                                            disableUploadOnClick: false
                                        })
                                    }
                                    options={this.mediumOfInstructionList}
                                />
                            </div>
                        </div>
                        <div className={classes.uploadStyle}>
                            <div className={classes.uploadCourseFile}>Batch</div>
                            <div className={classes.cohortSelectMenuStyle}>
                                <SelectMenu
                                    title=""
                                    value={this.state.batch}
                                    handleChange={(e) =>
                                        this.setState({
                                            batch: e.target.value,
                                            disableUploadOnClick: false
                                        })
                                    }
                                    options={this.batchList}
                                />
                            </div>
                        </div>

                        <div className={classes.buttonUploadOuterStyle}>
                            <Button
                                className={classes.uploadButtonStyle}
                                disabled={disableUploadOnClick}
                                onClick={(e) => this.onSubmit(e)}
                            >
                                UPLOAD
              </Button>
                        </div>
                    </div>
                </CardLayout>

                <CardLayout
                    title="Previous History"
                    cardStyle={classes.uploadCoursePageCardStyle}
                >
                    <Table json={this.json} data={courseUpdatedData} />
                </CardLayout>
                <Pagination
                    initialPage={meta.current_page}
                    totalPages={meta.total_pages}
                    totalCount={meta.total_count}
                    onChangePage={this.onChangePage}
                />
                <ToastMessage
                    open={openToast}
                    handleClose={this.handleCloseToast}
                    message={toastMsg}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    cohortRequisite: state.cohortRequisite,
    postCoursesUpload: state.postCourses,
    getCourseUpload: state.coursesUploads
});
const mapDispatchToProps = (dispatch) => ({
    fetchGetCohortRequisiteGroups: (params) =>
        dispatch(GetCohortRequisiteCreators.request(params)),
    postCourses: (params) => dispatch(PostCoursesCreators.request(params)),
    fetchGetCourseUpload: (params) =>
        dispatch(GetCourseUploadCreators.request(params))
});

export default compose(
    withStyles(styleSheet),
    withWidth(),
    connect(mapStateToProps, mapDispatchToProps)
)(UploadCourse);
