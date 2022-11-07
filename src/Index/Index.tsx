import boris from "./img/boris.jpg";
import "./Index.scss";
import React, { useState } from 'react';
import RelaxComponent from './Relax/RelaxComponent';
import HeaderLink from "./HeaderLink";
import "../fonts/Poppins-Black.ttf";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import dayjs from "dayjs";
import TokiPonaComponent from "./TokiPona/TokiPonaComponent";

enum TabView {
    TokiPona,
    Home,
    Relax
};

const IndexComponent = () => {
  const [tabView, setTabView] = useState<TabView>(TabView.Home);
  const lastBathDay = dayjs().month(10).date(6).year(2022);

  const getStinkyRating = (days: number) => {
    if( days < 7 ) {
      return "fresh and sparkly";
    } else if( days < 15 ) {
      return "clean boi";
    } else if( days < 30 ) {
      return "lil dusty";
    } else if( days < 45) {
      return "dusty baby";
    } else if( days < 60) {
      return "stinky smelly";
    } else {
      return "he must be bathed soon alhmadullilah";
    }
  }

  return <BrowserRouter>
    <Routes>
      <Route path="*" element={
        <div className={`entire-fucking-website-container ${tabView === TabView.Relax && "relax"}`}>
          <div className="navbar">
            <HeaderLink onClick={() => setTabView(TabView.TokiPona)} path="/toki-pona">Learn Toki Pona</HeaderLink>
            <HeaderLink onClick={() => setTabView(TabView.Home)} path="/">Home</HeaderLink>
            <HeaderLink onClick={() => setTabView(TabView.Relax)} path="/relax">Relax Tool</HeaderLink>
          </div>
          {tabView === TabView.TokiPona && <TokiPonaComponent/>}
          {tabView === TabView.Home &&
            <div className="home-container">
                <p>This is my cat Boris he is very cute and I love him very much</p>
                <img className="boris" src={boris}></img>
                <div className="boris-bath-day-count-wrapper">
                  <span>Days since Boris has had a bath:</span>
                  {/*@ts-ignore*/}
                  <div className="boris-bath-day-count">{dayjs().diff(lastBathDay, "day")}</div>
                  <span>Hygeine Rating: {getStinkyRating(dayjs().diff(lastBathDay, "day"))}</span>
                </div>
            </div>}
          {tabView === TabView.Relax && <RelaxComponent/>}
        </div>
        }/>
    </Routes>
  </BrowserRouter>
}

export default IndexComponent;