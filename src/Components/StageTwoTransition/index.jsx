import React, { useState, useContext, useEffect, useRef } from "react";
import { StateContext } from "../../StateContext";
import $ from "jquery";
import "./index.css";

import TRANSITION_IMAGE from "../../Assets/Stage2_elements/Stage2_transition/transition_image.svg";

const StageTwoTransition = () => {
    const { stageTwo, updateStageTwo } = useContext(StateContext);
    const { stageTwoTransition, updateStageTwoTransition } = useContext(StateContext);

    useEffect(() => {
        if (stageTwoTransition) {
            $("#stage-two-transition-container").fadeIn(600);

            setTimeout(() => {
                updateStageTwoTransition(false);
                updateStageTwo(true);
            }, 5000);
        } else if (!stageTwoTransition) {
            $("#stage-two-transition-container").fadeOut(600);
        }
    }, [stageTwoTransition, stageTwo]);

    return (
        <>
            {stageTwoTransition && 
                <div id="stage-two-transition-container">
                   <img src={TRANSITION_IMAGE} />
                </div>
            }
        </>
    )
}

export default StageTwoTransition;