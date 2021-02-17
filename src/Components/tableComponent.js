import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _get from 'lodash/get';


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
    let header_name = props.json || {}
    let tableData = _get(props, 'data') || []
    console.log("headername",header_name)
    console.log("tableData",tableData)
    const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          {
              header_name.map((item, index) => {
                return (   
                  <TableCell key={`${item}-header${index}`} className={classes.tableHeaderStyle}>{item.label}</TableCell>           
                )
              }) 
            }
          </TableRow>
        </TableHead>
        <TableBody>
        {tableData.map((row, i) => (
        <TableRow key={`${row} + ${i}`} className={classes.tableBodyRowStyle}>
        {
            header_name.map((item, index) => {
            if (item.key) {
                return (
                <TableCell key={item + index} style={{ width: item.columnWidth,  minWidth: item.columnTopicWidth, overflowWrap: item.overflowWrap }} className={classes.tableBodyTextStyle}>
                    {row[item.key]}
                </TableCell>
                )
            }
            if (item.renderRow) {
                return <TableCell key={item + index} style={{ width: item.columnWidth,  minWidth: item.columnTopicWidth }} className={classes.tableBodyTextStyle}>{item.renderRow(row)}</TableCell>
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
