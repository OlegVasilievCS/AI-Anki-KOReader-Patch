import 'package:flutter/material.dart';
import 'package:flutter_frontend/services/notification_service.dart';

import 'landing_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final notificationService = NotificationService();

  // initialization of notifications
  await notificationService.initNotification();
  await notificationService.requestPermissions();

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
