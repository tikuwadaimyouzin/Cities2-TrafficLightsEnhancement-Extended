import { useEffect } from "react";

import engine from "cohtml/cohtml";
import { useValue } from "cs2/api";

import { CityConfigurationContext } from "./context";
import { callKeyPress, cityConfiguration as cityConfigurationBinding } from "bindings";

import MainPanel from "./components/main-panel";
import CustomPhaseTool from "./components/custom-phase-tool";
import { MigrationIssuesModal } from "./components/migration-issues";

export default function App() {
  const cityConfigurationJson = useValue(cityConfigurationBinding.binding);
  const cityConfiguration = JSON.parse(cityConfigurationJson);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key == "S") {
        callKeyPress(JSON.stringify({ctrlKey: event.ctrlKey, key: event.key}));
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => document.removeEventListener("keydown", keyDownHandler);
  }, []);

  return (
    <CityConfigurationContext.Provider value={cityConfiguration}>
      <MainPanel />
      <CustomPhaseTool />
      <MigrationIssuesModal />
    </CityConfigurationContext.Provider>
  );
}
