import React from 'react';
import { StyleSheet, Pressable, Text, ActivityIndicator } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export function AuthButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
}: AuthButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const styles = StyleSheet.create({
    button: {
      backgroundColor: variant === 'primary' ? colors.primary : colors.accent,
      paddingVertical: Spacing.three,
      borderRadius: BorderRadius.medium,
      marginVertical: Spacing.two,
      opacity: disabled || loading ? 0.6 : 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    loader: {
      marginRight: Spacing.two,
    },
  });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && { opacity: 0.8 },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color="#FFFFFF"
          style={styles.loader}
        />
      )}
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}
