import axios from "axios";
import { toastr } from "react-redux-toastr";

export async function doGet(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch {
    toastr.error(`Erro ao tentar requisitar a página ${url} (GET)`);
    return null;
  }
}
