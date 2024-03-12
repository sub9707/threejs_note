# threejs의 Light들

## Light

Light들 구현을 위한 추상 기본 클래스.<br/>
조명(Light)은 장면에 조명을 추가하여 그림자, 반사, 그리고 장면의 렌더링을 조절하는 요소이다.<br/>
three.js는 여러 가지 종류의 light를 지원한다.

## AmbientLight

<p align="center">
  <img src="./Images/AmbientLight.png" alt="ambientLight">
</p>

> [그림 출처- Enlightening 3D Worlds: Mastering Lighting Techniques in Three.js](https://medium.com/@althafkhanbecse/title-enlightening-3d-worlds-mastering-lighting-techniques-in-three-js-c860caa8cdcf) > <br/>

`AmbientLight`는 Scene의 모든 객체를 전체적으로 동등하게 비춘다.<br/>
주로 Scene이 완전한 검은색으로 되는 것을 방지하고, 전반적인 휘도를 설정하는데 사용된다.<br/>
방향이 없는 조명이기에 그림자를 투사할 수 없다.<br/>

```js
const light = new THREE.AmbientLight(0x404040); // 흰색 조명
scene.add(light);
```

첫번째 인자로는 RGB의 값을 전달해 `색상`을 설정한다.<br/>
두번째 인자는 `intensity`, `조명의 강도값`을 설정하며 기본값은 1이다.<br/>

## DirectionalLight

<p align="center">
  <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVO_k0cJJJMjBouEPizIcmImLcx5EMKGJ3hskAMkwaN43Uujm8YhCO3pbyPBNRQzOd_yijLJ_p6rgMsLLrhqt0VAiMl46Zl_feltlsdzj-BeSBwMDaqTevPj8Mnyrt55C7q23X9-OEi98/s320/shadow1.png" alt="ambientLight">
</p>

> [그림 출처- Three.js How To Tutorial](https://danni-three.blogspot.com/2013/09/threejs-shadows.html)

특정한 방향으로 비춰지는 평행한 광선의 집합인 조명이다.<br/>
흔히 태양빛을 구현하는데 사용되는데, 태양은 매우 먼 위치에 존재해 있기에 우리가 받는 그 빛은 모두 평행하게 보인다는 특징을 가진다.<br/>
이 조명은 그림자를 투사할 수 있다.<br/>

```js
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
```

파라미터로 전달되는 요소들은 `AmbientLight`와 동일하다.

### properties

### .CastShadow : boolean

true로 설정하면 동적인 그림자를 캐스팅할 수 있다.<br/> 비싸고 그림자가 제대로 보이도록 조정해야한다. 기본값은 false이다.

### .isDirectionalLight : boolean

DirectionalLight 타입인지 체크하는 플래그

### .position : Vector3

조명의 위치를 3차원 벡터값으로 설정한다.

### .target : Object3D

해당 `DirectionalLight`가 향하고 있는 방향을 정의한다.<br/>
일반적으로 특정 객체를 가리키는데 사용하며 그림자의 방향을 제어하는데 영향을 끼친다.<br/>

```js
const targetObject = new THREE.Object3D();
scene.add(targetObject);
light.target = targetObject;
```

이 속성값으로 그림자의 모양과 방향, 크기가 달라진다.<br/>
기본 위치는 (0, 0, 0)이며 기본값을 변경하려면 `Scene`에 추가해야한다.

```js
scene.add(light.target);
```

<br/>

## HemisphereLight

<p align="center">
  <img src="./Images/HemiSphereLight.png">
</p>

> [그림 출처- Three.js - HemisphereLight 光源](https://blog.csdn.net/ithanmang/article/details/81331174)

하늘에서 오는 광선과 지표면에서 반사되는 광선을 모두 시뮬레이션하여 Scene을 비추는 데 사용되는 조명이다.<br/>

```js
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
```
