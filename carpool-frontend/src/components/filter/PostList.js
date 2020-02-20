// import React, { useMemo } from 'react';
// // import Table from "./Table";
//
// const PostList = ({ posts }) => {
//     const columns = useMemo(
//         () => [
//             {
//                 // first group - TV Show
//                 Header: "Post",
//                 // First group columns
//                 columns: [
//                     {
//                         Header: "Offering",
//                         accessor: "post.rides.offering"
//                     },
//                     {
//                         Header: "From",
//                         accessor: "post.rides.from"
//                     },
//                     {
//                         Header: "To",
//                         accessor: "post.rides.to"
//                     },
//                     {
//                         Header: "Date",
//                         accessor: "post.rides.when"
//                     }
//                 ]
//             },
//             {
//                 Header: "Details",
//                 columns: [
//                     {
//                         Header: "User",
//                         accessor: "post.user.username"
//                     },
//                     // {
//                     //     Header: "Type",
//                     //     accessor: "post.rides.length"
//                     // },
//                     {
//                         Header: "Available Seats",
//                         accessor: "post.rides.available"
//                     },
//                     {
//                         Header: "Total Seats",
//                         accessor: "post.rides.seats"
//                     },
//                     // {
//                     //     Header: "Genre(s)",
//                     //     accessor: "show.genres",
//                     //     // Cell method will provide the cell value, we pass it to render a custom component
//                     //     Cell: ({ cell: { value } }) => <Genres values={value} />
//                     // },
//                     // {
//                     //     Header: "Runtime",
//                     //     accessor: "show.runtime",
//                     //     // Cell method will provide the value of the cell, we can create custom element for the Cell
//                     //     Cell: ({ cell: { value } }) => {
//                     //         const hour = Math.floor(value / 60);
//                     //         const min = Math.floor(value % 60);
//                     //         return (
//                     //             <>
//                     //                 {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
//                     //                 {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
//                     //             </>
//                     //         );
//                     //     }
//                     // },
//                     // {
//                     //     Header: "Status",
//                     //     accessor: "show.status"
//                     // }
//                 ]
//             }
//         ],
//         []
//     );
//     return null;
//     // return (
//     //     <div className="filter">
//     //         <Table columns={columns} data={posts} />
//     //     </div>
//     // );
// }
//
//
// export default PostList;