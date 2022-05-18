const { ApolloServer, gql, UserInputError } = require("apollo-server");
const users = require("./models/User");
const items = require("./models/item");
const orders = require("./models/Order");
const shops = require("./models/shop");
const category = require("./models/Category");
const Cart = require("./models/Cart");

export const resolvers = {
  Query: {
    products: async () => {
      return items;
    },
    getUserById: async (parent, { userId }, context) => {
      const user = await users.findOne({
        _id: userId,
      });
      return user;
    },
    getShopName: async (parent, { shopName }, context) => {
      const shop = await shops.findOne({
        shopName: shopName,
      });
      if (shop !== null) {
        return UserInputError("User already exists");
      } else {
        const result = {
          result: "Shopname available",
        };
        // console.log("data", returnUser);
        return result;
      }
    },
    getShopDetailsbyUserId: async (parent, { ownerId }, context) => {
      const shop = await shops.findOne({
        ownerId: ownerId,
      });
      return shop;
    },
    getShopDetails: async (parent, { ownerId }, context) => {
      const shop = await shops.findOne({
        ownerId: ownerId,
      });
      return shop;
    },
    getOrderedItems: async (parent, { userId }, context) => {
      const order = await orders.find({
        customerId: userId,
      });
      return order;
    },
    getProductByProductId: async (parent, { productId }, context) => {
      const product = await items.findOne({
        _id: productId,
      });
      return product;
    },
    categories: async () => {
      const categories = await category.findOne({});
      return categories;
    },
    getItem: async (parent, { itemId }, context) => {
      const item = await items.findOne({
        itemId: itemId,
      });
      return item;
    },
  },
  Mutation: {
    register: async (parent, { email, name, password }, context) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const response = await users.findOne({
        email: email,
      });
      if (response === null) {
        console.log("here");
        var newUser = new users({
          name: name,
          email: email,
          password: hashedPassword,
        });
        const user = await newUser.save();
        console.log(user);
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email,
          dob: user.dob,
          gender: user.gender,
          country: user.country,
          address: user.address,
          city: user.city,
          state: user.state,
          about: user.about,
          userImage: user.userImage,
          phone: user.phone,
        };
        console.log(payload);
        console.log("user created", response);
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        console.log("jwt", token);
        const returnUser = {
          token: "JWT " + token,
        };
        // console.log("data", returnUser);
        return returnUser;
      } else {
        UserInputError("User already exists");
      }
    },
    loginUser: async (parent, { email, password }, context) => {
      console.log("here");
      let inputPassword = password;
      const response = await users.findOne({
        email: email,
      });
      const result = await bcrypt.compare(password, response.password);
      if (result) {
        const payload = {
          _id: response._id,
          name: response.name,
          email: response.email,
          shopname: response.shopname,
          dob: response.dob,
          country: response.country,
          address: response.address,
          city: response.city,
          about: response.about,
          pic: response.pic,
          phone: response.phone,
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        const returnUser = {
          token: "JWT " + token,
        };
        console.log(returnUser);
        return returnUser;
      }
    },
    addItem: async (
      parent,
      { itemName, price, quantity, category, description, itemImage },
      context
    ) => {
      console.log("here");
      var newItem = new items({
        itemName: itemName,
        price: price,
        quantity: quantity,
        category: category,
        description: description,
        itemImage: itemImage,
      });
      try{
        const item = await newItem.save();
        return item;
      }
      catch (err) {
        console.log(err)
      }
    },
    updateItem: async (
      parent,
      { name, price, instock, category, description, image, shopname },
      context
    ) => {
      console.log("here");
      var updateItem = new items({
        name: name,
        price: price,
        instock: instock,
        category: category,
        description: description,
        image: image,
        shopname: shopname,
      });

      const product = await updateItem.save();
      const status = {
        token: "Product Updated",
      };
      return product;
    },
    updateProfile: async (
      parent,
      { name, email, phone, dob, userImage, gender, zip,address,city,state,country },
      context
    ) => {
      console.log("here");
      // var updateItem = new items({
      //   name: name,
      //   email: email,
      //   phone: phone,
      //   dob: dob,
      //   userImage: userImage,
      //   gender: gender,
      //   zip: zip,
      //   address: address,
      //   city: city,
      //   state: state,
      //   country: country
      // });
      User.findByIdAndUpdate( userId, { phone: phone,firstName:firstName,country:country,zip:zip,state:state,address:address,dob:dob,userImage:userImage,city:city,email:email,gender:gender,userName:userName },
        function (err, result) {
            if (err) {
                console.log(err)
                res.status = 500;
                callback(null, 'error');
            }
            else {
                console.log("Updated Shop : ", result);
                userData = {
                    isUserUpdated: true,
                };
                res.status = 200;
                res.data = JSON.stringify(userData);
                callback(null, res)
            }
        });
      return isUserUpdated;
    },
    updateQunatity: async (
      parent,
      { userId, quantity, itemId },
      context
    ) => {
      console.log("here");
     
    var existingItems;
    var response;
    var existingCart = await Cart.findOne({ userId: userId })
    if (existingCart) {
        console.log("inside if")
        existingItems = existingCart.items;
        console.log("existing", existingItems)
        var items;
        if (existingItems.find(x => x.itemId == itemId)) {
            objIndex = existingItems.findIndex((obj => obj.itemId == itemId));
            existingItems[objIndex].quantity = parseInt(quantity);
            items = existingItems;
        }

        console.log("Updated items", items)
        var totalamount = 0;
        items.forEach(i => {
            totalamount += (i.price * i.quantity)
        });
        Cart.findByIdAndUpdate(existingCart._id, { items: items,totalamount:totalamount }, (err, result) => {
            if (err) {
                console.log("error", err)
                callback(null, 'error');
            }
            else {
                data = {
                    cartId: result._id,
                    items: result.items
                }
                response = JSON.stringify(data);
                //console.log(result)
                //res.status = 200;
                callback(null, res)
            }
        })
    }
      return response;
    },
  },
};