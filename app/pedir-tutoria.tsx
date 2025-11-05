import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Text, View } from '@/components/common/Themed';
import { router } from 'expo-router';

export default function PedirTutoriaScreen() {
  const [materia, setMateria] = useState('');
  const [tema, setTema] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaPreferida, setFechaPreferida] = useState('');

  const materias = [
    'Matemáticas',
    'Física',
    'Química',
    'Programación',
    'Inglés',
    'Estadística',
  ];

  const handleSolicitud = () => {
    if (!materia || !tema || !descripcion) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    
    // Aquí irían las llamadas a Firebase para guardar la solicitud
    Alert.alert(
      'Solicitud Enviada', 
      'Tu solicitud de tutoría ha sido enviada. Te contactaremos pronto.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Solicitar Tutoría</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Materia *</Text>
        <View style={styles.materiaContainer}>
          {materias.map((mat) => (
            <TouchableOpacity
              key={mat}
              style={[
                styles.materiaChip,
                materia === mat && styles.materiaChipSelected
              ]}
              onPress={() => setMateria(mat)}
            >
              <Text style={[
                styles.materiaChipText,
                materia === mat && styles.materiaChipTextSelected
              ]}>
                {mat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Tema específico *</Text>
        <TextInput
          style={styles.input}
          value={tema}
          onChangeText={setTema}
          placeholder="Ej: Derivadas, Funciones trigonométricas..."
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Descripción del problema *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Describe qué dificultades tienes o qué temas necesitas repasar..."
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={4}
        />

        <Text style={styles.label}>Fecha preferida (opcional)</Text>
        <TextInput
          style={styles.input}
          value={fechaPreferida}
          onChangeText={setFechaPreferida}
          placeholder="Ej: Esta semana por la tarde"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSolicitud}>
          <Text style={styles.submitButtonText}>📚 Enviar Solicitud</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4D3A',
    marginBottom: 8,
    marginTop: 16,
  },
  materiaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  materiaChip: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  materiaChipSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  materiaChipText: {
    color: '#666',
    fontSize: 14,
  },
  materiaChipTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 30,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    elevation: 3,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});