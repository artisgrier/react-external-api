import React from 'react';
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import numeral from 'numeral';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 380,
  },
});

const TableInfo = ({ countries }) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.container}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align='right'>Cases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries.map(({ country, cases }, index) => (
            <TableRow key={index}>
              <TableCell component='th' scope='row'>
                {country}
              </TableCell>
              <TableCell align='right'>
                {numeral(cases).format('0,0')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableInfo;
