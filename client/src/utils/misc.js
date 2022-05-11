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
    },
    options
  );
}
