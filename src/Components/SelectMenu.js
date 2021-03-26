// @flow weak

import React, { Component } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import get from 'lodash/get'
const styleSheet = theme => ({
    boxContainerSelectMenu: {
        display: 'flex',
        alignItems: 'center',
        flex: 1
    },
    title: {
        color: '#000000',
        fontFamily: 'Gotham-Medium',
        fontSize: '1.125em',
        fontWeight: 900,
        marginRight: '1.5em'
    },
    formControl: {
        minWidth: '115px',
        justifyContent: 'center',
        borderRadius: '0.25em',
        backgroundColor: '#f7f7fd',
        border: 'solid 0.061em #e5e5e5',
        flex: 1,
        height: '40px'
    },
    label: {
        paddingLeft: '0.438em',
        backgroundColor: 'transparent !important'
    },
    menuStyle: {
        color: "#666666",
        fontFamily: 'Gotham-Book',
        '&:before': {
            backgroundColor: 'transparent !important',
            border: 'none !important'
        },
        '&:after': {
            backgroundColor: 'transparent !important',
            border: 'none !important'
        }
    },
    MuiListRoot: {
        maxHeight: '18.75em',
    }
})

class SelectMenu extends Component {


    renderOptions() {
        let { options = [], labelKey = 'label', valueKey = 'value' } = this.props

        return options.map((option, index) => {
            return <MenuItem key={get(option, labelKey)} value={get(option, valueKey)}>{get(option, labelKey)}</MenuItem>
        })
    }

    render() {
        const { classes, value, handleChange, title, menuStyle = {}, disabled } = this.props
        return (
            <div className={classes.boxContainerSelectMenu}>
                {title && <div className={classes.title}> {title} </div>}
                <FormControl className={classes.formControl}>
                    <Select
                        value={value}
                        onChange={handleChange}
                        disabled={disabled}
                        classes={{
                            selectMenu: classes.label
                        }}
                        MenuProps={{
                            MenuListProps: {
                                classes: {
                                    root: classes.MuiListRoot
                                }
                            }
                        }}
                        className={classes.menuStyle}
                        input={<Input id='age-simple' />}
                        {...menuStyle}
                    >
                        {
                            this.renderOptions()
                        }
                    </Select>
                </FormControl>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
})
const mapStateToProps = (state) => ({
    searchData: state.search
})
export default compose(withStyles(styleSheet), connect(mapStateToProps, mapDispatchToProps))(SelectMenu)
