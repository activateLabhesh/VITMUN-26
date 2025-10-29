import admin from 'firebase-admin';

if (process.env.NODE_ENV === 'production') {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
        throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON env variable is not set.');
    }
    const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin initialized (Production Mode)');
} else {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        throw new Error('GOOGLE_APPLICATION_CREDENTIALS env variable is not set. Did you create .env?');
    }
    admin.initializeApp({
        credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    });
    console.log('Firebase Admin initialized (Development Mode)');
}


export const db = admin.firestore();
