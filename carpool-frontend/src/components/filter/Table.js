import React from "react";
// import { useTable, useFilters, useSortBy } from "react-table";
//
// export default function Table({ columns, data }) {
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         rows,
//         prepareRow,
//         setFilter
//     } = useTable(
//         {
//             columns,
//             data
//         },
//         useFilters,
//         useSortBy // This plugin Hook will help to sort our table columns
//     );

    // // Create a state
    // const [filterInput, setFilterInput] = useState("");
    //
    // const handleFilterChange = e => {
    //     const value = e.target.value || undefined;
    //     setFilter("show.name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    //     setFilterInput(value);
    // };


    /*
      Render the UI for your table
      - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
    */
//     return (
//         <>
//             {/*// Input element*/}
//             {/*<input*/}
//                 {/*value={filterInput}*/}
//                 {/*onChange={handleFilterChange}*/}
//                 {/*placeholder={"Search name"}*/}
//             {/*/>*/}
//         <table {...getTableProps()}>
//             <thead>
//             {headerGroups.map(headerGroup => (
//                 <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map(column => (
//                         // Table header styling and props to allow sorting
//                         <th
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                     className={
//                         column.isSorted
//                         ? column.isSortedDesc
//                         ? "sort-desc"
//                         : "sort-asc"
//                         : ""
//                     }
//                         >
//                     {column.render("Header")}
//                         </th>
//
//                         ))}
//                 </tr>
//             ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//             {rows.map((row, i) => {
//                 prepareRow(row); // This line is necessary to prepare the rows and get the row props from react-table dynamically
//
//                 // Each row can be rendered directly as a string using the react-table render method
//                 return (
//                     <tr {...row.getRowProps()}>
//                         {row.cells.map(cell => {
//                             return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
//                         })}
//                     </tr>
//                 );
//             })}
//             </tbody>
//
//         </table>
//         </>
//     );
// }
