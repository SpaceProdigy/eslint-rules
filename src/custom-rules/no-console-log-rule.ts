import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

export const NoConsoleLogRule = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow usage of 'console.log' ",
    },
    messages: {
      noConcole: "Usage of 'console.log' is not allowed",
    },
    fixable: "code",
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.type === "Identifier" &&
          node.callee.object.name === "console" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "log"
        ) {
          context.report({
            node,

            messageId: "noConcole",
            fix(fixer) {
              return fixer.remove(node);
            },
          });
        }
      },
    };
  },
});
