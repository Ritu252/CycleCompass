import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Platform } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface AuthInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
  icon?: React.ReactNode;
}

export function AuthInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  icon,
}: AuthInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const styles = StyleSheet.create({
    container: {
      marginBottom: Spacing.three,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: isFocused ? colors.primary : colors.border,
      borderRadius: BorderRadius.medium,
      backgroundColor: isFocused ? colors.accentLight : colors.primaryLight,
      paddingHorizontal: Spacing.three,
      paddingVertical: Platform.OS === 'web' ? Spacing.two : Spacing.three,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.textDark,
      padding: 0,
      fontFamily: 'system-ui',
    },
    icon: {
      marginRight: Spacing.two,
    },
    errorText: {
      color: colors.error,
      fontSize: 12,
      marginTop: Spacing.one,
      marginLeft: Spacing.two,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
