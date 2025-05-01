import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

export const NoVarRule = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow usage of 'var' ",
    },
    messages: {
      noVar: "Usage of 'var' is not allowed. Use 'const' instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      VariableDeclaration(node: TSESTree.VariableDeclaration) {
        if (node.kind === "var") {
          context.report({
            node,

            messageId: "noVar",
          });
        }
      },
    };
  },
});
