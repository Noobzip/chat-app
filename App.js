import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://192.168.0.113:3000');

export default function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO');
    });

    socket.on('disconnect', () => {
      console.log('Desconectado do servidor Socket.IO');
    });

    socket.on('message', (newMessage) => {
      console.log('Mensagem recebida:', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect(); // Fecha a conexão do socket ao desmontar o componente
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      console.log('Enviando mensagem:', message);
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat App</Text>
      <View style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <Text key={index} style={styles.message}>
            {msg}
          </Text>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma mensagem..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#000',
    backgroundColor: '#fff',
  },
  button: {
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});