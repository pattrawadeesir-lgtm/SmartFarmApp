# 🌱 Smart Farm IoT Application

โปรเจกต์ Smart Farm สำหรับจำลองระบบฟาร์มอัจฉริยะ โดยใช้ ESP32 ในการรับข้อมูลจากเซนเซอร์และควบคุมอุปกรณ์ต่าง ๆ พร้อมแอปพลิเคชันสำหรับดูข้อมูลและควบคุมระบบแบบ Real-time

## 📱 Features

- แสดงอุณหภูมิและความชื้น
- ตรวจสอบระดับแสง
- ตรวจสอบความชื้นในดิน
- ควบคุมพัดลม (Fan)
- ควบคุมไฟฟาร์ม (Farm Light)
- ควบคุมปั๊มน้ำ (Water Pump)
- รองรับ AUTO / MANUAL Mode
- รับส่งข้อมูลแบบ Real-time ผ่าน MQTT
- ระบบแจ้งเตือนสถานะอุปกรณ์
- หน้า Analytics สำหรับแสดงข้อมูลของฟาร์ม

## ⚙️ Automatic Control

### 🌡 Temperature
- Temperature ≥ 30°C → Fan ON
- Temperature < 30°C → Fan OFF

### 💡 Light
- Light ADC > 1900 → Farm Light ON
- Light ADC ≤ 1900 → Farm Light OFF

### 🌱 Soil Moisture
- 0–29% → DRY → Water Pump ON
- 30–59% → MEDIUM → Water Pump OFF
- 60–100% → WET → Water Pump OFF

## 🛠 Technologies

- React Native
- Expo
- TypeScript
- ESP32
- MQTT
- Wokwi
- PlatformIO

## 📡 System

ESP32 → MQTT Broker → Smart Farm Application

แอปสามารถรับข้อมูลจาก ESP32 และส่งคำสั่งควบคุมอุปกรณ์กลับไปยัง ESP32 ผ่าน MQTT

## 👩‍💻 Project

Smart Farm IoT Simulation
