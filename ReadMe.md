# Three.js & r3f(react-three-fiber) 학습

## 설치 ##
**개발환경은 react-vite 혹은 react-ts-vite**
```bash
npm install three @react-three/fiber @react-three/drei
```
### 설치항목 설명
세 라이브러리 모두 리액트 웹앱 상에서 JAVASCRIPT를 활용해 3D 그래픽을 생성하기 위한 라이브러리이다.
- **three.js**: WebGL을 사용하여 3D 모델링, 애니메이션, 라이팅, 텍스처 및 기타 기능을 제공한다.
```
WebGL: OpenGL ES 2.0기반의 3차원 그래픽스 API를 위한 크로스 플랫폼 웹 표준으로써, 
웹 브라우저에서 별도의 플러그인을 설치하지 않고도 3차원 그래픽을 표현할 수 있도록 해준다.
```
- **three/fiber**: Three.js를 React 애플리케이션에 통합하기 위한 React 컴포넌트 라이브러리이다. <br/> 
또 리액트의 state와 props를 Three.js 객체와 녹여내기 위한 도구들을 제공한다.
- **three/drei**: Three.js의 유용한 컴포넌트 및 기능 라이브러리이다. <br />
반응형 레이아웃, 카메라 및 조명 구성 요소, 물리 엔진 및 파티클 시스템과 같은 기능을 제공한다.<br/>
Three-drei는 Three.js에 대한 지식을 요구하지 않으므로, Three.js와 React-three-fiber를 모두 사용하지 않고도 Three.js를 사용하여 3D 그래픽을 만들 수 있다.

## Three.js 환경
Three.js에선 3D 개체를 띄우기 위한 3가지 기본 요소 Canvas, Scene, Camera가 존재한다.
![image](https://user-images.githubusercontent.com/110171787/220534567-57c92a9a-d06b-49b0-826e-119438ac7413.png)
<br/> 
<br />
간단하게, 모델과 오브젝트로 구성된 Scene을 Camera로 담아, Renderer로 Canvas HTML에 띄우는 순서이다.


**div element**에 appendchild하여 Canvas화하기 위해 useRef Hook을 사용하여 최상단 div el을 ref로 잇는다.
```javascript
const canvas = useRef(null);
```

**renderer 선언**
```javascript
const renderer = new THREE.WebGLRenderer();
```
appendchild 시에 useRef의 ref가 null을 반환하는 오류가 있어, useEffect훅을 사용하여 null을 체크하였다.<br/>
canvas.current(ref)가 null인 경우, 먼저 해당 Ref가 생성되었는지 확인해야한다.<br/>
Ref는 React 컴포넌트가 마운트될 때 생성된다. 따라서, Ref를 사용하기 전에 컴포넌트의 마운트 여부를 확인하는 것이 좋다.<br/>

```javascript
  useEffect(() => {
    if (canvas.current) {
      renderer.setSize(canvas.current.clientWidth, canvas.current.clientHeight);
      canvas.current.appendChild(renderer.domElement);
    }
  }, [canvas, renderer]);
```

**Camera 선언**
```javascript
  /**
   * 
   * @fov : 카메라가 장면을 담는 시야각. 아래에서 위로. 기본값 50.
   * @aspect : 종횡비 (width / height)로 표현. 기본값 1.
   * @far : 카메라 frustum을 정의하는데 사용하는 근거리값. 기본값 2000. near값보다 커야함 
   * @near : 카메라 frustum을 정의하는데 사용하는 원거리값. 기본값 0.1.
   * frustum: 카메라가 볼 수 있는 전체 영역. 이 영역 내에 있어야 볼 수 있다.
   *
   *  */
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
```

## 선을 그려보자
우선 Renderer, Scene, Camera를 설정해야한다.
```js
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();
```
이후, Material을 설정해준다. Material은 그려질 선의 속성을 의미한다.

```js
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
```
속성을 지정한 후 정점의 정보를 담은 Geometry를 정의한다.
```js
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );
```

**이 때 마운트되는 순서가 중요하다. 이를 알지못해 렌더링을 시키지 못했음**
렌더러가 만들어지고, 캔버스가 생성된 이후 정점과 같은 요소들이 생성되도록 순서를 맞춰주어야한다.

```js
useEffect(() => {
    if (canvas.current) {
      renderer.setSize(canvas.current.clientWidth, canvas.current.clientHeight);
      canvas.current.appendChild(renderer.domElement);

      const points = [];
      points.push(new THREE.Vector3(-10, 0, 0));
      points.push(new THREE.Vector3(0, 10, 0));
      points.push(new THREE.Vector3(10, 0, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(geometry, material);

      scene.add(line);

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    }
  }, [canvas, renderer, scene, camera, material]);
 ```
 animate()가 실행되면 다음과 같이 선이 그려지게 된다. </br>
 ![image](https://user-images.githubusercontent.com/110171787/220545354-ad7bcb87-b84b-41dd-a1b3-c88f835d475a.png)

