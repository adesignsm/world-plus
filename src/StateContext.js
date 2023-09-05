import React, { createContext, useState } from 'react';

const StateContext = createContext();

const StateProvider = ({ children }) => {
    const [sphere, setSphere] = useState(true);
    const [intro, setIntro] = useState(false);
    const [stageOne, setStageOne] = useState(false);
    const [stageTwo, setStageTwo] = useState(false);
    const [stageThree, setStageThree] = useState(false);
    const [outro, setOutro] = useState(false);

    const [stageTwoTransition, setStageTwoTransition] = useState(false);
    const [stageThreeTransition, setStageThreeTransition] = useState(false);
    const [userName, setUserName] = useState("");

    /*Stages */
    const updateIntro = (val) => {
        setIntro(val);
    }
    const updateSphere = (val) => {
        setSphere(val);
    }
    const updateStageOne = (val) => {
        setStageOne(val);
    }
    const updateStageTwo = (val) => {
        setStageTwo(val);
    }
    const updateStageThree = (val) => {
        setStageThree(val);
    }
    const updateOutro = (val) => {
        setOutro(val);
    }
    
    /*Transitions */
    const updateStageTwoTransition = (val) => {
        setStageTwoTransition(val);
    }
    const updateStageThreeTransition = (val) => {
        setStageThreeTransition(val);
    }

    const updateUserName = (val) => {
        setUserName(val);
    }

    return (
        <StateContext.Provider value={{ 
            sphere, updateSphere,
            intro, updateIntro,
            stageOne, updateStageOne, 
            stageTwo, updateStageTwo, 
            stageThree, updateStageThree, 
            outro, updateOutro,
            stageTwoTransition, updateStageTwoTransition,
            stageThreeTransition, updateStageThreeTransition,
            userName, updateUserName }}>
            {children}
        </StateContext.Provider>
    );
};

export { StateContext, StateProvider };