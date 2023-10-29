import axios from "axios";

const url = "http://source.medsoft.ge:8002/EHR/Histology/Get?RecordID=";
import { token } from "../../services";
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const fetchHistologyData = async (recordID) => {
  try {
    const response = await axios.get(`${url}${recordID}`, config);
    return response.data.responseResult.data;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
