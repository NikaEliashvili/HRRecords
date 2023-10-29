// fetchHistoryRecords async function.

import axios from "axios";

const url = "http://source.medsoft.ge:8002/EHR/ListGet?HistoryID=27652";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI1MTg0IiwiUGVyc29uYWxJRCI6IjI5MTIiLCJVc2VyTmFtZSI6IuGDoeGDkOGDouGDlOGDoeGDouGDnSDhg5vhg53hg5vhg67hg5vhg5Dhg6Dhg5Thg5Hhg5Thg5rhg5giLCJQZXJzb25hbE5hbWUiOiLhg5nhg5Dhg57hg5Dhg5zhg5Dhg6vhg5Qg4YOX4YOd4YOg4YOc4YOY4YOZ4YOUIiwiZXhwIjoxNjk4NjI2OTQ4LCJpc3MiOiJ3d3cubWVkc29mdC5nZSIsImF1ZCI6Ik1FRFNPRlQgQ0xJTklDIn0.ftN6vFJluX2kI1weeNRIpVDfYHBbCpYx4-LfJAye3f8";

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export async function fetchHistoryRecords() {
  try {
    const response = await axios.get(url, config);
    return response.data.responseResult.data;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
}
