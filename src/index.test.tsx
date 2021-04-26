import React from "react";
import { shallow } from "enzyme";

import App from "../example/src/containers/App"

describe('Render APP in Example Folder', () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
})
