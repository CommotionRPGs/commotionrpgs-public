import Header from '@/components/basic/Header'
import TodosLogic from '@/components/todo/TodosLogic'
import Collapsible from '@/components/basic/Collapsible';
import { NavLink } from 'react-router-dom';
import styles from '@/styles/routes/Home.module.css'
import { FaBook } from "react-icons/fa"

const Home  = () => {
    const linkItems = [
        {
            path: "/spells",
            title: "Spells",
            icon: <FaBook />,
            description: "All the spells available from first and third party books inside a sortable and filterable table.",
            sublinks: [
                "Abjuration",
                "Transmutation"
            ]
        },
        {
            path: "/bestiary",
            title: "Bestiary",
            icon: <FaBook />,
            description: "All the spells available from first and third party books inside a sortable and filterable table.",
            sublinks: []
        },
        {
            path: "/classes",
            title: "Classes [WIP]",
            icon: <FaBook />,
            description: "All the spells available from first and third party books inside a sortable and filterable table.",
            sublinks: [
                "Artificer",
                "Tamer"
            ]
        }
    ]

    const buildLinkSection = (section) => {
        return (
            <div className={styles.linkSection} >
                <Collapsible 
                    header={<>
                        <div className={styles.header} >
                            {/*Header*/}
                            <div className={styles.icon} >
                                {section.icon ? section.icon : <FaBook />}
                                .
                            </div>
                            <div className={styles.title} >
                                
                                <Header variant={1} >
                                    <h4>
                                        <NavLink to={section.path}>
                                            {section.title}
                                        </NavLink>
                                    </h4>
                                </Header>
                            </div>
                        </div>
                        <div className={styles.description} >
                            {/*Description*/}
                            {section.description}
                        </div>
                    </>}
                    content={
                        <div className={styles.sublinks} >
                            {/*Sublinks*/}
                            {section.sublinks.map(sublink => 
                                <div>
                                    {sublink}
                                </div>
                            )}
                        </div>
                    }
                />
            </div>
        )
    }

    return (
        <div className={`${styles.home} paper page`}>
            <Header>
                <h2>Reference</h2>
            </Header>
            <div className={styles.sublinks} >
                {linkItems.map(item => buildLinkSection(item))}
            </div>
        </div>
        /*<div className='wrapper'>
            <div className='todos'>
                <Header>
                    <h1>todos</h1>
                    <p>Items will persist in the browser local storage</p>
                </Header>
                <TodosLogic />
            </div>
        </div>*/
    );
};
export default Home;