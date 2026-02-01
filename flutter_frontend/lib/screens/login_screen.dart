import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
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
      const List<String> requiredScopes = ['email', 'openid', 'profile'];

      final googleSignIn = GoogleSignIn.instance;

      await googleSignIn.initialize(
        serverClientId: webClientId,
      );

      final googleUser = await googleSignIn.authenticate();
      if (googleUser == null) return;

      final idToken = googleUser.authentication.idToken;

      final authorization = await googleUser.authorizationClient.authorizationForScopes(requiredScopes);
      final accessToken = authorization?.accessToken;

      if (idToken == null || accessToken == null) {
        throw 'Missing tokens: ID ($idToken), Access ($accessToken)';
      }

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
          onPressed: _handleGoogleSignIn,
          child: const Text('Google login'),
        ),
      ),
    );
  }
}