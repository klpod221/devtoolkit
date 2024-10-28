import axios from "axios";

const getLatestRates = async (base, amount = 1) => {
  try {
    const response = await axios.get(
      `https://api.fxratesapi.com/latest?base=USD&amount=${amount}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

getLatestRates("USD", 1).then((data) => console.log(data));
