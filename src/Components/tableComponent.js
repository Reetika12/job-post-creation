import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _get from 'lodash/get';
import './Styles/DefaultTableStyles.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cell: {
      paddingLeft: '40px',
      fontFamily: 'Gotham-Medium',
      fontSize: '13px',
      fontWeight: '500px',
      color: '#666660'
  },
  tableBodyTextStyle: {
    fontFamily: 'Gotham-Book',
    fontSize: '13px',
    color: '#333333',
    paddingLeft: '20px',
    overflowWrap: 'anywhere',
  }
});

export default function DefaultTable(props) {
  let header_name = props.json || {}
  let tableData = _get(props, 'data') || []
  let { tabletitle = false, title } = props
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      {tabletitle ? <div className="CourseListStyle">{title}</div> : null}
      <Table className="table" aria-label="a dense table">
        <TableHead >
          <TableRow className="tableHeaderRowStyle">
            {
              header_name.map((item, index) => {
                return (   
                  <TableCell key={`${item}-header${index}`} className={classes.cell}>{item.label}</TableCell>           
                )
              }) 
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, i) => (
            <TableRow key={`${row} + ${i}`} className="tableBodyRowStyle">
              {
                header_name.map((item, index) => {
                  if (item.key) {
                    return (
                      <TableCell key={item + index} style={{ width: item.columnWidth,  minWidth: item.columnTopicWidth, overflowWrap: item.overflowWrap }} className={classes.cell}>
                        {row[item.key]}
                      </TableCell>
                    )
                  }
                  if (item.renderRow) {
                    return <TableCell key={item + index} style={{ width: item.columnWidth,  minWidth: item.columnTopicWidth }} className={classes.cell}>{item.renderRow(row)}</TableCell>
                  }
                  return ''
                }
                )
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}