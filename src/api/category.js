import api from "./api";

function getCategories() {
  const query = `
    {
      categories {
          name
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

export { getCategories };
