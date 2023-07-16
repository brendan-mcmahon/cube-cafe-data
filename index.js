const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    console.log('body: ', body);
    const { id, user, name, date, game } = body;
    console.log(`id: ${id}`);
    console.log(`user: ${user}`);
    console.log(`name: ${name}`);

    const params = {
      TableName: "cube-cafe-data",
      Item: { id, user, name, date, game },
    };

    console.log('params', params);

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
