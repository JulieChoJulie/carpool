import React from 'react';
import { useSelector } from "react-redux";
import Error from "../../components/common/Error";
import { withRouter } from 'react-router-dom';

const ErrorContainer = ({ match }) => {
    const { postsError } = useSelector(({ posts }) => ({
       postsError: posts.postsError
    }));

    const status = postsError ? postsError : match.params.status;
    return <Error status={status}/>;

};

export default withRouter(ErrorContainer);