
const SpellDescription = ({ spellData }) => {

    const formatSchoolLevel = () => {
        switch(spellData.level) {
            case 0: 
                return (<span>{spellData.school} Cantrip</span>)
            case 1:
                return (<span>1st-level {spellData.school}</span>)
            case 2:
                return (<span>2nd-level {spellData.school}</span>)
            case 3:
                return (<span>3rd-level {spellData.school}</span>)
            default:
                return (<span>{spellData.level}th-level {spellData.school}</span>)
        }
    }

    return (
        <div>
            <div className="name-or-title">
                <h3>
                    {spellData.name}
                </h3>
                <br />
            </div>
            <div className="source">
                {spellData.source}
            </div>
            <div className="school-and-level">
                <p>
                    <em>
                        {formatSchoolLevel()} {spellData.ritual && '(ritual)'}
                    </em>
                </p>
            </div>
            <p>
                <strong>Casting Time: </strong>
                {spellData.casting_time}
                <br />
                <strong>Range: </strong>
                {spellData.range}
                <br />
                <strong>Components: </strong>
                {spellData.components.join(", ")}
                <br />
                <strong>Duration: </strong>
                {spellData.duration}
                <br /> 
            </p>
            <div className="description">
                {spellData.description.map((p, i) => {
                    switch(p.title) {
                        case 'list':
                            return (
                                <ul>
                                    {p.content.map((item) => {
                                        return (
                                            <li>
                                                {item.title !== 'untitled' && <strong>{p.title}</strong>}
                                                {p.content}
                                            </li>
                                        )
                                    })}
                                </ul>
                            )
                        case 'untitled':
                            return (
                                <p key={`description_section_${i}`}>
                                    {p.content}
                                </p>
                            )
                        default:
                            return (
                                <p key={`description_section_${i}`}>
                                    <strong>{p.title}</strong>
                                    {p.content}
                                </p>
                            )
                    }
                })}
            </div>    
            <div className="classes">
                <p>
                    <strong>Spell Lists: </strong>
                    {spellData.classes.join(", ")}
                    <br />
                </p>
            </div>
        </div>
    )
};
export default SpellDescription;