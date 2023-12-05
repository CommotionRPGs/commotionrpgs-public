import { useParams, NavLink, useLocation } from 'react-router-dom'
//import tableData1 from "@/data/spells.json"
import { useSpellStore } from '@/context/spellStore';
import { AiOutlineLeft } from 'react-icons/ai'
import SpellDescription from '@/components/descriptions/SpellDescription';

const aboutData = [
    {
        slug: 'about-app',
        title: 'About the app',
        description:
            "This application lets us add to-dos, edit, and delete items. Log in to see the delete feature. It also persists to-dos in the browser's local storage for a subsequent visit.",
    },
    {
        slug: 'about-developer',
        title: 'About the developer',
        description:
            'Ibas Majid founded ibaslogic.com to experiment with new web features and write actionable guides. Follow Ibas on Twitter @ibaslogic to learn modern web development.',
    },
];

const SinglePage = () => {
    const spells = useSpellStore((state) => state.spells)
    const { slug, spell } = useParams();
    let location = useLocation()
    console.log(location.state.spellData)
    const spellData = location.state.spellData;


    const setContent = () => {
        if (slug) {
            const aboutContent = aboutData.find((item) => item.slug === slug)
            return aboutContent
        } else {
            console.log("spell", spell)
            const content = spells.find((item) => item["name"].toLowerCase().replace(/\s/g, '-') === spell)
            console.log(content)
            return {
                title: content["name"],
                description: content.description[0]['text']
            }
        }
    }
    
    const { title, description } = setContent()

    return (
        <div className="main_content" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            {spell && (
                <div>
                    <AiOutlineLeft
                        style={{
                            fontSize: '20px',
                            verticalAlign: 'bottom'
                        }}
                    />
                    <NavLink to="/spells">Spells</NavLink>
                </div>
            )}
            {spellData
                ? <SpellDescription spellData={spellData}/>
                : <div>
                    <h2>{title}</h2>
                    <p>{description}</p>    
                </div>
            }
        </div>
    );
};
export default SinglePage;