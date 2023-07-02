Error: const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { name, date, game } = event;
    
    const params = {
      TableName: 'CubeCafeData',
      Item: {
        name: name,
        date: date,
        game: game
      }
    };
    
    await dynamoDB.put(params).promise();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data saved successfully' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      }
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error occurred while saving data' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      }
    };
  }
};
