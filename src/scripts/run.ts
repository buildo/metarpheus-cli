import { getRoutes, getModels } from "metarpheus-io-ts";
import { logger } from "../util";
import { run } from "metarpheus";
import { MetarpheusConfig, MetarpheusOptions } from "../model";
import { Model, Route } from "metarpheus-io-ts/lib/domain";

function runMetarpheus(
  apiPaths: string[],
  options: MetarpheusOptions
): { routes: Route[]; models: Model[] } {
  return run(apiPaths, options);
}

export function runMetarpheusIoTs(metarpheusConfig: MetarpheusConfig) {
  const intermRep = runMetarpheus(metarpheusConfig.apiPaths, {
    modelsForciblyInUse: metarpheusConfig.modelsForciblyInUse,
    discardRouteErrorModels: metarpheusConfig.discardRouteErrorModels,
  });

  logger.metarpheusWrite("Starting metarpheus-io-ts");
  const model = getModels(
    intermRep.models,
    {
      runtime: metarpheusConfig.runtime,
      useLegacyNewtype: metarpheusConfig.useLegacyNewtype,
    },
    metarpheusConfig.modelPrelude
  );

  const api = getRoutes(intermRep.routes, intermRep.models, metarpheusConfig.apiPrelude);

  logger.metarpheusWrite("Finished metarpheus-io-ts");
  return { model, api };
}
