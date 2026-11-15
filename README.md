# Venn 랜딩페이지

정적 사이트 (빌드 없음). Cloudflare Pages에서 저장소 루트를 그대로 배포합니다.

- `index.html` 랜딩
- `thanks.html` 신청 완료 페이지 (Tally 제출 후 이동할 주소)
- `privacy.html` 개인정보처리방침 초안 ([ ] 항목 채우기, 법률 검토 필요)
- `assets/main.js` 맨 위 `FORM_URL`에 Tally 폼 주소를 넣으면 모든 "가입 심사 요청" 버튼이 폼으로 연결됩니다.
- 메타 픽셀: `index.html`, `thanks.html`의 `[META PIXEL]` 주석 자리에 코드를 붙여넣습니다.
