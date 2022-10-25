import boris from "./img/boris.jpg";
import "./Index.scss";
import { useState } from 'react';
import RelaxComponent from './Relax/RelaxComponent';
import HeaderLink from "./HeaderLink";
import "../fonts/Poppins-Black.ttf";

enum TabView {
    Home,
    Relax
};

const IndexComponent = () => {
    const [tabView, setTabView] = useState<TabView>(TabView.Home);

    return <div className={`entire-fucking-website-container ${tabView === TabView.Relax && "relax"}`}>
      <div className="navbar">
        <HeaderLink onClick={() => setTabView(TabView.Home)}>Temp Link</HeaderLink>
        <HeaderLink onClick={() => setTabView(TabView.Home)}>Home</HeaderLink>
        <HeaderLink onClick={() => setTabView(TabView.Relax)}>Relax Tool</HeaderLink>
      </div>
      {tabView === TabView.Home &&
        <div className="home-container">
            <p>This is my cat Boris he is very cute and I love him very much</p>
            <img className="boris" src={boris}></img>
        </div>}
      {tabView === TabView.Relax && <RelaxComponent/>}
    </div>
}

export default IndexComponent;