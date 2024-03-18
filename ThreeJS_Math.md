# ThreeJS 수학식

threejs를 2D, 3D 공간에서 효율적으로 사용하기 위해서는 수학적 개념과 함수가 필요하다.<br/>
어떤 개념들이 있는지 살펴보고 활용방법에 대해 알아보자.<br/>

### 목차

1.[Box2]() 2.[Box3]() 3.[Cylindrical]() 4.[Euler]() 6.[Frustum]() 7.[Interpolant]() 8.[Line3]() 9.[MathUtils]() 10.[Matrix3]() 11.[Matrix4]() 12.[Plane]() 13.[Quaternion]() 14.[Ray]() 15.[Sphere]() 16.[SphericalHarmonics3]() 17.[Triangle]() 18.[Vector2]() 19.[Vector3]() 20.[Vector4]()

## Box2

2D 공간에서 Axis-Aligned Bounding Box(AABB: 모든 면 법선이 좌표축과 일치하는 박스, 충돌체크 용으로 사용)를 표현한다.<br/>

```javascript
const box = new Box2(min:Vector2, max:Vector2);
// min: 박스 아래쪽 x, y 경계를 나타내는 Vector2값
// max: 박스 윗쪽 x, y 경계를 나타내는 Vector2값
// 둘 다 기본값은 (+INF, -INF)이다.
```

활용할 수 있는 메서드는 아래와 같다.

```javascript
box.clampPoint(point : Vector2, target : Vector2) : Vector2 // 고정점과 타겟 설정
box.clone(): Box2 // 같은 속성을 가진 Box2를 반환한다.
box.copy(box:Box2):this // 해당 Box 객체로부터 min과 max값을 복제함
box.distanceToPoint(point : Vector2):Float // 해당 점까지 거리를 표현함. 내부의 점이라면 0
box.eqauls(box:Box2):Boolean // 같은 Box인지 판별
box.expandByPoint ( point : Vector2 ) : this // 점을 포함하도록 확장시킴
box.expandByScalar ( scalar : Float ) : this // 스칼라량의 거리만큼 확장시킴
box.expandByVector ( vector : Vector2 ) : this // 백터량의 거리만큼 확장시킴
box.getCenter ( target : Vector2 ) : Vector2 // box의 중심 좌표를 반환한다
box.getSize ( target : Vector2 ) : Vector2 // target에 box의 크기가 반환된다.
box.intersectsBox ( box : Box2 ) : Boolean // 두 box가 교차하는지 체크한다.
box.union ( box : Box2 ) : this // 파라미터로 전달된 박스를 해당 박스에 합친다.
```

[메서드 더보기](https://threejs.org/docs/#api/en/math/Box2)<br/>

## Box3

3D 공간에서 `Axis-Aligned Bounding Box`를 나타낸다.

```javascript
const box = new THREE.Box3();

const mesh = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshBasicMaterial()
);
```

활용할 수 있는 메서드는 Box2와 많이 일치하나, 교차 체크 메서드가 추가된다.<br/>

```js
box..intersectsPlane ( plane : Plane ) : Boolean // 평면과 교차하는지
box.intersectsSphere ( sphere : Sphere ) : Boolean // 구와 교차하는지
box.intersectsTriangle ( triangle : Triangle ) : Boolean // 삼각뿔과 교차하는지
```

## Cylindrical (원기둥 좌표계)

 <p align="center">
  <img src="./Images/Cylindrical Coordinate.png"  width="50%" alt="OPENGL">
</p>

> [자료 출처 - Math Insight \_ Applet: Cylindrical coordinates](https://mathinsight.org/applet/cylindrical_coordinates)

Three.js에서 `Cylindrical`은 원기둥 좌표계를 나타내는 클래스를 의미한다.<br/>
이 좌표계는 3D 공간에서 원기둥 형태의 좌표를 사용하여 벡터를 나타낸다.<br/>

```js
new Cylindrical( radius : Float, theta : Float, y : Float )
// radius: 원기둥의 반지름. 원기둥의 중심에서 벡터가 위치한 평면까지의 거리이다.
// theta: 원기둥의 중심 축(axis)을 따라 벡터가 위치한 각도
// y: 벡터의 높이(y축 값)
```

## Euler (오일러 각)

 <p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Eulerangles.svg/250px-Eulerangles.svg.png"  width="30%" alt="OPENGL">
</p>

오일러 각을 나타내는 클래스이다.<br/><br/>
`오일러 각`은 3차원 공간에서 물체의 회전을 나타내는 방법 중 하나이다. <br/>
여기에선 물체의 회전을 세 축 주위 각도로써 설명한다.<br/>
위 그림에선 α, β, γ가 주위 각도에 해당한다.<br/>
오일러 각의 범위는 α와 γ의 경우 이상적인 상황에서 `2π 라디안`까지이며, β의 경우 `-π/2에서 π/2까지`가 된다.<br/>
β 범위가 제한적인 것을 짐벌 락(영어: gimbal lock)이라 하는데, 이는 앞서 회전한 두 축의 영향으로 세 번째 회전의 가동 범위가 줄어들기 때문이다.<br/>

> [그림 자료 및 오일러 각 설명 - 위키피디아 \_ 오일러 각](https://ko.wikipedia.org/wiki/%EC%98%A4%EC%9D%BC%EB%9F%AC_%EA%B0%81)

```js
const a = new THREE.Euler(0, 1, 1.57, "XYZ");
const b = new THREE.Vector3(1, 0, 1);
b.applyEuler(a);
```

네번째 인자로 `order`가 전달되는데, 회전이 적용되는 순서를 나타내는 문자열이다.<br/>
문자열의 순서가 달라진다면 회전 순서가 달라지게된다.<br/>

## Frustum (절두체)

 <p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Usech_kvadrat_piramid.png/110px-Usech_kvadrat_piramid.png"  width="30%" alt="OPENGL">
</p>

> [그림 자료 - 위키피디아 \_ 절두체](https://ko.wikipedia.org/wiki%EC%A0%88%EB%91%90%EC%B2%B4)

`Frustum`은 입체 개체를 절단하여 상부와 바닥이 평행한 절두체(머리가 잘린 입체형태)를 의미한다.

 <p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr2Z18lkjHKYBt6PCzGszXek60_ysYOUs2NS5En8mAJC1TlnaneuRnzh_E8EkjLBsr_FU&usqp=CAU"  width="30%" alt="OPENGL">
</p>

threejs에서는 위 사진과 같이 주로 카메라 시야 안에 무엇이 있는지 결정할 때 사용한다.<br/>
또한 카메라의 `원근 투영(perspective projection)` 또는 `직교 투영(orthographic projection)`에 따라 다르게 정의된다.<br/>

`Frustum`은 일반적으로 위 사진에서 보이듯 6개의 면으로 구성된다.<br/>
각 면은 Array 형식으로 나열되며, 시야를 제한하고, 렌더링되는 객체가 카메라 시야 내에 있는지 확인하는 데 사용할 수 있다.<br/>
가령, 객체가 Frustum 밖에 있는 경우, 해당 객체를 렌더링하지 않고 성능을 최적화하는 방식을 적용할 수 있다.

```js
new Frustum(p0 : Plane, p1 : Plane, p2 : Plane, p3 : Plane, p4 : Plane, p5 : Plane)
```
