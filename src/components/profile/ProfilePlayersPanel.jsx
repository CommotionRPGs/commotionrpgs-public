import styles from "@/styles/Profile.module.css"
import { useAuthStore } from "@/context/authStore";
import BetterModal from "@/components/BetterModal";
import TableLogic from "@/components/table/TableLogic";
import { useState, useEffect } from "react";
import Select from 'react-select'
import { addRef, getRefs, deleteRef } from "@/api/authApi";
import { capitalize } from "@/utils/utils";
import { FaTrash } from "react-icons/fa";

const ProfilePlayersPanel = () => {
    const user = useAuthStore((state) => state.user)
    const [ refCodes, setRefCodes ] = useState([])
    const [ openModal, setOpenModal ] = useState(false)
    const [ openConfirmModel, setOpenConfirmModel ] = useState(false)

    const accountOptions = [
        { value: 'admin', label: 'Admin'},
        { value: 'dm', label: 'DM'},
        { value: 'player', label: 'Player'}
    ]

    const createCode = async (accountType, reusable) => {
        const newRefCode = await addRef(user.access_token, { account_type: accountType, reusable: reusable})
        setRefCodes([ ...refCodes, newRefCode ])
    }

    const handleAddCodeSubmit = (e) => {
        e.preventDefault();
        //console.log(`Create a ${e.currentTarget.elements.account_type.value} account that ${e.currentTarget.elements.reusable.checked ? "is" : "isn't"} reusable`)
        setOpenModal(false)
        createCode(
            e.currentTarget.elements.account_type.value,
            e.currentTarget.elements.reusable.checked
        )
    }

    const handleDeleteCode = (referral_code) => {
        setOpenConfirmModel(false)
        deleteRef(user.access_token, referral_code)
        setRefCodes(refCodes.filter((r) => r.referral_code != referral_code))
    }

    const getCodes = async () => {
        const refCodes = await getRefs(user.access_token);
        //console.log(refCodes)
        setRefCodes(refCodes)
    }

    useEffect(() => {
        getCodes()
    }, [])

    return (
        <>
            <div className={styles.section} >
                <div className={styles.title} >
                    Referral Codes
                </div>
                <div className={styles.line} />
                <div>
                    <div onClick={() => setOpenModal(true)}>Open Modal</div>
                </div>
                {/*<div className={styles.line} />*/}
                <TableLogic
                    data={refCodes}
                    columns={[
                        { label: "Account Type", accessor: "account_type", sortable: true},
                        { label: "Code", accessor: "referral_code", sortable: false },
                        { label: "Reusable", accessor: "reusable", sortable: false },
                        { label: "", accessor: "buttons", sortable: false}
                    ]}
                    options={{
                        columns: {
                            buttons: {
                                minimize: true
                            }
                        },
                        display: {
                            account_type: ((data) => 
                                <div style={data.active ? {} : { color: 'grey' }} >
                                    {{
                                        'admin': 'Admin',
                                        'dm': 'DM',
                                        'player': 'Player'
                                    }[data.account_type]}
                                </div>
                            ),
                            referral_code: ((data) => 
                                <div style={data.active ? {} : { color: 'grey' }} >
                                    {data.referral_code}
                                </div>
                            ),
                            reusable: ((data) => 
                                <div style={data.active ? {} : { color: 'grey' }} >
                                    {capitalize(data.reusable.toString())}
                                </div>
                            ),
                            buttons: ((data) => <FaTrash onClick={() => setOpenConfirmModel(data.referral_code)}/>)
                        }
                    }}
                />
            </div>
            <div>
                {/*<h2>Hello, {user.name}</h2>
                <button onClick={() => setOpenModal(true)} >Add code</button>*/}
                <BetterModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                >
                    <form onSubmit={handleAddCodeSubmit}>
                        <label><h4>Account Type:</h4></label>
                        <Select
                            /*unstyled*/
                            name="account_type"
                            options={accountOptions}
                            //styles={dropdownStyles}
                            placeholder={"Choose an account type"}
                            className='basic-multi-select'
                            classNamePrefix='select'
                            //value={sourceOptions.filter((option) => option.value === monsterData.source)}
                            //onChange={(option) => handleSelectChange('source', option.value)}
                        />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '0px 10px'
                            }}
                        >
                            <label>Reusable?</label>
                            <input
                                name='reusable'
                                type='checkbox'
                                //checked={spellData.ritual}
                                //onChange={handleChange}
                            >
                            </input>    
                    </div>
                        <button>Add</button>
                    </form>
                </BetterModal>
                <BetterModal
                    openModal={openConfirmModel}
                    setOpenModal={setOpenConfirmModel}
                >
                    {`Are you sure you want to delete referral code ${openConfirmModel}?`}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <button onClick={() => handleDeleteCode(openConfirmModel)}>Confirm</button>
                        <button onClick={() => setOpenConfirmModel(false)}>Cancel</button>
                    </div>
                </BetterModal>
            </div>
        </>
    )
}
export default ProfilePlayersPanel;