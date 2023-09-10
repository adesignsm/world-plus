import React, { useState, useContext, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import $ from "jquery";
import { StateContext } from "../../StateContext";
import Terrain from "../Terrain";

import EL_1 from "../../Assets/Stage3_elements/stage3data/image1.jpg";
import EL_2 from "../../Assets/Stage3_elements/stage3data/image2.jpg";
import EL_3 from "../../Assets/Stage3_elements/stage3data/image3.jpg";
import EL_4 from "../../Assets/Stage3_elements/stage3data/image4.jpg";
import EL_5 from "../../Assets/Stage3_elements/stage3data/image5.jpg";
import EL_6 from "../../Assets/Stage3_elements/stage3data/image6.jpg";
import EL_7 from "../../Assets/Stage3_elements/stage3data/image7.jpg";
import EL_8 from "../../Assets/Stage3_elements/stage3data/image8.jpg";
import EL_9 from "../../Assets/Stage3_elements/stage3data/image9.jpg";
import EL_10 from "../../Assets/Stage3_elements/stage3data/image10.jpg";
import EL_11 from "../../Assets/Stage3_elements/stage3data/image11.jpg";
import EL_12 from "../../Assets/Stage3_elements/stage3data/image12.jpg";
import EL_13 from "../../Assets/Stage3_elements/stage3data/image13.jpg";
import EL_14 from "../../Assets/Stage3_elements/stage3data/image14.jpg";
import EL_15 from "../../Assets/Stage3_elements/stage3data/image15.jpg";
import EL_16 from "../../Assets/Stage3_elements/stage3data/image16.jpg";
import EL_17 from "../../Assets/Stage3_elements/stage3data/image17.jpg";
import EL_18 from "../../Assets/Stage3_elements/stage3data/image18.jpg";
import EL_19 from "../../Assets/Stage3_elements/stage3data/image19.jpg";
import EL_20 from "../../Assets/Stage3_elements/stage3data/image20.jpg";
import EL_21 from "../../Assets/Stage3_elements/stage3data/image21.jpg";
import EL_22 from "../../Assets/Stage3_elements/stage3data/image22.jpg";
import EL_23 from "../../Assets/Stage3_elements/stage3data/image23.jpg";
import EL_24 from "../../Assets/Stage3_elements/stage3data/video1.mp4";

import "./index.css";

const elementArray = [
    EL_1, EL_2, EL_3, EL_4, EL_5, EL_6, EL_7,
    EL_8, EL_9, EL_10, EL_11, EL_12, EL_13, 
    EL_14, EL_15, EL_16, EL_17, EL_18, EL_19, EL_20,
    EL_21, EL_22, EL_23, EL_24,
];

let usersFiles = [];

const writings = [
    "World + (is)",
    "collective (consciousness) empathetic system",
    "future-making is to be with the present - paying homage to the past",
    "the infinity time cycle = timeless and spaceless worlds",
    "the infinity time cycle = timeless and spaceless worlds",
    "the infinity time cycle = timeless and spaceless worlds",
    "battles channel energies & experience beyond the momentary present - World + is to meet that space",
    "World+ is individual and collective constellations, strength from all directions > deep listening, offering, receiving",
    "to immerse in World + is simple - all you have to do is to remember you always have a choice",
    "the impeccable beauty of humanhood - physicality, intellect, emotions, the making, the pain, the overcoming",
    "movement is a blessing",
    "movement is a blessing",
    "movement is a blessing",
];

const ParticleSystem = () => {
    const particleCount = 1200;
    const particles = new Array(particleCount);
    let particlesTurned = 0;
  
    for (let i = 0; i < particleCount; i++) {
      particles[i] = {
        position: new THREE.Vector3(
          Math.random() * 200 - 100,
          Math.random() * 200 - 100,
          Math.random() * 200 - 100
        ),
        velocity: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5),
        color: new THREE.Color(1, 0, 0), // Initial color (red)
      };
    }
  
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
  
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;

      colors[i * 3] = particle.color.r;
      colors[i * 3 + 1] = particle.color.g;
      colors[i * 3 + 2] = particle.color.b;
    });
  
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  
    const particleMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
    });
  
    const particleSystemRef = useRef();
  
    useFrame(() => {
      if (particleSystemRef.current) {
        particles.forEach((particle, i) => {
          particle.position.add(particle.velocity);
          particle.velocity.add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(0.01));
  
          if (particle.position.x > 100) particle.position.x = -100;
          if (particle.position.x < -100) particle.position.x = 100;
          if (particle.position.y > 100) particle.position.y = -100;
          if (particle.position.y < -100) particle.position.y = 100;
          if (particle.position.z > 100) particle.position.z = -100;
          if (particle.position.z < -100) particle.position.z = 100;

          particles.forEach((otherParticle, j) => {
            if (i !== j) {
              const distance = particle.position.distanceTo(otherParticle.position);
              if (distance < 2) {
                particle.color.setRGB(0, 0, 1);
                particle.velocity.set(0, -0.05, 0);

                if (particle.position.y <= -3 && particle.color.r === 0) {
                    particle.velocity.set(0, 0, 0); // Stop falling when reaching y > -10
                }

                particlesTurned++;
              }
            }
          });
  
          positions[i * 3] = particle.position.x;
          positions[i * 3 + 1] = particle.position.y;
          positions[i * 3 + 2] = particle.position.z;
          colors[i * 3] = particle.color.r;
          colors[i * 3 + 1] = particle.color.g;
          colors[i * 3 + 2] = particle.color.b;
        });
  
        particleGeometry.attributes.position.needsUpdate = true;
        particleGeometry.attributes.color.needsUpdate = true;
      }
    });
  
    return (
      <points ref={particleSystemRef}>
        <bufferGeometry attach="geometry" {...particleGeometry} />
        <pointsMaterial attach="material" {...particleMaterial} />
      </points>
    );
};

const Writings = ({ writings }) => {
    const { updateOutro} = useContext(StateContext);
    const { updateStageThree } = useContext(StateContext);

    const [currentWritingIndex, setCurrentWritingIndex] = useState(0);
  
    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentWritingIndex < writings.length - 1) {
                setCurrentWritingIndex(currentWritingIndex + 1);
            } else {
                $("#writings-container").fadeOut(500);
                setTimeout(() => {
                    updateStageThree(false);
                    updateOutro(true)

                    $(".menu-button").delay(500).animate({
                        opacity: "0",
                    }, 500);
                }, 1500);
            }
        }, 4000);
  
      return () => clearTimeout(timer);
    }, [currentWritingIndex, writings.length]);
  
    return (
      <div id="writings-container">
        <p className="writing">
          {writings[currentWritingIndex]}
        </p>
      </div>
    );
};  

const StageThree = () => {
    const { stageThree, updateStageThree } = useContext(StateContext);
    const { userName } = useContext(StateContext);
    const { outro, updateOutro} = useContext(StateContext);
    const [promptIndex, setPromptIndex] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [currentDate] = useState(new Date());
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const controlsToggle = isMobile ? "orbit" : "pointer";

    const prompts = [
        "What is your name?",
        `Hello ${userName}, describe yourself in one word`,
        "Test Question"
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
        let promptOneContainer = document.getElementById("stage-three-prompt-container-1");
        let promptTwoContainer = document.getElementById("stage-three-prompt-container-2");
        let promptThreeContainer = document.getElementById("stage-three-prompt-container-3");
        
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

        $("#stage-three-cmd-container").animate({
            scrollTop: "250%"
        }, 100);
    }

    const handleNextStage = () => {
        updateStageThree(false);
        updateOutro(true)
    }

    useEffect(() => {
        if (stageThree) {
            $("#stage-three-container").fadeIn(600);
        } else if (stageThree === false) {
            $("#stage-three-container").fadeOut(600);
        }
    }, [stageThree]);

    return (
        <>
            {stageThree && 
                <div id="stage-three-container">
                    {/* <div id="stage-three-cmd-container">
                        <div className="task-bar">
                            <p> C:\\SYSTEM\World+\command_center\stage_three </p>
                        </div>
                        <div className="prompt-container">
                            <p>
                                WORLD+ [{currentDate.toString()}]<br/>
                                (c) 2023 World+. All rights reserved.
                            </p>
                            <div id="stage-three-prompt-container-1" className="attention">
                                {promptIndex === 0 && <p className="stage-one-prompt one">&gt;&gt;&gt; {prompts[promptIndex]}</p>}
                            </div>
                            <div id="stage-three-prompt-container-2" className="at-ease">
                                {promptIndex === 1 && <p className="stage-one-prompt two">&gt;&gt;&gt; {prompts[promptIndex]}</p>}
                            </div>
                            <div id="stage-three-prompt-container-3" className="at-ease">
                                {promptIndex === 2 && <p className="stage-one-prompt three">&gt;&gt;&gt; {prompts[promptIndex]}</p>}    
                            </div>
                            
                            <div id="user-input-area" className="user-input-area">
                                <span>C://User/: </span>
                                <button id="yes-button" onClick={(e) => handleUserInput(e)}> Yes </button>
                                <button id="no-button" onClick={(e) => handleUserInput(e)}> No </button>
                            </div>
                            {showButton ? 
                            <div id="enter-outro-button"> 
                                <ul>
                                    <li> if you cannot see your mouse please press ESC to gain control again. </li>
                                    <li> <button onClick={handleNextStage}> Please click this button when you are ready to proceed to the next stage</button></li>
                                </ul>
                            </div> : null}
                        </div>
                    </div> */}
                    <Writings writings={writings}/>
                    <div id="file-explorer">
                        <div className="task-bar">
                            <p> C:\\SYSTEM\World+\command_center\stage_three\files </p>
                        </div>
                    </div>  
                    <div id="stage-three-canvas">
                        <Canvas frameloop="always" camera={{ fov: 75, near: 1, far: 10000, position: [0, 0, 5] }}>
                            <directionalLight intensity={1} position={[0, 3, 0]} color={0xffcc77} />
                            <pointLight intensity={1} position={[0, 10, -6]} color={0xffcc77}></pointLight>
                            <pointLight intensity={1} position={[0, 10, 6]} color={0xffcc77}></pointLight>
                            
                            <ParticleSystem />
                            <Terrain />
                            {controlsToggle === "orbit" ? <OrbitControls /> : <PointerLockControls selector="#stage-three-canvas"/>}
                        </Canvas>
                    </div>  
                </div>
            }
        </>
    )
}

export default StageThree;