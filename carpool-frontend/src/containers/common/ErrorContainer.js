import React from 'react';
import Error from "../../components/common/Error";
import { withRouter } from 'react-router-dom';

const ErrorContainer = ({ error, match }) => {
    const status = error ? error : match.params.status;
    return <Error status={status}/>;

};

export default withRouter(ErrorContainer);