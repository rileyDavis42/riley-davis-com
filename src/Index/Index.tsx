import boris from "./img/boris.jpg";
import "./Index.scss";

const IndexComponent = () => {
    return <div className="index-content">
        <p>This is my cat Boris he is very cute and I love him very much</p>
        <img className="boris" src={boris}></img>
    </div>
}

export default IndexComponent;