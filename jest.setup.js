import 'react-native-gesture-handler/jestSetup';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Animated: `useNativeDriver` is not supported']);
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
}));