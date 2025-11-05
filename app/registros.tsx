import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '@/components/common/Themed';
import { router } from 'expo-router';

interface Tutoria {
  id: string;
  materia: string;
  tema: string;
  tutor: string;
  fecha: string;
  estado: 'pendiente' | 'completada' | 'cancelada';
  calificacion?: number;
}

export default function RegistrosScreen() {
  const [filtro, setFiltro] = useState<'todas' | 'pendientes' | 'completadas'>('todas');

  // Datos de ejemplo - en una app real vendrían de Firebase
  const tutorias: Tutoria[] = [
    {
      id: '1',
      materia: 'Matemáticas',
      tema: 'Derivadas',
      tutor: 'Dr. García López',
      fecha: '2025-11-06 10:00',
      estado: 'pendiente',
    },
    {
      id: '2',
      materia: 'Física',
      tema: 'Cinemática',
      tutor: 'Dra. Martínez',
      fecha: '2025-11-04 14:00',
      estado: 'completada',
      calificacion: 5,
    },
    {
      id: '3',
      materia: 'Programación',
      tema: 'Algoritmos',
      tutor: 'Prof. González',
      fecha: '2025-11-02 16:00',
      estado: 'completada',
      calificacion: 4,
    },
    {
      id: '4',
      materia: 'Química',
      tema: 'Estequiometría',
      tutor: 'Dr. Rodríguez',
      fecha: '2025-11-08 11:00',
      estado: 'pendiente',
    },
  ];

  const tutoriasFiltradas = tutorias.filter(tutoria => {
    if (filtro === 'todas') return true;
    if (filtro === 'pendientes') return tutoria.estado === 'pendiente';
    if (filtro === 'completadas') return tutoria.estado === 'completada';
    return true;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return '#FF9800';
      case 'completada': return '#4CAF50';
      case 'cancelada': return '#F44336';
      default: return '#666';
    }
  };

  const renderTutoria = ({ item }: { item: Tutoria }) => (
    <View style={styles.tutoriaCard}>
      <View style={styles.tutoriaHeader}>
        <Text style={styles.materia}>{item.materia}</Text>
        <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(item.estado) }]}>
          <Text style={styles.estadoText}>{item.estado.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.tema}>Tema: {item.tema}</Text>
      <Text style={styles.tutor}>Tutor: {item.tutor}</Text>
      <Text style={styles.fecha}>Fecha: {new Date(item.fecha).toLocaleString('es-ES')}</Text>
      
      {item.calificacion && (
        <View style={styles.calificacionContainer}>
          <Text style={styles.calificacionLabel}>Calificación: </Text>
          <View style={styles.estrellas}>
            {[1, 2, 3, 4, 5].map(star => (
              <Text key={star} style={styles.estrella}>
                {star <= item.calificacion! ? '⭐' : '☆'}
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Mis Registros</Text>
      </View>

      <View style={styles.filtros}>
        {(['todas', 'pendientes', 'completadas'] as const).map((opcion) => (
          <TouchableOpacity
            key={opcion}
            style={[
              styles.filtroButton,
              filtro === opcion && styles.filtroButtonActive
            ]}
            onPress={() => setFiltro(opcion)}
          >
            <Text style={[
              styles.filtroButtonText,
              filtro === opcion && styles.filtroButtonTextActive
            ]}>
              {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{tutorias.filter(t => t.estado === 'pendiente').length}</Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{tutorias.filter(t => t.estado === 'completada').length}</Text>
          <Text style={styles.statLabel}>Completadas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{tutorias.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      <FlatList
        data={tutoriasFiltradas}
        renderItem={renderTutoria}
        keyExtractor={item => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  filtros: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  filtroButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  filtroButtonActive: {
    backgroundColor: '#8D6E63',
    borderColor: '#8D6E63',
  },
  filtroButtonText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  filtroButtonTextActive: {
    color: 'white',
  },
  stats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4D3A',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tutoriaCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  tutoriaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  materia: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4D3A',
  },
  estadoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tema: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  tutor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  fecha: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  calificacionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  calificacionLabel: {
    fontSize: 14,
    color: '#666',
  },
  estrellas: {
    flexDirection: 'row',
  },
  estrella: {
    fontSize: 16,
    marginLeft: 2,
  },
});