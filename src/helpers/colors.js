const steps = [
  "rgb(255,0,0)",
  "rgb(255,0,255)",
  "rgb(0,0,255)",
  "rgb(0,255,255)",
  "rgb(0,255,0)",
  "rgb(255,255,0)",
  "rgb(255,0,0)",
  "rgb(0,0,0)",
  "rgb(255,255,255)"
];

const rgbToArray = rgb => {
  const cleanRgb = rgb.replace("rgb(", "").replace(")", "");
  return cleanRgb.split(",").map(v => parseInt(v));
};

const arrToRgb = arr => `rgb(${arr.join(",")})`;

export const gradientStepToRBG = value => {
  const calcDiff = (color1, color2) => {
    const diff = Math.round((color1 - color2) * (value - step1));
    return diff < 0 ? color1 + -diff : color1 - diff;
  };

  // where in the steps is our value
  const step1 = Math.floor(value);
  const step2 = Math.ceil(value);

  // arrays from steps
  const arr1 = rgbToArray(steps[step1]);
  const arr2 = rgbToArray(steps[step2]);

  // find the diff
  const r = calcDiff(arr1[0], arr2[0]); // 0 * 0.5
  const g = calcDiff(arr1[1], arr2[1]); // 0 * 0.5
  const b = calcDiff(arr1[2], arr2[2]); // -255 * 0.5

  const newRgb = arrToRgb([r, g, b]);

  console.log(newRgb);

  return newRgb;
};

// blah blah do this better
export const valueToRGB = value => {
  let r, g, b;

  if (value < 1) {
    // 0: rgb(255, 0, 0),
    r = 255;
    g = 0;
    b = Math.round(value * 255);
  } else if (value < 2) {
    // 1: rgb(255, 0, 255),
    r = Math.round((2 - value) * 255);
    g = 0;
    b = 255;
  } else if (value < 3) {
    // 2: rgb(0, 0, 255),
    r = 0;
    g = Math.round((value - 2) * 255);
    b = 255;
  } else if (value < 4) {
    // 3: rgb(0, 255, 255),
    r = 0;
    g = 255;
    b = Math.round((4 - value) * 255);
  } else if (value < 5) {
    // 4: rgb(0, 255, 0),
    r = Math.round((value - 4) * 255);
    g = 255;
    b = 0;
  } else if (value < 6) {
    // 5: rgb(255, 255, 0),
    r = 255;
    g = Math.round((6 - value) * 255);
    b = 0;
  } else if (value < 7) {
    // 6: rgb(255, 0, 0),
    r = Math.round((7 - value) * 255);
    g = 0;
    b = 0;
  } else {
    // 7: rgb(0, 0, 0),
    r = g = b = Math.round((8 - value) * 255);
  }
  // 8: rgb(255, 255, 255)

  console.log(`rgb(${r},${g},${b})`);
  return `rgb(${r},${g},${b})`;
};
