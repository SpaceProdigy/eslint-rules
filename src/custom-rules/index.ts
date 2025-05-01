import { NameCase } from "./function-name-case-rule";
import { NoConsoleLogRule } from "./no-console-log-rule";
import { NoLetRule } from "./no-let-rule";
import { NoVarRule } from "./no-var-rule";

export const rules = {
  "no-let": NoLetRule,
  "no-var": NoVarRule,
  "no-console-log": NoConsoleLogRule,
  "name-case": NameCase,
};
