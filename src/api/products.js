import api from "./api";

function getItemById(id) {
  const query = `
    {
      product(id: "${id}"){
        id
        name
        brand
        description
        gallery
        prices {
            currency {
            label
            symbol
            }
            amount
        }
        attributes {
            id
            type
            name
            items {
            displayValue
            value
            id
            }
        }
        inStock
        category
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

function getAllItems() {
  const query = `
    {
      category {
          name
          products{
          id
          name
          brand
          description
          gallery
          prices {
              currency {
              label
              symbol
              }
              amount
          }
          attributes {
              id
              type
              name
              items {
              displayValue
              value
              id
              }
          }
          inStock
          category
          }
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

export { getAllItems, getItemById };
