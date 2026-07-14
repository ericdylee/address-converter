import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

// vitest가 tsconfig의 "@/*" → 프로젝트 루트 경로 alias를 알도록 맞춰 준다.
// (기존 lib 테스트는 상대경로만 써서 필요 없었지만, @/lib/* 를 import 하는
//  모듈을 테스트하려면 이 매핑이 있어야 한다.)
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
});
