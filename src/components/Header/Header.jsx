
import React, { useContext } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

//Contexts
import StateContext from '../../contexts/StateContext';
import DispatchContext from '../../contexts/DispatchContext';

const Header = () => {
    const navigate = useNavigate();
    const GlobalState = useContext(StateContext);
    const GlobalDispatch = useContext(DispatchContext);

    async function handleLogout() {
        const confirmLogout = window.confirm('Are your sure you want to leave?');
        if (confirmLogout)
            try {
                const response = await Axios.post(`http://127.0.0.1:8000/api/v1/dj-rest-auth/logout/`,
                    GlobalState.userToken,
                    {
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
            command: () => { navigate('/') }
        },
        {
            label: 'File Explorer',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archieve',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ],
            command: () => { navigate('/listings') }
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
                command: () => { navigate('/login') }
            }
        , !GlobalState.userIsLoggedIn &&
        {
            label: 'Register',
            icon: 'pi pi-fw pi-user',
            command: () => { navigate('/register') }
        },
        {
            label: 'Help',
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;

    // const end = <InputText placeholder="Search" type="text" />;
    const searchAndLogout = <div>
        <InputText placeholder="Search" type="text" />
        {/* <Button label="Quit" icon="pi pi-fw pi-power-off" className='ml-2' /> */}
    </div>

    return (
        <div>
            <div className="card" style={{ marginBottom: '1rem' }}>
                <Menubar model={items} start={start} end={searchAndLogout} />
            </div>
        </div>
    );
}

export default Header;
