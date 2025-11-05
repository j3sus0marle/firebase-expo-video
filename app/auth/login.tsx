import { StyleSheet, View } from 'react-native';
import GoogleAuth from '@/components/auth/GoogleAuth';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <GoogleAuth />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
});