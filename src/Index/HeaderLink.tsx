import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type HeaderLinkProps = {
    link?: string,
    path?: string,
    onClick?: () => void,
    children?: any
}

const HeaderLink = ({link, path, onClick = () => {}, children}: HeaderLinkProps) => {
    const location = useLocation();

    useEffect(() => {
        if( path && location.pathname === path ) {
            handleOnClick();
        }
    }, []);

    const handleOnClick = () => {
        if( path ) {
            location.pathname = path;
        }
        onClick();
    }

    return <div
                className={`header-link-container ${path && path === location.pathname && "active"}`}
                onClick={handleOnClick}>
        {link ?
        <a href={link}>
            {children}
        </a> :
        <a>
            {children}
        </a>}
    </div>
}

export default HeaderLink;