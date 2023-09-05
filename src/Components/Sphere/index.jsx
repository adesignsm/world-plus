import React, { useEffect, useContext, useRef } from "react";
import $ from "jquery";
import { StateContext } from "../../StateContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { SphereGeometry, Vector3 } from "three";
import "./index.css";

const SphereText = ({ radius, segments, rings }) => {
    const { intro, updateIntro } = useContext(StateContext);
    const sphereRef = useRef();

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const adjustedRadius = isMobile ? radius * 0.7 : radius;

    useFrame(() => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y += 0.0005;
        }
    });

    const words = [
        "World-building is the process of constructing a world, initially as imaginary fictional universes in virtual realities, the term is gradually employed in physical spaces of multidisciplinary and transmedia spheres (Wikipedia, 2023). As living beings we are constantly situated in multiple paradigms of complexities (Boni, 2017), navigating through stability, changes, shattering and re-generating, as such, world-building is perhaps a tool of mechanism to navigate through such process by challenging, disrupting and reconstructing. For this experience, we wish to present you world-building as a process-driven response, and the intention is not to foreground outcome-based productivity, but to normalise process-guided, long-term, slow-build responses to instigate and cultivate ongoing changes, to be a part of the changes.",
        "Infinite games are everlasting games that are played for the purpose of preventing the games to come to an end (Carse, 2011). Infinite games are internally defined outside of regular ‘norms’ in daily life (Carse, 2011) -  such infrastructure eradicates boundaries, challenges the human urges to define and confine, and invites the portals to open up and welcome different energies to enter",
        "World + is the marriage of world-building and infinite game, contextualised in street dance battles as a choose your own adventure experience. Not only do we wonder what’s the space that torn apart socially constructed normality in the macroscope of how humans operate in daily life, but also in the microscope of context-specific congregation, eg: gatherings of the street dance communities. Dissecting the essence of street dance battles - the people, the relationships, the cultures, the energies and the significance of it all, is there a space that sustains the essence but in a different way? A way that rises beyond hierarchies, toxic relationalities whilst still honour the roots of the cultures? We don’t have the answers yet, and perhaps we are a long way from the answers. But this experience wishes to remind ourselves that it’s not about ‘having’, but ‘being’. World + is one way of being with and not enforcing upon. Although ‘being’ requires unparalleled courage, strength, resilience, patience and perseverance, every single ounce of it is worth it, penetrating our holistic bodies and makes us feel so alive. It is beyond us.",
        "IF YOU ARE READY TO BUCKLE UP PLEASE CLICK THIS TO ENTER WORLD+"
    ];

    const handleTextClick = (e) => {
        if (e.target.innerText.indexOf("PLEASE CLICK THIS TO ENTER WORLD+") > -1) {
            $("#sphere-canvas").animate({
                scale: "0"
            }, 800);

            updateIntro(true);
        }
    }

    const textElements = words.map((word, index) => {
        const angle = (index / words.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
    
        return (
          <Html key={index} position={new Vector3(x, 1, z)}>
            <div className="text-element" onMouseDown={(e) => handleTextClick(e)}>{word}</div>
          </Html>
        );
    });

    return (
        <group ref={sphereRef}>
            <mesh position={[0, 0, 0]} geometry={new SphereGeometry(adjustedRadius, segments, rings)}>
                <meshBasicMaterial color="#fff" wireframe={true}/>
            </mesh>
            {textElements}
        </group>
    )
}

const Sphere = () => {
    return (
        <div id="sphere-canvas">
            <Canvas>
                <ambientLight />
                <SphereText radius={3} segments={30} rings={32} />
                <OrbitControls />
            </Canvas>
        </div>
    )
}

export default Sphere;
