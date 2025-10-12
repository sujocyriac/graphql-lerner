### A Quick Lern on GraphQL with Node.js and Express

This project demonstrates how to set up a simple GraphQL server using Node.js and Express. It includes a basic schema, resolver functions, and an example of how to handle mutations.

#### Examples

---

**Query Example:** with mutation to add a new product and query to fetch all products.

```graphql
mutation {
  addProducts(
    input: {
      name: "Mac Book"
      price: 120000.00
      description: "A Good laptop"
      inStock: true
    }
  )
}
```

This mutation adds a new product and store in the in-memory array.

```graphql
{
  getProduct(id: "30640532-58b8-4518-b139-dbc222266569") {
    name
  }
}
```

This query fetches a product by its ID.
