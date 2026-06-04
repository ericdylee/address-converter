// 일본우편(Japan Post) 공식 로마자 우편번호 데이터(KEN_ALL_ROME.CSV)를
// 앱에서 바로 조회할 수 있는 JSON(data/jp-postal.json)으로 변환하는 빌드 스크립트입니다.
//
// 왜 필요한가:
//   - 일본은 한국(juso)처럼 "영문 주소"를 바로 주는 무료 라이브 API가 없습니다.
//   - 대신 일본우편이 우편번호↔로마자 주소 데이터를 무료 배포하므로, 이를 미리 정제해
//     우편번호로 즉시 조회 가능한 형태(JSON)로 만들어 둡니다. 런타임은 조회만 합니다.
//
// 사용법:
//   node scripts/build-jp-postal.mjs            # 일본우편 사이트에서 zip 다운로드 후 변환
//   node scripts/build-jp-postal.mjs <CSV경로>   # 이미 받아둔 KEN_ALL_ROME.CSV 사용
//
// 데이터는 1년에 한 번 정도 갱신됩니다. 갱신 시 이 스크립트를 다시 실행해 JSON을 교체하세요.

import { execSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import iconv from "iconv-lite";

const ZIP_URL =
  "https://www.post.japanpost.jp/service/search/zipcode/download/roman/KEN_ALL_ROME.zip";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "data", "jp-postal.json");

// CSV 컬럼 순서(로마자판):
// 0: 우편번호(7자리)  1: 도도부현(한자)  2: 시구정촌(한자)  3: 정역=동네(한자)
// 4: 도도부현(로마자)  5: 시구정촌(로마자)  6: 정역=동네(로마자)  ← 모두 대문자

// 시·구·정·촌 등 행정구역 접미사. 영문 표기 시 앞 단어에 하이픈으로 붙입니다.
// 예: "SAPPORO SHI CHUO KU" → "Sapporo-shi Chuo-ku"
const CITY_SUFFIXES = new Set(["SHI", "KU", "CHO", "MACHI", "MURA", "GUN", "SON"]);
// 도도부현 접미사. State 칸 용도라 표준 표기(접미사 제거)가 붙여넣기에 적합합니다.
// 예: "TOKYO TO" → "Tokyo", "OSAKA FU" → "Osaka", "KANAGAWA KEN" → "Kanagawa"
const PREF_SUFFIXES = new Set(["TO", "FU", "KEN"]);

// 단어별 첫 글자만 대문자로 (공백/문자열 시작 경계 기준). "CHIYODA" → "Chiyoda".
// 하이픈 뒤는 대문자화하지 않습니다 — 접미사 "-ku"/"-shi"는 소문자로 유지해야 하므로.
function titleCase(s) {
  return s
    .toLowerCase()
    .replace(/(^|\s)([a-z])/g, (_, sep, ch) => sep + ch.toUpperCase());
}

/** 괄호 주석 제거: "MARUNOCHI (TSUGINOBIRUONOZOKU)" / "ODORINISHI(1-19-CHOME)" → 본체만 */
function stripParen(s) {
  return s.replace(/[（(].*$/u, "").trim();
}

/** 도도부현 로마자 → State 표준 표기. "TOKYO TO" → "Tokyo" */
function formatPrefecture(rome) {
  const tokens = rome.trim().split(/\s+/);
  const kept = tokens.filter((t) => !PREF_SUFFIXES.has(t));
  return titleCase((kept.length ? kept : tokens).join(" "));
}

/** 시구정촌 로마자 → "Sapporo-shi Chuo-ku" 형태(접미사는 앞 단어에 하이픈으로). */
function formatCity(rome) {
  const tokens = rome.trim().split(/\s+/).filter(Boolean);
  const words = [];
  for (const t of tokens) {
    if (CITY_SUFFIXES.has(t) && words.length > 0) {
      words[words.length - 1] += "-" + t.toLowerCase();
    } else {
      words.push(t);
    }
  }
  return words.map(titleCase).join(" ");
}

/** 동네(정역) 로마자 → 괄호 주석 제거 + 타이틀케이스. "ASAHIGAOKA" → "Asahigaoka" */
function formatTown(rome) {
  return titleCase(stripParen(rome));
}

/** 한자 도시명: 전각/반각 공백 제거. "札幌市　中央区" → "札幌市中央区" */
function cleanKanjiCity(s) {
  return s.replace(/[\s　]+/g, "");
}

/** 한자 동네명: 괄호 주석 제거 + 공백 정리. "丸の内　（次のビルを除く）" → "丸の内" */
function cleanKanjiTown(s) {
  return stripParen(s).replace(/[\s　]+/g, "");
}

// "이하에 게재가 없는 경우" = 특정 동네 없이 시 전체를 가리키는 더미 행 → 동네 빈 값 처리
function isPlaceholderTown(townKanji) {
  return townKanji.includes("以下に掲載がない場合");
}

function getCsvBuffer() {
  const argPath = process.argv[2];
  if (argPath) {
    console.log(`로컬 CSV 사용: ${argPath}`);
    return readFileSync(argPath);
  }
  const tmp = mkdtempSync(join(tmpdir(), "jp-postal-"));
  const zipPath = join(tmp, "KEN_ALL_ROME.zip");
  console.log(`다운로드: ${ZIP_URL}`);
  execSync(`curl -sL "${ZIP_URL}" -o "${zipPath}"`, { stdio: "inherit" });
  // unzip -p: 압축 내용을 stdout(Buffer)으로. iconv-lite로 Shift_JIS → UTF-8 디코딩.
  return execSync(`unzip -p "${zipPath}" KEN_ALL_ROME.CSV`, {
    maxBuffer: 64 * 1024 * 1024,
  });
}

function main() {
  const buf = getCsvBuffer();
  const text = iconv.decode(buf, "shift_jis");
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  console.log(`CSV 행: ${lines.length}`);

  /** @type {Record<string, string[][]>} */
  const map = {};
  let dupSkipped = 0;

  for (const line of lines) {
    // 모든 필드가 "..."로 감싸여 있고 내부에 콤마가 없으므로 `","`로 분리해도 안전.
    const cols = line.replace(/^"/, "").replace(/"$/, "").split('","');
    if (cols.length < 7) continue;

    const zip = cols[0].trim();
    if (!/^\d{7}$/.test(zip)) continue;

    const prefKanji = cols[1].trim();
    const cityKanji = cleanKanjiCity(cols[2]);
    const townKanjiRaw = cols[3];
    const prefEn = formatPrefecture(cols[4]);
    const cityEn = formatCity(cols[5]);

    const placeholder = isPlaceholderTown(townKanjiRaw);
    const townKanji = placeholder ? "" : cleanKanjiTown(townKanjiRaw);
    const townEn = placeholder ? "" : formatTown(cols[6]);

    // 튜플: [prefEn, cityEn, townEn, prefKanji, cityKanji, townKanji]
    const tuple = [prefEn, cityEn, townEn, prefKanji, cityKanji, townKanji];

    const list = (map[zip] ??= []);
    // 괄호 주석 제거 후 동일해지는 행 중복 제거
    const key = tuple.join("|");
    if (list.some((t) => t.join("|") === key)) {
      dupSkipped++;
      continue;
    }
    list.push(tuple);
  }

  const zipCount = Object.keys(map).length;
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(map));
  const bytes = readFileSync(OUT_PATH).length;
  console.log(`우편번호 ${zipCount}건, 중복 ${dupSkipped}건 제거`);
  console.log(`저장: ${OUT_PATH} (${(bytes / 1024 / 1024).toFixed(1)} MB)`);
  // 샘플 검증 출력
  console.log("샘플 1000005:", JSON.stringify(map["1000005"]));
  console.log("샘플 0600000:", JSON.stringify(map["0600000"]));
}

main();
