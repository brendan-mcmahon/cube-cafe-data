const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    console.info("Event:", event.body);
    const { saveName, date, game } = event.body;

    console.info("saveName:", saveName);
    console.info("date:", date);
    console.info("game:", game);

    if (!saveName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Missing required parameter saveName: ${event.body.saveName}` }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, GET",
        },
      };
    }

    if (!date) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Missing required parameters: ${event.body.date}` }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, GET",
        },
      };
    }

    if (!game) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Missing required parameters: ${event.body.game}` }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, GET",
        },
      };
    }

    const params = {
      TableName: "cube-cafe-data",
      Item: {
        name: saveName,
        date: date,
        game: game,
      },
    };

    await dynamoDB.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data saved successfully" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, GET",
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error occurred while saving data", error }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, GET",
      },
    };
  }
};
