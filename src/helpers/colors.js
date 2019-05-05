export const gradientRangeAdapter = gradientSteps => {
  const rgbToArray = rgb =>
    rgb
      .replace(/[^\d,]/g, "")
      .split(",")
      .map(v => parseInt(v));

  const arrayToRgb = array => `rgb(${array.join(",")})`;

  // given an array of rgb colors and a value representing a point in the gradient
  // return the RGB value
  const valueToRgb = value => {
    const calculateMidpoint = ([startPoint, endPoint]) =>
      Math.round(startPoint - (startPoint - endPoint) * interval);

    const startIndex = Math.floor(value);
    const endIndex = Math.ceil(value);
    const interval = value - startIndex;

    const startArr = rgbToArray(gradientSteps[startIndex]);
    const endArr = rgbToArray(gradientSteps[endIndex]);

    const midArr = startArr
      .map((startPoint, index) => [startPoint, endArr[index]])
      .map(calculateMidpoint);

    const newRgb = arrayToRgb(midArr);

    return newRgb;
  };

  return {
    valueToRgb
  };
};
