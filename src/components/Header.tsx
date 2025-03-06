import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./DarkModeToggle";

type Props = {};

const Header = (props: Props) => {
  return (
    <div>
      <Button>Click Me</Button>
      <ModeToggle />
    </div>
  );
};

export default Header;
