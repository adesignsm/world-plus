import React, { useContext, useEffect } from "react";
import $ from "jquery";
import { StateContext } from "../../StateContext";
import "./index.css";

const Background = () => {
    const { stageOne } = useContext(StateContext);
    const blobs = document.querySelectorAll('.shape-blob');
    const blobContainer = document.getElementById("blob-container");

    useEffect(() => {
        if (stageOne) {
            blobs.forEach(blob => blob.classList.add('stage-one'));
            blobContainer.classList.add("stage-one");
        }
    }, [stageOne]);
    
    return (
        <>
            <div id="blob-container" className="blob-container">
                <div className="blob-container">
                    <div className="shape-blob one"></div>
                    <div className="shape-blob two"></div>
                    <div className="shape-blob three"></div>
                    <div className="shape-blob four"></div>
                    <div className="shape-blob five"></div>
                    <div className="shape-blob six"></div>
                    <div className="shape-blob seven"></div>
                    <div className="shape-blob eight"></div>
                    <div className="shape-blob nine"></div>
                    <div className="shape-blob ten"></div>
                </div>
            </div>
        </>
    )
}

export default Background;