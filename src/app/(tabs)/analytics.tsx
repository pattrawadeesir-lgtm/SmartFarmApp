import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnalyticsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.smallText}>
          FARM INSIGHTS
        </Text>

        <Text style={styles.title}>
          Analytics
        </Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>
                TEMPERATURE
              </Text>

              <Text style={styles.bigValue}>
                24.0°C
              </Text>

              <Text style={styles.description}>
                อุณหภูมิย้อนหลังแบบจำลอง
              </Text>
            </View>

            <View style={styles.iconBox}>
              <Ionicons
                name="thermometer-outline"
                size={26}
                color="#315F4A"
              />
            </View>
          </View>

          {/* GRAPH */}
          <View style={styles.graphContainer}>
            {/* ตัวเลขด้านซ้าย */}
            <View style={styles.yAxis}>
              <Text style={styles.yLabel}>30</Text>
              <Text style={styles.yLabel}>25</Text>
              <Text style={styles.yLabel}>20</Text>
              <Text style={styles.yLabel}>15</Text>
              <Text style={styles.yLabel}>10</Text>
            </View>

            <View style={styles.graph}>
              {/* เส้น Grid แนวนอน */}
              <View style={[styles.gridLine, { top: 0 }]} />
              <View style={[styles.gridLine, { top: 32 }]} />
              <View style={[styles.gridLine, { top: 64 }]} />
              <View style={[styles.gridLine, { top: 96 }]} />
              <View style={[styles.gridLine, { top: 128 }]} />

              {/* กราฟแท่ง */}
              <View style={styles.barArea}>
                <View style={styles.barGroup}>
                  <View style={[styles.bar, { height: 72 }]} />
                </View>

                <View style={styles.barGroup}>
                  <View style={[styles.bar, { height: 91 }]} />
                </View>

                <View style={styles.barGroup}>
                  <View style={[styles.bar, { height: 80 }]} />
                </View>

                <View style={styles.barGroup}>
                  <View style={[styles.bar, { height: 112 }]} />
                </View>

                <View style={styles.barGroup}>
                  <View style={[styles.bar, { height: 96 }]} />
                </View>

                <View style={styles.barGroup}>
                  <View style={[styles.bar, { height: 126 }]} />
                </View>

                <View style={styles.barGroup}>
                  <View style={[styles.bar, { height: 104 }]} />
                </View>
              </View>
            </View>
          </View>

          {/* วัน */}
          <View style={styles.labelsRow}>
            <View style={styles.yAxisSpace} />

            <View style={styles.dayLabels}>
              <Text style={styles.dayText}>Mon</Text>
              <Text style={styles.dayText}>Tue</Text>
              <Text style={styles.dayText}>Wed</Text>
              <Text style={styles.dayText}>Thu</Text>
              <Text style={styles.dayText}>Fri</Text>
              <Text style={styles.dayText}>Sat</Text>
              <Text style={styles.dayText}>Sun</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.smallCard}>
            <Ionicons
              name="water-outline"
              size={23}
              color="#315F4A"
            />

            <Text style={styles.smallCardTitle}>
              Humidity
            </Text>

            <Text style={styles.smallCardValue}>
              40%
            </Text>

            <Text style={styles.normal}>
              Normal
            </Text>
          </View>

          <View style={styles.smallCard}>
            <Ionicons
              name="leaf-outline"
              size={23}
              color="#315F4A"
            />

            <Text style={styles.smallCardTitle}>
              Soil Moisture
            </Text>

            <Text style={styles.smallCardValue}>
              16%
            </Text>

            <Text style={styles.warning}>
              Dry
            </Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            Daily Summary
          </Text>

          <SummaryRow
            label="Temperature"
            value="24°C"
          />

          <SummaryRow
            label="Humidity"
            value="40%"
          />

          <SummaryRow
            label="Soil Moisture"
            value="16%"
          />

          <SummaryRow
            label="Light"
            value="1001"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>
        {label}
      </Text>

      <Text style={styles.summaryValue}>
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
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#DDE2DF',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  cardTitle: {
    fontSize: 10,
    letterSpacing: 1.7,
    color: '#7A827D',
    fontWeight: '700',
  },

  bigValue: {
    fontSize: 31,
    fontWeight: '800',
    color: '#172A21',
    marginTop: 8,
  },

  description: {
    fontSize: 11,
    color: '#929A95',
    marginTop: 5,
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#E4EBE7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  graphContainer: {
    flexDirection: 'row',
    marginTop: 28,
    height: 145,
  },

  yAxis: {
    width: 30,
    height: 132,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 7,
  },

  yLabel: {
    fontSize: 9,
    color: '#9AA19D',
  },

  graph: {
    flex: 1,
    height: 132,
    position: 'relative',
  },

  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#D5DBD7',
  },

  barArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 132,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },

  barGroup: {
    width: 28,
    height: 132,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  bar: {
    width: 24,
    backgroundColor: '#4B7F68',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },

  labelsRow: {
    flexDirection: 'row',
    marginTop: 7,
  },

  yAxisSpace: {
    width: 30,
  },

  dayLabels: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  dayText: {
    width: 28,
    textAlign: 'center',
    fontSize: 9,
    color: '#929A95',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  smallCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    padding: 18,
    borderWidth: 1,
    borderColor: '#DDE2DF',
  },

  smallCardTitle: {
    color: '#7A827D',
    fontSize: 11,
    marginTop: 13,
  },

  smallCardValue: {
    fontSize: 25,
    fontWeight: '800',
    color: '#1D2923',
    marginTop: 5,
  },

  normal: {
    color: '#39745A',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 5,
  },

  warning: {
    color: '#A36F3E',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 5,
  },

  summaryCard: {
    marginTop: 14,
    backgroundColor: '#163D30',
    borderRadius: 24,
    padding: 20,
  },

  summaryTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 7,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#315A4B',
  },

  summaryLabel: {
    color: '#B8C9C0',
    fontSize: 11,
  },

  summaryValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});