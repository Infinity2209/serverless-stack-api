const uuid = require('uuid');
const handler = require('./libs/handler-lib');
const dynamoDb = require('./libs/dynamodb-lib');

module.exports.main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
            noteId: uuid.v1(), // A unique uuid
            content: data.content, // Parsed from request body
            attachment: data.attachment, // Parsed from request body
            createdAt: Date.now(), // Current Unix timestamp
        },
    };
    await dynamoDb.put(params);
    return params.Item;
});
