export const getUserById = `
    query getProfile($userId: String!) {
        getUserById(userId: $userId) {
        _id
        name
        email
        pic
        dob
        address 
        city
        country
        about
        phone
    }
  }
`;
export const getCart = `query($userId:String!){
  getCart(userId:$userId)
  {
    Cart {
      _id: 
      userId
      totalamount
      items
    }
  }
}`;
export const getCategories = `
   query {
        categories{
            _id
            value
            label
        }
    }
`;
export const getShopName = `query($shopName:String!){
  getShopName(shopName:$shopName)
    {
        result
    }
}`;

export const getShopDetailsbyUserId = `
    query getShopDetailsbyUserId($userId: String!) {
      getShopDetailsbyUserId(userId: $userId) {
         _id
        shopname
        userId
        shopimage
    }
  }
`;

export const getShopDetails = `
    query getShopDetails($shopId: String!) {
      getShopDetails(shopId: $shopId) {
         _id
        shopname
        userId
        shopimage
    }
  }
`;

export const getOrderedItems = `
    query getOrderedItems($userId: String!) {
      getOrderedItems(userId: $userId) {
         Order {
         {
          _id
          userId
          purchaseDate
          items
        }                                                                                                                                          
    }
    }
  }
`;

export const getItemListbyShopID = `
    query getItemListbyShopID($shopId: shopId!) {
      getItemListbyShopID(shopId: $shopId) {
         {
          _id
          itemName
          price:
          quantity
          category
          description
          itemImage
          totalsales
        } 
    }
  }
`;

export const getItemListForDashboard = `
   query {
        items{
            _id
            itemName
            price:
            quantity
            category
            description
            itemImage
            totalsales
        }
    }
`;

