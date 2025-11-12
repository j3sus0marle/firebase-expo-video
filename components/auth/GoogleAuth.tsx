import React, { useState, useEffect  } from 'react';
import { Button, View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const redirectUri = "https://auth.expo.io/@kadirperez/firebase-expo-video"

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '363023465739-f0bj3kgjcfruv8l2737m8ooeliu1d2tj.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    redirectUri
  })

  useEffect(() => {
    console.log('Redirect URI:', redirectUri);
    console.log('useEffect ejecutado, response:', response);

    if (response?.type === 'success' && response.authentication) {
      console.log('Respuesta de autenticación:', response.authentication);
    }
  }, [response]);


  if (!user) {
    return (
      <View style={styles.loginContainer}>
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>Sistema Tutorías</Text>
          <Text style={styles.loginSubtitle}>Accede con tu cuenta institucional para gestionar tus tutorías académicas</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
          ) : (
            <>
              
              <Button
                disabled={!request}
                title="Iniciar sesión con Google"
                onPress={() => promptAsync()}
              />

              
              <Text style={styles.orText}>o</Text>
              
              <TouchableOpacity 
                style={styles.demoButton} 
                onPress={() => {
                  setUser({
                    displayName: 'Omar Estudiante',
                    email: 'omar.estudiante@universidad.edu',
                    uid: 'demo-user'
                  });
                }}
              >
                <Text style={styles.demoButtonText}>Ver Demo del Sistema</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userSection}>
          <Text style={styles.welcomeText}>¡Hola, {user.displayName?.split(' ')[0] || 'Usuario'}!</Text>
          <Text style={styles.emailText}>{user.email}</Text>
        </View>
      </View>

      {/* Contenido principal */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sistema de Tutorías Universitarias</Text>
          <Text style={styles.cardText}>Bienvenido a tu plataforma de gestión de tutorías académicas</Text>
          <Text style={styles.studentName}>Alumno: {user.displayName || 'Usuario'}</Text>
          <Text style={styles.studentEmail}>Email institucional: {user.email}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Tutorías Pendientes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Tutorías Completadas</Text>
          </View>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>Acciones Rápidas</Text>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/pedir-tutoria')}
          >
            <Text style={styles.actionButtonText}>📚 Pedir Tutoría</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => router.push('/registros')}
          >
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>📋 Ver Registros</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Estado de Tutorías</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Próxima tutoría:</Text>
            <Text style={styles.infoValue}>Matemáticas - Mañana 10:00 AM</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tutor asignado:</Text>
            <Text style={styles.infoValue}>Dr. García López</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Materias disponibles:</Text>
            <Text style={styles.infoValue}>5 materias activas</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos de login
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loginCard: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 5,
    minWidth: 300,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4D3A',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    elevation: 3,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: '#D32F2F',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#FFEBEE',
    padding: 10,
    borderRadius: 5,
  },

  // Estilos de dashboard
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  userSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4D3A',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#8D6E63',
    flex: 0.48,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  actionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4D3A',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8D6E63',
  },
  secondaryButtonText: {
    color: '#8D6E63',
  },

  // Nuevos estilos para el sistema de tutorías
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4D3A',
    marginTop: 10,
  },
  studentEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4D3A',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2E4D3A',
    flex: 1,
    textAlign: 'right',
  },

  // Estilos para demo
  orText: {
    fontSize: 14,
    color: '#999',
    marginVertical: 15,
  },
  demoButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#8D6E63',
  },
  demoButtonText: {
    color: '#8D6E63',
    fontSize: 14,
    fontWeight: '500',
  },
});