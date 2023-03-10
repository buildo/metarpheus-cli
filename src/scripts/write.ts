import * as fs from "fs";
import * as path from "path";
import { logger } from "../util";
import { runMetarpheusIoTs } from "./run";
import getMetarpheusConfig from "./config";
import { MetarpheusCLIOptions } from "../model";

function mkDirs(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    fs.mkdir(filePath, (error) => {
      if (error) {
        if (error.code === "ENOENT") {
          return mkDirs(path.dirname(filePath))
            .then(() => mkDirs(filePath))
            .then(resolve)
            .catch(reject);
        } else {
          reject(error);
        }
      }
      resolve();
    });
  });
}

function mkDirsIfNotExist(filePath: string): Promise<void> {
  if (!fs.existsSync(filePath)) {
    return mkDirs(filePath);
  }
  return Promise.resolve();
}

export default async function write(cliOptions: MetarpheusCLIOptions): Promise<void> {
  const metarpheusConfig = getMetarpheusConfig(cliOptions);

  const apiOutDir = path.dirname(metarpheusConfig.apiOut);
  const modelOutDir = path.dirname(metarpheusConfig.modelOut);

  const { model, api } = runMetarpheusIoTs(metarpheusConfig);

  // create dirs if don't exist
  return mkDirsIfNotExist(apiOutDir)
    .then(() => mkDirsIfNotExist(modelOutDir))
    .then(() => {
      // write api in api output file
      logger.metarpheusWrite(`Writing ${metarpheusConfig.apiOut}`);
      fs.writeFileSync(metarpheusConfig.apiOut, api);
      logger.metarpheusWrite("Finished!");

      // write model in model output file
      logger.metarpheusWrite(`Writing ${metarpheusConfig.modelOut}`);
      fs.writeFileSync(metarpheusConfig.modelOut, model);
      logger.metarpheusWrite("Finished!");
    })
    .catch((e) => {
      logger.metarpheusWrite(e);
      throw e;
    });
}
