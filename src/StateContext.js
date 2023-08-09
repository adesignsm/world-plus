import React, { createContext, useState } from 'react';

const StateContext = createContext();

const StateProvider = ({ children }) => {
    const [stageOne, setStageOne] = useState(false);
    const [stageTwo, setStageTwo] = useState(false);
    const [stageThree, setStageThree] = useState(false);
    const [userName, setUserName] = useState("");

    const updateStageOne = (val) => {
        setStageOne(val);
    }

    const updateStageTwo = (val) => {
        setStageTwo(val);
    }

    const updateStageThree = (val) => {
        setStageThree(val);
    }

    const updateUserName = (val) => {
        setUserName(val);
    }

    return (
        <StateContext.Provider value={{ stageOne, updateStageOne, stageTwo, updateStageTwo, stageThree, updateStageThree, userName, updateUserName }}>
            {children}
        </StateContext.Provider>
    );
};

export { StateContext, StateProvider };