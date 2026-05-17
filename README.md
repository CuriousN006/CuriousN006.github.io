# CuriousN006

GitHub Pages에 배포하는 카테고리 게시판형 개인 블로그입니다.

## 주소

```text
https://curiousn006.github.io/
```

## 디자인 방향

- 회색조 중심의 미니멀 문서형 화면
- 카테고리별 게시판 목록
- 운영자용 글쓰기 양식은 `write.html`에 두되, 공개 메뉴에서는 숨김
- 카테고리와 글 목록은 `data/site.json`에서 관리
- 긴 글 읽기에 맞춘 serif 본문
- 작은 메타데이터, 접히는 세부 정보, 여백 노트
- JavaScript 없이 읽히는 정적 페이지

## 글 추가 방법

1. `posts/new-post.html` 같은 새 글 파일을 만듭니다.
2. `admin.html`에서 카테고리와 글 목록 데이터 파일을 관리합니다.
3. 직접 편집할 때는 `data/site.json`의 `categories`와 `posts`를 수정합니다.
4. 변경 사항을 GitHub에 올리면 Pages가 다시 배포합니다.

`write.html`은 글 모양을 잡기 위한 운영자용 정적 양식입니다. 방문자가 입력해도 저장되거나 게시되지 않습니다.

## GitHub Pages 설정

- Repository: `CuriousN006.github.io`
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/`
