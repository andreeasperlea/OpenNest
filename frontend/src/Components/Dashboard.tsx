import React from 'react';
import Navbar from "./Navbar";
import {RepositoriesList} from "./RepositoriesList";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Navbar/>
        <RepositoriesList/>
    </div>
  );
};

export default Dashboard;
