#!/usr/bin/env bash
# Claude Code PreToolUse hook.
# - Bash 도구 호출만 검사
# - 명령어가 `git commit ...` 으로 시작할 때만 lint + build 실행
# - 실패하면 exit 2 로 commit 차단 (stderr로 이유 전달)
set -u

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"

# stdin JSON 읽기
payload="$(cat)"

tool_name="$(printf '%s' "$payload" | jq -r '.tool_name // empty')"
if [ "$tool_name" != "Bash" ]; then
  exit 0   # Bash 외 도구는 통과
fi

cmd="$(printf '%s' "$payload" | jq -r '.tool_input.command // empty')"

# `git commit ...` 으로 시작하는 명령만 대상.
# (cd, env 등이 앞에 붙거나 따옴표 처리된 경우도 잡기 위해 단순 패턴 사용)
case "$cmd" in
  *"git commit"*) ;;
  *) exit 0 ;;
esac

cd "$PROJECT_DIR" || exit 0

# package.json이 없으면 검사할 게 없음
if [ ! -f package.json ]; then
  exit 0
fi

echo "🔍 pre-commit: lint + build 검사 시작..." >&2

# 1) Lint
if ! npm run lint --silent >/tmp/claude-pre-commit-lint.log 2>&1; then
  {
    echo ""
    echo "❌ pre-commit hook: \`npm run lint\` 실패 — commit 차단"
    echo "------------- lint 로그 (tail) -------------"
    tail -n 40 /tmp/claude-pre-commit-lint.log
    echo "--------------------------------------------"
    echo "수정 후 다시 commit 하세요."
  } >&2
  exit 2
fi

# 2) Build
if ! npm run build --silent >/tmp/claude-pre-commit-build.log 2>&1; then
  {
    echo ""
    echo "❌ pre-commit hook: \`npm run build\` 실패 — commit 차단"
    echo "------------- build 로그 (tail) ------------"
    tail -n 60 /tmp/claude-pre-commit-build.log
    echo "--------------------------------------------"
    echo "수정 후 다시 commit 하세요."
  } >&2
  exit 2
fi

echo "✅ pre-commit: lint + build 통과" >&2
exit 0
