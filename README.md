## about
nsdt-e는 [nosdata.info](https://nosdata.info)에서 사용할 수 있는 크롬 확장 프로그램입니다.

프로그램의 작동 방식은 인가받지 않았으며, nosdata의 업데이트에 따라 사용이 불가능할 수 있습니다.

개발 환경 : manifest v3 / [vitejs](https://vitejs.dev/)

## options

<img width="400" alt="첫 화면" src="https://github.com/yooshnn/nsdt-e/assets/62302421/b78b7056-fb02-4bdd-9b0e-50cbbe20558d">

처음 접근하면 위 스크린샷과 같은 화면이 나타납니다.

<img width="400" alt="image" src="https://github.com/yooshnn/nsdt-e/assets/62302421/ad9dbc90-6ed3-487a-949c-b7fd35f256ae">

**빈 템플릿 추가**를 클릭하고 추가된 템플릿을 선택하면 해당 템플릿을 수정할 수 있는 UI가 나타납니다.

- 회색 입력 박스에서 이름을 수정할 수 있습니다.
- 휴지통 아이콘을 눌러 그룹을 삭제할 수 있습니다.
- 스패너 아이콘을 눌러 그룹의 필터 설정 UI를 여닫을 수 있습니다.
- 최하단의 더하기 아이콘을 눌러 템플릿에 그룹을 추가할 수 있습니다.

! 저장을 누르지 않으면 작업 내역을 잃어버릴 수 있습니다.

## mypage

![image](https://github.com/yooshnn/nsdt-e/assets/62302421/1c0390f4-1a4b-428c-a898-9b5e79c6f77b)

nosdata의 mypage를 열면 위와 같은 박스가 추가됩니다.

여기에서 nosdata에 저장된 플레이 기록을 nsdt-e로 불러올 수 있습니다.

## leveltable_make

![image](https://github.com/yooshnn/nsdt-e/assets/62302421/ebcce492-abfa-41a6-ac9d-76e2c1aa48e9)

nosdata의 leveltable_make를 열면 위와 같은 박스가 추가됩니다.

템플릿을 선택하고 적용하면, 플레이 기록에 존재하는 각 보면이 필터를 통과한 그룹에 자동으로 삽입됩니다.

- 한 보면이 여러개의 그룹에 해당하면 더 위에 있는 그룹에 삽입됩니다.

## todo
- 템플릿 최상단의 블럭이 다른 블럭에 영향을 주는 이슈 수정하기
- 템플릿 수정 UX 개선하기
- 템플릿 적용 방식을 사이트 친화적으로 변경하기 (중요)

## opensources
Draggable UI : https://github.com/daybrush/selecto
