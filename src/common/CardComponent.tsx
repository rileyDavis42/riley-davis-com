import "./Card.scss";

type CardComponentProps = {
    children?: any;
}

const CardComponent = ({children}: CardComponentProps) => {
    return <div className="card-container">
        {children}
    </div>
}

export default CardComponent;