// src/app/(tabs)/control.tsx

import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFarm } from '../../context/FarmContext';

export default function ControlScreen() {
  const {
    data,
    connected,
    setMode,
    setFan,
    setLight,
    setPump,
  } = useFarm();

  const autoMode = data.autoMode;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>
              DEVICE MANAGEMENT
            </Text>

            <Text style={styles.title}>
              Control
            </Text>
          </View>

          <View
            style={[
              styles.connectionBadge,
              connected
                ? styles.connectedBadge
                : styles.disconnectedBadge,
            ]}
          >
            <View
              style={[
                styles.connectionDot,
                connected
                  ? styles.connectedDot
                  : styles.disconnectedDot,
              ]}
            />

            <Text
              style={[
                styles.connectionText,
                connected
                  ? styles.connectedText
                  : styles.disconnectedText,
              ]}
            >
              {connected ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>

        {/* SYSTEM MODE */}

        <View style={styles.modeCard}>
          <View style={styles.modeLeft}>
            <View style={styles.modeIconBox}>
              <Ionicons
                name={
                  autoMode
                    ? 'sparkles-outline'
                    : 'hand-left-outline'
                }
                size={23}
                color="#FFFFFF"
              />
            </View>

            <View>
              <Text style={styles.modeLabel}>
                SYSTEM MODE
              </Text>

              <Text style={styles.modeValue}>
                {autoMode ? 'AUTO' : 'MANUAL'}
              </Text>

              <Text style={styles.modeDescription}>
                {autoMode
                  ? 'ควบคุมอัตโนมัติตามค่าเซนเซอร์'
                  : 'ควบคุมอุปกรณ์ด้วยตนเอง'}
              </Text>
            </View>
          </View>

          <Switch
            value={autoMode}
            onValueChange={(value) => 
              {
              setMode(value);
            }}
            trackColor={{
              false: '#53635B',
              true: '#759482',
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        <Text style={styles.sectionTitle}>
          Devices
        </Text>

        {/* FAN */}

        <DeviceCard
          icon="speedometer-outline"
          title="Fan"
          description="Ventilation System"
          isOn={data.fan}
          disabled={autoMode}
          onPress={() => setFan(!data.fan)}
        />

        {/* LIGHT */}

        <DeviceCard
          icon="bulb-outline"
          title="Farm Light"
          description="Lighting System"
          isOn={data.farmLight}
          disabled={autoMode}
          onPress={() => setLight(!data.farmLight)}
        />

        {/* PUMP */}

        <DeviceCard
          icon="water-outline"
          title="Water Pump"
          description="Irrigation System"
          isOn={data.pump}
          disabled={autoMode}
          onPress={() => setPump(!data.pump)}
        />

        {/* AUTO NOTICE */}

        {autoMode && (
          <View style={styles.autoNotice}>
            <View style={styles.autoNoticeIcon}>
              <Ionicons
                name="sparkles-outline"
                size={20}
                color="#315F4A"
              />
            </View>

            <View style={styles.autoNoticeTextBox}>
              <Text style={styles.autoNoticeTitle}>
                Auto Mode Active
              </Text>

              <Text style={styles.autoNoticeText}>
                ระบบกำลังควบคุมอุปกรณ์ตามค่าเซนเซอร์
                จาก ESP32
              </Text>
            </View>
          </View>
        )}

        {/* CURRENT SENSOR CONDITIONS */}

        <Text style={styles.sectionTitle}>
          Current Conditions
        </Text>

        <View style={styles.conditionsCard}>
          <ConditionRow
            icon="thermometer-outline"
            title="Temperature"
            value={`${data.temperature.toFixed(1)}°C`}
          />

          <ConditionRow
            icon="water-outline"
            title="Soil Moisture"
            value={`${data.soil}%`}
          />

          <ConditionRow
            icon="sunny-outline"
            title="Light ADC"
            value={`${data.light}`}
          />

          <ConditionRow
            icon="water-outline"
            title="Humidity"
            value={`${data.humidity.toFixed(0)}%`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DeviceCard({
  icon,
  title,
  description,
  isOn,
  disabled,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  isOn: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <View style={styles.deviceCard}>
      <View style={styles.deviceLeft}>
        <View
          style={[
            styles.deviceIconBox,
            isOn && styles.deviceIconBoxActive,
          ]}
        >
          <Ionicons
            name={icon}
            size={24}
            color="#315F4A"
          />
        </View>

        <View style={styles.deviceTextBox}>
          <Text style={styles.deviceTitle}>
            {title}
          </Text>

          <Text style={styles.description}>
            {description}
          </Text>

          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                isOn
                  ? styles.statusDotOn
                  : styles.statusDotOff,
              ]}
            />

            <Text
              style={[
                styles.status,
                isOn ? styles.on : styles.off,
              ]}
            >
              {isOn ? 'ON' : 'OFF'}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.button,
          isOn
            ? styles.offButton
            : styles.onButton,
          disabled && styles.disabled,
        ]}
      >
        <Ionicons
          name="power-outline"
          size={19}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
}

function ConditionRow({
  icon,
  title,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
}) {
  return (
    <View style={styles.conditionRow}>
      <View style={styles.conditionLeft}>
        <View style={styles.conditionIcon}>
          <Ionicons
            name={icon}
            size={18}
            color="#315F4A"
          />
        </View>

        <Text style={styles.conditionTitle}>
          {title}
        </Text>
      </View>

      <Text style={styles.conditionValue}>
        {value}
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

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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

  connectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 20,
  },

  connectedBadge: {
    backgroundColor: '#E1E8E4',
  },

  disconnectedBadge: {
    backgroundColor: '#F1E6DC',
  },

  connectionDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },

  connectedDot: {
    backgroundColor: '#39745A',
  },

  disconnectedDot: {
    backgroundColor: '#A36F3E',
  },

  connectionText: {
    fontSize: 10,
    fontWeight: '800',
  },

  connectedText: {
    color: '#39745A',
  },

  disconnectedText: {
    color: '#A36F3E',
  },

  modeCard: {
    marginTop: 24,
    backgroundColor: '#163D30',
    borderRadius: 26,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  modeIconBox: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#295D49',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  modeLabel: {
    color: '#ABC1B5',
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: '700',
  },

  modeValue: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 3,
  },

  modeDescription: {
    color: '#B9CAC1',
    fontSize: 10,
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27342D',
    marginTop: 26,
    marginBottom: 14,
  },

  deviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDE2DF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  deviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  deviceIconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#E7ECE9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  deviceIconBoxActive: {
    backgroundColor: '#DCE9E2',
  },

  deviceTextBox: {
    flex: 1,
  },

  deviceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#26332C',
  },

  description: {
    color: '#858C88',
    fontSize: 10,
    marginTop: 2,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 5,
  },

  statusDotOn: {
    backgroundColor: '#39745A',
  },

  statusDotOff: {
    backgroundColor: '#A2A9A5',
  },

  status: {
    fontSize: 10,
    fontWeight: '800',
  },

  on: {
    color: '#39745A',
  },

  off: {
    color: '#929995',
  },

  button: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  onButton: {
    backgroundColor: '#315F4A',
  },

  offButton: {
    backgroundColor: '#727B76',
  },

  disabled: {
    opacity: 0.25,
  },

  autoNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCE5E0',
    borderRadius: 18,
    padding: 16,
    marginTop: 2,
  },

  autoNoticeIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EAF0EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  autoNoticeTextBox: {
    flex: 1,
    marginLeft: 10,
  },

  autoNoticeTitle: {
    color: '#315F4A',
    fontSize: 12,
    fontWeight: '800',
  },

  autoNoticeText: {
    color: '#496356',
    fontSize: 10,
    lineHeight: 16,
    marginTop: 2,
  },

  conditionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#DDE2DF',
  },

  conditionRow: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1EF',
  },

  conditionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  conditionIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#E7ECE9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  conditionTitle: {
    color: '#66716B',
    fontSize: 12,
    fontWeight: '600',
  },

  conditionValue: {
    color: '#1D2923',
    fontSize: 14,
    fontWeight: '800',
  },
});
