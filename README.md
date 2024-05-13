# 노션 클로닝 프로젝트

## Main Page

### Main Page UI

노션 프로젝트를 설명하는 메인 페이지를 구현한다.

- [ ] 메인 페이지의 타이틀을 구현한다.
- [ ] 메인 페이지 바디 부분에 들어갈 내용을 채워넣는다.

## DocumentList

### DocumentList UI 를 구현한다

- [ ] Root Document 를 불러와 하위 리스트들을 렌더링한다.

## DocumentItem

### DocumentItem UI 를 구현한다.

- [ ] 문서 생성 버튼을 추가한다.
- [ ] 문서 삭제 버튼을 추가한다.
- [ ] 토글 버튼을 추가한다.
- [ ] 문서의 제목을 추가한다.
- [ ] 깊이에 따른 padding 값을 추가한다.
- [ ] 문서 제목의 길이가 길어지면 말 줄임표를 사용한다.

### DocumentItem - 글 추가

- [ ] 문서 생성 버튼을 클릭하면 해당 문서의 바로 아래에 문서를 추가한다.
- [ ] 일정 개수 이상의 하위 페이지 생성을 막는다.
- [ ] 새로운 글 쓰기 페이지로 이동한다.

### DocumentItem - 글 삭제

- [ ] 삭제 버튼을 클릭하면 해당 문서를 삭제한다.
- [ ] 하위에 있는 문서들은 루트 문서로 이동한다.

### DocumentItem - 페이지 이동

- [ ] 문서를 클릭하면 해당 페이지를 렌더링한다.
- [ ] history API 로 SPA 를 구현한다.
- [ ] 페이지를 바꾸면 url 창에 바뀐 url을 표시한다.
- [ ] 뒤로가기, 앞으로 가기를 구현한다.

### DocumentItem - 하위 글 목록 보이기

- [ ] 토글 버튼을 클릭하면 하위 페이지를 보여준다.
- [ ] 하위 페이지가 없는 경우 '하위 페이지 없음' 이라는 문구를 띄운다.

## EditorTitle

### EditorTitle UI 구현하기

- [x] 제목을 표시하는 UI 를 구현한다.

### EditorTitle 기능 추가

- [ ] 제목을 변경하면 API 를 호출한다.
- [ ] 변경되는 제목은 실시간으로 DocumentItem 에 반영한다.

## EditorBody

### EditorBody UI 구현하기

- [ ] 글의 내용을 표시한다.

### EditorBody - 글 변경

- [ ] 글을 수정하면 디바운싱처리를 통해 저장 API 를 호출한다.

## 기타 기능

- [ ] div 와 contentEditable 을 이용하여 편집기능을 업그레이드 한다.
- [ ] 낙관적 업데이트를 한다.
- [ ] CSS 작업을 한다.
