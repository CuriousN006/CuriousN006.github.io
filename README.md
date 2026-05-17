# CuriousN006

GitHub Pages에 배포하는 카테고리 게시판형 개인 블로그입니다.

## 주소

```text
https://curiousn006.github.io/
```

## 디자인 방향

- 회색조 중심의 미니멀 문서형 화면
- 카테고리별 게시판 목록
- 글쓰기 화면에서 카테고리 선택
- 긴 글 읽기에 맞춘 serif 본문
- 작은 메타데이터, 접히는 세부 정보, 여백 노트
- JavaScript 없이 읽히는 정적 페이지

## 글 추가 방법

1. `posts/new-post.html` 같은 새 글 파일을 만듭니다.
2. `index.html`의 전체 글 표에 새 행을 추가합니다.
3. 해당 카테고리 파일, 예를 들어 `categories/memo.html`, 에도 새 행을 추가합니다.
4. 날짜와 카테고리를 함께 적습니다.
5. 변경 사항을 GitHub에 올리면 Pages가 다시 배포합니다.

## GitHub Pages 설정

- Repository: `CuriousN006.github.io`
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/`
