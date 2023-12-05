import styles from '@/styles/Modal.module.css'
import { GrClose } from 'react-icons/gr'

const BetterModal = ( { children, openModal, setOpenModal } ) => {
    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return (
        openModal && (<div
            className={styles.modal_background}
        >
            <dialog
                id="modal"
                className={styles.modal_container}
                open={openModal}
            >
                <div className={styles.header}>
                    <button
                        onClick={handleCloseModal}
                    >
                        <GrClose />
                    </button>    
                </div>
                
                <div className={styles.content}>
                    {children}
                </div>
            </dialog>    
            <div></div>
        </div>)
    )
}
export default BetterModal;