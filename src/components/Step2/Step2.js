import React, { useState } from 'react';
import './Step2.css';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';

function Meddic() {
    return (
        <div id="meddic">
            <div id="category">
                <div id="header">
                    Category
                    <Switch/>
                </div>
                <div id="option">
                    Metrics(Project Success Metrics)
                    <Switch />
                </div>
                <div id="option">
                    Economic Buyer(Economic Buyer And Budget)
                    <Switch />
                </div>
                <div id="option">
                    Decision Criteria(Decision Criteria)
                    <Switch />
                </div>
                <div id="option">
                    Decision Process(Decision Process)
                    <Switch />
                </div>
                <div id="option">
                    Champion(Customer Agreement)
                    <Switch />
                </div>
            </div>
            <div id="project-success-matrix">
                <div id="header">
                    Category
                </div>
                <div id="option">
                    Metrics(Project Success Metrics)
                </div>
                <div id="option">
                    Economic Buyer(Economic Buyer And Budget)
                </div>
                <div id="option">
                    Decision Criteria(Decision Criteria)
                </div>
                <div id="option">
                    Decision Process(Decision Process)
                </div>
                <div id="option">
                    Champion(Customer Agreement)
                </div>
            </div>
        </div>
    );
}

function Custom() {

}

export function Step2 ({setPage}) {
    const[currenttab,setcurrenttab] = useState(1);

    return (
        <div>
            <div id="step2">
                <h6>At least one selection must be made to continue.</h6>
                <div id='alltabs'>
                    {currenttab===1?
                        <button id='active-tab' onClick={() => setcurrenttab(1)}>
                            MEDDIC
                        </button>:
                        <button id='tab' onClick={() => setcurrenttab(1)}>
                            MEDDIC
                        </button>
                    }
                    {currenttab===2?
                        <button id='active-tab' onClick={() => setcurrenttab(2)}>
                            CUSTOM
                        </button>:
                        <button id='tab' onClick={() => setcurrenttab(2)}>
                            CUSTOM
                        </button>
                    }
                </div>
                <div id="tab-content">
                    {currenttab===1?<Meddic/>:<Custom/>}
                </div>
                <div id="nav-buttons">
                    <button id="my-button"onClick={() => setPage(1)}>Back</button>
                    <button id="my-buton"onClick={() => setPage(3)}>Continue</button>
                </div>
            </div>
        </div>
    );
}