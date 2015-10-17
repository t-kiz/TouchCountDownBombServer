import secrets from "./secrets";

export const REGION     = "ap-northeast-1";
export const TABLE_NAME = "touch_count_down_bomb_number";
export const MQTT_HOST  = "m01.mqtt.cloud.nifty.com";
export const MQTT_PORT  = 16089;
export const MQTT_USER  = secrets.MQTT_USER;
export const MQTT_PASS  = secrets.MQTT_PASS;
