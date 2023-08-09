import React from "react";
import { StateProvider } from './StateContext';
import "./root.css";

import Background from "./Components/Background";

import Intro from "./Components/Intro";
import StageOne from "./Components/StageOne";

const App = () => {
    return (
        <>
            <main id="page">
                <StateProvider>
                    <Background />
                    <Intro />
                    <StageOne />
                </StateProvider>
            </main>
        </>
    )
}

export default App;