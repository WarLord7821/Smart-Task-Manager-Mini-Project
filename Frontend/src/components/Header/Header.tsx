import React from 'react';
import { IHeaderProps } from "./IHeaderProps"
import "./Header.css"

const Header: React.FC<IHeaderProps> = React.memo(({ title }) => {
    return (
        <div className="headerContainer">
            <h1>{title}</h1>
        </div>
    )
});

export default Header;
