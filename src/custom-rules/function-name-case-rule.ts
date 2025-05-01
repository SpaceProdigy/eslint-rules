import { ESLintUtils } from "@typescript-eslint/utils";

// Это union-тип: может быть только одно из двух сообщений
type MessageIds = "lowercase" | "uppercase";

// Опции — кортеж с одним объектом. Пользователь может указать preferredCase.
type Options = [
  {
    preferredCase?: "lower" | "upper";
  }
];

// Создаём правило без ссылки на документацию (можно использовать RuleCreator(...) если нужен URL)
export const NameCase = ESLintUtils.RuleCreator.withoutDocs<
  Options,
  MessageIds
>({
  meta: {
    type: "suggestion", // Это предложение, а не ошибка (не ломающая правило)
    docs: {
      description: "Function names should start with a specific case.", // Описание в документации ESLint
    },
    messages: {
      lowercase: "Function name should start with a lowercase letter.",
      uppercase: "Function name should start with an uppercase letter.",
      // Эти сообщения будут отображаться при срабатывании правила
    },
    schema: [
      {
        type: "object",
        properties: {
          preferredCase: {
            type: "string",
            enum: ["lower", "upper"], // Пользователь может выбрать только одно из этих значений
          },
        },
        additionalProperties: false, // Не разрешаем другие свойства
      },
    ],
  },

  defaultOptions: [
    {
      preferredCase: "lower",
    },
  ],
  /**
   * Здесь мы получаем context — это объект с утилитами для линтинга.
   * options — это массив, мы деструктурируем его сразу в [options]
   * и получаем объект вида { preferredCase: 'lower' | 'upper' }
   */
  create(context, [options]) {
    return {
      FunctionDeclaration(node) {
        if (!node.id) return; // У анонимной функции может не быть имени

        const firstLetter = node.id.name[0]; // Берём первую букву имени функции
        const shouldBeUpper = options.preferredCase === "upper"; // Сравниваем настройку

        if (shouldBeUpper && firstLetter !== firstLetter.toUpperCase()) {
          context.report({
            node: node.id,
            messageId: "uppercase",
          });
        }

        if (!shouldBeUpper && firstLetter !== firstLetter.toLowerCase()) {
          context.report({
            node: node.id,
            messageId: "lowercase",
          });
        }
      },
    };
  },
});
