import * as fs from "fs";
import * as path from "path";
import { MetarpheusCLIOptions, MetarpheusConfig, PartialMetarpheusConfig } from "../model";
import { valueOrThrow } from "../util";

const defaultConfig: MetarpheusConfig = {
  isReadonly: false,
  runtime: true,
  modelsForciblyInUse: [],
  discardRouteErrorModels: false,
  useLegacyNewtype: false,
  modelPrelude: undefined,
  apiPrelude: undefined,
  apiPaths: [path.resolve(process.cwd(), "../api/src/main/scala")],
  modelOut: path.resolve(process.cwd(), "src/metarpheus/model.ts"),
  apiOut: path.resolve(process.cwd(), "src/metarpheus/api.ts"),
};

export default function (options: MetarpheusCLIOptions): MetarpheusConfig {
  const userMetarpheusConfigPath = path.resolve(process.cwd(), options.metarpheusConfig);

  if (fs.existsSync(userMetarpheusConfigPath)) {
    const userMetarpheusConfig = valueOrThrow(
      PartialMetarpheusConfig,
      require(userMetarpheusConfigPath)
    );

    return {
      ...defaultConfig,
      ...userMetarpheusConfig,
    };
  }

  return defaultConfig;
}
