declare module "metarpheus" {
  import { Model, Route } from "metarpheus-io-ts/lib/domain";
  import { MetarpheusOptions } from "../model";

  function run(paths: string[], config?: MetarpheusOptions): { routes: Route[]; models: Model[] };
}
