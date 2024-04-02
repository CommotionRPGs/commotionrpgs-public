import { numSuffix } from '@/utils/utils'
import Header from '@/components/basic/Header'
import styles from '@/styles/routes/CharClasses.module.css'
import StaticTable from '@/components/basic/StaticTable'

const SubclassDescription = ({ subclassData }) => {
    //const subclassData = subclasses[0]

    const buildContentSection = (section) => {
        if (typeof section === 'string' || section instanceof String)
            return <div> {section} </div>
        switch(section.type) {
            case 'table': 
                return <StaticTable
                    data={section.content}
                    title={
                        <Header>
                            <h6>
                                {section.title}    
                            </h6>
                        </Header>
                        
                    } 
                />
            case 'list':
                return <ul className={styles.descSection} >
                    {section.content.map(subsection => <li>{buildContentSection(subsection)}</li>)}
                </ul>
            case 'titledB':
                return <div>
                    <b><i>{`${section.title}. `}</i></b>
                    {section.content}
                </div>
            case 'titled3':
                return <div>
                    <Header>
                        <h4>
                            {section.title}
                        </h4>
                    </Header>
                    {section.content}
                </div>
            case 'titledExcerpt':
                return <Excerpt>
                    <Header>
                        <h5>
                            {section.title}
                        </h5>
                    </Header>
                    <div className={styles.descSection}>
                        {section.content.map(subsection => buildContentSection(subsection))}
                    </div>
                </Excerpt>
            case 'equation':
                return <i className={styles.equation}>
                    {section.content}
                </i>
            default: 
                return <div>
                    {section.content}
                </div>
        }
    }

    const buildFeatureEntry = (title, level, description) => {
        return (
            <>
                <Header>
                    <h3>
                        {title}
                    </h3>
                </Header>
                <i>
                    {`${level}-level ${subclassData.class} feature`}
                </i>
                <div className={styles.descSection} >
                    {description.map((section) => {
                        return buildContentSection(section)
                    })}
                </div>
            </>
        )
    }

    const buildFeaturesPerLevel = (featuresThisLevel, features, level) => {
        return featuresThisLevel.map((featureName) => {
            if (featureName === 'Ability Score Improvement')
                return <></>
            const feature = features[featureName]
            return <>
                {feature.levels[0] === level &&
                    buildFeatureEntry(
                        feature.name ? feature.name : featureName,
                        numSuffix(level),
                        features[featureName].description
                        //features[featureName]? features[featureName].description : ''
                    )
                }
                {feature.levels[0] === level && featureName === 'Subclass' &&
                    subclassData.map((subclass) => 
                        <div className={`${styles.subclassSelector} ${selectedSubclass.name === subclass.name ? styles.selected : ''}`} onClick={() => setSelectedSubclass(subclass)} >
                            <div className={styles.name}>
                                <NavLink to={subclass.name.replace(/\W+/g, '-').toLowerCase()}>
                                    <Header variant={1}>
                                        <h3>
                                            {subclass.name}
                                        </h3>
                                    </Header>    
                                </NavLink>
                            </div>
                        </div>
                    )
                }
            </>
        })
    }
    
    return (
        <>
            <Header>
                <h2>
                    {subclassData.name}
                </h2>
            </Header>
            {subclassData.description}
            {[...Array(7).keys()].map(level => {
                return buildFeaturesPerLevel(subclassData.features_by_level[level+1] ? subclassData.features_by_level[level+1].features : [], subclassData.features, level+1)
            })
            //for subclassData
            }
        </>
    )
}
export default SubclassDescription;