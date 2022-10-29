import boris from "./img/boris.jpg";
import "./Index.scss";
import React, { useState } from 'react';
import RelaxComponent from './Relax/RelaxComponent';
import HeaderLink from "./HeaderLink";
import "../fonts/Poppins-Black.ttf";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

enum TabView {
    Home,
    Relax
};

const IndexComponent = () => {
  const [tabView, setTabView] = useState<TabView>(TabView.Home);

  return <BrowserRouter>
    <Routes>
      <Route path="*" element={
        <div className={`entire-fucking-website-container ${tabView === TabView.Relax && "relax"}`}>
          <div className="navbar">
            <HeaderLink onClick={() => setTabView(TabView.Home)}>Temp Link</HeaderLink>
            <HeaderLink onClick={() => setTabView(TabView.Home)} path="/">Home</HeaderLink>
            <HeaderLink onClick={() => setTabView(TabView.Relax)} path="/relax">Relax Tool</HeaderLink>
          </div>
          {tabView === TabView.Home &&
            <div className="home-container">
                <p>This is my cat Boris he is very cute and I love him very much</p>
                <img className="boris" src={boris}></img>
            </div>}
          {tabView === TabView.Relax && <RelaxComponent/>}
        </div>
        }/>
    </Routes>
  </BrowserRouter>
}

export default IndexComponent;