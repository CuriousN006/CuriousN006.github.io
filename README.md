# CuriousN006

GitHub Pages에 배포하는 Decap CMS 기반 카테고리 게시판형 개인 블로그입니다.

## 주소

```text
https://curiousn006.github.io/
```

## 디자인 방향

- 회색조 중심의 미니멀 문서형 화면
- 카테고리별 게시판 목록
- 운영자용 글쓰기 양식은 `write.html`에 두되, 공개 메뉴에서는 숨김
- 카테고리는 `_boards/*.md`에서 관리
- 글은 `_posts/*.md`에서 관리
- `/admin/`에서 Decap CMS로 카테고리와 글을 GUI 편집
- 긴 글 읽기에 맞춘 serif 본문
- 작은 메타데이터, 접히는 세부 정보, 여백 노트
- JavaScript 없이 읽히는 정적 페이지

## 글 추가 방법

1. `/admin/`으로 이동합니다.
2. GitHub로 로그인합니다.
3. `카테고리` 또는 `글` 컬렉션에서 항목을 추가/수정합니다.
4. 저장하면 Decap CMS가 GitHub 저장소에 커밋합니다.
5. GitHub Pages가 다시 빌드되면 블로그에 반영됩니다.

`write.html`과 `admin.html`은 `/admin/`으로 이동하는 호환용 페이지입니다.

## GitHub Pages 설정

- Repository: `CuriousN006.github.io`
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/`
