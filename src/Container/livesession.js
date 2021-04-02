import React, { Component } from 'react'
import MentorTable from '../OneToOneSessions/Table'
import { Creators as FetchTutorClassroomDetailsCreators } from '../../../Redux/OneToManyRedux/FetchTutorClassroomDetailsRedux'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import _get from 'lodash/get'
import qs from 'qs'
import { parseUrl } from '../../../Lib/Utilities'
import Pagination from '../../../Components/Pagination'
import Loading from '../../../Components/Loading'
import moment from 'moment'
import '../Styles/OneToOnePage.css'
import ToastMessage from '../../../Components/ToastMessage'
import TimerDiff from '../TimerDiff'
import SelectDropDown from '../SchedulingPage/SelectDropDown'
import { Creators as FetchSchedulingDropdownListCreators } from '../../../Redux/SchedulePageRedux/FetchSchedulingDropdownListRedux'
import { Creators as FetchSubjectDetailsCreators } from '../../../Redux/SchedulePageRedux/FetchSubjectDetailsSchedulingRedux'
import Button from '@material-ui/core/Button';
import DateComp from '../SchedulingPage/DateComp'
import "react-datepicker/dist/react-datepicker.css";
import { Images } from '../../../Themes'
import setOfConstants from '../Constant'
import ClassNames from 'classnames'


class LiveClassroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toastMsg: '',
            openToast: false,
            isClear: false,
            lastUpdated: new Date(),
            grades: [],
            syllabuses: [],
            subjects: [],
            selectedElapsedTime: "",
            elapsedTimeLower: "",
            elapsedTimeHigher: "",
            timerFlag: true,
            startDate: moment().startOf('day')._d,
            endDate: moment().endOf('day')._d,
            toggleDateRange: false,
            toggleCustomRange: false,
            changeArrow: true,
            selectedCourseType: "",
            selectedSessionType: "",
            courseTag: "",
            selectedClassroomType: ""
        }
        this.interval = null
    }

    componentDidMount() {
        let urlParams = parseUrl() || {}
        let page = urlParams.page || 1
        let { start_date: startDate,
            end_date: endDate,
            course_tag: courseTag,
            session_type: sessionType,
            is_mandatory,
            elapsed_time_lower: elapsedTimeLower,
            elapsed_time_higher: elapsedTimeHigher,
            elapsed_time_asc_order: changeArrow,
            subjects, ...exta } = urlParams
        urlParams.per_page = 10
        let isClear = Object.keys(urlParams).length > 2
        let stateParams = {
            ...exta,
            isClear,
            subjects,
            selectedSessionType: sessionType || "",
            selectedCourseType: this.getCourseType(courseTag),
            selectedElapsedTime: this.getElapsedTypeData(elapsedTimeLower)
        }
        if (startDate) {
            stateParams.startDate = this.getSelectedDateFormate(startDate)
        }
        if (endDate) {
            stateParams.endDate = this.getSelectedDateFormate(endDate)
        }
        if (subjects) {
            stateParams.subjects = typeof (subjects) !== Array ? Object.values(subjects) : subjects
            urlParams.subjects = typeof (subjects) !== Array ? Object.values(subjects) : subjects
        }
        if (is_mandatory) {
            stateParams.selectedClassroomType = is_mandatory === "true" ? "Mandatory" : "Optional"
        }
        this.setState(stateParams, () => {
            const { startDate, endDate } = this.state;
            this.props.fetchLiveClassroomData({
                start_date: startDate,
                end_date: endDate,
                ...urlParams
            })
            this.props.fetchShedulingFilters()
        })

        this.resetTimerInterval(page, 10)
        this.props.fetchShedulingFilters()
        this.props.fetchSchedulingSubjectDetails(1)
    }

    resetTimerInterval(page, per_page) {
        this.interval = setInterval(() => {
            let { syllabuses, subjects, elapsedTimeLower, elapsedTimeHigher, startDate, endDate, changeArrow, selectedCourseType, selectedSessionType, selectedClassroomType } = this.state
            let urlParams = parseUrl() || {}
            let params = {
                page,
                per_page,
                syllabuses,
                grades: urlParams.grades,
                subjects,
                start_date: startDate,
                end_date: endDate,
            }
            if (elapsedTimeLower && elapsedTimeHigher) {
                params.elapsed_time_lower = elapsedTimeLower
                params.elapsed_time_higher = elapsedTimeHigher
            }
            if (selectedCourseType) {
                params.course_tag = this.getSelectedCourseType(selectedCourseType)
            }
            if (selectedSessionType) {
                params.session_type = selectedSessionType
            }
            if (selectedClassroomType) {
                params.is_mandatory = this.getSelectedClassroomType(selectedClassroomType)
            }
            this.props.fetchLiveClassroomData(params)
            this.setState({
                lastUpdated: new Date(),
                changeArrow
            })
        }, 30000)
    }

    componentWillUnmount() {
        if (this.interval != null) {
            clearInterval(this.interval)
        }
    }
    componentDidUpdate(prevProps, prevState) {
        let urlParams = parseUrl() || {}
        if (prevProps.tutorClassroomData.fetching && !this.props.tutorClassroomData.fetching) {
            if (_get(this.props.tutorClassroomData, 'error.message')) {
                this.setState({
                    toastMsg: _get(this.props.tutorClassroomData, 'error.message'),
                    openToast: true,
                })
            } else if (_get(this.props.tutorClassroomData, 'data.classrooms') || [].length === 0) {
                clearInterval(this.interval)
                this.interval = null
                this.setState({
                    lastUpdated: new Date()
                })
                this.resetTimerInterval(1, 10)
            }
        }

        if (prevProps.schedulingPageFilters.fetching && !this.props.schedulingPageFilters.fetching) {
            let allSyllGrades = this.getAllSyllGrades()
            let grades = allSyllGrades.gradeArr
            let syllabuses = allSyllGrades.SyllArr
            let subjects = allSyllGrades.subjects
            if (urlParams.grades) {
                grades = urlParams.grades
            }
            if (urlParams.syllabuses) {
                syllabuses = urlParams.syllabuses
            }
            if (urlParams.subjects) {
                subjects = typeof (urlParams.subjects) !== Array ? Object.values(urlParams.subjects) : urlParams.subjects
            }
            this.setState({ grades, syllabuses, subjects })
        }
        if (prevProps.schedulingPageSubjects.fetching && !this.props.schedulingPageSubjects.fetching) {
            let allSyllGrades = this.getAllSyllGrades()
            this.setState({
                subjects: allSyllGrades.subjects
            })
        }
    }
    getSelectedClassroomType = (selectedClassroomType) => {
        return selectedClassroomType === 'Mandatory'
    }
    elapseTimeSort = () => {
        let urlParams = parseUrl() || {}
        let page = urlParams.page || 1
        let startDate = moment().format('YYYY-MM-DD')
        let endDate = startDate
        let { syllabuses, grades, subjects, elapsedTimeLower, elapsedTimeHigher, changeArrow, selectedCourseType, selectedSessionType, selectedClassroomType } = this.state
        this.setState({
            changeArrow: !changeArrow
        })
        let params = {
            page,
            per_page: 10,
            syllabuses,
            grades,
            subjects,
            start_date: startDate,
            end_date: endDate,
            elapsed_time_asc_order: changeArrow
        }
        if (elapsedTimeLower && elapsedTimeHigher) {
            params.elapsed_time_lower = elapsedTimeLower
            params.elapsed_time_higher = elapsedTimeHigher
        }
        if (selectedCourseType) {
            params.course_tag = this.getSelectedCourseType(selectedCourseType)
        }
        if (selectedSessionType) {
            params.session_type = selectedSessionType
        }
        if (selectedClassroomType) {
            params.is_mandatory = this.getSelectedClassroomType(selectedClassroomType)
        }
        this.props.fetchLiveClassroomData(params)
    }
    tutorsClassroomColumns = () => {
        const columns = [
            {
                name: 'SESSION ID',
                width: '10%',
                selector: 'id',
                cell: row =>
                    <a href={`/sessionDetailPage/${row.id}`} className='channel' >
                        {row.id}
                    </a>

            },
            {
                name: 'COURSE ID/TOPIC ID',
                width: '14%',
                cell: row => <div>
                    <div>Course id: {row.course_id}</div>
                    <div>Topic id: {row.topic_id}</div>
                </div>
            },
            {
                name: 'GRADE/SYLLABUS',
                width: '12%',
                cell: row => <div>
                    <div>Grade: {row.grade}</div>
                    <div>Syllabus: {row.syllabus}</div>
                </div>
            },
            {
                name: 'SESSION START TIME',
                width: '11%',
                selector: 'start_time',
                cell: row => <div>{this.dateFormat(row.start_time)}</div>
            },
            {
                name: <div onClick={this.elapseTimeSort.bind(this)} className="elapsedTimeStyle">
                    ELAPSED TIME
                     <img className="elapsedTimeArrowStyle" src={this.state.changeArrow ? Images.upArrowNew : Images.downArrowNew} alt='' />
                </div>,
                width: '13%',
                selector: 'elapsed_time_in_seconds',
                cell: row => <div className={row.elapsed_time_in_seconds < 60 ? "elapsedClass" : row.elapsed_time_in_seconds > 190 ? "elapsedClass1" : "elapsedClass2"}>{this.secondsToHms(row.elapsed_time_in_seconds)}</div>
            },
            {
                name: 'TUTOR EMAIL',
                selector: 'teacher_email_list',
                width: '19%',
                cell: row => <div>
                    <div className='tutorEmailStyle'>Teacher Email:</div>
                    {_get(row, 'teacher_email_list.tutor_email') && <div>{row.teacher_email_list.tutor_email}</div>}
                    <div>
                        <div className='tutorEmailStyle'>TA Email:</div>
                        {_get(row, 'teacher_email_list.ta_email').length > 0 && <div>{(_get(row, 'teacher_email_list.ta_email') || []).map((ta, index) => <div key={index}>{ta.ta_email}</div>)}</div>}
                    </div>
                </div>
            },
            {
                name: 'STUDENTS/TUTOR',
                width: '12%',
                cell: row => <div className="tutorStudentColumnStyle">
                    <div>Enrolled: {row.students_enrolled_count}</div>
                    <div>Students: {row.students_joined_count}</div>
                    <div>Tutors: {row.teachers_joined_count}</div>
                    {row.teacher_assigned === false && row.teachers_joined_count === 0 ?
                        <div>No Tutor Assigned</div> :
                        row.teacher_assigned && row.teachers_joined_count === 0 ?
                            <div>No Tutor Online </div> :
                            <div>Students/Tutor: {(row.students_joined_count / row.teachers_joined_count).toFixed(2)}</div>
                    }
                </div>
            },
            {
                name: 'SESSION STATUS',
                width: '9%',
                cell: row => <div>
                    <div> {row.session_status}</div>
                    <div>{row.session_type}</div>
                    <div>{row.is_mandatory ? "Mandatory Session" : "Optional Session"}</div>
                </div>
            }
        ]
        return columns;
    }

    getAllSyllGrades = () => {
        let grades = _get(this.props.schedulingPageFilters, 'data.grades') || []
        let syllabuses = _get(this.props.schedulingPageFilters, 'data.syllabuses') || []
        let subjects = _get(this.props.schedulingPageSubjects, 'data.subjects') || []
        let gradeArr = this.gradesList(grades)
        let SyllArr = []
        syllabuses.forEach(syll => {
            SyllArr.push(syll)
        })
        return { gradeArr, SyllArr, subjects: [...subjects] }
    }

    onGradeChange = (e) => {
        this.setState({ grades: e.target.value }, this.activateClear)
    }

    onGradeAllChange = (e) => {
        let grades = _get(this.props.schedulingPageFilters, 'data.grades') || []
        let gradeArr = this.gradesList(grades)
        if (this.state.grades.length === gradeArr.length) {
            this.setState({ grades: [] }, this.activateClear)
        } else {
            this.setState({ grades: gradeArr }, this.activateClear)
        }
    }
    //Syllabuses
    onSyllabChange = (e) => {
        this.setState({ syllabuses: e.target.value }, this.activateClear)
    }

    onSyllabAllChange = (e) => {
        let syllabuses = _get(this.props.schedulingPageFilters, 'data.syllabuses', []);
        const syllabArr = [...syllabuses];
        if (this.state.syllabuses.length === syllabArr.length) {
            this.setState({ syllabuses: [] }, this.activateClear)
        } else {
            this.setState({ syllabuses: syllabArr }, this.activateClear)
        }
    }
    //Subjects
    onSubjectChange = (e) => {
        this.setState({
            subjects: e.target.value
        }, this.activateClear)
    }
    onSubjectAllChange = (e) => {
        let subjects = _get(this.props.schedulingPageSubjects, 'data.subjects') || [];
        let subjectArr = [...subjects];
        if (this.state.subjects.length === subjectArr.length) {
            this.setState({ subjects: [] }, this.activateClear)
        } else {
            this.setState({ subjects: subjectArr }, this.activateClear)
        }
    }
    onClear = () => {
        const startDate = moment().startOf('day')._d;
        const endDate = moment().endOf('day')._d;
        let syllabuses = [], grades = [], subjects = [], selectedElapsedTime = "", selectedCourseType = "", selectedSessionType = "", selectedClassroomType = ""
        this.props.fetchLiveClassroomData({
            page: 1,
            per_page: 10,
            syllabuses: syllabuses,
            grades: grades,
            subjects: subjects,
            start_date: startDate,
            end_date: endDate
        })
        let allSyllGrades = this.getAllSyllGrades()
        this.setState({
            grades: allSyllGrades.gradeArr, selectedElapsedTime,
            syllabuses: allSyllGrades.SyllArr, isClear: false,
            elapsedTimeLower: "", elapsedTimeHigher: "", startDate: startDate,
            endDate: endDate, toggleDateRange: false, toggleCustomRange: false,
            selectedCourseType,
            selectedSessionType,
            subjects: allSyllGrades.subjects,
            selectedClassroomType
        })
        this.props.history.push(`?page=1`)

    }
    getGradeSyll = () => {
        let startDate = this.getDateStr(this.state.startDate)
        let endDate = this.getDateStr(this.state.endDate)
        let { selectedElapsedTime, selectedCourseType, selectedSessionType, selectedClassroomType } = this.state
        let gradesData = _get(this.props.schedulingPageFilters, 'data.grades') || []
        let gradesArr = [], kGroup = []
        this.state.grades.forEach(grade => {
            gradesData.forEach(item => {
                if (item.group_name === grade) {
                    kGroup.push(grade)
                }
            })
        })
        gradesArr = this.state.grades.filter(f => !kGroup.includes(f));
        if (kGroup.length > 0) {
            gradesData.forEach(item => {
                kGroup.forEach(group => {
                    if (group === item.group_name) {
                        item.list.forEach(grade => {
                            gradesArr.push(grade)
                        })
                    }
                })
            })
        }
        let grades = gradesArr.filter((grade, idx) => {
            return gradesArr.indexOf(grade) === idx
        })
        let syllabuses = this.state.syllabuses
        let subjects = this.state.subjects
        return { startDate, endDate, grades, syllabuses, subjects, selectedElapsedTime, selectedCourseType, selectedSessionType, selectedClassroomType }
    }

    onStartDateChange = date => {
        this.setState({ startDate: date, isClear: false });
    };
    onEndDateChange = date => {
        this.setState({ endDate: date });
    };
    getDateStr = (date) => {
        return moment(date, 'ddd MMM DD YYYY HH:mm:ss GMT+-HH:mm').format('YYYY-MM-DD');
    }

    getSelectedDateFormate = (date) => {
        return new Date(date);
    }

    onDateToggle = () => {
        this.setState({ toggleDateRange: !this.state.toggleDateRange, toggleCustomRange: false })
    }

    onDateClose = () => {
        const { toggleCustomRange, toggleDateRange } = this.state;
        if (toggleDateRange || toggleCustomRange) {
            this.setState({ toggleDateRange: false, toggleCustomRange: false }, this.activateClear)
        }
    }

    onDaySelection = (day) => {
        if (day === 'today') {
            const startDate = moment().startOf('day')._d
            const endDate = moment().endOf('day')._d
            this.setState({ startDate: startDate, endDate: endDate })
        } else {
            let tomorrow = moment().add(1, 'days').startOf('day')._d
            let tomorrowEnd = moment().add(1, 'days').endOf('day')._d
            this.setState({ startDate: tomorrow, endDate: tomorrowEnd })
        }
        this.onDateClose();
    }
    onCustomToggle = () => {
        this.setState({ toggleCustomRange: !this.state.toggleCustomRange })
    }

    onChangePage = (page) => {
        let meta = _get(this.props.tutorClassroomData, 'data.meta') || []
        let gradeSyll = this.getGradeSyll()
        let { syllabuses, subjects, elapsedTimeLower, elapsedTimeHigher, selectedCourseType, selectedSessionType, selectedClassroomType, isClear } = this.state
        let params = {
            page,
            per_page: 10,
            syllabuses,
            grades: gradeSyll.grades,
            subjects,
            start_date: gradeSyll.startDate,
            end_date: gradeSyll.endDate,
        }
        if (elapsedTimeLower && elapsedTimeHigher) {
            params.elapsed_time_lower = elapsedTimeLower
            params.elapsed_time_higher = elapsedTimeHigher
        }
        if (selectedSessionType) {
            params.session_type = selectedSessionType
        }
        if (selectedCourseType) {
            params.course_tag = this.getSelectedCourseType(selectedCourseType)
        }
        if (selectedClassroomType) {
            params.is_mandatory = this.getSelectedClassroomType(selectedClassroomType)
        }
        if (!isClear) {
            const { startDate, endDate } = this.state;
            params = { start_date: startDate, end_date: endDate, page }
        }
        if (page !== meta.current_page) {
            this.props.fetchLiveClassroomData(params)
            clearInterval(this.interval)
            this.interval = null
            this.setState({
                lastUpdated: new Date()
            })
            this.resetTimerInterval(page, 10)
            params = qs.stringify(params)
            this.props.history.push(`?${params}`)
        }
    }
    activateClear = () => {
        const { selectedClassroomType, selectedSessionType, selectedCourseType, selectedElapsedTime, grades, syllabuses, subjects } = this.state
        if (selectedClassroomType || selectedSessionType || selectedCourseType || selectedElapsedTime || grades.length || syllabuses.length || subjects.length) {
            this.setState({ isClear: true })
        } else {
            this.setState({ isClear: false })
        }
    }
    onElapsedTimeChange = (e) => {
        this.setState({ selectedElapsedTime: e.target.value }, this.activateClear)
    }
    onCoursedTypeChange = (e) => {
        this.setState({ selectedCourseType: e.target.value }, this.activateClear)
    }
    onSessionTypeChange = (e) => {
        this.setState({ selectedSessionType: e.target.value }, this.activateClear)
    }

    setElapsedTypeData(elapsedTimeType) {
        let elapased_time = {
            elapsedTimeLower: "",
            elapsedTimeHigher: ""
        }
        if (elapsedTimeType === '<1 min') {
            elapased_time = {
                elapsedTimeLower: "0",
                elapsedTimeHigher: "1"
            }
            this.setState(elapased_time)
        }
        if (elapsedTimeType === '1-3 mins') {
            elapased_time = {
                elapsedTimeLower: "1",
                elapsedTimeHigher: "3"
            }
            this.setState(elapased_time)
        }
        if (elapsedTimeType === '3+ mins') {
            elapased_time = {
                elapsedTimeLower: "3",
                elapsedTimeHigher: "1440"
            }
            this.setState(elapased_time)
        }
        return elapased_time
    }

    getElapsedTypeData = (elapsedTimeLower) => {
        switch (elapsedTimeLower) {
            case "0": return "<1 min"
            case "1": return "1-3 mins"
            case "3": return "3+ mins"
            default: return ""
        }

    }
    getSelectedCourseType(selectedCourseType) {
        if (selectedCourseType === 'free') {
            selectedCourseType = 'free_trial'
        }
        if (selectedCourseType === 'paid') {
            selectedCourseType = 'classroom'
        }
        return selectedCourseType
    }

    getCourseType = (selectedCourseType) => {
        if (!selectedCourseType) return ""
        switch (selectedCourseType) {
            case "free_trial": return "free"
            case "classroom": return "paid"
            default: return selectedCourseType
        }
    }
    //classroom type
    onClassroomTYpeChange = (e) => {
        this.setState({ selectedClassroomType: e.target.value }, this.activateClear)
    }
    onApply = () => {
        let gradeSyll = this.getGradeSyll()
        let elapsedTimeType = this.state.selectedElapsedTime
        let selectedCourseType = this.getSelectedCourseType(this.state.selectedCourseType)
        let { selectedSessionType, selectedClassroomType } = this.state
        const { elapsedTimeLower, elapsedTimeHigher } = this.setElapsedTypeData(elapsedTimeType)
        let grades = gradeSyll.grades
        let syllabuses = gradeSyll.syllabuses
        let subjects = gradeSyll.subjects
        let params = {
            page: 1,
            per_page: 10,
            syllabuses: syllabuses,
            grades: grades,
            subjects: subjects,
            start_date: gradeSyll.startDate,
            end_date: gradeSyll.endDate,
        }
        if (elapsedTimeLower && elapsedTimeHigher) {
            params.elapsed_time_lower = elapsedTimeLower
            params.elapsed_time_higher = elapsedTimeHigher
        }
        if (selectedCourseType) {
            params.course_tag = selectedCourseType
        }
        if (selectedSessionType) {
            params.session_type = selectedSessionType
        }
        if (selectedClassroomType) {
            params.is_mandatory = this.getSelectedClassroomType(selectedClassroomType)
        }
        this.props.fetchLiveClassroomData(params)
        params = qs.stringify(params)
        this.setState({
            toggleDateRange: false,
            toggleCustomRange: false,
            selectedSessionType
        })
        this.props.history.push(`?${params}`)
    }
    secondsToHms(d) {
        d = Number(d);
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);
        let hDisplay = h > 0 ? h + " HH " : "00 HH ";
        let mDisplay = m > 0 ? m + " MM " : "00 MM ";
        let sDisplay = s > 0 ? s + " SS" : "00 SS";
        return hDisplay + mDisplay + sDisplay;
    }
    handleClose = () => {
        this.setState({ openToast: false })
    }
    dateFormat = (start_time) => {
        let date = moment.utc(start_time * 1000).toDate();
        let startTimeStr = moment(date).local().format('HH:mm')
        let dateStr = moment(date).local().format('MMM D, YYYY')
        return <div>
            <div>{dateStr}</div>
            <div>{startTimeStr}</div>
        </div>
    }

    gradesList(grades) {
        let gradeArr = []
        grades.forEach(item => {
            gradeArr.push(item.group_name);
        })
        grades.forEach(item => {
            item.list.forEach(grade => {
                gradeArr.push(grade)
            })
        })
        return gradeArr
    }

    getLiveClassroomEnable() {
        let enableRoleList = ["mentor_manager", "mentor_admin", "admin"]
        let enabledRoles = _get(this.props.sessions, 'roles') || []
        return enabledRoles.some(item => enableRoleList.includes(item))
    }

    renderUnauthorized() {
        return <div className="NoContent-style">
            You don't have access to view this content.
        </div>
    }

    render() {
        let data = _get(this.props.tutorClassroomData, 'data.classrooms') || []
        let grades = _get(this.props.schedulingPageFilters, 'data.grades') || []
        let gradeArr = this.gradesList(grades)
        let syllabuses = _get(this.props.schedulingPageFilters, 'data.syllabuses') || []
        let subjects = _get(this.props.schedulingPageSubjects, 'data.subjects') || []

        const { startDate, endDate, toggleDateRange, toggleCustomRange, isClear, timerFlag } = { ...this.state }
        let newData = data.map(d => {
            return {
                teacher_email_list: { tutor_email: d.tutor_email, ta_email: d.teaching_assistants },
                ...d
            }
        })

        if (this.props.schedulingPageFilters.fetching || this.props.tutorClassroomData.fetching || this.props.schedulingPageSubjects.fetching) {
            return <Loading center />
        }
        let meta = _get(this.props.tutorClassroomData, 'data.meta') || []

        if (!this.getLiveClassroomEnable()) {

            return this.renderUnauthorized()
        }
        return (
            <div className='liveClassroomStatus'>
                <ToastMessage
                    open={this.state.openToast}
                    handleClose={this.handleClose}
                    message={this.state.toastMsg}
                />
                <div className="timerStyle">
                    {timerFlag === true ? <TimerDiff lastUpdated={this.state.lastUpdated} /> : ''}
                </div>
                <div >
                    <div className='ScheduledSessions'>Live Classroom</div>
                    <div className='filtersWrapper'>
                        <div className='filterWrap'>
                            <div>
                                <SelectDropDown
                                    title='Grades'
                                    names={gradeArr}
                                    handleChange={this.onGradeChange}
                                    selected={this.state.grades}
                                    handleAll={this.onGradeAllChange}
                                />
                            </div>
                            <div>
                                <SelectDropDown
                                    title='Syllabuses'
                                    names={syllabuses}
                                    handleChange={this.onSyllabChange}
                                    selected={this.state.syllabuses}
                                    handleAll={this.onSyllabAllChange}
                                />
                            </div>
                            <div>
                                <SelectDropDown
                                    title='Subjects'
                                    names={subjects}
                                    handleChange={this.onSubjectChange}
                                    handleAll={this.onSubjectAllChange}
                                    selected={this.state.subjects}
                                />
                            </div>
                            <div className="dateCompStyle">
                                <DateComp
                                    onDaySelection={this.onDaySelection}
                                    startDateChange={this.onStartDateChange}
                                    endDateChange={this.onEndDateChange}
                                    onDateToggle={this.onDateToggle}
                                    onDateClose={this.onDateClose}
                                    onCustomToggle={this.onCustomToggle}
                                    toggleDateRange={toggleDateRange}
                                    toggleCustomRange={toggleCustomRange}
                                    tomorrowDisable={true}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            </div>
                            <div>
                                <SelectDropDown
                                    title='Elapsed Time'
                                    names={setOfConstants.ElapsedTimeList}
                                    multiple={false}
                                    isAllEnable={false}
                                    selected={this.state.selectedElapsedTime}
                                    handleChange={this.onElapsedTimeChange}
                                />
                            </div>

                            <div>
                                <SelectDropDown
                                    title='Course Tag'
                                    names={setOfConstants.CourseType}
                                    multiple={false}
                                    isAllEnable={false}
                                    selected={this.state.selectedCourseType}
                                    handleChange={this.onCoursedTypeChange}
                                />
                            </div>
                            <div>
                                <SelectDropDown
                                    title='Session Type'
                                    names={setOfConstants.SessionType}
                                    multiple={false}
                                    isAllEnable={false}
                                    selected={this.state.selectedSessionType}
                                    handleChange={this.onSessionTypeChange}
                                />
                            </div>
                            <div>
                                <SelectDropDown
                                    title='Classroom Type'
                                    names={setOfConstants.ClassroomType}
                                    multiple={false}
                                    isAllEnable={false}
                                    selected={this.state.selectedClassroomType}
                                    handleChange={this.onClassroomTYpeChange}
                                />
                            </div>

                        </div>
                        <div className='submitnClear'>
                            <Button disabled={!isClear} className={ClassNames({ 'applyBtnActive': isClear, 'applyBtnDisable': !isClear })} variant="contained" onClick={this.onApply} >
                                Apply
                            </Button>
                            <div className='clearAll' >
                                <span className={ClassNames({ 'clearAllActive': isClear, 'clearAllDisable': !isClear })} onClick={this.onClear}>Clear all</span>
                            </div>
                        </div>
                    </div>
                </div>
                <MentorTable
                    title=''
                    apiData={newData}
                    columns={this.tutorsClassroomColumns()}
                />
                <Pagination
                    pageSize={10}
                    initialPage={meta.current_page}
                    totalPages={meta.total_pages}
                    totalCount={meta.total_count}
                    onChangePage={this.onChangePage}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    tutorClassroomData: state.tutorLiveClassroomDetails,
    schedulingPageFilters: state.schedulingPageFilters,
    sessions: state.session.data,
    schedulingPageSubjects: state.classroomSubjectDetails
})

const mapDispatchToProps = (dispatch) => ({
    fetchLiveClassroomData: (params) => dispatch(FetchTutorClassroomDetailsCreators.request(params)),
    fetchShedulingFilters: (params) => dispatch(FetchSchedulingDropdownListCreators.request(params)),
    fetchSchedulingSubjectDetails: (p) => dispatch(FetchSubjectDetailsCreators.request(p))
})

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(LiveClassroom)