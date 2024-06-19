import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: false,
  entries: ["src/index.ts"],
  failOnWarn: false,
});
