import 'package:flutter/material.dart';
import 'package:flutter_frontend/screens/login_screen.dart';
import 'package:flutter_frontend/services/RegisterTokenService.dart';
import 'package:flutter_frontend/services/notification_service.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'landing_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    await dotenv.load(fileName: "config.env");
  } catch (e) {
    print("❌ Env Load Error: $e");
  }

  await Supabase.initialize(
    url: dotenv.env['SUPABASE_URL']!,
    anonKey: dotenv.env['SUPABASE_ANON_KEY']!,
  );

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // initialization of notifications
  final notificationService = NotificationService();
  await notificationService.initNotification();
  await notificationService.requestPermissions();
  await notificationService.initialize();

  try {
    await Registertokenservice().registerToken('email@email@gmail.com');
  } catch (e) {
    print("Token service error: $e");
  }


  runApp(const MyApp());
}
final supabase = Supabase.instance.client;


class MyApp extends StatelessWidget {
  const MyApp({super.key});



  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AI Anki',
      home: LoginScreen(),
    );
  }
  }
