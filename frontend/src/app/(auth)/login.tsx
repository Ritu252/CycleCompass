import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { AuthInput } from '@/components/auth-input';
import { AuthButton } from '@/components/auth-button';
import { authService } from '@/services/authService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await authService.login({ email, password });
      Alert.alert('Success', 'Logged in successfully!');
      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error instanceof Error ? error.message : 'An error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.softWhite,
    },
    safeArea: {
      flex: 1,
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: Spacing.four,
      paddingVertical: Spacing.five,
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: Spacing.six,
    },
    gradientCircle: {
      width: 80,
      height: 80,
      borderRadius: BorderRadius.full,
      backgroundColor: colors.primary,
      opacity: 0.1,
      marginBottom: Spacing.three,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.textDark,
      textAlign: 'center',
      marginBottom: Spacing.one,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    formContainer: {
      marginBottom: Spacing.four,
    },
    buttonContainer: {
      marginTop: Spacing.three,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Spacing.four,
    },
    footerText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    signupLink: {
      color: colors.primary,
      fontWeight: '600',
      marginLeft: Spacing.one,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.gradientCircle} />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Log in to track your cycle and wellness
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <AuthInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={errors.email}
          />
          <AuthInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />
        </View>

        {/* Login Button */}
        <View style={styles.buttonContainer}>
          <AuthButton
            title="Log In"
            onPress={handleLogin}
            loading={loading}
            variant="primary"
          />
        </View>

        {/* Sign Up Link */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
