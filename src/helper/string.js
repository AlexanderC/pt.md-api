module.exports.mask = (str, len = 4, char = '*', repeat = 3) => {
  str = str || '';

  if (str.length <= len) {
    return `${ str.substr(0, 1) }${ char.repeat(repeat) }`;
  }

  return `${ str.substr(0, len) }${ char.repeat(repeat) }`;
};
