import React from "react";
import $ from "jquery";
import { StateProvider } from './StateContext';
import "./root.css";

import Background from "./Components/Background";
import Navigation from "./Components/Navigation";

import Sphere from "./Components/Sphere";
import Intro from "./Components/Intro";
import StageOne from "./Components/StageOne";
import StageTwoTransition from "./Components/StageTwoTransition";
import StageTwo from "./Components/StageTwo";
import StageThreeTransition from "./Components/StageThreeTransition";
import StageThree from "./Components/StageThree";
import Outro from "./Components/Outro";

const App = () => {
    const handleOpenNavigation= () => {
        $("#navigation-container").animate({
            scale: "1"
        }, 400);
    }

    return (
        <>
            <main id="page">
                <div className="menu-button" onClick={handleOpenNavigation}>
                    <h3> World Map </h3>
                </div>
                <Navigation />
                <StateProvider>
                    <Background />
                    <Sphere />
                    <Intro />
                    <StageOne />
                    <StageTwoTransition />
                    <StageTwo />
                    <StageThreeTransition />
                    <StageThree />
                    <Outro />
                </StateProvider>
            </main>
        </>
    )
}

export default App;