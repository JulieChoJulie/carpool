import React, { useMemo } from 'react';
import Table from "./Table";
import './TableFormat.scss';


const TableFormat = ({ data, history }) => {
    const columns = useMemo(
        () => [
            {
                Header: "Posts",
                columns: [
                    {
                        Header: "Offering",
                        accessor: "posts.offering"
                    },
                    {
                        Header: "Looking for",
                        accessor: "posts.lookingFor"
                    }
                ]
            },
            {
                Header: "Reservations",
                columns: [
                    {
                        Header: "Offering",
                        accessor: "reservations.offering"
                    },
                    {
                        Header: "Looking for",
                        accessor: "reservations.lookingFor"
                    }
                ]
            }
        ],
        []
    );

    if (data.length === 0) {
        return null;
    }
    return (
        <div className="filter">
            <Table columns={columns} data={data} history={history} />
        </div>
    );
};


export default TableFormat;
