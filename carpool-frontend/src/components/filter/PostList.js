import React, { useMemo } from 'react';
import Table from "./Table";
import dateFormat from '../post/dateFormat';


const PostList = ({ rides }) => {
    const columns = useMemo(
        () => [
            {
                Header: "Post",
                columns: [
                    {
                        Header: "Offering",
                        accessor: data => {
                            return data.offering ? 'Y' : 'N'
                        }
                    },
                    {
                        Header: "From",
                        accessor: "from"
                    },
                    {
                        Header: "To",
                        accessor: "to"
                    },
                    {
                        Header: "Date",
                        accessor: data => dateFormat(data.when)
                    }
                ]
            },
            {
                Header: "Details",
                columns: [
                    {
                        Header: "User",
                        accessor: "post.user.username"
                    },
                    {
                        Header: "Seats",
                        accessor: "available"
                    },
                ]
            }
        ],
        []
    );

    if (rides.length === 0) {
        return null;
    }
    return (
        <div className="filter">
            <Table columns={columns} data={rides} />
        </div>
    );
};


export default PostList;