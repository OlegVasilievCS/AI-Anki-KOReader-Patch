import 'dart:convert';

import 'package:http/http.dart' as http;

import 'notification_service.dart';

class Registertokenservice {

  Future<void> registerToken(String email) async {
    String? token = await NotificationService().messaging.getToken();

    const String localUrlEmulator = 'http://10.0.2.2:8080/send'; // Local emulator
    const String localUrlEmulatorToken = 'http://10.0.2.2:8080/register-token'; // Local emulator token
    const String localUrlPhone = 'http://192.168.2.39:8080/send'; //Local phone
    const String prodUrl = 'https://anki-backend-733978988444.us-central1.run.app/send';

    if (token != null){
      await http.post(
        Uri.parse(localUrlPhone),
        body: jsonEncode({'email': email, 'fcm_token': token}),
        headers: {'Content-Type': 'application/json'},
      );
    }
  }
}