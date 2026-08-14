import { FirebaseMessaging } from '@capacitor-firebase/messaging'

export const configurarFirebase = async () => {
    const { receive } = await FirebaseMessaging.requestPermissions()

    alert(JSON.stringify('Permissão para notificações: ' + receive))

    const { token } = await FirebaseMessaging.getToken()

    alert(JSON.stringify('TOKEN FCM: ' + token))

    return token
}