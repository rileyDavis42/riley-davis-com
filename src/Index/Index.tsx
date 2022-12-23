import * as BorisPics from "./BorisPics";
import * as FooPics from "./FooPics";
import "./Index.scss";
import React, { useState } from 'react';
import RelaxComponent from './Relax/RelaxComponent';
import HeaderLink from "./HeaderLink";
import "../fonts/Poppins-Black.ttf";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TokiPonaComponent from "./TokiPona/TokiPonaComponent";

enum TabView {
    TokiPona,
    Home,
    Relax
};

const IndexComponent = () => {
  const [tabView, setTabView] = useState<TabView>(TabView.Home);
  const [borisPicIndex, setBorisPicIndex] = useState<number>(Math.floor(Math.random() * 4));
  const [fooPicIndex, setFooPicIndex] = useState<number>(Math.floor(Math.random() * 7));

  return <BrowserRouter>
    <Routes>
      <Route path="*" element={
        <div className={`entire-fucking-website-container
            ${tabView === TabView.Relax && "relax"}`}>
          <div className="navbar">
            <HeaderLink onClick={() => setTabView(TabView.TokiPona)} path="/toki-pona">Learn Toki Pona</HeaderLink>
            <HeaderLink onClick={() => setTabView(TabView.Home)} path="/">Home</HeaderLink>
            <HeaderLink onClick={() => setTabView(TabView.Relax)} path="/relax">Relax Tool</HeaderLink>
          </div>
          {tabView === TabView.TokiPona && <TokiPonaComponent/>}
          {tabView === TabView.Home &&
            <div className="home-container">
                <p>This is my cat Boris he is very cute and I love him very much</p>
                <div className="boris-container">
                  <div className="boris"
                    style={{backgroundImage: `url("${Object.values(BorisPics)[borisPicIndex]}"`}}
                    onClick={() => setBorisPicIndex(borisPicIndex === 4 ? 0 : borisPicIndex + 1)}></div>
                </div>
                <p>This is my cat Foo she is very cute and I love her very much</p>
                <div className="foo-container">
                  <div className="foo"
                    style={{backgroundImage: `url("${Object.values(FooPics)[fooPicIndex]}"`}}
                    onClick={() => setFooPicIndex(fooPicIndex === 7 ? 0 : fooPicIndex + 1)}></div>
                </div>
            </div>}
          {tabView === TabView.Relax && <RelaxComponent/>}
        </div>
        }/>
    </Routes>
  </BrowserRouter>
}

export default IndexComponent;