import React from 'react';
import Button from "./Write";
import Responsive from '../common/Responsive'

const WriteTemplate = ({children, onSubmit}) => {
    return (
        <Responsive addclass="write">
            <div className="box writeBox">
                {children}
                <Button color="burgundy" fullWidth onSubmit={onSubmit}>POST</Button>
            </div>
        </Responsive>
    );
};

export default WriteTemplate;