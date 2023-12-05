import { useAuthStore } from "@/context/authStore";
import styles from '@/styles/Profile.module.css';
import Header from "@/components/Header";
import { addRef, getRefs } from "@/api/authApi";
import { useState, useEffect } from "react";
import TableLogic from "@/components/table/TableLogic";
import { capitalize } from "@/utils/utils";
import BetterModal from "@/components/BetterModal"
import Select from 'react-select'


const Profile = () => {
    const logout = useAuthStore((state) => state.logout)
    const user = useAuthStore((state) => state.user)
    const [ refCodes, setRefCodes ] = useState([])
    const [ openModal, setOpenModal ] = useState(false)

    const accountOptions=[
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

    const getCodes = async () => {
        const refCodes = await getRefs(user.access_token);
        //console.log(refCodes)
        setRefCodes(refCodes)
    }

    useEffect(() => {
        getCodes()
    }, [])

    return (
        <div>
            <Header>
                <h1>Profile page</h1>
            </Header>
            <div className={styles.profile}>
                <h2>Hello, {user.name}</h2>
                <button onClick={() => setOpenModal(true)} >Create code</button>
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
                {/*<ul>
                    {refCodes.map(code => <li key={`code_${code.referral_code}`}>{`${code.reusable ? 'Reusable' : 'One-time'} ${code.account_type} code: ${code.referral_code}`}</li>)}    
                </ul>*/}
                <TableLogic
                    data={refCodes}
                    columns={[
                        { label: "Account Type", accessor: "account_type", sortable: true},
                        { label: "Code", accessor: "referral_code", sortable: false },
                        { label: "Reusable", accessor: "reusable", sortable: false }
                    ]}
                    callbacks={{
                        display: {
                            account_type: ((data) => {
                                switch(data.account_type) {
                                    case 'admin':
                                        return 'Admin'
                                    case 'dm':
                                        return 'DM'
                                    case 'player':
                                        return 'Player'
                                }
                            }),
                            reusable: ((data) => capitalize(data.reusable.toString()))
                        }
                    }}
                />
            </div>
            
        </div>
    )
};
export default Profile;