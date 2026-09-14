import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AlertsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.smallText}>
              SYSTEM ACTIVITY
            </Text>

            <Text style={styles.title}>
            TEST ALERTS 123
          </Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.summaryTextBox}>
            <Text style={styles.summaryTitle}>
              Smart Farm Notifications
            </Text>

            <Text style={styles.summaryText}>
              ติดตามเหตุการณ์สำคัญจากเซนเซอร์และอุปกรณ์ในฟาร์ม
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Recent Activity
        </Text>

        <AlertCard
          icon="warning-outline"
          title="Soil Moisture Low"
          detail="ความชื้นในดินอยู่ที่ 16% ระบบปั๊มน้ำถูกเปิดอัตโนมัติ"
          time="Just now"
          level="warning"
        />

        <AlertCard
          icon="cloud-done-outline"
          title="System Online"
          detail="Smart Farm เชื่อมต่อระบบเรียบร้อย และพร้อมรับข้อมูลจากเซนเซอร์"
          time="10 min ago"
          level="normal"
        />

        <AlertCard
          icon="sunny-outline"
          title="Light Level Normal"
          detail="ค่าความสว่างอยู่ในระดับปกติ ระบบไฟฟาร์มยังไม่ทำงาน"
          time="30 min ago"
          level="normal"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function AlertCard({
  icon,
  title,
  detail,
  time,
  level,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  detail: string;
  time: string;
  level: 'warning' | 'normal';
}) {
  const isWarning = level === 'warning';

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconBox,
          isWarning
            ? styles.warningIconBox
            : styles.normalIconBox,
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={
            isWarning
              ? '#A36F3E'
              : '#315F4A'
          }
        />
      </View>

      <View style={styles.textBox}>
        <View style={styles.cardTopRow}>
          <Text style={styles.cardTitle}>
            {title}
          </Text>

          <View
            style={[
              styles.statusDot,
              isWarning
                ? styles.warningDot
                : styles.normalDot,
            ]}
          />
        </View>

        <Text style={styles.detail}>
          {detail}
        </Text>

        <View style={styles.timeRow}>
          <Ionicons
            name="time-outline"
            size={13}
            color="#9AA19D"
          />

          <Text style={styles.time}>
            {time}
          </Text>
        </View>
      </View>
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

  smallText: {
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

  badge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#163D30',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  summaryCard: {
    marginTop: 24,
    backgroundColor: '#163D30',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  summaryIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#295D49',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  summaryTextBox: {
    flex: 1,
  },

  summaryTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  summaryText: {
    color: '#B8C9C0',
    fontSize: 11,
    lineHeight: 18,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27342D',
    marginTop: 26,
    marginBottom: 14,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DDE2DF',
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  warningIconBox: {
    backgroundColor: '#F3E8DC',
  },

  normalIconBox: {
    backgroundColor: '#E5ECE8',
  },

  textBox: {
    flex: 1,
  },

  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#26332C', 
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 10,
  },

  warningDot: {
    backgroundColor: '#B7834D',
  },

  normalDot: {
    backgroundColor: '#39745A',
  },

  detail: {
    color: '#757E79',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  time: {
    fontSize: 10,
    color: '#9AA19D',
    marginLeft: 5,
  },
});
