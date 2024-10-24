// TODO: Add more units and categories
const UNIT_RATIO = [
  {
    title: "Length",
    units: [
      {
        title: "Kilometer",
        value: "km",
        ratio: 1000,
      },
      {
        title: "Meter",
        value: "m",
        ratio: 1,
      },
      {
        title: "Centimeter",
        value: "cm",
        ratio: 0.01,
      },
      {
        title: "Millimeter",
        value: "mm",
        ratio: 0.001,
      },
      {
        title: "Micrometer",
        value: "μm",
        ratio: 0.000001,
      },
      {
        title: "Nanometer",
        value: "nm",
        ratio: 0.000000001,
      },
      {
        title: "Mile",
        value: "mi",
        ratio: 1609.344,
      },
      {
        title: "Yard",
        value: "yd",
        ratio: 0.9144,
      },
      {
        title: "Foot",
        value: "ft",
        ratio: 0.3048,
      },
      {
        title: "Inch",
        value: "in",
        ratio: 0.0254,
      },
    ],
  },
  {
    title: "Temperature", // Must use different conversion formula
    units: [
      {
        title: "Celsius",
        value: "°C",
        ratio: 1,
      },
      {
        title: "Fahrenheit",
        value: "°F",
        ratio: 32,
      },
      {
        title: "Kelvin",
        value: "K",
        ratio: 273.15,
      },
    ],
  },
  {
    title: "Weight",
    units: [
      {
        title: "Kilogram",
        value: "kg",
        ratio: 1,
      },
      {
        title: "Gram",
        value: "g",
        ratio: 0.001,
      },
      {
        title: "Milligram",
        value: "mg",
        ratio: 0.000001,
      },
      {
        title: "Microgram",
        value: "μg",
        ratio: 0.000000001,
      },
      {
        title: "Ton",
        value: "t",
        ratio: 1000,
      },
      {
        title: "Pound",
        value: "lb",
        ratio: 0.45359237,
      },
      {
        title: "Ounce",
        value: "oz",
        ratio: 0.028349523125,
      },
    ],
  },
  {
    title: "Volume",
    units: [
      {
        title: "Cubic Meter",
        value: "m³",
        ratio: 1,
      },
      {
        title: "Liter",
        value: "L",
        ratio: 0.001,
      },
      {
        title: "Milliliter",
        value: "mL",
        ratio: 0.000001,
      },
      {
        title: "Cubic Foot",
        value: "ft³",
        ratio: 0.0283168466,
      },
      {
        title: "Cubic Inch",
        value: "in³",
        ratio: 0.000016387064,
      },
      {
        title: "Gallon",
        value: "gal",
        ratio: 0.00378541,
      },
      {
        title: "Quart",
        value: "qt",
        ratio: 0.000946352946,
      },
      {
        title: "Pint",
        value: "pt",
        ratio: 0.000473176473,
      },
      {
        title: "Cup",
        value: "cup",
        ratio: 0.000236588236,
      },
      {
        title: "Fluid Ounce",
        value: "fl oz",
        ratio: 0.0000295735296,
      },
    ],
  },
  {
    title: "Area",
    units: [
      {
        title: "Square Meter",
        value: "m²",
        ratio: 1,
      },
      {
        title: "Square Kilometer",
        value: "km²",
        ratio: 1000000,
      },
      {
        title: "Square Mile",
        value: "mi²",
        ratio: 2589988.110336,
      },
      {
        title: "Square Yard",
        value: "yd²",
        ratio: 0.83612736,
      },
      {
        title: "Square Foot",
        value: "ft²",
        ratio: 0.09290304,
      },
      {
        title: "Square Inch",
        value: "in²",
        ratio: 0.00064516,
      },
      {
        title: "Hectare",
        value: "ha",
        ratio: 10000,
      },
      {
        title: "Acre",
        value: "acre",
        ratio: 4046.8564224,
      },
    ],
  },
  {
    title: "Time",
    units: [
      {
        title: "Second",
        value: "s",
        ratio: 1,
      },
      {
        title: "Millisecond",
        value: "ms",
        ratio: 0.001,
      },
      {
        title: "Microsecond",
        value: "μs",
        ratio: 0.000001,
      },
      {
        title: "Nanosecond",
        value: "ns",
        ratio: 0.000000001,
      },
      {
        title: "Minute",
        value: "min",
        ratio: 60,
      },
      {
        title: "Hour",
        value: "hr",
        ratio: 3600,
      },
      {
        title: "Day",
        value: "day",
        ratio: 86400,
      },
      {
        title: "Week",
        value: "week",
        ratio: 604800,
      },
      {
        title: "Month",
        value: "month",
        ratio: 2628000,
      },
      {
        title: "Year",
        value: "year",
        ratio: 31536000,
      },
    ],
  },
  {
    title: "Speed",
    units: [
      {
        title: "Meter per Second",
        value: "m/s",
        ratio: 1,
      },
      {
        title: "Kilometer per Hour",
        value: "km/h",
        ratio: 0.277777778,
      },
      {
        title: "Mile per Hour",
        value: "mi/h",
        ratio: 0.44704,
      },
      {
        title: "Knot",
        value: "kn",
        ratio: 0.514444444,
      },
    ],
  },
  {
    title: "Data Storage",
    units: [
      {
        title: "Bit",
        value: "bit",
        ratio: 1,
      },
      {
        title: "Byte",
        value: "B",
        ratio: 8,
      },
      {
        title: "Kilobit",
        value: "Kb",
        ratio: 1024,
      },
      {
        title: "Kilobyte",
        value: "KB",
        ratio: 8192,
      },
      {
        title: "Megabit",
        value: "Mb",
        ratio: 1048576,
      },
      {
        title: "Megabyte",
        value: "MB",
        ratio: 8388608,
      },
      {
        title: "Gigabit",
        value: "Gb",
        ratio: 1073741824,
      },
      {
        title: "Gigabyte",
        value: "GB",
        ratio: 8589934592,
      },
      {
        title: "Terabit",
        value: "Tb",
        ratio: 1099511627776,
      },
      {
        title: "Terabyte",
        value: "TB",
        ratio: 8796093022208,
      },
    ],
  },
  {
    title: "Energy",
    units: [
      {
        title: "Joule",
        value: "J",
        ratio: 1,
      },
      {
        title: "Kilojoule",
        value: "kJ",
        ratio: 1000,
      },
      {
        title: "Calorie",
        value: "cal",
        ratio: 4.184,
      },
      {
        title: "Kilocalorie",
        value: "kcal",
        ratio: 4184,
      },
      {
        title: "Watt-hour",
        value: "Wh",
        ratio: 3600,
      },
      {
        title: "Kilowatt-hour",
        value: "kWh",
        ratio: 3600000,
      },
    ],
  },
  {
    title: "Power",
    units: [
      {
        title: "Watt",
        value: "W",
        ratio: 1,
      },
      {
        title: "Kilowatt",
        value: "kW",
        ratio: 1000,
      },
      {
        title: "Horsepower",
        value: "hp",
        ratio: 745.7,
      },
    ],
  },
  {
    title: "Pressure",
    units: [
      {
        title: "Pascal",
        value: "Pa",
        ratio: 1,
      },
      {
        title: "Kilopascal",
        value: "kPa",
        ratio: 1000,
      },
      {
        title: "Bar",
        value: "bar",
        ratio: 100000,
      },
      {
        title: "Millibar",
        value: "mbar",
        ratio: 100,
      },
      {
        title: "Atmosphere",
        value: "atm",
        ratio: 101325,
      },
      {
        title: "Millimeter of Mercury",
        value: "mmHg",
        ratio: 133.322,
      },
      {
        title: "Pound per Square Inch",
        value: "psi",
        ratio: 6894.76,
      },
    ],
  },
];

export default UNIT_RATIO;
