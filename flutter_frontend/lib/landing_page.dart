import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LandingPage extends StatefulWidget {

  @override
  _LandingPageState createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  String _wordToSend = '';
  String _userEmail = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
          children: [
      TextField(
        decoration: InputDecoration(
              label: Text('Enter a word to add')
        ),
        onChanged: (value) {
          setState(() {
            _wordToSend = value;
          });
        },
      ),
        TextField(
          keyboardType: TextInputType.emailAddress,
          decoration: InputDecoration(
            label: Text('Enter your email')
          ),
          onChanged: (value) {
            setState(() {
              _userEmail = value;
            });
          },
        ),
            TextButton(
                onPressed: () =>
                {
                  print(_userEmail),
                  print(_wordToSend)
                },
                child: Text("Send")
            )
    ]
      ),
    );
  }
}