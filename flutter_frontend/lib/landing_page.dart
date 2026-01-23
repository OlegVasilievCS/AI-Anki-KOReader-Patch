import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LandingPage extends StatefulWidget {

  @override
  _LandingPageState createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
          children: [
      TextField(
        decoration: InputDecoration(
          border: OutlineInputBorder(),
          hintText: 'Enter a word to add',
        ),
      ),
        TextField(
          decoration: InputDecoration(
            border: OutlineInputBorder(),
            hintText: 'Enter your email',
          ),
        ),
            TextButton(
                onPressed: () =>
                {
                  Navigator.of(context).pushReplacement(
                    MaterialPageRoute(
                      builder: (context) => LandingPage(),
                    ),
                  )
                },
                child: Text("Send")
            )
    ]
      ),
    );
  }
}