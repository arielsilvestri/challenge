var faker = require('faker');

module.exports = () => {
  const colors = Array.from(Array(5).keys()).map((key) => {
    return {
      id: key + 1,
      name: faker.commerce.color(),
    };
  });

  const users = Array.from(Array(100).keys()).map((key) => {
    return {
      id: key + 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    };
  });

  const products = Array.from(Array(1000).keys()).map((key) => {
    return {
      id: key + 1,
      name: faker.commerce.productName(),
      created_at: faker.datatype.datetime(),
      summary: faker.commerce.productDescription(),
      color: colors[Math.floor(Math.random() * colors.length)].name,
      active: faker.datatype.boolean(),
      created_by_id: users[Math.floor(Math.random() * users.length)].id,
    };
  });

  return { products, users, colors };
};
