import 'package:flutter/material.dart';

class LandingPage extends StatefulWidget {
  const LandingPage({super.key});

  @override
  State<LandingPage> createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  String _wordToSend = '';
  String _userEmail = '';

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