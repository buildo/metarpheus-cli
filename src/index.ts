import { logger, valueOrThrow, getMetarpheusCLIOptions } from "./util";
import write from "./scripts/write";
import diff from "./scripts/diff";
import { Script, MetarpheusConfig } from "./model";

const script = valueOrThrow(Script, process.argv[2]);

function runScript(script: Script): Promise<void> {
  switch (script) {
    case "write":
      return write(getMetarpheusCLIOptions());
    case "diff":
      return diff(getMetarpheusCLIOptions());
  }
}

runScript(script).catch((error) => {
  logger.error(`${script} script error: ${error}`);
  process.exit(1);
});

export { type MetarpheusConfig };
