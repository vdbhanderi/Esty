var connection =  new require("./kafka/connection");
const {DASHBOARd_TOPIC,ADDFAVOURITE_TOPIC,UPDATEITEM_TOPIC,ADDITEM_TOPIC,ADDTOCART_TOPIC,CHECKOUT_TOPIC,GETITEMLISTFORDASHBOARD_TOPIC,CREATESHOP_TOPIC,GETCART_TOPIC,GETCATEGORIES_TOPIC,
  GETITEM_TOPIC,GETITEMDETAILS_TOPIC,GETITEMLISTBYSHOPID_TOPIC,GETORDEREDITEMS_TOPIC,GETPROFILE_TOPIC,GETSHOPDETAILS_TOPIC,GETSHOPDETAILSBYUSERID_TOPIC,
  GETSHOPNAME_TOPIC,PASSPORT_TOPIC,REGISTER_TOPIC,REMOVEFAVOURITE_TOPIC,SUBMITPROFILE_TOPIC,UPDATESHOP_TOPIC, UPDATEQUNATITY_TOPIC, REMOVEITEMFROMCART_TOPIC, LOGIN_TOPIC}=require('./kafka/topics');
var dashboardHandler= require('./services/getItemListForDashboard');
var getItem= require('./services/getItem');
var AddItem= require('./services/AddItem');
var addFavourite= require('./services/addFavourite');
var addToCart= require('./services/addToCart');
var checkOut= require('./services/checkOut');
var createShop= require('./services/createShop');
var getCart= require('./services/getCart');
var getCategories= require('./services/getCategories');
var getItemDetails= require('./services/getItemDetails');
var getItemListForDashboard= require('./services/getItemListForDashboard');
var getItemListbyShopID= require('./services/getItemListbyShopID');
var getOrderedItems= require('./services/getOrderedItems');
var getProfile= require('./services/getProfile');
var getShopDetails= require('./services/getShopDetails');
var getShopDetailsbyUserId= require('./services/getShopDetailsbyUserId');
var getShopName= require('./services/getShopName');
var passport= require('./services/passport');
var register= require('./services/register');
var removeFavourite= require('./services/removeFavourite');
var submitProfile= require('./services/submitProfile');
var updateItem= require('./services/updateItem');
var updateShop= require('./services/updateShop');
var updateQunatity= require('./services/updateQunatity');
var removeItemFromCart= require('./services/removeItemFromCart');
var login= require('./services/login');
require('./config/mongoose')


function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
      console.log("message received for " + topic_name + " ", fname);
      console.log(JSON.stringify(message.value));
      var data = JSON.parse(message.value);

      fname.handle_request(data.data, function (err, res) {
          console.log("after handle" , res);
          var payloads = [
              {
                  topic: data.replyTo,
                  messages: JSON.stringify({
                      correlationId: data.correlationId,
                      data: res,
                  }),
                  partition: 0,
              },
          ];
          producer.send(payloads, function (err, data) {
              console.log(data);
          });
          return;
      });
  });
}


handleTopicRequest(DASHBOARd_TOPIC, dashboardHandler);
handleTopicRequest(GETITEM_TOPIC, getItem);
handleTopicRequest(ADDFAVOURITE_TOPIC, addFavourite);
handleTopicRequest(UPDATEITEM_TOPIC, updateItem);
handleTopicRequest(ADDITEM_TOPIC, AddItem);
handleTopicRequest(ADDTOCART_TOPIC, addToCart);
handleTopicRequest(CHECKOUT_TOPIC, checkOut);
handleTopicRequest(GETITEMLISTFORDASHBOARD_TOPIC, getItemListForDashboard);
handleTopicRequest(CREATESHOP_TOPIC, createShop);
handleTopicRequest(GETCART_TOPIC, getCart);
handleTopicRequest(GETCATEGORIES_TOPIC, getCategories);
handleTopicRequest(GETITEMDETAILS_TOPIC, getItemDetails);
handleTopicRequest(GETITEMLISTBYSHOPID_TOPIC, getItemListbyShopID);
handleTopicRequest(GETORDEREDITEMS_TOPIC, getOrderedItems);
handleTopicRequest(GETPROFILE_TOPIC, getProfile);
handleTopicRequest(GETSHOPDETAILS_TOPIC, getShopDetails);
handleTopicRequest(GETSHOPDETAILSBYUSERID_TOPIC, getShopDetailsbyUserId);
handleTopicRequest(GETSHOPNAME_TOPIC, getShopName);
handleTopicRequest(PASSPORT_TOPIC, passport);
handleTopicRequest(REGISTER_TOPIC, register);
handleTopicRequest(REMOVEFAVOURITE_TOPIC, removeFavourite);
handleTopicRequest(SUBMITPROFILE_TOPIC, submitProfile);
handleTopicRequest(UPDATESHOP_TOPIC, updateShop);
handleTopicRequest(UPDATEQUNATITY_TOPIC, updateQunatity);
handleTopicRequest(REMOVEITEMFROMCART_TOPIC, removeItemFromCart);
handleTopicRequest(LOGIN_TOPIC, login);
handleTopicRequest(PASSPORT_TOPIC, passport);



