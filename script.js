// モールス信号とひらがなの対応表
const morseToHiragana = {
  'ーー・ーー': 'あ',
  '・ー': 'い',
  '・・ー': 'う',
  'ー・ーーー': 'え',
  '・ー・・・': 'お',
  '・ー・・': 'か',
  'ー・ー・・': 'き',
  '・・・ー': 'く',
  'ー・ーー': 'け',
  'ーーーー': 'こ',
  'ー・ー・ー': 'さ',
  'ーー・ー・': 'し',
  'ーーー・ー': 'す',
  '・ーーー・': 'せ',
  'ーーー・': 'そ',
  'ー・': 'た',
  '・・ー・': 'ち',
  '・ーー・': 'つ',
  '・ー・ーー': 'て',
  '・・ー・・': 'と',
  '・ー・': 'な',
  'ー・ー・': 'に',
  '・・・・': 'ぬ',
  'ーー・ー': 'ね',
  '・・ーー': 'の',
  'ー・・・': 'は',
  'ーー・・ー': 'ひ',
  'ーー・・': 'ふ',
  '・': 'へ',
  'ー・・': 'ほ',
  'ー・・ー': 'ま',
  '・・ー・ー': 'み',
  'ー': 'む',
  'ー・・・ー': 'め',
  'ー・・ー・': 'も',
  '・ーー': 'や',
  'ー・・ーー': 'ゆ',
  'ーー': 'よ',
  '・・・': 'ら',
  'ーー・': 'り',
  'ー・ーー・': 'る',
  'ーーー': 'れ',
  '・ー・ー': 'ろ',
  'ー・ー': 'わ',
  '・ーーー': 'を',
  '・ー・ー・': 'ん',
};

document.getElementById('inputText').addEventListener('input', function() {
    const input = this.value;
    let output = '';
    let error = '';
    let morseSequence = '';
    let capitalizeNext = false;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        // 許可された文字のみ処理
        if (['i', '!', ',', '.', ':', ';'].includes(char)) {
            if (char === 'i') {
                morseSequence += capitalizeNext ? '大・' : '・';
                capitalizeNext = false;
            } else if (char === '!') {
                morseSequence += capitalizeNext ? '長ー' : 'ー';
                capitalizeNext = false;
            } else if (char === ',' || char === '.') {
                // 句読点をそのまま出力に追加
                if (morseSequence) {
                    output += convertMorseToHiragana(morseSequence);
                    morseSequence = '';
                }
                output += char;
                capitalizeNext = false;
            } else if (char === ':') {
                // モールス信号をひらがなに変換
                if (morseSequence) {
                    output += convertMorseToHiragana(morseSequence);
                    morseSequence = '';
                }
                output += char;
                capitalizeNext = false;
            } else if (char === ';') {
                capitalizeNext = true; // 次のモールス信号を大文字（カタカナ）に
            }
        } else {
            error = '無効な文字が含まれています。使用可能な文字: i, !, ,, ., :, ;';
            break;
        }
    }

    // 最後のモールス信号を変換
    if (morseSequence && !error) {
        output += convertMorseToHiragana(morseSequence);
    }

    document.getElementById('outputText').textContent = output;
    document.getElementById('errorMessage').textContent = error;
});

// モールス信号をひらがなに変換する関数
function convertMorseToHiragana(morse) {
    // 大・や長ーを通常の・やーに変換して対応表を検索
    let isCapitalized = morse.includes('大・') || morse.includes('長ー');
    let normalizedMorse = morse.replace(/大・/g, '・').replace(/長ー/g, 'ー');

    let hiragana = morseToHiragana[normalizedMorse] || '？'; // 対応がない場合は「？」を返す
    // 「;」による大文字処理（カタカナに変換）
    if (isCapitalized) {
        // ひらがなをカタカナに変換
        hiragana = hiragana.replace(/[ぁ-ん]/g, function(c) {
            return String.fromCharCode(c.charCodeAt(0) + 0x60);
        });
    }
    return hiragana;
}
