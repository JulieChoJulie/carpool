import React, { useMemo } from 'react';
import Table from "./Table";
import dateFormat from '../post/dateFormat';
import { withRouter } from 'react-router-dom';
import './PostList.scss';


const PostList = ({ rides, history }) => {
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
                    },
                    {
                        Header: "Price",
                        accessor: "price"
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
            <Table columns={columns} data={rides} history={history} />
        </div>
    );
};


export default withRouter(PostList);