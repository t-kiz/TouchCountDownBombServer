import AWS  from "aws-sdk";
import mqtt from "mqtt";

import {REGION, TABLE_NAME, MQTT_HOST, MQTT_PORT, MQTT_USER, MQTT_PASS} from "./constants";

const dynamoDB    = new AWS.DynamoDB({ region: REGION });
const mqttClient  = mqtt.connect({ host: MQTT_HOST, port: MQTT_PORT, username: MQTT_USER, password: MQTT_PASS });

export default function(event, context) {
  const requestParams = event.requestParameters;
  dynamoDB.putItem(
    {
      TableName: TABLE_NAME,
      Item: {
        id: { S: getKeyFromRequestParams(requestParams) },
        name: { S: getValueFromRequestParams(requestParams) }
      }
    },
    (error, data) => {
      if (error) {
        context.fail(error);
      } else {
        mqttClient.on("error", (error) => context.fail(error));
        mqttClient.publish(
          getTopicFromRequestParams(requestParams), requestParams.number, {},
          (packget) => context.succeed(null)
        );
      }
    }
  );
}

function getKeyFromRequestParams(requestParams) {
  return `${requestParams.terminalId}:${requestParams.clientId}`;
}

function getValueFromRequestParams(requestParams) {
  return `${requestParams.number}`;
}

function getTopicFromRequestParams(requestParams) {
  return `${requestParams.terminalId}:${requestParams.clientId}`;
}
