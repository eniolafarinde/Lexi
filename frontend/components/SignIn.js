import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://<YOUR-IP>:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Welcome', `Signed in as ${data.email}`);
      } else {
        Alert.alert('Login Failed', data.detail || 'Invalid credentials');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Check your network.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E23',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#EDEDED',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1A1A3C',
    color: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4C5CFF',
  },
  button: {
    backgroundColor: '#4C5CFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    color: '#4C5CFF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});
