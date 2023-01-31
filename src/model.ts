import * as t from "io-ts";

export const Script = t.union([t.literal("write"), t.literal("diff")]);
export type Script = t.TypeOf<typeof Script>;

export const MetarpheusCLIOptions = t.interface({
  metarpheusConfig: t.string,
});
export type MetarpheusCLIOptions = t.TypeOf<typeof MetarpheusCLIOptions>;

const metarpheusConfigProperties = {
  isReadonly: t.boolean,
  runtime: t.boolean,
  apiPaths: t.array(t.string),
  modelOut: t.string,
  apiOut: t.string,
  apiPrelude: t.union([t.string, t.undefined]),
  modelPrelude: t.union([t.string, t.undefined]),
  modelsForciblyInUse: t.array(t.string),
  discardRouteErrorModels: t.boolean,
  useLegacyNewtype: t.boolean,
};

export const PartialMetarpheusConfig = t.partial(metarpheusConfigProperties);
export type PartialMetarpheusConfig = t.TypeOf<typeof PartialMetarpheusConfig>;

export const MetarpheusConfig = t.interface(metarpheusConfigProperties);
export type MetarpheusConfig = t.TypeOf<typeof MetarpheusConfig>;

export type MetarpheusOptions = Pick<
  MetarpheusConfig,
  "modelsForciblyInUse" | "discardRouteErrorModels"
>;
