import { toastr } from "react-redux-toastr";
import axios from "axios";

export function getCurrentCoords(successFunction) {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  navigator.geolocation.getCurrentPosition(
    successFunction,
    (err) => {
      console.error(`ERROR(${err.code}): ${err.message}`);
      if (err.code === 1)
        toastr.warning(
          "Por favor, ative sua permissão de localização",
          "Sem ela, não poderemos fornecer os serviços necessários"
        );
      else {
        toastr.warning(
          "Parece que houve algum problema",
          "Tente novamente mais tarde!"
        );
      }
    },
    options
  );
}

export function formatMoney(amount, format = "pt-BR", currency = "BRL") {
  return new Intl.NumberFormat(format, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

// \u00A0 == &nbsp;
export function noBreakLineSpace(str) {
  return str.split(" ").join("\u00A0");
}

export async function getGovApiData(url) {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch {
    return null;
  }
}
