import React, { useState, useContext, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TextureLoader, DoubleSide } from "three";
import { StateContext } from "../../StateContext";
import $ from "jquery";
import "./index.css";

import TRANSITION_IMAGE from "../../Assets/Stage3_elements/Stage3_transition/transition_image.svg";

const TerrainModel = () => {
    const texture = new TextureLoader().load(TRANSITION_IMAGE);
    const terrainRef = useRef();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const adjustedZ = isMobile ? -10 : -5;

    useFrame(() => {
        if (terrainRef.current) {
          terrainRef.current.rotation.y += 0.02;
        }
    });

    return (
        <>
            <mesh position={[0, 0, adjustedZ]} ref={terrainRef}>
                <planeGeometry args={[15, 10]} />
                <meshBasicMaterial map={texture} side={DoubleSide} transparent={true} opacity={1}/>
            </mesh>
        </>
    )
}

const StageThreeTransition = () => {
    const { stageThree, updateStageThree } = useContext(StateContext);
    const { stageThreeTransition, updateStageThreeTransition } = useContext(StateContext);

    useEffect(() => {
        if (stageThreeTransition) {
            $("#stage-three-transition-container").fadeIn(600);

            setTimeout(() => {
                updateStageThreeTransition(false);
                updateStageThree(true);
            }, 5000);
        } else if (!stageThreeTransition) {
            $("#stage-twhreetransition-container").fadeOut(600);
        }
    }, [stageThreeTransition, stageThree]);

    return (
        <>
           {stageThreeTransition &&
                <div id="stage-three-transition-container">
                   <div id="stage-three-transition-canvas">
                        <Canvas frameloop="always" camera={{ fov: 75, near: 1, far: 10000, position: [0, 0, 5] }}>
                            <TerrainModel />
                        </Canvas>
                   </div>
                </div>
            }  
        </>
    )
}

export default StageThreeTransition;