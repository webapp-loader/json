const { isArray } = Array;
const { keys } = Object;
const { parse, stringify } = JSON;

const uniqueMap = [];

const normalized = key => {
  let str = key.split(/[^a-zA-Z0-9]/g)
    .filter(Boolean)
    .map(str => str[0].toUpperCase() + str.slice(1).toLowerCase())
    .join('');

  const numChar = Number(str[0]);
  let prefix = '';
  const identifier = str[0].toLowerCase() + str.slice(1);

  if (typeof numChar === 'number' && !isNaN(numChar) || uniqueMap.includes(identifier)) {
    const count = uniqueMap.filter(x => x === identifier).length;
    prefix = Array(count + 2).join('_');
  }

  uniqueMap.push(identifier);

  return prefix + identifier;
};

export const transform = async ({ source }) => {
  const json = parse(source);
  const jsonKeys = keys(json);
  const jsonArray = isArray(json);

  const namedExports = !jsonArray && jsonKeys.map(key => `
    export const ${normalized(key)} = ${stringify(json[key], null, 2)};
  `).join('');

  return `
    ${jsonArray ? '' : namedExports}

    export default ${jsonArray
      ? stringify(json, null, 2)
      : `{ ${jsonKeys.join(', ')} }`};
  `;
};
