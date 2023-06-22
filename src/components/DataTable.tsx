import React from "react";
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

interface MuiTableDataProps {
    columns: string[];
    data: any[];
}

const MuiTableData: React.FC<MuiTableDataProps> = ({ columns, data }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column, columnIndex) => (
                                <TableCell key={columnIndex}>{row[column]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MuiTableData;
