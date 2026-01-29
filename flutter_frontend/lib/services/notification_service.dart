import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class NotificationService {
  NotificationService._internal();

  static final NotificationService instance = NotificationService._internal();

  factory NotificationService() => instance;

  final notificationPlugin = FlutterLocalNotificationsPlugin();

  FirebaseMessaging messaging = FirebaseMessaging.instance;

  Future<void> initialize() async {
    final token = await messaging.getToken();
    print('FCM Token: $token');
  }


  bool _isInitialized = false;

  bool get isInitialized => _isInitialized;

  Future<void> requestPermissions() async {
    final androidImplementation =
    notificationPlugin.resolvePlatformSpecificImplementation<
        AndroidFlutterLocalNotificationsPlugin>();

    if (androidImplementation != null) {
      await androidImplementation.requestNotificationsPermission();
    }
  }

  Future<void> initNotification() async {
    if (_isInitialized) return;

    const initSettingAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');

    const initSettings = InitializationSettings(android: initSettingAndroid);

    await notificationPlugin.initialize(settings: initSettings);
  }

  NotificationDetails notificationDetails() {
    return const NotificationDetails(
      android: AndroidNotificationDetails(
          'daily_channel_id',
          'Daily Notification',
      channelDescription: 'Daily Notification Channel',
      importance: Importance.max,
      priority: Priority.max)
    );
  }

  Future<void> showNotification( {
    int id = 0,
    String? title,
    String? body,
  }) async {
    return notificationPlugin.show(
        id: id,
        title: title,
        body: body,
        notificationDetails: notificationDetails()
    );
  }
}