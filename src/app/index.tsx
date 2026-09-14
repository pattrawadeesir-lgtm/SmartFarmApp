import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username.trim() !== '' && password.trim() !== '') {
      router.replace('/(tabs)/home');
    } else {
      Alert.alert(
        'กรอกข้อมูลไม่ครบ',
        'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>SF</Text>
        </View>

        <Text style={styles.title}>SMART FARM</Text>

        <Text style={styles.subtitle}>
          Intelligent Farm Management
        </Text>

        <View style={styles.card}>
          <Text style={styles.welcome}>ยินดีต้อนรับ</Text>

          <Text style={styles.description}>
            เข้าสู่ระบบเพื่อจัดการฟาร์มของคุณ
          </Text>

          <Text style={styles.label}>ชื่อผู้ใช้</Text>

          <TextInput
            style={styles.input}
            placeholder="กรอกชื่อผู้ใช้"
            placeholderTextColor="#8A918D"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={styles.label}>รหัสผ่าน</Text>

          <View style={styles.passwordBox}>
            <TextInput
              style={styles.passwordInput}
              placeholder="กรอกรหัสผ่าน"
              placeholderTextColor="#8A918D"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showText}>
                {showPassword ? 'ซ่อน' : 'แสดง'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>
              เข้าสู่ระบบ
            </Text>
          </TouchableOpacity>

          <Text style={styles.demo}>
            Demo: กรอกชื่อและรหัสอะไรก็ได้
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1EF',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  logo: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#173D31',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
  },

  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '800',
    color: '#1A2520',
    letterSpacing: 3,
  },

  subtitle: {
    textAlign: 'center',
    color: '#7A827D',
    fontSize: 11,
    marginTop: 8,
    marginBottom: 30,
    letterSpacing: 1.5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#DDE2DF',
  },

  welcome: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A2922',
  },

  description: {
    fontSize: 12,
    color: '#7D8580',
    marginTop: 5,
    marginBottom: 24,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#445149',
    marginBottom: 8,
  },

  input: {
    height: 52,
    backgroundColor: '#F0F2F1',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 15,
    color: '#1E2823',
  },

  passwordBox: {
    height: 52,
    backgroundColor: '#F0F2F1',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#1E2823',
  },

  showText: {
    color: '#486D5B',
    fontSize: 12,
    fontWeight: '700',
  },

  button: {
    height: 54,
    backgroundColor: '#173D31',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  demo: {
    textAlign: 'center',
    color: '#8A918D',
    fontSize: 11,
    marginTop: 16,
  },
});
