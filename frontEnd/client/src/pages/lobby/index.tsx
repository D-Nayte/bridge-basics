import React from "react";
import Lobby from "@components/Lobby";
const Index = (props: any) => {
  return (
    <div>
      <Lobby {...props} />
      <Lobby {...props} />
      <Lobby {...props} />
      <Lobby {...props} />
    </div>
  );
};

export default Index;
