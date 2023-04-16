# Canvas element 다루기

## 설치 ##
**개발환경은 react-vite**
```bash
npm install
```
## 출처
fastcampus - 21개 프로젝트로 완성하는 인터랙티브 웹 개발 with Three.js & Canvas. <br/>
html/css로 제작된 강의 내용을 react 용으로 옮겨 담아 리액트 라이프 사이클에 맞게 수정하였음.<br/>
## 결과물
![image](https://user-images.githubusercontent.com/110171787/232320386-fd95aa9a-214b-4193-8080-acb82cb3e4e2.png)
- 화면 넓이에 따라 개체 수의 밀도가 정해지며, 랜덤 위치에서 생성된 공 요소가 가속을 받으며 아래로 떨어진다.<br/>
- 이 때 요소는 blur와 colorMatrix SVG 필터를 통해 gooey 효과와 같이 쫀득한 필터를 거쳐 개성있는 파티클로 보일 수 있다.<br/>
- dat.gui를 통해 panel로 필터 수치를 조절할 수 있다.<br/>
## 코드 설명




