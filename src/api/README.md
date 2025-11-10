# API Module

이 디렉토리는 프론트엔드의 모든 데이터 통신(API 통신)을 관리합니다.

## 파일 구조

- `axios.js`: Axios 인스턴스 설정 및 인터셉터 구성
- `apiService.js`: 공통 API 요청을 위한 헬퍼 함수
- `index.js`: 모듈 export 중앙 관리

## 사용법

### 1. axiosInstance 직접 사용

```javascript
import axiosInstance from '../api/axios';

// GET 요청
const response = await axiosInstance.get('/trip/1');

// POST 요청
const response = await axiosInstance.post('/trip', data);

// FormData 업로드
const formData = new FormData();
formData.append('file', file);
const response = await axiosInstance.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

### 2. apiService 사용 (권장)

```javascript
import { apiService } from '../api';

// GET 요청
const data = await apiService.get('/trip/1');

// POST 요청
const data = await apiService.post('/trip', { name: 'My Trip' });

// 파일 업로드
const formData = new FormData();
formData.append('file', file);
const data = await apiService.upload('/upload', formData);
```

## 주요 기능

### 1. 자동 토큰 관리
- 요청 시 자동으로 access token을 헤더에 추가
- 401 에러 발생 시 자동으로 토큰 갱신 후 재시도

### 2. 토큰 갱신
- Refresh token을 사용하여 자동으로 access token 갱신
- 갱신 실패 시 로컬 스토리지 자동 정리

### 3. 에러 처리
- 일관된 에러 처리 구조
- 네트워크 오류 및 서버 오류 구분

## 환경 변수

`.env` 파일에서 다음 변수를 설정해야 합니다:

```
REACT_APP_SERVER_PORT=http://your-api-server:8080
```

## 주의사항

1. 모든 API 요청은 이 모듈을 통해 수행해야 합니다.
2. 토큰은 자동으로 관리되므로 직접 헤더에 추가하지 마세요.
3. FormData 업로드 시에는 `Content-Type`이 자동으로 설정됩니다.
