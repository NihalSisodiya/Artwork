import React from "react";
import ArtworkTable from "./components/ArtworkTable";
import {Card} from "primereact/card";
import { Toolbar } from "primereact/toolbar";


const App: React.FC = () => {

  const leftContents= (
    <h2 style={{margin: 0}}>🎨 Artworks Explorer</h2>
  );

  return(
    <div className="app-container">
      <Toolbar left={leftContents}/>
      <div>
        <Card>
          <ArtworkTable/>
        </Card>
      </div>
      
    </div>
  );
};

export default App;
