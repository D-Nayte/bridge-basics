import React from "react";
import Lobby from "@clientComponents/Lobby";
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
