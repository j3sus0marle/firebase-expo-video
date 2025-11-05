import { StyleSheet } from 'react-native';
import { View } from '@/components/common/Themed';
import GoogleAuth from '@/components/auth/GoogleAuth';

export default function HomeScreen() {
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