const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    name: String!
    country: String!
    phone: String!
    state: String!
    shopname: String!
    dob: String!
    address: String!
    city: String!
    gender: String!
    userImage: String!
    zip: String
    favouriteIds: [String]
  }

  type Shop {
    _id: ID!
    userId: String!
    shopName: String!
    shopAddress: String!
    shopEmail: String!
    shopDescription: String!
    shopImage: String!
  }

  type Item {
    _id: ID!
    itemName: String!
    description: String!
    quantity: String!
    price: Float!
    itemImage: String!
    category: String!
    shopId: String!
    totalsales: Int!
    shopName: String!
  }
  type orderItem {
    itemId: String!
    itemName: String!
    itemImage:String!
    shopName:String!
    giftDesc:String
    quantity:String
    id:ID!
    price:INT!
  }
  type Order {
    _id: ID!
    userId: String!
    purchaseDate:String
    items:[orderItem]
  }
  type Cart {
    _id: ID!
    userId: String!
    totalamount:Int
    items:[orderItem]
  }
  type Category {
    _id: ID!
    categoryName: String!
  }

  type Query {
    getUserById(userId: String): User
    getCart(userId: String): [Cart]
    getCategories : [Category]
    getItem(itemId: String): Item
    getShopName(shopname: String): Shop
    getItemListbyShopID(shopId: String): [Item]
    getItemListForDashboard: [Item]
    getOrderedItems(userId: String): [Item]
    getProfile(userId: String): User
    getShopDetails(shopId: String): Shop
    getShopDetailsbyUserId(userId: String): Shop
  }
  type Mutation {
    register(email: String!, name: String!, password: String!): User
    loginUser(email: String!, password: String!): User
    updateProfile(
      name: String
      email: String
      phone: String
      dob: String
      userImage: String
      gender: String
      zip: String
      address: String
      city: String
      state: String
      country: String
    ): User
    createShop(shopName: String, email: String): Shop
    addItem(itemName: String, price: Float,quantity: String,category: String,description :String, itemImage: String, shopname:String) : Item
    updateItam(itemName: String, price: Float,quantity: String,category: String,description :String, itemImage: String, shopname:String) : Item
    updateQunatity(userId: String,quantity:String,itemId:String) : [Item]
    updateShop(shopName: String,shopImage:String) : Shop
    checkOut(userId: String,cartId:String) : Cart
    addToCart(userId:String, item:[Item]): Cart
  }
`;

module.exports = typeDefs;