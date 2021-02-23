// @flow weak

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const styleSheet = theme => ({
  close: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
})

class ToastMessage extends Component {

  render () {
    const { 
      classes, 
      message = '', 
      handleClose, 
      vertical = 'bottom',
      horizontal = 'center',
      autoHideDuration = 3000,
      ...order 
    } = this.props
    return (
      <Snackbar
        anchorOrigin={{
          vertical,
          horizontal
        }}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        onExited={handleClose}
        contentprops={{
          'aria-describedby': 'message-id'
        }}
        message={<span id='message-id'>{message}</span>}
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            className={classes.close}
            onClick={handleClose}
            >
            <CloseIcon />
          </IconButton>
        ]}
        {...order}
        />
    )
  }
}

export default withStyles(styleSheet)(ToastMessage)
