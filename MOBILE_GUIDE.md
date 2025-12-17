# Mobile App Guide (Android)

This project is configured with **Capacitor** to run as a native Android app.

## Prerequisites

1.  **Install Android Studio**: Download from [developer.android.com](https://developer.android.com/studio).
2.  **Java/JDK**: Included with Android Studio usually.

## How to Build the App (APK)

1.  **Open in Android Studio**:
    Run this command in your terminal (or open the `android` folder manually in Android Studio):

    ```bash
    npm run cap:android
    ```

2.  **Build**:
    - Wait for Gradle sync to finish.
    - Go to **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
    - Once done, click "locate" to find the `.apk` file.
    - You can send this APK to your phone to install it!

## Publishing to Google Play

1.  **Create Developer Account**: Go to [play.google.com/console](https://play.google.com/console) ($25 fee).
2.  **Generate Signed Bundle**:
    - In Android Studio: **Build** > **Generate Signed Bundle / APK**.
    - Choose **Android App Bundle (.aab)**.
    - Create a new **Key Store** (keep this file safe!).
    - Finish the wizard to generate the `.aab` file.
3.  **Upload**: Upload this `.aab` file to the Google Play Console.

## iOS (iPhone)

Since you are on Windows, you cannot build the iOS app directly. You need to copy this project to a Mac computer and run `npm run cap:ios` to open Xcode.
