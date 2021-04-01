import React from 'react';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import './Styles/AppSubHeaderStyles.css';

function AppSubHeader(props) {
  let {
    title='',
    btnText='',
    btnprops={},
    breadcrumbs=[],
    classes,
  } = props;

  return (
    <div
      className={classNames('app-subheader')}
    >
      {breadcrumbs && breadcrumbs.length && (
        <div className='breadcrumbs'>
          {breadcrumbs.map((breadcrumb, index) => {
            let buttonProps = {};
            if (breadcrumb.to) {
              buttonProps = {
                component: Link,
                to: breadcrumb.to
              };
            }
            return (
              <div key={index} className='breadcrumbContainer'>
                <Button {...buttonProps} classes={{root: 'breadcrumbButton'}} className={classNames({'in-active': !breadcrumb.to})}>
                  {breadcrumb.title}{' '}
                </Button>
                {index < breadcrumbs.length - 1 && (
                  <KeyboardArrowRight className='breadcrumbicons' />
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className='commonFlex'>
        {!!title && <div className='subheader-title'>
          {title}
        </div>}
        {btnText && <Button
          classes={{root:"btnCard"}}
          {...btnprops}
        >
          {btnText}
        </Button> }
      </div>

      
    </div>
  );
}

export default AppSubHeader;
