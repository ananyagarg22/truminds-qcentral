import React, { useState } from 'react';
import './Step3.css';

function TabContent({content}) {
    console.log("Content is "+content)
    return (
        Object.entries(content).map((topic, topic_id) => {
            let all_subtopics = ""
            return(
                <div id="single_topic_content">
                    <div id="tabcontent_topic">
                        {content[topic_id]["category_title"]}
                    </div>
                    <div id="tabcontent_topic_subtopics">
                        {content[topic_id]["category_options"].forEach(element => {
                            all_subtopics += ","+element
                        })}
                        {all_subtopics.slice(1)}
                    </div>
                </div>
            )
        })
    );
}

export function Step3 ({setPage, medic, custom}) {
    const[currenttab,setcurrenttab] = useState(1);

    const medicCount = Object.keys(medic).length
    const customCount = Object.keys(custom).length

    return (
        <div id="step3">
            <div id="step3_content">
                <div id="step3_topics">
                    <div id="section_heading">Topics ({medicCount+customCount})</div>
                    <div id="section_content">
                        <div id="alltabs">
                            {currenttab===1?
                                <button id='active-tab' onClick={() => setcurrenttab(1)}>
                                    MEDDIC  <span id="select_count">{medicCount}</span>
                                </button>:
                                <button id='tab' onClick={() => setcurrenttab(1)}>
                                    MEDDIC  <span id="select_count">{medicCount}</span>
                                </button>
                            }
                            {currenttab===2?
                                <button id='active-tab' onClick={() => setcurrenttab(2)}>
                                    CUSTOM  <span id="select_count">{customCount}</span>
                                </button>:
                                <button id='tab' onClick={() => setcurrenttab(2)}>
                                    CUSTOM  <span id="select_count">{customCount}</span>
                                </button>
                            }
                        </div>
                        <div id="tab_content">
                        {currenttab===1?
                            <TabContent content={medic}/>:
                            <TabContent content={custom}/>
                        }
                        </div>
                    </div>
                </div>
                <div id="playlist_details">
                    <div id="playlist_name">
                        <label>Playlist Name</label>
                        <input maxLength={50} placeholder='Enter Playlist name ...'></input>
                    </div>
                    <div id="playlist_desc">
                        <label>Description</label>
                        <textarea placeholder='Enter description here'></textarea>
                    </div>
                </div>
            </div>
            <div id="nav-buttons">
                <button id="my-button-back" onClick={() => setPage(2)}>Back</button>
                <button>Save & Publish</button>
                <button>Submit</button>
            </div>
        </div>
    )
}