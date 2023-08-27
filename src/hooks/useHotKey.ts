import { useCallback, useEffect, useMemo } from "react";

interface useHotKeyProps {
  global: boolean;
  combo: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
  // onKeyUp: () => void;
  [key: string]: string | boolean | ((e: React.KeyboardEvent) => void);
}

interface comboProps {
  modifiers: number;
  key: string;
}

type ModifierBitMasksType = {
  alt: number;
  ctrl: number;
  meta: number;
  shift: number;
  [key: string]: number;
};

type ShiftKeysType = {
  "~": string;
  "!": string;
  "@": string;
  "#": string;
  $: string;
  "%": string;
  "^": string;
  "&": string;
  "*": string;
  "(": string;
  ")": string;
  _: string;
  "+": string;
  "{": string;
  "}": string;
  "|": string;
  ":": string;
  '"': string;
  "<": string;
  ">": string;
  "?": string;
  [key: string]: string;
};

type AliasesType = {
  win: string;
  window: string;
  cmd: string;
  esc: string;
  opt: string;
  option: string;
  [key: string]: string;
};

const ModifierBitMasks = {
  alt: 1,
  ctrl: 2,
  meta: 4,
  shift: 8,
} as ModifierBitMasksType;

const ShiftKeys = {
  "~": "`",
  "!": "1",
  "@": "2",
  "#": "3",
  $: "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  ")": "0",
  _: "-",
  "+": "=",
  "{": "[",
  "}": "]",
  "|": "\\",
  ":": ";",
  '"': "'",
  "<": ",",
  ">": ".",
  "?": "/",
} as ShiftKeysType;

// key를 알기 쉽게 변환
const Aliases = {
  win: "meta",
  window: "meta",
  cmd: "meta",
  esc: "escape",
  opt: "alt",
  option: "alt",
} as AliasesType;

// 이벤트를 받아서 처리하기 쉬운 형태로 만듦
const getKeyCombo = (e: React.KeyboardEvent) => {
  const key = e.key !== " " ? e.key.toLowerCase() : "space";

  let modifiers = 0;
  if (e.altKey) modifiers += ModifierBitMasks.alt;
  if (e.ctrlKey) modifiers += ModifierBitMasks.ctrl;
  if (e.metaKey) modifiers += ModifierBitMasks.meta;
  if (e.shiftKey) modifiers += ModifierBitMasks.shift;

  // 어떤 키 조합을 사용했고 어떤 키를 눌렀는지 알 수 있다.
  return { modifiers, key };
};

// combo 객체를 받아서 재처리
const parseKeyCombo = (combo: string) => {
  // 공백을 제거하고, 소문자로 변경하고, +로 구분
  const pieces = combo.replace(/\s/g, "").toLowerCase().split("+");
  let modifiers = 0;
  let key;
  for (const piece of pieces) {
    // 단축키에 modifier와 관련된 키가 포함되어 있으면
    if (ModifierBitMasks[piece]) {
      modifiers += ModifierBitMasks[piece]; // modifiers에 추가
    } else if (ShiftKeys[piece]) {
      // 단축키에 shift를 눌러 조합한 키가 포함되어 있으면 shift를 추가
      modifiers += ModifierBitMasks.shift; // modifiers에 추가
      key = ShiftKeys[piece]; // shift 누르기 전 key를 할당
    } else if (Aliases[piece]) {
      key = Aliases[piece];
    } else {
      key = piece;
    }
  }

  return { modifiers, key } as { modifiers: number; key: string };
};

// 파싱한 combo가 같은지 체크하는 함수
const comboMatches = (a: comboProps, b: comboProps) => {
  return a.modifiers === b.modifiers && a.key === b.key;
};

const useHotKey = (hotkeys: useHotKeyProps[]) => {
  // 글로벌 키와 로컬 키를 분류
  const localKeys = useMemo(() => hotkeys.filter((k: useHotKeyProps) => !k.global), [hotkeys]);
  const globalKeys = useMemo(() => hotkeys.filter((k: useHotKeyProps) => k.global), [hotkeys]);

  // 키를 처리하는 함수
  const invokeCallback = useCallback(
    (global: boolean, combo: comboProps, callbackName: string, e: React.KeyboardEvent) => {
      // global이 trua면 globalKeys를, false면 localKeys를 반복
      for (const hotkey of global ? globalKeys : localKeys) {
        // 단축키 처리를 한다.
        // callbackName: onKeyDown, onKeyUp
        if (comboMatches(parseKeyCombo(hotkey.combo), combo)) {
          // 파싱한 combo와 사용자가 입력한 combo와 같으면 함수 실행
          const callback = hotkey[callbackName] as (e: React.KeyboardEvent) => void;
          callback && callback(e);
        }
      }
    },
    [localKeys, globalKeys]
  );

  // global 키다운 핸들러
  const handleGlobalKeyDown = useCallback(
    (e) => {
      invokeCallback(true, getKeyCombo(e), "onKeyDown", e);
    },
    [invokeCallback]
  );

  // global 키업 핸들러
  const handleGlobalKeyUp = useCallback(
    (e) => {
      invokeCallback(true, getKeyCombo(e), "onKeyUp", e);
    },
    [invokeCallback]
  );

  // local 키다운 핸들러
  const handleLocalKeyDown = useCallback(
    (e) => {
      invokeCallback(false, getKeyCombo(e.nativeEvent), "onKeyDown", e.nativeEvent);
    },
    [invokeCallback]
  );

  // local 키업 핸들러
  const handleLocalKeyUp = useCallback(
    (e) => {
      invokeCallback(false, getKeyCombo(e.nativeEvent), "onKeyUp", e.nativeEvent);
    },
    [invokeCallback]
  );

  useEffect(() => {
    // 글로벌 이벤트 바인딩
    document.addEventListener("keydown", handleGlobalKeyDown);
    document.addEventListener("keyup", handleGlobalKeyUp);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
      document.removeEventListener("keyup", handleGlobalKeyUp);
    };
  }, [handleGlobalKeyDown, handleGlobalKeyUp]);

  // 로컬 이벤트는 사용자가 바인딩 하도록 리턴
  return { handleKeyDown: handleLocalKeyDown, handleKeyup: handleLocalKeyUp };
};

// const hotkeys = [
//   {
//     global: true,
//     combo: 'ctrl+shift+k',
//     onKeyDown: (e) => {
//       alert('ctrl+k')
//     }
//   }
// ];

export default useHotKey;
