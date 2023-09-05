import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../../StateContext";
import $ from "jquery";
import "./index.css";

import WORLD_PLUS_LOGO from "../../Assets/Logos/world_plus_logo.svg";

const Outro = () => {
    const { outro } = useContext(StateContext)

    const [imageLoaded, setImageLoaded] = useState(false);
    const [cmdOutroOpen, setCmdOutroOpen] = useState(false);
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [currentDate] = useState(new Date());

    const outroPrompts = [
        `Now you may wonder what's next`,
        `What if next is now`,
        `and now is perpetuity`,
        `questions afloat no answers are needed`,
        `they are already within you`,
        `we hope you are -`,
        `>>> looking deeper +`,
        `>>> listening stronger +`,
        `>>> holding tighter +`,
        `>>> feeling harder +`,
        `>>> breathing denser +`,
        `World + resides with the infinity`,
        `and`,
        `you are your World +`,
        `we are our World +`,
    ];

    useEffect(() => {
        if (outro) {
            $("#outro-container").fadeIn(500);
            setCmdOutroOpen(true);
        } else {
            $("#outro-container").fadeOut(500);
            setCmdOutroOpen(false);
        }
    }, [outro]);

    if (cmdOutroOpen) {
        const interval = setInterval(() => {
            if (currentPromptIndex < outroPrompts.length - 1 && cmdOutroOpen) {
                setCurrentPromptIndex(currentPromptIndex + 1);
                $("#outro-cmd-container").animate({
                    scrollTop: "250%"
                }, 100);
            } else {
                clearInterval(interval);
                $("#outro-cmd-container").fadeOut(500);
                $(".menu-button").fadeOut(500);
                $("#outro-container").delay(1000).fadeOut(500);
            }
        }, 3500);
    }

    const handleImageLoad = () => {
        setImageLoaded(true);

        setTimeout(() => {
            $("#outro-container").animate({
                marginTop: "-40vh",
            }, 3000);

            $("#outro-container img").animate({
                width: "30vw"
            }, 3000);
        }, 7000);
    };

    return (
        <>
            <div id="outro-container" className={imageLoaded ? "loaded" : ""}>
                <img src={WORLD_PLUS_LOGO} onLoad={handleImageLoad} />
            </div>
            {cmdOutroOpen ? 
                <div id="outro-cmd-container">
                    <div className="task-bar">
                        <p> C:\\SYSTEM\World+\command_center\intro_welcome </p>
                    </div>
                    <div className="prompt-container">
                        <p>
                            WORLD+ [{currentDate.toString()}]<br/>
                            (c) 2023 World+. All rights reserved.
                        </p>
                        {outroPrompts.slice(0, currentPromptIndex + 1).map((prompt, index) => (
                            <p key={index} className={`outro-prompt ${index + 1}`}>
                                {prompt}
                            </p>
                        ))}
                    </div>
                </div>    
            : null}
        </>
    )
}

export default Outro;