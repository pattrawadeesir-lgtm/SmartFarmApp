import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    COMMAND_TOPIC,
    DATA_TOPIC,
    mqttClient,
} from '../services/mqtt';

type FarmData = {
  temperature: number;
  humidity: number;
  light: number;
  soil: number;

  fan: boolean;
  farmLight: boolean;
  pump: boolean;

  autoMode: boolean;
};

type FarmAlert = {
  id: number;
  title: string;
  detail: string;
  time: string;
  level: 'warning' | 'normal';
};

type FarmContextType = {
  data: FarmData;
  connected: boolean;
  alerts: FarmAlert[];

  setMode: (auto: boolean) => void;
  setFan: (value: boolean) => void;
  setLight: (value: boolean) => void;
  setPump: (value: boolean) => void;
};

const initialData: FarmData = {
  temperature: 0,
  humidity: 0,
  light: 0,
  soil: 0,

  fan: false,
  farmLight: false,
  pump: false,

  autoMode: true,
};

const FarmContext =
  createContext<FarmContextType | undefined>(
    undefined
  );

export function FarmProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] =
    useState<FarmData>(initialData);

  const [connected, setConnected] =
    useState(false);

  const [alerts, setAlerts] =
    useState<FarmAlert[]>([]);

  // ==================================================
  // PREVIOUS STATES FOR ALERTS
  // ==================================================

  const previousPump =
    useRef<boolean | null>(null);

  const previousFan =
    useRef<boolean | null>(null);

  const previousLight =
    useRef<boolean | null>(null);

  // ==================================================
  // PENDING COMMANDS
  //
  // ใช้กัน MQTT รอบเก่า
  // ไม่ให้เขียนทับค่าที่ผู้ใช้เพิ่งกด
  // ==================================================

  const pendingMode =
    useRef<boolean | null>(null);

  const pendingFan =
    useRef<boolean | null>(null);

  const pendingLight =
    useRef<boolean | null>(null);

  const pendingPump =
    useRef<boolean | null>(null);

  const pendingModeTime =
    useRef(0);

  const pendingFanTime =
    useRef(0);

  const pendingLightTime =
    useRef(0);

  const pendingPumpTime =
    useRef(0);

  // ถ้าเกิน 3 วินาที
  // แล้วยังไม่ได้รับค่าตรงจาก ESP32
  // จะยอมกลับไปใช้สถานะจริงจาก ESP32
  const COMMAND_TIMEOUT = 3000;

  // ==================================================
  // ADD ALERT
  // ==================================================

  const addAlert = (
    title: string,
    detail: string,
    level: 'warning' | 'normal'
  ) => {
    setAlerts((old) => [
      {
        id: Date.now() + Math.random(),
        title,
        detail,
        time: 'Just now',
        level,
      },
      ...old,
    ]);
  };

  // ==================================================
  // MQTT
  // ==================================================

  useEffect(() => {
    const onConnect = () => {
      console.log(
        'MQTT APP CONNECTED'
      );

      setConnected(true);

      mqttClient.subscribe(
        DATA_TOPIC
      );
    };

    const onClose = () => {
      console.log(
        'MQTT APP DISCONNECTED'
      );

      setConnected(false);
    };

    const onError = (
      error: Error
    ) => {
      console.log(
        'MQTT ERROR:',
        error
      );

      setConnected(false);
    };

    const onMessage = (
      topic: string,
      message: Buffer
    ) => {
      if (
        topic !== DATA_TOPIC
      ) {
        return;
      }

      try {
        const incoming =
          JSON.parse(
            message.toString()
          ) as FarmData;

        console.log(
          'MQTT DATA:',
          incoming
        );

        const now =
          Date.now();

        // ==================================================
        // MODE CONFIRMATION
        // ==================================================

        if (
          pendingMode.current !== null
        ) {
          if (
            incoming.autoMode ===
            pendingMode.current
          ) {
            // ESP32 ยืนยันค่าใหม่แล้ว
            pendingMode.current =
              null;
          }

          else if (
            now -
              pendingModeTime.current >
            COMMAND_TIMEOUT
          ) {
            // หมดเวลา
            pendingMode.current =
              null;
          }
        }

        // ==================================================
        // FAN CONFIRMATION
        // ==================================================

        if (
          pendingFan.current !== null
        ) {
          if (
            incoming.fan ===
            pendingFan.current
          ) {
            pendingFan.current =
              null;
          }

          else if (
            now -
              pendingFanTime.current >
            COMMAND_TIMEOUT
          ) {
            pendingFan.current =
              null;
          }
        }

        // ==================================================
        // LIGHT CONFIRMATION
        // ==================================================

        if (
          pendingLight.current !== null
        ) {
          if (
            incoming.farmLight ===
            pendingLight.current
          ) {
            pendingLight.current =
              null;
          }

          else if (
            now -
              pendingLightTime.current >
            COMMAND_TIMEOUT
          ) {
            pendingLight.current =
              null;
          }
        }

        // ==================================================
        // PUMP CONFIRMATION
        // ==================================================

        if (
          pendingPump.current !== null
        ) {
          if (
            incoming.pump ===
            pendingPump.current
          ) {
            pendingPump.current =
              null;
          }

          else if (
            now -
              pendingPumpTime.current >
            COMMAND_TIMEOUT
          ) {
            pendingPump.current =
              null;
          }
        }

        // ==================================================
        // FIRST DATA FOR ALERTS
        // ==================================================

        if (
          previousPump.current ===
          null
        ) {
          previousPump.current =
            incoming.pump;
        }

        if (
          previousFan.current ===
          null
        ) {
          previousFan.current =
            incoming.fan;
        }

        if (
          previousLight.current ===
          null
        ) {
          previousLight.current =
            incoming.farmLight;
        }

        // ==================================================
        // PUMP ALERT
        // ==================================================

        if (
          previousPump.current !==
          incoming.pump
        ) {
          if (
            incoming.pump
          ) {
            addAlert(
              'Water Pump Activated',
              `ปั๊มน้ำถูกเปิด • Soil Moisture ${incoming.soil}%`,
              'warning'
            );
          } else {
            addAlert(
              'Water Pump Stopped',
              `ปั๊มน้ำหยุดทำงาน • Soil Moisture ${incoming.soil}%`,
              'normal'
            );
          }
        }

        // ==================================================
        // FAN ALERT
        // ==================================================

        if (
          previousFan.current !==
          incoming.fan
        ) {
          if (
            incoming.fan
          ) {
            addAlert(
              'Fan Activated',
              `พัดลมถูกเปิด • Temperature ${incoming.temperature}°C`,
              'warning'
            );
          } else {
            addAlert(
              'Fan Stopped',
              `พัดลมหยุดทำงาน • Temperature ${incoming.temperature}°C`,
              'normal'
            );
          }
        }

        // ==================================================
        // LIGHT ALERT
        // ==================================================

        if (
          previousLight.current !==
          incoming.farmLight
        ) {
          if (
            incoming.farmLight
          ) {
            addAlert(
              'Farm Light Activated',
              `ไฟฟาร์มถูกเปิด • Light ADC ${incoming.light}`,
              'warning'
            );
          } else {
            addAlert(
              'Farm Light Stopped',
              `ไฟฟาร์มถูกปิด • Light ADC ${incoming.light}`,
              'normal'
            );
          }
        }

        previousPump.current =
          incoming.pump;

        previousFan.current =
          incoming.fan;

        previousLight.current =
          incoming.farmLight;

        // ==================================================
        // UPDATE APP DATA
        // ==================================================

        setData((current) => ({
          // Sensor ใช้ค่าจริงล่าสุดเสมอ

          temperature:
            incoming.temperature,

          humidity:
            incoming.humidity,

          light:
            incoming.light,

          soil:
            incoming.soil,

          // ----------------------------------------------
          // Device
          //
          // ถ้ามีคำสั่งที่เพิ่งกดอยู่
          // ให้คงค่าที่ผู้ใช้กดไว้ก่อน
          // ไม่เอา MQTT รอบเก่ามาทับ
          // ----------------------------------------------

          fan:
            pendingFan.current !== null
              ? pendingFan.current
              : incoming.fan,

          farmLight:
            pendingLight.current !== null
              ? pendingLight.current
              : incoming.farmLight,

          pump:
            pendingPump.current !== null
              ? pendingPump.current
              : incoming.pump,

          // ----------------------------------------------
          // Mode
          // ----------------------------------------------

          autoMode:
            pendingMode.current !== null
              ? pendingMode.current
              : incoming.autoMode,
        }));

      } catch (error) {
        console.log(
          'JSON ERROR:',
          error
        );
      }
    };

    mqttClient.on(
      'connect',
      onConnect
    );

    mqttClient.on(
      'close',
      onClose
    );

    mqttClient.on(
      'error',
      onError
    );

    mqttClient.on(
      'message',
      onMessage
    );

    return () => {
      mqttClient.removeListener(
        'connect',
        onConnect
      );

      mqttClient.removeListener(
        'close',
        onClose
      );

      mqttClient.removeListener(
        'error',
        onError
      );

      mqttClient.removeListener(
        'message',
        onMessage
      );
    };

  }, []);

  // ==================================================
  // AUTO / MANUAL
  // ==================================================

  const setMode = (
    auto: boolean
  ) => {
    // จำค่าที่ผู้ใช้ต้องการทันที
    pendingMode.current =
      auto;

    pendingModeTime.current =
      Date.now();

    // เปลี่ยน UI ทันที
    // ไม่รอ ESP32
    setData((current) => ({
      ...current,
      autoMode: auto,
    }));

    // ถ้าเปลี่ยน AUTO
    // ยกเลิก pending ของอุปกรณ์
    // เพราะ AUTO จะให้ ESP32 ควบคุมใหม่
    if (auto) {
      pendingFan.current =
        null;

      pendingLight.current =
        null;

      pendingPump.current =
        null;
    }

    // ส่ง MQTT
    mqttClient.publish(
      COMMAND_TOPIC,
      auto
        ? 'MODE:AUTO'
        : 'MODE:MANUAL'
    );
  };

  // ==================================================
  // FAN
  // ==================================================

  const setFan = (
    value: boolean
  ) => {
    // ใช้เฉพาะ MANUAL
    if (data.autoMode) {
      return;
    }

    // จำคำสั่ง
    pendingFan.current =
      value;

    pendingFanTime.current =
      Date.now();

    // เปลี่ยนหน้าแอปทันที
    setData((current) => ({
      ...current,
      fan: value,
    }));

    // ส่ง ESP32
    mqttClient.publish(
      COMMAND_TOPIC,
      value
        ? 'FAN:ON'
        : 'FAN:OFF'
    );
  };

  // ==================================================
  // FARM LIGHT
  // ==================================================

  const setLight = (
    value: boolean
  ) => {
    if (data.autoMode) {
      return;
    }

    pendingLight.current =
      value;

    pendingLightTime.current =
      Date.now();

    // เปลี่ยนทันที
    setData((current) => ({
      ...current,
      farmLight: value,
    }));

    mqttClient.publish(
      COMMAND_TOPIC,
      value
        ? 'LIGHT:ON'
        : 'LIGHT:OFF'
    );
  };

  // ==================================================
  // WATER PUMP
  // ==================================================

  const setPump = (
    value: boolean
  ) => {
    if (data.autoMode) {
      return;
    }

    pendingPump.current =
      value;

    pendingPumpTime.current =
      Date.now();

    // เปลี่ยนทันที
    setData((current) => ({
      ...current,
      pump: value,
    }));

    mqttClient.publish(
      COMMAND_TOPIC,
      value
        ? 'PUMP:ON'
        : 'PUMP:OFF'
    );
  };

  // ==================================================
  // PROVIDER
  // ==================================================

  return (
    <FarmContext.Provider
      value={{
        data,
        connected,
        alerts,

        setMode,
        setFan,
        setLight,
        setPump,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
}

// ======================================================
// useFarm
// ======================================================

export function useFarm() {
  const context =
    useContext(FarmContext);

  if (!context) {
    throw new Error(
      'useFarm must be used inside FarmProvider'
    );
  }

  return context;
}