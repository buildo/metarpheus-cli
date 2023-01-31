import debug from "debug";
import minimist from "minimist";
import * as t from "io-ts";
import { ThrowReporter } from "io-ts/lib/ThrowReporter";
import { MetarpheusCLIOptions } from "./model";

debug.enable("metarpheus:*");

export const logger = {
  error: debug("metarpheus:error"),
  metarpheusWrite: debug("metarpheus:write"),
  metarpheusDiff: debug("metarpheus:diff"),
};

export function valueOrThrow<O, I>(iotsType: t.Type<O, I>, value: I): O {
  const validatedValue = iotsType.decode(value);

  if (validatedValue.isLeft()) {
    ThrowReporter.report(validatedValue);
    return undefined as never;
  } else {
    return validatedValue.value;
  }
}

const getParsedArgs = () => {
  return minimist(process.argv.slice(3));
};

export const getMetarpheusCLIOptions = (): MetarpheusCLIOptions => {
  const args: unknown = {
    ...getParsedArgs(),
  };
  return valueOrThrow(MetarpheusCLIOptions, args);
};
