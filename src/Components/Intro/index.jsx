import React, { useState, useContext } from "react";
import { StateContext } from "../../StateContext";
import $ from "jquery";
import "./index.css";

import WORLD_PLUS_LOGO from "../../Assets/Logos/world_plus_logo.svg";

const Intro = () => {
    const { updateStageOne } = useContext(StateContext)

    const [imageLoaded, setImageLoaded] = useState(false);
    const [cmdOpen, setCmdOpen] = useState(false);
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [currentDate] = useState(new Date());

    const introPrompts = [
        'Welcome to WORLD+',
        'WORLD+ chooses your own adventure',
        'WORLD+ is however you imagine your reality to be',
        'WORLD+ cultivates curiosity and TRIAL-AND-ERROR with care',
        'Buckle up, are you ready?',
    ];

    if (cmdOpen) {
        const interval = setInterval(() => {
            if (currentPromptIndex < introPrompts.length - 1 && cmdOpen) {
                setCurrentPromptIndex(currentPromptIndex + 1);
            } else {
                clearInterval(interval);
                $("#intro-cmd-container").fadeOut(500);
                $("#intro-container").delay(1000).fadeOut(500);
                
                let stageOnePass = true;
                updateStageOne(stageOnePass);
            }
        }, 3500);
    }

    const handleImageLoad = () => {
        setImageLoaded(true);

        setTimeout(() => {
            $("#intro-container").animate({
                marginTop: "-40vh",
            }, 3000);

            $("#intro-container img").animate({
                width: "30vw"
            }, 3000);
            
            setCmdOpen(true);
        }, 7000);
    };

    return (
        <>
            <div id="intro-container" className={imageLoaded ? "loaded" : ""}>
                <img src={WORLD_PLUS_LOGO} onLoad={handleImageLoad} />
            </div>
            {cmdOpen ? 
                <div id="intro-cmd-container">
                    <div className="task-bar">
                        <p> C:\\SYSTEM\World+\command_center\intro_welcome </p>
                    </div>
                    <div className="prompt-container">
                        <p>
                            WORLD+ [{currentDate.toString()}]<br/>
                            (c) 2023 World+. All rights reserved.
                        </p>
                        {introPrompts.slice(0, currentPromptIndex + 1).map((prompt, index) => (
                            <p key={index} className={`intro-prompt ${index + 1}`}>
                                &gt;&gt;&gt; {prompt}
                            </p>
                        ))}
                    </div>
                </div>    
            : null}
        </>
    )
}

export default Intro;