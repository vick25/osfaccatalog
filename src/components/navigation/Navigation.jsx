import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <aside className="sidebar">
      <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          Manage
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink exact to="/manageproject" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="th-large">Add project</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/thematics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Thematics</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/categories" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="sticky-note">Categories</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/institutions" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Institutions</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/executants" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users" iconType="solid">
                Executants
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </aside>
  );
};

export default Navigation;