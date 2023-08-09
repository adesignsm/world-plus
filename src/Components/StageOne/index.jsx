import React, { useState, useContext, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// import { Bloom, Noise, EffectComposer, DepthOfField, DotScreen, Scanline } from '@react-three/postprocessing'
import { PointerLockControls } from "@react-three/drei";
import { TextureLoader, DoubleSide } from "three";
import $ from "jquery";
import { StateContext } from "../../StateContext";

import HEAD from "../../Assets/Stage1_elements/head.png";
import OBJECT from "../../Assets/Stage1_elements/image4.png";

import "./index.css";

const GridBox = () => {
    const gridRef = useRef();

    useFrame(() => {
        if (gridRef.current) {
          gridRef.current.rotation.x += 0.0005;
        }
    });

    return (
        <>
            <mesh position={[0, 0, 5]} ref={gridRef}>
                <sphereGeometry args={[10, 1000]} />
                <meshBasicMaterial color={"#1428E2"} wireframe={true} />
            </mesh>
        </>
    )
}

const HeadModel = () => {
    const texture = new TextureLoader().load(HEAD);
    const headRef = useRef();

    useFrame(() => {
        if (headRef.current) {
          headRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <>
            <mesh position={[5, 1, -4]} ref={headRef}>
                <planeGeometry args={[3, 3]} />
                <meshBasicMaterial map={texture} side={DoubleSide} transparent={true} opacity={1}/>
            </mesh>
        </>
    )
}

const ObjectModel = () => {
    const texture = new TextureLoader().load(OBJECT);
    const objectRef = useRef();

    useFrame(() => {
        if (objectRef.current) {
          objectRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <>
            <mesh position={[-6, 3, -4]} ref={objectRef}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial map={texture} side={DoubleSide} transparent={true} opacity={1}/>
            </mesh>
        </>
    )
}

const StageOne = () => {
    const { stageOne } = useContext(StateContext);
    const { userName, updateUserName } = useContext(StateContext);
    const [promptIndex, setPromptIndex] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [currentDate] = useState(new Date());

    const prompts = [
        "What is your name?",
        `Hello ${userName}, describe yourself in one word`,
        "Test Question"
    ];

    let promptOneContainer = document.getElementById("stage-one-prompt-container-1");
    let promptTwoContainer = document.getElementById("stage-one-prompt-container-2");
    let promptThreeContainer = document.getElementById("stage-one-prompt-container-3");

    const handleUserInput = (e) => {
        if (e.target.value.length >= 0 && e.key === "Enter" && promptIndex === 0) {
            updateUserName(e.target.value);
            let promptOneAnswer = `${prompts[0]}: ${e.target.value}`;
            promptOneContainer.append(promptOneAnswer);  
            
            setPromptIndex((prevIndex) => prevIndex = prevIndex + 1);
            e.target.value = "";

            promptOneContainer.classList.remove("attention");
            promptTwoContainer.classList.replace("at-ease", "attention");

        } else if (e.target.value.length >= 0 && e.key === "Enter" && promptIndex === 1) {
            let promptTwoAnswer = `${prompts[1]}: ${e.target.value}`;
            promptTwoContainer.append(promptTwoAnswer);  
            
            setPromptIndex((prevIndex) => prevIndex = prevIndex + 1);
            e.target.value = "";

            promptTwoContainer.classList.remove("attention");
            promptThreeContainer.classList.replace("at-ease", "attention");

        } else if (e.target.value.length >= 0 && e.key === "Enter" && promptIndex === 2) {
            let promptThreeAnswer = `${prompts[2]}: ${e.target.value}`;
            promptThreeContainer.append(promptThreeAnswer);  
            
            setPromptIndex((prevIndex) => prevIndex = prevIndex + 1);
            e.target.value = "";
            setShowButton(true);

            promptThreeContainer.classList.remove("attention");
        }
    }

    useEffect(() => {
        if (stageOne) $("#stage-one-container").fadeIn(600);
    }, [stageOne]);

    return (
        <>
            <div id="stage-one-container">
                <div id="stage-one-cmd-container">
                    <div className="task-bar">
                        <p> C:\\SYSTEM\World+\command_center\intro_welcome </p>
                    </div>
                    <div className="prompt-container">
                        <p>
                            WORLD+ [{currentDate.toString()}]<br/>
                            (c) 2023 World+. All rights reserved.
                        </p>
                        <div id="stage-one-prompt-container-1" className="attention">
                            {promptIndex === 0 && <p className="stage-one-prompt one">&gt;&gt;&gt; {prompts[promptIndex]}</p>}
                        </div>
                        <div id="stage-one-prompt-container-2" className="at-ease">
                            {promptIndex === 1 && <p className="stage-one-prompt two">&gt;&gt;&gt; {prompts[promptIndex]}</p>}
                        </div>
                        <div id="stage-one-prompt-container-3" className="at-ease">
                            {promptIndex === 2 && <p className="stage-one-prompt three">&gt;&gt;&gt; {prompts[promptIndex]}</p>}    
                        </div>
                        
                        <div id="user-input-area" className="user-input-area">
                            <span>C://User/{userName || "???"}: </span>
                            <input type="text" onKeyUp={(e) => handleUserInput(e)} placeholder="enter here"/>
                        </div>
                        {showButton ? <button id="enter-stage-two-button"> Continue to next stage </button> : null}
                    </div>
                </div>  
                <div id="stage-one-canvas">
                    <Canvas frameloop="always" camera={{ fov: 75, near: 1, far: 10000, position: [0, 0, 5] }}>
                        <PointerLockControls />
                        <GridBox />
                        <HeadModel />
                        <ObjectModel />
                    </Canvas>
                </div>  
            </div>
        </>
    )
}

export default StageOne;