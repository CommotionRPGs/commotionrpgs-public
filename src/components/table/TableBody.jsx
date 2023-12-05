import {v4 as uuidv4 } from 'uuid';
import { TbCircleLetterR, TbCircleLetterC } from 'react-icons/tb'
import { useState } from 'react';
import React from 'react'
import { NavLink } from 'react-router-dom';
import TableRow from '@/components/table/TableRow';

const TableBody = ({ tableData, columns, rowCallbacks = {}, columnOptions }) => {
    return (
        <tbody>
            {tableData.map((data) => {
                return (
                    <TableRow key={data["id"]} columns={columns} data={data} callbacks={rowCallbacks} columnOptions={columnOptions} />
                );
            })}
        </tbody>
    );
};
export default TableBody;