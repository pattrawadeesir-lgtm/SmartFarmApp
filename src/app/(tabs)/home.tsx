// src/app/(tabs)/home.tsx

import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFarm } from '../../context/FarmContext';

export default function HomeScreen() {
  const { data, connected } = useFarm();

  const temperature = data.temperature;
  const humidity = data.humidity;
  const light = data.light;
  const soil = data.soil;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>SMART FARM</Text>
            <Text style={styles.title}>Overview</Text>
          </View>

          <View style={styles.onlinePill}>
            <View
              style={[
                styles.onlineDot,
                {
                  backgroundColor: connected
                    ? '#39745A'
                    : '#A36F3E',
                },
              ]}
            />

            <Text style={styles.onlineText}>
              {connected ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View>
            <Text style={styles.heroLabel}>FARM HEALTH</Text>
            <Text style={styles.heroValue}>92%</Text>
            <Text style={styles.heroStatus}>Excellent</Text>
          </View>

          <View style={styles.heroIcon}>
            <Ionicons
              name="leaf-outline"
              size={34}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.heroDesc}>
            ระบบเชื่อมต่อกับ Smart Farm แบบเรียลไทม์
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Environment</Text>

        <View style={styles.grid}>
          <SensorCard
            icon="thermometer-outline"
            title="Temperature"
            value={`${temperature.toFixed(1)}°C`}
            status={
              temperature >= 30
                ? 'High'
                : 'Normal'
            }
          />

          <SensorCard
            icon="water-outline"
            title="Humidity"
            value={`${humidity.toFixed(0)}%`}
            status="Normal"
          />

          <SensorCard
            icon="sunny-outline"
            title="Light"
            value={`${light}`}
            status={
              light > 1900
                ? 'Dark'
                : 'Bright'
            }
          />

          <SensorCard
            icon="leaf-outline"
            title="Soil"
            value={`${soil}%`}
            status={
              soil <= 29
                ? 'Dry'
                : soil <= 59
                ? 'Medium'
                : 'Wet'
            }
          />
        </View>

        <Text style={styles.sectionTitle}>Devices</Text>

        <View style={styles.deviceRow}>
          <DeviceStatus
            icon="speedometer-outline"
            title="Fan"
            isOn={data.fan}
          />

          <DeviceStatus
            icon="bulb-outline"
            title="Light"
            isOn={data.farmLight}
          />

          <DeviceStatus
            icon="water-outline"
            title="Pump"
            isOn={data.pump}
          />
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Ionicons
              name={
                data.pump
                  ? 'water-outline'
                  : 'checkmark-circle-outline'
              }
              size={26}
              color="#315F4A"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>
              System Status
            </Text>

            <Text style={styles.statusText}>
              {data.pump
                ? `ปั๊มน้ำกำลังทำงาน เนื่องจากความชื้นในดินอยู่ที่ ${soil}%`
                : 'ปั๊มน้ำหยุดทำงาน ระบบกำลังตรวจสอบความชื้นในดิน'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SensorCard({
  icon,
  title,
  value,
  status,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
  status: string;
}) {
  return (
    <View style={styles.sensorCard}>
      <View style={styles.iconBox}>
        <Ionicons
          name={icon}
          size={22}
          color="#315F4A"
        />
      </View>

      <Text style={styles.sensorTitle}>
        {title}
      </Text>

      <Text style={styles.sensorValue}>
        {value}
      </Text>

      <Text style={styles.sensorStatus}>
        {status}
      </Text>
    </View>
  );
}

function DeviceStatus({
  icon,
  title,
  isOn,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  isOn: boolean;
}) {
  return (
    <View style={styles.deviceCard}>
      <View style={styles.deviceIcon}>
        <Ionicons
          name={icon}
          size={22}
          color="#315F4A"
        />
      </View>

      <Text style={styles.deviceTitle}>
        {title}
      </Text>

      <Text
        style={[
          styles.deviceState,
          {
            color: isOn
              ? '#39745A'
              : '#999F9B',
          },
        ]}
      >
        {isOn ? 'ON' : 'OFF'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF1EF',
  },

  content: {
    padding: 20,
    paddingBottom: 100,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  eyebrow: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#7A827D',
    fontWeight: '700',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#17221D',
    marginTop: 4,
  },

  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1E8E4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 7,
  },

  onlineText: {
    color: '#39745A',
    fontSize: 11,
    fontWeight: '700',
  },

  heroCard: {
    marginTop: 24,
    backgroundColor: '#163D30',
    borderRadius: 28,
    padding: 24,
    minHeight: 180,
    position: 'relative',
  },

  heroLabel: {
    color: '#ABC1B5',
    fontSize: 10,
    letterSpacing: 2,
  },

  heroValue: {
    color: '#FFFFFF',
    fontSize: 46,
    fontWeight: '800',
    marginTop: 12,
  },

  heroStatus: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  heroDesc: {
    color: '#B9CAC1',
    fontSize: 11,
    marginTop: 14,
  },

  heroIcon: {
    position: 'absolute',
    right: 22,
    top: 22,
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#295D49',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27342D',
    marginTop: 26,
    marginBottom: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  sensorCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDE2DF',
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#E7ECE9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  sensorTitle: {
    color: '#7A827D',
    fontSize: 12,
  },

  sensorValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1D2923',
    marginTop: 7,
  },

  sensorStatus: {
    color: '#4E745F',
    fontSize: 11,
    marginTop: 6,
    fontWeight: '700',
  },

  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  deviceCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDE2DF',
    alignItems: 'center',
  },

  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#E7ECE9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deviceTitle: {
    fontSize: 11,
    color: '#737C77',
    marginTop: 10,
  },

  deviceState: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: 5,
  },

  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#DDE2DF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#E5EBE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  statusTitle: {
    color: '#27342D',
    fontSize: 15,
    fontWeight: '700',
  },

  statusText: {
    color: '#747D78',
    fontSize: 11,
    lineHeight: 18,
    marginTop: 4,
  },
});