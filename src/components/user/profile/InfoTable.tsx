import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { differenceInCalendarDays } from 'date-fns';
import { setFullDateFormat } from '../../../util/time';

interface InfoDays {
  id: string;
  member: string | null;
  kind: string;
  startDay: Date;
  endDay: Date;
}

export default function InfoTable({ rows }: { rows: InfoDays[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 340, maxWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">종류</TableCell>
            <TableCell align="center">시작일</TableCell>
            <TableCell align="center">종료일</TableCell>
            <TableCell align="center">일수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" component="th" scope="row">
                {row.kind}
              </TableCell>
              <TableCell align="center">{setFullDateFormat(row.startDay)}</TableCell>
              <TableCell align="center">{setFullDateFormat(row.endDay)}</TableCell>
              <TableCell align="center">
                {differenceInCalendarDays(row.endDay, row.startDay)} 일
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
