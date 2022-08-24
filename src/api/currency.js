import api from "./api";

export default function getCurrency() {
  const query = `
    {
      currencies{
        label
        symbol
      }
    }
  `;

  return api
    .post("/", {
      query,
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.warn(err);
    });
}
