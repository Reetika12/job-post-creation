import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import style from './Styles/ComponentHeaderStyles';
import SelectMenu from '../Containers/SelectMenu';
import { parseUrl } from '../Lib/Utilities';
import { Creators as GetCoursesCreators } from '../Redux/GetCoursesRedux';

const useStyles = () => ({
    ...style,
    subHeaderStyle: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        justifyContent: 'space-between'
    },
    selectMenuStyle: {
        display: 'flex'
    }
});

class ComponentHeader extends Component {
    constructor(props) {
        super(props);
        let urlParams = parseUrl() || {};
        let courseId = urlParams.course_id || '';
        this.state = {
            searchText: courseId
        };
    }

    handleSelectMenu = (selectMenuType, event) => {
        let selectedMenuValue = event.target.value;
        this.props.handleSelectMenu(selectMenuType, selectedMenuValue);
    };

    handleTeachingDialogOpen = () => {
        this.props.handleTeachingDialogOpen();
    };

    handleInputChange = (event) => {
        this.setState({
            searchText: event.target.value
        });
    };

    handleSearchButtonClick = () => {
        let { searchText = '' } = this.state;
        searchText = searchText.trim();

        if (!searchText) {
            return;
        }

        let params = {
            page: 1,
            course_id: searchText
        };

        this.props.fetchGetCourses(params);
        this.props.history.push(`?course_id=${searchText}`);
    };

    render() {
        const {
            title,
            classes,
            buttonName,
            syllabusData,
            selectedGrade,
            addUploadIcon,
            cohortGradeData,
            addUploadParams,
            selectedSyllabus,
            isAddUploadEnable,
            isDropDownEnabled1,
            isDropDownEnabled2,
            isTeachingMaterialEnable,
            addmaterial,
            isBulkCsvUploadEnable,
            handleBulkCsvUpload
        } = this.props;

        return (
            <div className={classes.subHeaderStyle}>
                <div className={classes.titleStyle}>{title}</div>

                <div className={classes.headerActions}>
                    {this.props.canShowSearchOption && (
                        <form onSubmit={this.handleSearchButtonClick}>
                            <input
                                type="text"
                                value={this.state.searchText}
                                onChange={this.handleInputChange}
                                className={classes.searchText}
                                placeholder="Search by Course ID"
                            />
                        </form>
                    )}

                    {isBulkCsvUploadEnable && (
                        <Button
                            onClick={handleBulkCsvUpload}
                            className={classes.addButtonBg}
                        >
                            <div className={classes.addButtonText}>Bulk Update</div>
                        </Button>
                    )}

                    {isAddUploadEnable && (
                        <Button href={addUploadParams} className={classes.addButtonBg}>
                            <img
                                src={addUploadIcon}
                                className={classes.addButtonPlus}
                                alt="plusimg"
                            />
                            <div className={classes.addButtonText}>{buttonName}</div>
                        </Button>
                    )}

                    <div className={classes.selectMenuStyle}>
                        {isDropDownEnabled1 && (
                            <SelectMenu
                                className={classes.selectMenuSyllabusStyle}
                                value={selectedGrade}
                                handleChange={this.handleSelectMenu.bind(this, 'grades')}
                                options={cohortGradeData}
                            />
                        )}
                        {isDropDownEnabled2 && (
                            <div className={classes.gapSelectMenuSyllabusStyle}>
                                <SelectMenu
                                    className={classes.selectMenuSyllabusStyle}
                                    value={selectedSyllabus}
                                    handleChange={this.handleSelectMenu.bind(this, 'syllabus')}
                                    options={syllabusData}
                                />
                            </div>
                        )}
                    </div>

                    {isTeachingMaterialEnable && (
                        <Button
                            disabled={addmaterial}
                            onClick={this.handleTeachingDialogOpen.bind(this)}
                            className={classes.addButtonBg}
                        >
                            <img
                                src={addUploadIcon}
                                className={classes.addButtonPlus}
                                alt="plusimg"
                            />
                            <div className={classes.addButtonText}>{buttonName}</div>
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchGetCourses: (p) => dispatch(GetCoursesCreators.request(p))
});

export default compose(
    withRouter,
    withStyles(useStyles),
    connect(null, mapDispatchToProps)
)(ComponentHeader);
