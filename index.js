const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { saveName, date, game } = event;

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
