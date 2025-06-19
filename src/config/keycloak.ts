import Keycloak from 'keycloak-js';

// Thông tin kết nối Keycloak từ biến môi trường hoặc cấu hình
const keycloakConfig = {
  url: process.env.REACT_APP_KEYCLOAK_URL || 'http://localhost:8080',
  realm: process.env.REACT_APP_KEYCLOAK_REALM || 'score-view-portal',
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || 'score-frontend',
};

// Khởi tạo Keycloak instance
const keycloakInstance = new Keycloak(keycloakConfig);

export default keycloakInstance;