# Three.js & r3f(react-three-fiber) 학습 정리

## 설치

**개발환경은 react-vite 혹은 react-ts-vite**

```bash
npm install three
```

### 설치항목 설명

### three.js

Three.js는 웹에서 3D 그래픽을 만들기 위한 JavaScript 라이브러리이다.<br/>
내부적으로 `WebGL`을 기반으로 하며, WebGL은 웹 브라우저에서 하드웨어 가속 3D 그래픽을 그리기 위한 표준이다.<br/>
Three.js를 사용하면 3D 모델을 만들고 렌더링하며, 빛과 재질을 조작하여 현실적인 3D 경험을 웹에 구현할 수 있다.<br/>

<U>해당 문서는 아래 공식 DOCS를 보고 작성되었습니다.<br/></U>
<a href="https://threejs.org/docs/" target="_blank">THREE.js DOCS</a>

```
WebGL: OpenGL ES 2.0기반의 3차원 그래픽스 API를 위한 크로스 플랫폼 웹 표준으로,
웹 브라우저에서 별도의 플러그인을 설치하지 않고도 3차원 그래픽을 표현할 수 있도록 해준다.
```

<br/>
<br/>

# Three.js 기본 구성요소

theeJS에는 가장 중요한 세가지 개념이 존재한다.

### Scene (장면)

Three.js의 모든 요소가 배치되는 공간.<br/>
`Scene`에는 개체, 조명, 카메라를 배치할 수 있다.<br/>
Three.js는 객체 지향 패러다임의 기반이므로, Scene은 생성자를 통해 `Scene 객체`를 생성한다.<br/>
하나 이상의 Scene을 통해 우리는 앱에서 여러 Scene 인스턴스를 생성하고 웹에서 구현할 수 있다.<br/>
Scene이 없다면 어떠한 개체도 표현할 수 없다.

### Camera (카메라)

화면상으로 보이는 장면의 시점을 결정한다.<br/>
Three.js에는 여러 종류의 카메라가 있으며, 대표적으로 `PerspectiveCamera`(원근 카메라)와 `OrthographicCamera`(직교 카메라)가 있다.
어떠한 카메라도 없다면, 아무 것도 볼 수 없다.

### Renderer (렌더러)

Scene과 Camera를 구성했다면, 앱에 추가해야하는데 다른 웹 컴포넌트와 같이 Scene을 DOM에 추가해야한다.<br/>
이 때 렌더러가 제 역할을 한다.<br/>
`WebGLRenderer`이라는 생성자를 통해 `Scene`과 `Camera`를 DOM에 추가한다.<br/>
<br/><br/>
부족한 그림 솜씨로 위 요소를 비유하여 표현하자면 아래와 같다.

![alt text](image.png)

> 극장 내부에서 직접 볼 수 없는 Renderer라는 극장은 Scene이라는 연극들을 상영한다. <br/>이 연극은 외부의 화면으로만 관람이 가능하다.<br/> 각 상영관(Scene)들은 다수의 카메라와 배우들(개체), 조명 등으로 구성된다. <br/>지정된 Camera에 따라 외부의 관람객들은 연극을 관람할 수 있다.

<U>**_이 3가지 요소가 threeJS가 동작하는 필수 요소와 같다._**</U>
<br/><br/>

# 기본 요소 설치

### Scene 생성

threejs에서 무언가를 보여주기 위해서는 `Scene, Camera, Renderer` 세 요소가 필요하다.<br/>
아래의 선언 코드를 살펴보자.

```js
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

생성자를 통해 Scene을 생성한 후, Camera를 선언했다.<br/>
여러 카메라가 있지만 우선 PerspectiveCamera를 사용하도록 한다.<br/>

```js
const camera = new THREE.PerspectiveCamera(
  75, // FOV (Field of View)
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1, // near
  1000 // far
);
```

속성 중 첫번째 인자는 `FOV(Field of View)` 값이다.<br/>
FOV는 카메라의 시야각으로, 값이 클수록 넓은 영역이 보이고 작을수록 시야가 좁아지며 더 많은 객체를 볼 수 있다.<br/><br/>
두번째 인자는 `종횡비(Aspect Ratio)`이다. 화면의 가로 세로 비율을 나타낸다.<br/>
나머지 두 속성은 `near`와 `far` 속성이다.<br/>
near와 far값은 카메라로부터 떨어진 물체가 far보다 멀리 혹은, near보다 가까이 존재한다면 렌더링되지 않게 된다.<br/>

```js
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

`Renderer`는 인스턴스 생성에 이어 사이즈를 설정해 주어야 한다.<br/>
보통 우리가 사용하는 앱의 크기에 맞추기 위해, `browser window`의 너비와 높이를 채워 설정한다.<br/>
화면 크기는 유지한채로 화질만 낮추려면, `setSize`의 세번째 인자로 false를 전달하면 절반의 해상도로 출력된다.

## 예제 - 정육면체 생성
