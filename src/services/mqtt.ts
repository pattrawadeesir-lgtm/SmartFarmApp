import mqtt from 'mqtt';

export const DATA_TOPIC = 'smartfarm/happy2026/data';
export const COMMAND_TOPIC = 'smartfarm/happy2026/command';

export const mqttClient = mqtt.connect(
  'wss://broker.emqx.io:8084/mqtt',
  {
    clientId:
      'SmartFarmApp-' +
      Math.random().toString(16).slice(2),

    clean: true,
    reconnectPeriod: 2000,
    connectTimeout: 10000,

    forceNativeWebSocket: true,
  }
);