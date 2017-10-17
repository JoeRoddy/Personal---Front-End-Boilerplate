import React from "react";
import { observer } from "mobx-react";

const FunctionalComponent = observer(({ prop1, prop2 }) => (
  <div>Functional as fuck</div>
));

export default FunctionalComponent;