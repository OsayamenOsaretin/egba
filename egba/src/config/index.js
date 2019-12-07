import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:32850`;

const config = {
    // [BASE_URL]: 'http://localhost:8000',
    BASE_URL: `${uri}/v1`
};

export default config;
