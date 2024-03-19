import React, { useState } from 'react';
import './Step2.css';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';

function SelectedDataColumn({categoryData}) {
    return (
        <div id="column2">
            <div id="category-title">
                {categoryData['category_title']}
            </div>
            <div id="category-options">
                {
                    categoryData['category_options'].map((category_option) => {
                        return (
                            <div id="option">
                                {category_option}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

function Medic({medic, setMedic, setMedicLen}) {

    const [category, setCategory] = useState(0);

    const medicData = [
        {
            'id': 0,
            'category_name': "Metrics",
            'category_title': "Project Success Metrics",
            'category_options': [
                "Roi",
                "Success Metrics"
            ],
        },
        {
            'id': 1,
            'category_name': "Economic Buyer",
            'category_title': "Economic Buyer and Budget",
            'category_options': [
                "Economic Buyer",
                "Budget"
            ],
        },
        {
            'id': 2,
            'category_name': "Decision Criteria",
            'category_title': "Decision Criteria",
            'category_options': [
                "Vendor Qualification",
                "General Criteria",
                "Technical Criteria"
            ],
        },
        {
            'id': 3,
            'category_name': "Decision Process",
            'category_title': "Decision Process",
            'category_options': [
                "Contract Term",
                "Relative Time Period",
                "Contract Negotiation",
                "Decision Maker and Influencer",
                "Process and Phases",
                "Timing Criteria"
            ],
        },
        {
            'id': 4,
            'category_name': "Identify Pain",
            'category_title': "Pain Points",
            'category_options': [
                "Pain point"
            ],
        },
        {
            'id': 5,
            'category_name': "Champion",
            'category_title': "Customer Agreement",
            'category_options': [
                "Customer Commitment",
                "Agreement",
                "Agreement and Champion"
            ],
        },
    ];

    return (
        <div id="category-box">
            <div id="column1">
                <div id="header">
                    Category
                    <Switch/>
                </div>
                <div id="categories">
                    {
                        medicData.map((medicCategory) => {
                                if (medicCategory['id'] === category) {
                                    return (
                                        <div id="active-option" onClick={() => setCategory(medicCategory['id'])}>
                                            {medicCategory['category_name']}({medicCategory['category_title']})
                                            {medicCategory['id'] in medic && <div id="enabled_indicator">Enabled</div>}
                                            <Switch onChange={
                                                (checked, event) => {
                                                    if (checked === true) {
                                                        medic[medicCategory['id']] = medicCategory
                                                    } else {
                                                        delete medic[medicCategory['id']]
                                                    }
                                                    console.log(medic);
                                                    setMedic(medic);
                                                    setMedicLen(Object.keys(medic).length)
                                                }
                                            }
                                            tabIndex={medicCategory['id']}
                                            checked={medicCategory['id'] in medic}
                                            />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div id="option" onClick={() => setCategory(medicCategory['id'])}>
                                            {medicCategory['category_name']}({medicCategory['category_title']})
                                            {medicCategory['id'] in medic && <div id="enabled_indicator">Enabled</div>}
                                            <Switch onChange={
                                                (checked, event) => {
                                                    if (checked === true) {
                                                        medic[medicCategory['id']] = medicCategory
                                                    } else {
                                                        delete medic[medicCategory['id']]
                                                    }
                                                    console.log(medic);
                                                    setMedic(medic);
                                                    setMedicLen(Object.keys(medic).length)
                                                }
                                            }
                                            tabIndex={medicCategory['id']}
                                            checked={medicCategory['id'] in medic}
                                            />
                                        </div>
                                    )
                                }
                            }
                        )
                    }
                </div>
            </div>
            <SelectedDataColumn categoryData={medicData[category]}/>
        </div>
    );
}

function Custom({custom, setCustom, setCustomLen}) {

    const [category, setCategory] = useState(0);

    const customData = [
        {
            'id': 0,
            'category_title': "Nationwide",
            'category_options': [
                "Life Long Term Care",
                "Annuity Income",
                "Protection Competitors",
                "Protection",
                "Life Accumulation"
            ],
        },
        {
            'id': 1,
            'category_title': "Nationwide Annuity",
            'category_options': [
                "Income",
                "Annuity Protection",
                "Annuity Protection Competitors",
                "Income Competitors"
            ],
        },
        {
            'id': 2,
            'category_title': "Nationwide Life",
            'category_options': [
                "Life Protection Competitors",
                "Long Term Care Competitors",
                "Accumulation",
                "Life Protection",
                "Long Term Care",
                "Accumulation Competitors"
            ],
        },
        {
            'id': 3,
            'category_title': "Uniphore",
            'category_options': [
                "Custom",
                "Custom Competitors"
            ],
        }
    ];

    return (
        <div id="category-box">
            <div id="column1">
                <div id="header">
                    Category
                    <Switch/>
                </div>
                <div id="categories">
                {
                    customData.map((customCategory) => {
                            if (customCategory['id'] === category) {
                                return (
                                    <div id="active-option" onClick={() => setCategory(customCategory['id'])}>
                                        {customCategory['category_title']}
                                        {customCategory['id'] in custom && <div id="enabled_indicator">Enabled</div>}
                                        <Switch onChange={
                                                (checked, event) => {
                                                    if (checked === true) {
                                                        custom[customCategory['id']] = customCategory
                                                    } else {
                                                        delete custom[customCategory['id']]
                                                    }
                                                    console.log(custom);
                                                    setCustom(custom);
                                                    setCustomLen(Object.keys(custom).length)
                                                }
                                            } 
                                            tabIndex={customCategory['id']}
                                            checked={customCategory['id'] in custom}
                                        />
                                    </div>
                                )
                            } else {
                                return (
                                    <div id="option" onClick={() => setCategory(customCategory['id'])}>
                                        {customCategory['category_title']}
                                        {customCategory['id'] in custom && <div id="enabled_indicator">Enabled</div>}
                                        <Switch onChange={
                                                (checked, event) => {
                                                    if (checked === true) {
                                                        custom[customCategory['id']] = customCategory
                                                    } else {
                                                        delete custom[customCategory['id']]
                                                    }
                                                    console.log(custom);
                                                    setCustom(custom);
                                                    setCustomLen(Object.keys(custom).length)
                                                }
                                            } 
                                            tabIndex={customCategory['id']}
                                            checked={customCategory['id'] in custom}
                                        />
                                    </div>
                                )
                            }
                        }
                    )
                }
                </div>
            </div>
            <SelectedDataColumn categoryData={customData[category]}/>
        </div>
    );
}

export function Step2 ({setPage, medic, custom, setMedic, setCustom}) {
    const[currenttab,setcurrenttab] = useState(1);

    const [medicLen, setMedicLen] = useState(0);
    const [customLen, setCustomLen] = useState(0);

    return (
        <div>
            <div id="step2">
                <h6>At least one selection must be made to continue.</h6>
                <div id='alltabs'>
                    {currenttab===1?
                        <button id='active-tab' onClick={() => setcurrenttab(1)}>
                            MEDDIC  <span id="select_count">{medicLen}</span>
                        </button>:
                        <button id='tab' onClick={() => setcurrenttab(1)}>
                            MEDDIC  <span id="select_count">{medicLen}</span>
                        </button>
                    }
                    {currenttab===2?
                        <button id='active-tab' onClick={() => setcurrenttab(2)}>
                            CUSTOM  <span id="select_count">{customLen}</span>
                        </button>:
                        <button id='tab' onClick={() => setcurrenttab(2)}>
                            CUSTOM  <span id="select_count">{customLen}</span>
                        </button>
                    }
                </div>
                <div id="tab-content">
                    {currenttab===1?<Medic medic={medic} setMedic={setMedic} setMedicLen={setMedicLen}/>:<Custom custom={custom} setCustom={setCustom} setCustomLen={setCustomLen}/>}
                </div>
                <div id="nav-buttons">
                    <button id="my-button-back" onClick={() => setPage(1)}>Back</button>
                    <button id={medicLen+customLen>0?"my-button-continue":"step2-disabled-button"} onClick={medicLen+customLen>0?() => setPage(3): () => {}}>Continue</button>
                </div>
            </div>
        </div>
    );
}