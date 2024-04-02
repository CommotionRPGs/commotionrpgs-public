import styles from '@/styles/routes/CharClasses.module.css'
import SubclassDescription from '@/components/descriptions/SubclassDescription';
import subclasses from '@/data/subclasses.json'
import { useParams, NavLink, useLocation } from 'react-router-dom'

const Subclass = () => {
    const { subclass } = useParams();

    const subclassData = subclasses.find(data => data.name.replace(/\W+/g, '-').toLowerCase() === subclass)

    return (
        <div className={`${styles.subclass}  paper page`} >
            <SubclassDescription subclassData={subclassData} />
        </div>
    )
}
export default Subclass;