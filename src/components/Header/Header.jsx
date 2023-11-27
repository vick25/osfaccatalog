import React, { useContext, useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from "react-router-dom";
import apiClient from '../../utils/http-common';

//Contexts
import StateContext from '../../contexts/StateContext';
import DispatchContext from '../../contexts/DispatchContext';

const Header = () => {
    const navigate = useNavigate();
    const GlobalState = useContext(StateContext);
    const GlobalDispatch = useContext(DispatchContext);

    const [search, setSearch] = useState('');
    const [active, setActive] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search)
                console.log(search)
        }, 400);

        return () => clearTimeout(delayDebounceFn)
    }, [search]);


    async function handleLogout() {
        if (window.confirm('Are your sure you want to leave?')) {
            try {
                const response = await apiClient.post(`dj-rest-auth/logout/`,
                    GlobalState.userToken, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${GlobalState.userToken}`
                    }
                });
                GlobalDispatch({ type: 'USER_LOGOUT' });
                navigate('/');
                console.log('logout', response);
            } catch (e) {
                console.log('logout', e.response)
            }
        }
    };

    const handleFilter = (e) => {
        setActive(e.target.outerText);
    };

    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-file',
            // items: [
            //     {
            //         label: 'New',
            //         icon: 'pi pi-fw pi-plus',
            //         items: [
            //             {
            //                 label: 'Bookmark',
            //                 icon: 'pi pi-fw pi-bookmark'
            //             },
            //             {
            //                 label: 'Video',
            //                 icon: 'pi pi-fw pi-video'
            //             },

            //         ]
            //     },
            //     {
            //         label: 'Delete',
            //         icon: 'pi pi-fw pi-trash'
            //     },
            //     {
            //         separator: true
            //     },
            //     {
            //         label: 'Export',
            //         icon: 'pi pi-fw pi-external-link'
            //     }
            // ],
            command: () => { navigate('/') },
            className: `${active === 'Dashboard' ? 'green-600' : ''}`,
            style: { background: `#000 !important` }
        },
        {
            label: 'File Explorer',
            icon: 'pi pi-fw pi-calendar',
            // items: [
            //     {
            //         label: 'Edit',
            //         icon: 'pi pi-fw pi-pencil',
            //         items: [
            //             {
            //                 label: 'Save',
            //                 icon: 'pi pi-fw pi-calendar-plus'
            //             },
            //             {
            //                 label: 'Delete',
            //                 icon: 'pi pi-fw pi-calendar-minus'
            //             }
            //         ]
            //     },
            //     {
            //         label: 'Archieve',
            //         icon: 'pi pi-fw pi-calendar-times',
            //         items: [
            //             {
            //                 label: 'Remove',
            //                 icon: 'pi pi-fw pi-calendar-minus'
            //             }
            //         ]
            //     }
            // ],
            command: () => { navigate('/fileexplorer') },
            className: `${active === 'File Explorer' ? 'green-600' : ''}`
        },
        GlobalState.userIsLoggedIn ? {
            label: `${GlobalState.userUsername}`,
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-fw pi-plus',
                },
                {
                    separator: true
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-fw pi-power-off',
                    command: () => { handleLogout() }
                }
            ]
        }
            : {
                label: 'Login',
                icon: 'pi pi-fw pi-pencil',
                command: () => { navigate('/login') },
                className: `${active === 'Login' ? 'green-600' : ''}`
            },
        // , !GlobalState.userIsLoggedIn &&
        {
            label: 'Register',
            icon: 'pi pi-fw pi-user',
            command: () => { navigate('/register') },
            className: `${active === 'Register' ? 'green-600' : ''}
            ${!GlobalState.userIsLoggedIn ? '' : 'd-none'}`
        },
        {
            label: 'Help',
            icon: 'pi pi-fw pi-power-off',
            className: `${active === 'Help' ? 'green-600' : ''}`
        }
    ];

    // console.log(GlobalState.userIsLoggedIn);

    const start = <img alt="osfac logo" src="./assets/images/osfac_tp.png" loading='lazy' onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;

    // const end = <InputText placeholder="Search" type="text" />;
    const searchAndLogout = <div>
        <InputText placeholder="Search" type="text"
            onChange={e => setSearch(e.target.value)}
        />
        {/* <Button label="Quit" icon="pi pi-fw pi-power-off" className='ml-2' /> */}
    </div>

    return (
        <header>
            <div className="card" style={{ marginBottom: '1rem' }}>
                <Menubar model={items} start={start} end={searchAndLogout} onClick={e => handleFilter(e)} />
            </div>
        </header>
    );
}

export default Header;
