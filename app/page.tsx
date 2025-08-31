'use client';

import { Divider } from "@heroui/divider";

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

export default function Home() {
  return (
    <section>
      <h1>Theme System Tracker</h1>

      <p>The <a href="https://www.themesystem.com/">Theme System</a> is a method of developing habits and/or focusing on something for some amount of time. This site is a digital version of the physical journal.</p>

      <h2>NOTE:</h2>
      <p>THIS PROJECT IS <b>NOT</b> AFFILATED NOR ENDORSED BY Cortex Brand</p>

      <br />

      <Divider />

      <h2>Features</h2>

      The digital theme tracker has many of the same features the real journal has.

      <Table>
        <TableHeader>
          <TableColumn>Feature</TableColumn>
          <TableColumn>Digital Theme Tracker</TableColumn>
          <TableColumn>Physical Journal</TableColumn>
        </TableHeader>

        <TableBody>
          <TableRow key="1">
            <TableCell>Daily Journals</TableCell>
            <TableCell>✔</TableCell>
            <TableCell>✔</TableCell>
          </TableRow>

          <TableRow key="2">
            <TableCell>Habits</TableCell>
            <TableCell>✔</TableCell>
            <TableCell>✔</TableCell>
          </TableRow>

          <TableRow key="3">
            <TableCell>Theme Planning</TableCell>
            <TableCell>⛌</TableCell>
            <TableCell>✔</TableCell>
          </TableRow>

          <TableRow key="4">
            <TableCell>Access anywhere at anytime</TableCell>
            <TableCell>✔</TableCell>
            <TableCell>⛌</TableCell>
          </TableRow>

          <TableRow key="5">
            <TableCell>Changing themes on the daily without extra stuff</TableCell>
            <TableCell>✔</TableCell>
            <TableCell>⛌</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};