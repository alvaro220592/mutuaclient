#!/bin/bash

# para casos em que plugins não funcionam no servidor dev, como o GoogleSignIn
quasar build -m capacitor -T android
npx cap sync android
#npx cap run android # pelo terminal (sem android studio)
android-studio android # pelo andoid studio
