import { router } from 'expo-router';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.smallText}>
          ACCOUNT
        </Text>

        <Text style={styles.title}>
          Profile
        </Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              SF
            </Text>
          </View>

          <Text style={styles.name}>
            Smart Farm User
          </Text>

          <Text style={styles.role}>
            Farm Administrator
          </Text>
        </View>

        <View style={styles.menuCard}>
          <MenuItem title="Farm Settings" />
          <MenuItem title="Automation Rules" />
          <MenuItem title="About System" />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.logoutText}>
            ออกจากระบบ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function MenuItem({
  title,
}: {
  title: string;
}) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuText}>
        {title}
      </Text>

      <Text style={styles.arrow}>
        ›
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF1EF',
  },

  content: {
    flex: 1,
    padding: 20,
  },

  smallText: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#7A827D',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#17221D',
    marginTop: 4,
    marginBottom: 24,
  },

  profileCard: {
    backgroundColor: '#173D31',
    borderRadius: 24,
    alignItems: 'center',
    padding: 26,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#173D31',
    fontSize: 22,
    fontWeight: '800',
  },

  name: {
    marginTop: 15,
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },

  role: {
    color: '#B6C8BF',
    fontSize: 11,
    marginTop: 4,
  },

  menuCard: {
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDE2DF',
    overflow: 'hidden',
  },

  menuItem: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1EF',
  },

  menuText: {
    color: '#2A3730',
    fontSize: 14,
    fontWeight: '600',
  },

  arrow: {
    color: '#8C938F',
    fontSize: 20,
  },

  logoutButton: {
    marginTop: 18,
    backgroundColor: '#DDE2DF',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },

  logoutText: {
    color: '#455249',
    fontWeight: '700',
  },
});