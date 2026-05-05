let mess = "";
let theCount = "";
let theSpace = "";
const Base = Math.pow(10, 11);
const cellSize = Math.floor(Math.log(Base) / Math.LN10);

const makeArray = (n, aX, Integer) => {
  let i;
  for (i = 1; i < n; i++) {
    aX[i] = null;
  }
  aX[0] = Integer;
};

const isEmpty = (aX) => {
  let empty = true;
  for (let i = 0; i < aX.length; i++) {
    if (aX[i]) {
      empty = false;
      break;
    }
  }
  return empty;
};

const Add = (n, aX, aY) => {
  let carry = 0;
  for (let i = n - 1; i >= 0; i--) {
    aX[i] += Number(aY[i]) + Number(carry);
    if (aX[i] < Base) {
      carry = 0;
    } else {
      carry = 1;
      aX[i] = Number(aX[i]) - Number(Base);
    }
  }
};

const Sub = (n, aX, aY) => {
  for (let i = n; i >= 0; i--) {
    aX[i] -= aY[i];
    if (aX[i] < 0) {
      if (i > 0) {
        aX[i] += Base;
        aX[i - 1]--;
      }
    }
  }
};

const Mul = (n, aX, iMul) => {
  let carry = 0;
  for (let i = n - 1; i >= 0; i--) {
    let prod = aX[i] * iMul;
    prod += carry;
    if (prod >= Base) {
      carry = Math.floor(prod / Base);
      prod -= carry * Base;
    } else {
      carry = 0;
    }
    aX[i] = prod;
  }
};

const Div = (n, aX, iDiv, aY) => {
  let carry = 0;
  for (let i = 0; i < n; i++) {
    const temp = Number(aX[i]) + Number(carry * Base);
    const result = Math.floor(temp / iDiv);
    carry = temp - result * iDiv;
    aY[i] = result;
  }
};

const ArcTan = (iAng, n, aX) => {
  const angle = new Array(n);
  const divK = new Array(n);
  const angleSquared = iAng * iAng;

  let k = 3;
  let sign = 0;

  makeArray(n, aX, 0);
  makeArray(n, angle, 1);

  Div(n, angle, iAng, angle);
  Add(n, aX, angle);

  while (!isEmpty(angle)) {
    Div(n, angle, angleSquared, angle);
    Div(n, angle, k, divK);

    if (sign) {
      Add(n, aX, divK);
    } else {
      Sub(n, aX, divK);
    }

    k += 2;
    sign = 1 - sign;
  }
};

function calculatePI(n, addCount, addSpace) {
  if (n <= 5) {
    return {
      result: Math.PI.toFixed(n),
      time: 0
    }
  }

  const t1 = new Date();
  n = Number(n) + 5;

  const iAng = new Array(10);
  const coeff = new Array(10);
  const arrayLength = Math.ceil(1 + n / cellSize);
  const aPi = new Array(arrayLength);
  const aArcTan = new Array(arrayLength);
  const aAngle = new Array(arrayLength);
  const aDivK = new Array(arrayLength);

  coeff[0] = 4;
  coeff[1] = -1;
  coeff[2] = 0;
  iAng[0] = 5;
  iAng[1] = 239;
  iAng[2] = 0;

  makeArray(arrayLength, aPi, 0);
  makeArray(arrayLength, aAngle, 0);
  makeArray(arrayLength, aDivK, 0);

  for (let i = 0; coeff[i] != 0; i++) {
    ArcTan(iAng[i], arrayLength, aArcTan);
    Mul(arrayLength, aArcTan, Math.abs(coeff[i]));
    if (coeff[i] > 0) {
      Add(arrayLength, aPi, aArcTan);
    } else {
      Sub(arrayLength, aPi, aArcTan);
    }
  }

  Mul(arrayLength, aPi, 4);

  let sPi = "";
  let tempPi = "";

  for (let i = 0; i < aPi.length; i++) {
    aPi[i] = String(aPi[i]);
    if (aPi[i].length < cellSize && i != 0) {
      while (aPi[i].length < cellSize) {
        aPi[i] = "0" + aPi[i];
      }
    }
    tempPi += aPi[i];
  }

  for (let i = 0; i < n; i++) {
    if (i == 0) {
      sPi += tempPi.charAt(i) + ".\n";
    } else {
      if (addCount) {
        theCount = " (" + i + ")";
      } else {
        theCount = "";
      }

      if (addSpace) {
        theSpace = " ";
      } else {
        theSpace = "";
      }

      if (i % 50 == 0 && i != 0) {
        sPi += tempPi.charAt(i) + theCount + "\n";
      } else if (i % 5 == 0) {
        sPi += tempPi.charAt(i) + theSpace;
      } else {
        sPi += tempPi.charAt(i);
      }
    }
  }

  const t2 = new Date();
  const timeDiff = (t2.getTime() - t1.getTime()) / 1000;

  sPi = addSpace ? sPi.slice(0, -5) : sPi.slice(0, -4);

  return {
    result: sPi,
    time: `Time: ${timeDiff} seconds`,
  };
}

export default calculatePI;
