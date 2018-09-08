const { keys } = Object;
const { parse, stringify } = JSON;

export const transform = async ({ source }) => {
  const json = parse(source);
  const jsonKeys = keys(json);
  const namedExports = jsonKeys.map(key => `
    export const ${key} = ${stringify(json[key], null, 2)};
  `).join('');

  return `
    ${namedExports}
    export default { ${jsonKeys.join(', ')} };
  `;
};
