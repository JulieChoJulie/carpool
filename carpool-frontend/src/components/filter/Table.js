import React from "react";
import { useTable, useFilters, useSortBy } from "react-table";

export default function Table({ columns, data, history }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter
    } = useTable(
        {
            columns,
            data
        },
        useFilters,
        useSortBy
    );

    const rowInfo = (rowobject) => {
        history.push(`posts/${rowobject.id}`);
    }

    return (
        <>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                        column.isSorted
                        ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                        : ""
                    }
                        >
                    {column.render("Header")}
                        </th>

                        ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps({onClick: () => rowInfo(row)}, { style: { cursor: 'pointer' } })}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        })}
                    </tr>
                );
            })}
            </tbody>

        </table>
        </>
    );
}
