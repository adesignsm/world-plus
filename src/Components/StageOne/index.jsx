import React, { useState, useContext, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Noise, EffectComposer } from '@react-three/postprocessing'
import { OrbitControls } from "@react-three/drei";
import { TextureLoader, DoubleSide } from "three";
import $ from "jquery";
import { StateContext } from "../../StateContext";
import * as THREE from 'three';

/*STAGE ELEMENTS */
import EL_1 from "../../Assets/Stage1_elements/stage1data/image1.jpg";
import EL_2 from "../../Assets/Stage1_elements/stage1data/image2.jpg";
import EL_3 from "../../Assets/Stage1_elements/stage1data/image3.jpg";
import EL_4 from "../../Assets/Stage1_elements/stage1data/image4.jpg";
import EL_5 from "../../Assets/Stage1_elements/stage1data/image5.jpg";
import EL_6 from "../../Assets/Stage1_elements/stage1data/image6.jpg";
import EL_7 from "../../Assets/Stage1_elements/stage1data/image7.jpg";
import EL_8 from "../../Assets/Stage1_elements/stage1data/image8.jpg";
import EL_9 from "../../Assets/Stage1_elements/stage1data/image9.jpg";
import EL_10 from "../../Assets/Stage1_elements/stage1data/audio1.m4a";
import EL_11 from "../../Assets/Stage1_elements/stage1data/audio2.m4a";
import EL_12 from "../../Assets/Stage1_elements/stage1data/audio3.m4a";
import EL_13 from "../../Assets/Stage1_elements/stage1data/audio4.m4a";
import EL_14 from "../../Assets/Stage1_elements/stage1data/audio5.m4a";
import EL_15 from "../../Assets/Stage1_elements/stage1data/video1.mp4";

import "./index.css";

const elementArray = [
    EL_1,EL_2,EL_3,EL_4,EL_5,EL_6,EL_7,EL_8,
    EL_9,EL_10,EL_11,EL_12,EL_13,EL_14,EL_15,
]

const randomWordArray = [
    "battle as transactional acts",
    "intangibles > feelings",
    "emotions",
    "energies",
    "nuances make huge impacts",
    "the notion of fairness",
    "responses vs reactions",
    "identities",
    "relationships(process of forming, types)",
    "battle at the intersection of politics",
    "battle as ever-healing wounds",
    "risk-taking",
    "sustainability",
    "diversifiying",
    "humanized",
    "ancestral",
    "resistance",
    "discomfort",
    "cross-sphere"
];

let usersFiles = [];

const getRandomSentence = () => {
    const minWords = 3;
    const maxWords = 5;

    const numWords = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const shuffledWords = randomWordArray.sort(() => Math.random() - 0.5); // Shuffle the array
    const selectedWords = shuffledWords.slice(0, numWords);
    const sentence = selectedWords.join(" ");

    return sentence;
}

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

const OutcomesSphere = () => {
    const outcomesRef = useRef();
    const radius = 1; // Radius of the circular motion
    const speed = 0.5; // Speed of rotation

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        const newX = -Math.cos(time * speed) * radius;
        const newZ = Math.sin(time * speed) * radius;
        outcomesRef.current.position.set(newX, 1, newZ);
    })

    const handleOver = (e) => {
        const existingInfoBox = document.querySelector(".info-box");
        const infoBox = document.createElement("div");
        infoBox.classList.add("info-box");
        
        if (!existingInfoBox) {
            const infoBox = document.createElement("div");
            infoBox.classList.add("info-box");
            infoBox.innerHTML = "<ul><li>ability</li><li>preferences</li><li>perception</li><li>conflicts in interest</li></ul>";

            infoBox.style.top = `${e.clientY}px`;
            infoBox.style.left = `${e.clientX}px`;
          
            document.getElementById("stage-one-container").append(infoBox);
        }
    }

    const handleOut = () => {
        const existingInfoBox = document.querySelector(".info-box");
    
        if (existingInfoBox) {
            existingInfoBox.remove();
        }
    }


    return (
        <>
            <mesh position={[3, 1, -1]} ref={outcomesRef} onPointerOver={(e) => handleOver(e)} onPointerOut={handleOut}>
                <sphereGeometry args={[1, 10, 10]} />
                <meshBasicMaterial color={"green"} opacity={1}/>
            </mesh>
        </>
    )
}

const RelationshipsSphere = () => {
    const relationshipsRef = useRef();
    const radius = 1; // Radius of the circular motion
    const speed = 0.5; // Speed of rotation

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        const newX = Math.cos(time * speed) * radius;
        const newZ = Math.sin(time * speed) * radius;
        relationshipsRef.current.position.set(newX, 1, newZ);
    })

    const handleOver = (e) => {
        const existingInfoBox = document.querySelector(".info-box");
        const infoBox = document.createElement("div");
        infoBox.classList.add("info-box");
        
        if (!existingInfoBox) {
            const infoBox = document.createElement("div");
            infoBox.classList.add("info-box");
            infoBox.innerHTML = "<ul><li>competitive</li><li>friendly</li><li>hierarchy</li><li>aggresion</li><li>discontent</li><li>sadness</li><li>anger</li></ul>";

            infoBox.style.top = `${e.clientY}px`;
            infoBox.style.left = `${e.clientX}px`;
          
            document.getElementById("stage-one-container").append(infoBox);
        }
    }

    const handleOut = () => {
        const existingInfoBox = document.querySelector(".info-box");
    
        if (existingInfoBox) {
            existingInfoBox.remove();
        }
    }


    return (
        <>
            <mesh position={[-2, 1, -1]} ref={relationshipsRef} onPointerOver={(e) => handleOver(e)} onPointerOut={handleOut}>
                <sphereGeometry args={[1, 10, 10]} />
                <meshBasicMaterial color={"red"} transparent={true} opacity={0.8} wireframe={false}/>
            </mesh>
        </>
    )
}

const PeopleSphere = () => {
    const peopleRef = useRef();
    const radius = 1; // Radius of the circular motion
    const speed = 1; // Speed of rotation

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        const newY = Math.cos(time * speed) * radius;
        const newZ = Math.sin(time * speed) * radius;
        peopleRef.current.position.set(0, newY, newZ);
    })

    const handleOver = (e) => {
        const existingInfoBox = document.querySelector(".info-box");
        const infoBox = document.createElement("div");
        infoBox.classList.add("info-box");
        
        if (!existingInfoBox) {
            const infoBox = document.createElement("div");
            infoBox.classList.add("info-box");
            infoBox.innerHTML = "<ul><li>legability</li><li>popularity</li><li>competency</li><li>understanding</li></ul>";

            infoBox.style.top = `${e.clientY}px`;
            infoBox.style.left = `${e.clientX}px`;
          
            document.getElementById("stage-one-container").append(infoBox);
        }
    }

    const handleOut = () => {
        const existingInfoBox = document.querySelector(".info-box");
    
        if (existingInfoBox) {
            existingInfoBox.remove();
        }
    }


    return (
        <>
            <mesh position={[0, -2, -1]} ref={peopleRef} onPointerOver={(e) => handleOver(e)} onPointerOut={handleOut}>
                <sphereGeometry args={[1, 10, 10]} />
                <meshPhongMaterial color={"blue"} transparent={true} opacity={0.8} wireframe={false}/>
            </mesh>
        </>
    )
}

const StageOne = () => {
    const { stageOne, updateStageOne } = useContext(StateContext);
    const { stageTwoTransition, updateStageTwoTransition} = useContext(StateContext);
    const [promptIndex, setPromptIndex] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [currentDate] = useState(new Date());

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const adjustedX = isMobile ? 0 : 1;

    const prompts = [
        "Have you created your own experience before?",
        `Have you experienced self-discovery`,
        "Another yes or no question"
    ];

    const addNewItem = () => {
        let randomIndex = Math.floor(Math.random() * elementArray.length);
        let item = elementArray[randomIndex];

        if (item.indexOf("audio") != -1) {
            console.log("audio file");

            let audioElement = document.createElement("audio");
            audioElement.src = item;
            audioElement.controls = true;
            document.getElementById("file-explorer").append(audioElement);

        } else if (item.indexOf("image") != -1) {
            let imageElement = document.createElement("img");
            imageElement.src = item;
            document.getElementById("file-explorer").appendChild(imageElement);

        } if (item.indexOf("video") != -1) {
            let videoElement = document.createElement("video");
            videoElement.src = item;
            videoElement.controls = true;
            document.getElementById("file-explorer").appendChild(videoElement);
        }

        if (!usersFiles.includes(item)) {
            usersFiles.push(item);
        }
    };

    const openFileExplorer = () => {
        console.log(usersFiles)
        $("#file-explorer").fadeIn(500);
    }

    const handleUserInput = (e) => {
        let promptOneContainer = document.getElementById("stage-one-prompt-container-1");
        let promptTwoContainer = document.getElementById("stage-one-prompt-container-2");
        let promptThreeContainer = document.getElementById("stage-one-prompt-container-3");
        
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

        $("#stage-one-cmd-container").animate({
            scrollTop: "250%"
        }, 100);
    }

    const handleNextStage = () => {
        updateStageOne(false);
        updateStageTwoTransition(true)
    }

    useEffect(() => {
        if (stageOne) {
            $("#stage-one-container").fadeIn(600);
        } else if (stageOne === false) {
            $("#stage-one-container").fadeOut(600);
        }
    }, [stageOne]);

    return (
        <>
            {stageOne && 
                <div id="stage-one-container">
                    <div id="stage-one-cmd-container">
                        <div className="task-bar">
                            <p> C:\\SYSTEM\World+\command_center\stage_one </p>
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
                                <span>C://User/: </span>
                                <button id="yes-button" onClick={(e) => handleUserInput(e)}> Yes </button>
                                <button id="no-button" onClick={(e) => handleUserInput(e)}> No </button>
                            </div>
                            {showButton ? 
                            <div id="enter-stage-two-button">
                                <ul>
                                    <li> <button onClick={handleNextStage}> Please click this button when you are ready to proceed to the next stage</button></li>
                                </ul>
                            </div> : null}
                        </div>
                    </div>
                    <div id="file-explorer">
                        <div className="task-bar">
                            <p> C:\\SYSTEM\World+\command_center\stage_one\files </p>
                        </div>
                    </div>  
                    <div id="stage-one-canvas">
                        <Canvas frameloop="always" camera={{ fov: 75, near: 1, far: 10000, position: [0, 0, 5] }}>
                            {/* <PointerLockControls selector="#stage-one-canvas" /> */}
                            <OrbitControls enableZoom={false}/>
                            <GridBox />
                            <group position={[adjustedX, 0, 0]}>
                                <OutcomesSphere />
                                <RelationshipsSphere />
                                <PeopleSphere />
                            </group>
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

export default StageOne;