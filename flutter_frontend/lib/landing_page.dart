import 'package:flutter/material.dart';
import 'package:flutter_frontend/services/notification_service.dart';
import 'dart:convert';

import 'package:http/http.dart' as http;

class LandingPage extends StatefulWidget {
  const LandingPage({super.key});

  @override
  State<LandingPage> createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  String _wordToSend = '';
  String _userEmail = '';
  final TextEditingController _controller = new TextEditingController();


  Future<http.Response> sendWordToAPI() {
    const String localUrl = 'http://10.0.2.2:8080/send'; // Local emulator
    const String localUrlPhone = 'http://192.168.2.39:8080/send'; //Local phone
    const String prodUrl = 'https://anki-backend-733978988444.us-central1.run.app/send';
    return http.post(
      Uri.parse(localUrlPhone),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'word': _wordToSend,
         'email': _userEmail,
      }),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.book, size: 80, color: Colors.blue),
              const SizedBox(height: 24),
              const SizedBox(height: 32),

              TextField(
                controller: _controller,
                decoration: const InputDecoration(
                  labelText: 'Enter a word to add',
                  prefixIcon: Icon(Icons.text_fields),
                  border: OutlineInputBorder(),
                ),
                onChanged: (value) => setState(() => _wordToSend = value),
              ),
              const SizedBox(height: 16),

              TextField(
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(
                  labelText: 'Enter your email',
                  prefixIcon: Icon(Icons.email_outlined),
                  border: OutlineInputBorder(),
                ),
                onChanged: (value) => setState(() => _userEmail = value),
              ),
              const SizedBox(height: 32),

              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 54),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                onPressed: () {
                  if (_wordToSend.isNotEmpty && _userEmail.isNotEmpty){
                    sendWordToAPI();
                    NotificationService().showNotification(
                      title: 'Word Sent',
                      body: _wordToSend + ' was sent',

                    );
                    _controller.clear();
                  } else {
                    print("Fields are empty");
                  }
                  print('Email: $_userEmail');
                  print('Word: $_wordToSend');
                },
                child: const Text("Send Word", style: TextStyle(fontSize: 18)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}