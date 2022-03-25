import React from 'react'
import AboutList from './../../config/team'
import './Team.css'

const Team = () => {
    const NumberOfLead = AboutList.slice(0, 1);
    const NumberOfThank = AboutList.slice(1, 2);
    const ListOfLead = AboutList.slice(2, 2 + NumberOfLead[0]);
    const ListOfTeam = AboutList.slice(2 + NumberOfLead[0], AboutList.length - NumberOfThank[0]);
    const ListOfThanks = AboutList.slice(AboutList.length - NumberOfThank[0], AboutList.length);
    const LeadaboutList = ListOfLead.map((Leadabout, index) => {
        return (
            <div className="AboutCard" key={Leadabout.name}>
                <h3 className="LeadAboutName">{Leadabout.name}</h3>
                <img className="LeadAboutImg" src={`https://minotar.net/armor/body/${Leadabout.id}/100.png`} alt={Leadabout.name} />
                <div className="LeadAboutCmd">
                    <h2 className="Leadreal">{Leadabout.real}</h2>
                    <p>{Leadabout.pos}</p>
                </div>
            </div>
        )
    })

    const aboutList = ListOfTeam.map((about, index) => {
        return (
            <div className="AboutCard" key={about.name}>
                <h3 className="AboutName">{about.name}</h3>
                <img className="AboutImg" src={`https://minotar.net/armor/body/${about.id}/80.png`} alt={about.name} />
                <div className="AboutCmd">
                    <h2 className="real">{about.real}</h2>
                    <p>{about.pos}</p>
                </div>
            </div>
        )
    })

    const ThankaboutList = ListOfThanks.map((about, index) => {
        return (
            <div className="AboutCard" key={about.name}>
                <h3 className="LeadAboutName">{about.name}</h3>
                <img className="LeadAboutImg" src={`https://minotar.net/armor/body/${about.id}/100.png`} alt={about.name} />
                <div className="LeadAboutCmd">
                    <h2 className="Leadreal">{about.real}</h2>
                    <p>{about.pos}</p>
                </div>
            </div>
        )
    })

    return (
        <>
            <h1 className="AboutTitle">About US</h1>
            <h2 className="Teams">Leader</h2>
            <div className="LeadAbout">
                {LeadaboutList}
            </div>
            <h2 className="Teams">Teams</h2>
            <div className="About">
                {aboutList}
            </div>
            <h2 className="Teams">Special thanks</h2>
            <div className="LeadAbout">
                {ThankaboutList}
            </div>
        </>
    )
}

export default Team