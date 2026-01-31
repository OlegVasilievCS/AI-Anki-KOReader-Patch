import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
// Use a clean import without 'as' first to see if it resolves
import 'package:google_sign_in/google_sign_in.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../landing_page.dart';
import '../main.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  void initState() {
    super.initState();
    _setupAuthListener();
  }

  void _setupAuthListener() {
    supabase.auth.onAuthStateChange.listen((data) {
      if (data.event == AuthChangeEvent.signedIn && mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => const LandingPage()),
        );
      }
    });
  }

  Future<void> _handleGoogleSignIn() async {
    try {
      final webClientId = dotenv.env['GOOGLE_WEB_CLIENT_ID']!;
      // We will use these scopes to request the Access Token specifically
      const List<String> requiredScopes = ['email', 'openid', 'profile'];

      final googleSignIn = GoogleSignIn.instance;

      // 1. Initialize the instance exactly once
      await googleSignIn.initialize(
        serverClientId: webClientId,
      );

      // 2. Authenticate the user (Identity only)
      // In v7.2.0, this method takes no parameters
      final googleUser = await googleSignIn.authenticate();
      if (googleUser == null) return;

      // 3. Get the ID Token (Authentication)
      final idToken = googleUser.authentication.idToken;

      // 4. Request Authorization for Scopes (To get the Access Token)
      // This is the new way to handle scopes in v7.x
      final authorization = await googleUser.authorizationClient.authorizationForScopes(requiredScopes);
      final accessToken = authorization?.accessToken;

      if (idToken == null || accessToken == null) {
        throw 'Missing tokens: ID ($idToken), Access ($accessToken)';
      }

      // 5. Sign in to Supabase
      await supabase.auth.signInWithIdToken(
        provider: OAuthProvider.google,
        idToken: idToken,
        accessToken: accessToken,
      );
    } catch (error) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Sign in error: $error')),
        );
      }
      print('Detailed Error: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login')),
      body: Center(
        child: ElevatedButton(
          onPressed: _handleGoogleSignIn, // Pointing directly to the function
          child: const Text('Google login'),
        ),
      ),
    );
  }
}