import { toastr } from "react-redux-toastr";

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

export const formatMoney = (amount, format = "pt-BR", currency = "BRL") =>
  new Intl.NumberFormat(format, {
    style: "currency",
    currency: currency,
  }).format(amount);

// \u00A0 == &nbsp;
export const noBreakLineSpace = (str) => str.split(" ").join("\u00A0");

export function createNewArrayFromArrayOfObject(list, key, value) {
  const newArray = [];
  list.forEach((element) => {
    if (element[key] === value) newArray.push(element);
  });

  return newArray;
}

export function divideArray(arr, elementsPerIndex = 6) {
  const copy = [...arr]; // tem que fazer isso pq o splice altera o array

  return new Array(Math.ceil(copy.length / elementsPerIndex))
    .fill()
    .map(() => copy.splice(0, elementsPerIndex));
}
