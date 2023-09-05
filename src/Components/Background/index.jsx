import React, { useContext, useEffect } from "react";
import $ from "jquery";
import { StateContext } from "../../StateContext";
import "./index.css";

const Background = () => {
    const { stageOne } = useContext(StateContext);
    const { stageTwoTransition } = useContext(StateContext);
    const { stageTwo } = useContext(StateContext);
    const { stageThreeTransition } = useContext(StateContext);
    const { stageThree } = useContext(StateContext);
    const { outro } = useContext(StateContext);
    const blobs = document.querySelectorAll('.shape-blob');
    const blobContainer = document.getElementById("blob-container");

    useEffect(() => {
        if (stageOne) {
            blobs.forEach(blob => blob.classList.add('stage-one'));
            blobContainer.classList.add("stage-one");
        }

        if (stageTwoTransition) {
            blobs.forEach((blob, index) => {
                if (index % 2 === 0) {
                    blob.classList.add('stage-two-transition');
                }
            });

            setTimeout(() => {
                blobs.forEach((blob, index) => {
                    if (index % 1 === 0) {
                        blob.classList.add('stage-two-transition');
                        blobContainer.classList.replace("stage-one", "stage-two");
                    }
                });
            }, 4000);
        }

        if (stageThreeTransition) {
            blobs.forEach((blob, index) => {
                if (index % 2 === 0) {
                    blob.classList.add('stage-three-transition');
                }
            });

            setTimeout(() => {
                blobs.forEach((blob, index) => {
                    if (index % 1 === 0) {
                        blob.classList.add('stage-three-transition');
                        blobContainer.classList.replace("stage-two", "stage-three");
                    }
                });
            }, 4000);
        }

        if (outro) {
            blobs.forEach((blob, index) => {
                if (index % 1 === 0) {
                    blob.classList.remove('stage-three-transition', 'stage-two-transition', "stage-one");
                    blobContainer.classList.remove("stage-three");
                }
            });
        }
    }, [stageOne, stageTwoTransition, stageTwo, stageThreeTransition, stageThree, outro]);
    
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