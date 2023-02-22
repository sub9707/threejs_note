# Three.js & r3f(react-three-fiber) 학습

## 설치 ##
**개발환경은 react-vite 혹은 react-ts-vite**
```bash
npm install three @react-three/fiber @react-three/drei
```
### 설치항목 설명 ###
세 라이브러리 모두 리액트 웹앱 상에서 JAVASCRIPT를 활용해 3D 그래픽을 생성하기 위한 라이브러리이다.
- **three.js**: WebGL을 사용하여 3D 모델링, 애니메이션, 라이팅, 텍스처 및 기타 기능을 제공한다.
- **three/fiber**: Three.js를 React 애플리케이션에 통합하기 위한 React 컴포넌트 라이브러리이다. <br/> 
또 리액트의 state와 props를 Three.js 객체와 녹여내기 위한 도구들을 제공한다.
- **three/drei**: Three.js의 유용한 컴포넌트 및 기능 라이브러리이다. <br />
반응형 레이아웃, 카메라 및 조명 구성 요소, 물리 엔진 및 파티클 시스템과 같은 기능을 제공한다.<br/>
Three-drei는 Three.js에 대한 지식을 요구하지 않으므로, Three.js와 React-three-fiber를 모두 사용하지 않고도 Three.js를 사용하여 3D 그래픽을 만들 수 있다.
