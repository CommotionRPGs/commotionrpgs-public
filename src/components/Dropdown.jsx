import { VscTriangleUp } from 'react-icons/vsc'

const Dropdown = ({ children, style }) => {
    return(
        <div
            className='tooltip'
            style={{
                padding: '2rem 0.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                alignItems: 'center',
                zIndex: 100,
                width: 'fit-content',
                ...style
            }}
        >
            {/*<VscTriangleUp 
                style={{
                    color: 'lightgrey',
                }}
            />*/}
            <div
                style={{
                    backgroundColor: 'white',
                    marginTop: '-5px',
                    borderRadius: '5px',
                    padding: '3px',
                    display: 'inline-block',
                    width: '10.5rem',
                    marginTop: '1/2rem',
                    boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
                }}
            >
                {children}
            </div>
        </div>
    )
}
export default Dropdown;