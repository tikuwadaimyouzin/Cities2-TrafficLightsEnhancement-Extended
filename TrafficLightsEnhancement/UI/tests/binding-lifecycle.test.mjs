import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("app reuses the prefixed city configuration binding", async () => {
  const app = await source("src/mods/app.tsx");
  const bindings = await source("src/bindings.ts");

  assert.match(app, /useValue\(cityConfigurationBinding\.binding\)/);
  assert.doesNotMatch(app, /bindValue\(/);
  assert.match(bindings, /cityConfiguration\s*=\s*new OneWayBinding<string>\("GetCityConfiguration"/);
});

test("tool tooltip reuses the prefixed tooltip binding", async () => {
  const tooltip = await source("src/mods/components/tool-tooltip/index.tsx");
  const bindings = await source("src/bindings.ts");

  assert.match(tooltip, /useValue\(toolTooltipMessageBinding\.binding\)/);
  assert.doesNotMatch(tooltip, /bindValue\(/);
  assert.match(bindings, /toolTooltipMessage\s*=\s*new OneWayBinding<ToolTooltipMessage\[\]>\("GetToolTooltipMessage"/);
});
