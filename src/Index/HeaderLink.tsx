type HeaderLinkProps = {
    link?: string,
    onClick?: () => void,
    children?: any
}

const HeaderLink = ({link, onClick, children}: HeaderLinkProps) => {
    return <div className="header-link-container" onClick={onClick}>
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