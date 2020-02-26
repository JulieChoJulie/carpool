import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const useOutsideAlerter = (ref, onClickOutside) => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside();
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}

/**
 * Component that alerts if you click outside of it
 */
const OutsideAlerter = ({ isClosed, onClickOutside, children }) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, onClickOutside);


    if (isClosed) {
        return <div>{children}</div>;
    }

    return <div className="outsideClick" ref={wrapperRef}>{children}</div>;
}

export default OutsideAlerter;
