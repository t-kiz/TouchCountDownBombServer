import AWS  from "aws-sdk";

import {REGION, TABLE_NAME} from "./constants";

const dynamoDB = new AWS.DynamoDB({ region: REGION });

export default function(event, context) {
  const requestParams = event.requestParameters;
  dynamoDB.putItem(
    {
      TableName: TABLE_NAME,
      id: {
        S: `${requestParams.terminalId}:${requestParams.clientId}
      },
      name: {
        S: `${requestParams.number}`
      }
    },
    (error, data) => {
      if (error) {
        context.fail(error);
      } else {
        // publish via mqtt
      }
    }
  );
}

