import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { login, logout, getProtectedResource } from '../api/api';

const LoginScreen = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    const handleLogin = async () => {
        try {
            const tokenLogin = await login(userName, password);
            setToken(tokenLogin);
            Alert.alert('Login successful', 'You are now logged in');
        } catch (error) {
            Alert.alert('Login failed', error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await logout(userName);
            setToken(null);
            Alert.alert('Logout successful', 'You are now logged out');
        } catch (error) {
            Alert.alert('Logout failed', error.message);
        }
    };

    const accessProtectedResource = async () => {
        try {
            const result = await getProtectedResource(token);
            Alert.alert('Protected resource', result.message);
        } catch (error) {
            Alert.alert('Access denied', error.message);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Username:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                value={userName}
                onChangeText={setUserName}
            />
            <Text>Password:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            {token && (
                <>
                    <Button title="Access Protected Resource" onPress={accessProtectedResource} />
                    <Button title="Logout" onPress={handleLogout} />
                </>
            )}
        </View>
    );
};

export default LoginScreen;
