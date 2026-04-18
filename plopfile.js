export default function (plop) {
    plop.setGenerator("component", {
        description: "Generate a TSX component with styles",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Component name?",
            },
        ],
        actions: [
            {
                type: "add",
                path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
                templateFile: "plop-templates/Component.tsx.hbs",
            },
            {
                type: "add",
                path: "src/components/{{pascalCase name}}/{{pascalCase name}}.styles.tsx",
                templateFile: "plop-templates/styles.tsx.hbs",
            },
        ],
    });
}
