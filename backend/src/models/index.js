require("dotenv").config();

const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

const ItemManager = require("./ItemManager");
const UserManager = require("./UserManager")
const MessageManager= require("./messageManager");
const ServiceManager = require("./ServiceManager")
const CategoryService = require ("./CategoryServiceManager")
const FriendsManager = require("./FriendsManager");
const ConversationManager = require("./conversationManager");
const ServiceTypeManager = require("./Service_typeManager");


models.item = new ItemManager();
models.item.setDatabase(pool); 

models.user = new UserManager();
models.user.setDatabase(pool);

models.message = new MessageManager();
models.message.setDatabase(pool);

models.friends = new FriendsManager();
models.friends.setDatabase(pool);

models.conversations = new ConversationManager();
models.conversations.setDatabase(pool);

models.service= new ServiceManager();
models.service.setDatabase(pool);

models.categoryservice= new CategoryService();
models.categoryservice.setDatabase(pool);

models.service_type = new ServiceTypeManager();
models.service_type.setDatabase(pool);

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
