import React, { useState } from 'react';
import faker from 'faker/locale/ko';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from '@material-ui/core';

faker.seed(123);

const users = Array(53)
  .fill()
  .map(() => ({
    id: faker.random.uuid(),
    name: faker.name.lastName() + faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
  }));

function BorderList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map(({ id, name, email, phone }, i) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {page * rowsPerPage + i + 1}
                </TableCell>
                <TableCell align="right">{name}</TableCell>
                <TableCell align="right">{email}</TableCell>
                <TableCell align="right">{phone}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={users.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default BorderList;
