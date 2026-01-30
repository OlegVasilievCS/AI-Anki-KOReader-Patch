import 'package:flutter/material.dart';
import 'package:flutter_frontend/services/RegisterTokenService.dart';
import 'package:flutter_frontend/services/notification_service.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';


import 'landing_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  final notificationService = NotificationService();

  // initialization of notifications
  await notificationService.initNotification();
  await notificationService.requestPermissions();
  await notificationService.initialize();
  
  await Registertokenservice().registerToken('email@email@gmail.com');



  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});



  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AI Anki',
      home: LandingPage(),
    );
  }
  }
