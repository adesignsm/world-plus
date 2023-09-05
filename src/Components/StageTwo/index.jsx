import React, { useState, useContext, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, Noise, EffectComposer } from '@react-three/postprocessing'
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import { TextureLoader, DoubleSide } from "three";
import $ from "jquery";
import { StateContext } from "../../StateContext";

import SUN_PILL from "../../Assets/Stage2_elements/sun_pill.svg";
import DUO_PILL from "../../Assets/Stage2_elements/duo_pill.svg";
import DUO_PILL_2 from "../../Assets/Stage2_elements/duo_pill_2.svg";
import DUO_PILL_3 from "../../Assets/Stage2_elements/duo_pill_3.svg";
import WRITING1 from "../../Assets/Stage2_elements/writing1.svg";
import WRITING2 from "../../Assets/Stage2_elements/writing2.svg";
import WRITING3 from "../../Assets/Stage2_elements/writing3.svg";

import EL_1 from "../../Assets/Stage2_elements/stage2data/video1.mp4";
import EL_3 from "../../Assets/Stage2_elements/stage2data/video3.mp4";
import EL_4 from "../../Assets/Stage2_elements/stage2data/image1.jpg";
import EL_5 from "../../Assets/Stage2_elements/stage2data/image2.jpg";
import EL_6 from "../../Assets/Stage2_elements/stage2data/image3.jpg";
import EL_7 from "../../Assets/Stage2_elements/stage2data/image4.jpg";
import EL_8 from "../../Assets/Stage2_elements/stage2data/image5.jpg";
import EL_9 from "../../Assets/Stage2_elements/stage2data/image6.jpg";
import EL_10 from "../../Assets/Stage2_elements/stage2data/image7.jpg";
import EL_11 from "../../Assets/Stage2_elements/stage2data/image8.jpg";
import EL_12 from "../../Assets/Stage2_elements/stage2data/image9.jpg";
import EL_13 from "../../Assets/Stage2_elements/stage2data/image10.jpg";
import EL_14 from "../../Assets/Stage2_elements/stage2data/image11.jpg";
import EL_15 from "../../Assets/Stage2_elements/stage2data/image12.jpg";

import "./index.css";

const elementArray = [
    EL_1, EL_3, EL_4, EL_5, EL_6,
    EL_7, EL_8, EL_9, EL_10, EL_11, EL_12,
    EL_13, EL_14, EL_15
];

let usersFiles = [];

// const GridBox = () => {
//     const gridRef = useRef();

//     useFrame(() => {
//         if (gridRef.current) {
//           gridRef.current.rotation.x += 0.0005;
//         }
//     });

//     return (
//         <>
//             <mesh position={[0, 0, 5]} ref={gridRef}>
//                 <boxGeometry args={[100, 100, 100, 100]} />
//                 <meshBasicMaterial color={"#80FF44"} wireframe={true} />
//             </mesh>
//         </>
//     )
// }

const Globe = () => {
    return (
        <>
            <mesh position={[-10, 0, -10]} scale={0.02}>
                <sphereGeometry args={[100, 100]} />
                <meshBasicMaterial color={"green"} wireframe={true} />
            </mesh>
        </>
    )
}

const SunPillModel = () => {
    const texture = new TextureLoader().load(SUN_PILL);
    const sunPillRef = useRef();

    useFrame(() => {
        if (sunPillRef.current) {
          sunPillRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <>
            <mesh position={[-5, 1, -5]} ref={sunPillRef}>
                <planeGeometry args={[3, 3]} />
                <meshBasicMaterial map={texture} side={DoubleSide} transparent={true} opacity={1}/>
            </mesh>
        </>
    )
}

const DuoPillModel = () => {
    const texture = new TextureLoader().load(DUO_PILL);
    const duoPillRef = useRef();

    useFrame(() => {
        if (duoPillRef.current) {
          duoPillRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <>
            <mesh position={[-10, 3, -4]} ref={duoPillRef}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial map={texture} side={DoubleSide} transparent={true} opacity={1}/>
            </mesh>
        </>
    )
}

const DuoPillModel2 = () => {
    const texture = new TextureLoader().load(DUO_PILL_2);
    const duoPillTwoRef = useRef();

    useFrame(() => {
        if (duoPillTwoRef.current) {
          duoPillTwoRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <>
            <mesh position={[10, 0, -10]} ref={duoPillTwoRef}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial map={texture} side={DoubleSide} transparent={true} opacity={1}/>
            </mesh>
        </>
    )
}
const DuoPillModel3 = () => {
    const texture = new TextureLoader().load(DUO_PILL_3);
    const duoPillThreeRef = useRef();

    useFrame(() => {
        if (duoPillThreeRef.current) {
          duoPillThreeRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <>
            <mesh position={[15, 3, -10]} ref={duoPillThreeRef}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial map={texture} side={DoubleSide} transparent={true} opacity={1}/>
            </mesh>
        </>
    )
}

const WritingOnelModel = () => {
    const texture = new TextureLoader().load(WRITING1);

    return (
        <>
            <mesh scale={0.8} position={[-5, 0, 10]} rotation={[0, 3, 0]}>
                <planeGeometry args={[9, 6]} />
                <meshBasicMaterial map={texture} side={DoubleSide} transparent={true} opacity={1} color={"#fff"}/>
            </mesh>
        </>
    )
}

const WritingTwoModel = () => {
    const texture = new TextureLoader().load(WRITING2);

    return (
        <>
            <mesh position={[-5, 0, 4]} rotation={[0, -4.5, 0]}>
                <planeGeometry args={[6, 5]} />
                <meshBasicMaterial map={texture} side={DoubleSide} transparent={true} opacity={1}/>
            </mesh>
        </>
    )
}

const WritingThreeModel = () => {
    const texture = new TextureLoader().load(WRITING3);

    return (
        <>
            <mesh position={[1, 0, 7]} rotation={[0, 4.2, 0]}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial map={texture} side={DoubleSide} transparent={true} opacity={1} alphaTest={false}/>
            </mesh>
        </>
    )
}

const StageTwo = () => {
    const { stageTwo, updateStageTwo } = useContext(StateContext);
    const { stageThreeTransition, updateStageThreeTransition} = useContext(StateContext);
    const { userName, updateUserName } = useContext(StateContext);
    const [promptIndex, setPromptIndex] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [currentDate] = useState(new Date());
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const controlsToggle = isMobile ? "orbit" : "pointer";

    const prompts = [
        "Have you ever been in a DUO before?",
        `If you could become part of a DUO, would you?`,
        "Do you find it fleeting when you are part of a DUO?"
    ];

    const addNewItem = () => {
        let availableItems = elementArray.filter(item => !usersFiles.includes(item));

        if (availableItems.length === 0) {
            console.log("No new items to add.");
            return;
        }

        let randomIndex = Math.floor(Math.random() * availableItems.length);
        let item = availableItems[randomIndex];

        if (item.indexOf("audio") !== -1) {
            console.log("audio file");

            let audioElement = document.createElement("audio");
            audioElement.src = item;
            audioElement.controls = true;
            document.getElementById("file-explorer").appendChild(audioElement);

        } else if (item.indexOf("image") !== -1) {
            let imageElement = document.createElement("img");
            imageElement.src = item;
            document.getElementById("file-explorer").appendChild(imageElement);

        } else if (item.indexOf("video") !== -1) {
            let videoElement = document.createElement("video");
            videoElement.src = item;
            videoElement.controls = true;
            document.getElementById("file-explorer").appendChild(videoElement);
        }

        usersFiles.push(item);
    };

    const openFileExplorer = () => {
        console.log(usersFiles)
        $("#file-explorer").fadeIn(500);
    }

    const handleUserInput = (e) => {
        let promptOneContainer = document.getElementById("stage-two-prompt-container-1");
        let promptTwoContainer = document.getElementById("stage-two-prompt-container-2");
        let promptThreeContainer = document.getElementById("stage-two-prompt-container-3");
        
        if (promptIndex === 0) {
            let promptOneAnswer = `${prompts[0]}: ${e.target.innerText}`;
            promptOneContainer.append(promptOneAnswer);  
            
            setPromptIndex((prevIndex) => prevIndex = prevIndex + 1);

            promptOneContainer.classList.remove("attention");
            promptTwoContainer.classList.replace("at-ease", "attention");

            addNewItem();

        } else if (promptIndex === 1) {
            let promptTwoAnswer = `${prompts[1]}: ${e.target.innerText}`;
            promptTwoContainer.append(promptTwoAnswer);  
            
            setPromptIndex((prevIndex) => prevIndex = prevIndex + 1);

            promptTwoContainer.classList.remove("attention");
            promptThreeContainer.classList.replace("at-ease", "attention");

            addNewItem();

        } else if (promptIndex === 2) {
            let promptThreeAnswer = `${prompts[2]}: ${e.target.innerText}`;
            promptThreeContainer.append(promptThreeAnswer);  
            
            setPromptIndex((prevIndex) => prevIndex = prevIndex + 1);
            setShowButton(true);

            promptThreeContainer.classList.remove("attention");

            addNewItem();
            openFileExplorer();
        }

        $("#stage-two-cmd-container").animate({
            scrollTop: "300%"
        }, 100);
    }

    const handleNextStage = () => {
        updateStageTwo(false);
        updateStageThreeTransition(true)
    }

    useEffect(() => {
        if (stageTwo) {
            $("#stage-two-container").fadeIn(600);
        } else if (stageTwo === false) {
            $("#stage-two-container").fadeOut(600);
        }
    }, [stageTwo]);

    return (
        <>
            {stageTwo && 
                <div id="stage-two-container">
                    <div id="stage-two-cmd-container">
                        <div className="task-bar">
                            <p> C:\\SYSTEM\World+\command_center\stage_two </p>
                        </div>
                        <div className="prompt-container">
                            <p>
                                WORLD+ [{currentDate.toString()}]<br/>
                                (c) 2023 World+. All rights reserved.
                            </p>
                            <div id="stage-two-prompt-container-1" className="attention">
                                {promptIndex === 0 && <p className="stage-one-prompt one">&gt;&gt;&gt; {prompts[promptIndex]}</p>}
                            </div>
                            <div id="stage-two-prompt-container-2" className="at-ease">
                                {promptIndex === 1 && <p className="stage-two-prompt two">&gt;&gt;&gt; {prompts[promptIndex]}</p>}
                            </div>
                            <div id="stage-two-prompt-container-3" className="at-ease">
                                {promptIndex === 2 && <p className="stage-two-prompt three">&gt;&gt;&gt; {prompts[promptIndex]}</p>}    
                            </div>
                            
                            <div id="user-input-area" className="user-input-area">
                                <span>C://User/: </span>
                                <button id="yes-button" onClick={(e) => handleUserInput(e)}> Yes </button>
                                <button id="no-button" onClick={(e) => handleUserInput(e)}> No </button>
                            </div>
                            {showButton ? 
                            <div id="enter-stage-three-button"> 
                                <ul>
                                    <li> if you cannot see your mouse please press ESC to gain control again. </li>
                                    <li> <button onClick={handleNextStage}> Please click this button when you are ready to proceed to the next stage</button></li>
                                </ul>
                            </div> : null}
                        </div>
                    </div>
                    <div id="file-explorer">
                        <div className="task-bar">
                            <p> C:\\SYSTEM\World+\command_center\stage_two\files </p>
                        </div>
                    </div>  
                    <div id="stage-two-canvas-1">
                        <Canvas frameloop="always" camera={{ fov: 75, near: 1, far: 10000, position: [0, 0, 5] }}>
                        {controlsToggle === "orbit" ? <OrbitControls /> : <PointerLockControls selector="#stage-two-canvas-1"/>}
                            <Globe />
                            <SunPillModel />
                            <DuoPillModel />
                            <DuoPillModel2 />
                            <DuoPillModel3 />
                            <WritingOnelModel />
                            <WritingTwoModel />
                            <WritingThreeModel />
                            <EffectComposer>
                                <Noise opacity={0.7} randomness={1} strength={1.0} />
                            </EffectComposer>
                        </Canvas>
                    </div>
                    <div id="stage-two-canvas-2">
                        <Canvas frameloop="always" camera={{ fov: 75, near: 1, far: 10000, position: [0, 0, 5] }}>
                            <PointerLockControls selector="#stage-two-canvas-2"/>
                            <Globe />
                            <SunPillModel />
                            <DuoPillModel />
                            <DuoPillModel2 />
                            <DuoPillModel3 />
                            <WritingOnelModel />
                            <WritingTwoModel />
                            <WritingThreeModel />
                            <EffectComposer>
                                <Noise opacity={0.7} randomness={1} strength={1.0} />
                            </EffectComposer>
                        </Canvas>
                    </div>
                </div>
            }
        </>
    )
}

export default StageTwo;