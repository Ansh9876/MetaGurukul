import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.metagurukul.app',
  appName: 'MetaGurukul',
  webDir: 'build',
  server: {
    url: 'https://metagurukul.vercel.app',
    cleartext: true
  }
};

export default config;