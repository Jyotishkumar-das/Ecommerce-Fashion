import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

    return (
        <aside className="sidebar">

            <div className="sidebar-title">
                ADMIN PANEL
            </div>

            <NavLink
                to="/add"
                className="sidebar-link"
            >
                <span>＋</span>
                Add Product
            </NavLink>

            <NavLink
                to="/list"
                className="sidebar-link"
            >
                <span>☷</span>
                Product List
            </NavLink>

            <NavLink
                to="/orders"
                className="sidebar-link"
            >
                <span>▣</span>
                Orders
            </NavLink>

        </aside>
    );
};

export default Sidebar;