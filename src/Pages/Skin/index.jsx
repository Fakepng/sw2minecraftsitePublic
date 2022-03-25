import React from 'react'
import SkinList from './../../config/skin'
import ClipboardJS from "clipboard";
import { AiOutlineCopy } from "react-icons/ai";
import './Skin.css'

const Skin = () => {
    const skinList = SkinList.map(skin => {
        new ClipboardJS(".button");
        return (
            <div className="SkinCard" key={skin.id}>
                <h3 className="SkinName">{skin.name}</h3>
                <img className="SkinImg" src={`/images/skin/render/${skin.img}`} alt={skin.name} />
                <div className="SkinCmdDiv">
                    <p className="SkinCmd">{`/skin ${document.location.origin}/images/skin/${skin.img}`}</p>
                    <button
                        className="button"
                        data-clipboard-action="copy"
                        data-clipboard-text={skin.cmd}
                    >
                        <AiOutlineCopy className="copybutton" />
                    </button>
                </div>
            </div>
        )
    })


    return (
        <>
            <h1 className="SkinTitle">Skin</h1>
            <div className="Skin">
                {skinList}
            </div>

        </>
    )
}

export default Skin