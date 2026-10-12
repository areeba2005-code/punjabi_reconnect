// ============================================================================
// ✏️ CONTENT FILE — edit the phrases below to match YOUR Faisalabadi Punjabi.
//    Every "CHANGE:" comment marks text you may want to replace.
//    Format: {en:'English', ur:'اردو'}. Punjabi answers are written in Roman Punjabi.
//    Please verify all words with a native Faisalabad speaker before submission.
// ============================================================================

const o = (en, ur = en) => ({ en, ur });
// option helper: o('Water','پانی') or o('Ghar') for Punjabi words

export const LESSONS = [
  {
    id: 'greet',
    emoji: '👋',
    title: o('Greetings', 'سلام دعا'),
    questions: [
      // CHANGE: Faisalabadi greeting
      {
        q: o(
          'How do you say "How are you?"',
          '"آپ کیسے ہیں؟" پنجابی میں کیسے کہیں گے؟'
        ),
        opts: [
          o('Tera Ki haal hay?'),
          o('Kiya hua'),
          o('Kidhay jaou hai')
        ],
        a: 0
      },

      {
        q: o(
          '"Main wal han" means…',
          '"میں ٹھیک آں" کا مطلب؟'
        ),
        opts: [
          o('I am hungry', 'مجھے بھوک لگی ہے'),
          o('I am fine', 'میں ٹھیک ہوں'),
          o('I am going', 'میں جا رہا ہوں')
        ],
        a: 1
      },

      // 🔊 LISTEN QUESTION — record your voice, save as client/public/audio/greet-1.mp3
      {
        type: 'listen',
        audio: '/audio/greet-1.mp3',
        say: 'Tera ki haal hay',
        answer: 'Tera ki haal ay',
        accept: [
          'Tera ki haal ae',
          'Tera kee haal ay'
        ],
        hint: o(
          'How are you?',
          'آپ کیسے ہیں؟'
        )
      },

      {
        q: o(
          '"Kithon aaye o?" means…',
          '"کِتھوں آئے او؟" کا مطلب؟'
        ),
        opts: [
          o('Where are you from?', 'آپ کہاں سے آئے ہیں؟'),
          o('How are you?', 'آپ کیسے ہیں؟'),
          o('What is your name?', 'آپ کا نام کیا ہے؟')
        ],
        a: 0
      },

      {
        q: o(
          '"Tusi ki karde o?" means…',
          '"تُسی کی کردے او؟" کا مطلب؟'
        ),
        opts: [
          o('Where are you going?', 'آپ کہاں جا رہے ہیں؟'),
          o('What do you do?', 'آپ کیا کرتے ہیں؟'),
          o('How are you?', 'آپ کیسے ہیں؟')
        ],
        a: 1
      },

      {
        q: o(
          '"Changa, fer milange" means…',
          '"چنگا، فیر ملانگے" کا مطلب؟'
        ),
        opts: [
          o('Okay, see you again', 'اچھا، پھر ملیں گے'),
          o('I am fine', 'میں ٹھیک ہوں'),
          o('Thank you', 'شکریہ')
        ],
        a: 0
      }
    ]
  },

  {
    id: 'family',
    emoji: '👵',
    title: o('Family', 'خاندان'),
    questions: [
      // CHANGE: what you call your mother/grandmother (Maa, Bebe, Ammi...)
      {
        q: o(
          '"Ambo" means…',
          '"امبو" کا مطلب ہے؟'
        ),
        opts: [
          o('Mother / grandmother', 'ماں / دادی'),
          o('Friend', 'دوست'),
          o('Home', 'گھر')
        ],
        a: 0
      },

      {
        q: o(
          'Which word means "home"?',
          '"گھر" کے لیے پنجابی لفظ؟'
        ),
        opts: [
          o('Pani'),
          o('Ghar'),
          o('Roti')
        ],
        a: 1
      },

      {
        type: 'listen',
        audio: '/audio/family-1.mp3',
        say: 'Tera ghar kidhay hai?',
        answer: 'Tera ghar kidhay hai?',
        accept: [
          'Tera ghr kidha hai?'
        ],
        hint: o(
          'Where is your Home',
          'آپ کا گھر کہاں ہے'
        )
      }
    ]
  },

  {
    id: 'daily',
    emoji: '🍞',
    title: o('Daily Life', 'روزمرہ'),
    questions: [
      {
        q: o(
          '"Pani" means…',
          '"پانی" کا مطلب؟'
        ),
        opts: [
          o('Water', 'پانی'),
          o('Bread', 'روٹی'),
          o('Milk', 'دودھ')
        ],
        a: 0
      },

      // CHANGE: Faisalabadi way of asking someone's name
      {
        q: o(
          '"Tera naa ki ay?" means…',
          '"تیرا نام کی اے؟" کا مطلب؟'
        ),
        opts: [
          o('Where are you going?', 'آپ کہاں جا رہے ہیں؟'),
          o('What is your name?', 'آپ کا نام کیا ہے؟'),
          o('How are you?', 'آپ کیسے ہیں؟')
        ],
        a: 1
      },

      {
        type: 'listen',
        audio: '/audio/daily-1.mp3',
        say: 'roti khadhi hay',
        answer: 'roti khadhi hay',
        accept: [
          'roti khaadi ay',
          'roti khadi ay'
        ],
        hint: o(
          'Have you eaten?',
          'کھانا کھایا؟'
        )
      }
    ]
  }
];

// ============================================================================
// CHANGE: Memory-game pairs [Roman Punjabi, meaning]
// ============================================================================

export const PAIRS = [
  ['Ghar', o('Home', 'گھر')],
  ['Pani', o('Water', 'پانی')],
  ['Ambo', o('Mother', 'ماں')],
  ['Yaar', o('Friend', 'دوست')],
  ['Roti', o('Bread', 'روٹی')],
  ['Meharbani', o('Thanks', 'شکریہ')]
];

// ============================================================================
// SPOTLIGHT TOUR — "target" matches a data-tour="..." attribute in App.jsx
// (null = centered card).
// ============================================================================

export const TOUR = [
  {
    target: null,
    e: '🌾',
    t: o(
      'Welcome to Punjabi Reconnect!',
      'پنجابی ری کنیکٹ میں خوش آمدید!'
    ),
    d: o(
      'A quick 1-minute tour. Apni Zubaan, Apna Style.',
      'ایک منٹ کا مختصر ٹور۔ اپنی زبان، اپنا انداز۔'
    )
  },

  {
    target: 'path',
    e: '🧭',
    t: o(
      'Your lessons',
      'آپ کے اسباق'
    ),
    d: o(
      'Each card is a short lesson. Answer questions, listen and type, and earn XP.',
      'ہر کارڈ ایک مختصر سبق ہے۔ سوالوں کے جواب دیں، سنیں اور لکھیں، اور XP کمائیں۔'
    )
  },

  {
    target: 'stats',
    e: '🔥',
    t: o(
      'Your progress',
      'آپ کی پیشرفت'
    ),
    d: o(
      'Your streak 🔥, XP ⭐ and level 🏅 grow every time you practise.',
      'ہر مشق پر آپ کا تسلسل 🔥، XP ⭐ اور لیول 🏅 بڑھتے ہیں۔'
    )
  },

  {
    target: 'farm',
    e: '🌾',
    t: o('Grow your crop', 'اپنی فصل اگائیں'),
    d: o(
      'Answer correctly to water your crop and give it medicine. Wrong answers let pests in! Compete on the leaderboard.',
      'صحیح جواب پر فصل کو پانی اور دوا ملتی ہے۔ غلط جواب پر کیڑے لگ جاتے ہیں! لیڈر بورڈ پر مقابلہ کریں۔'
    )
  },

  {
    target: 'game',
    e: '🎮',
    t: o(
      'Play a game',
      'کھیل کھیلیں'
    ),
    d: o(
      'Match Punjabi words with their meanings in Memory Match.',
      'میموری میچ میں پنجابی الفاظ کو ان کے معنی سے ملائیں۔'
    )
  },

  {
    target: 'lang',
    e: '🌐',
    t: o(
      'English ↔ Urdu',
      'English ↔ اردو'
    ),
    d: o(
      'Switch the whole app to Urdu any time.',
      'کسی بھی وقت پوری ایپ اردو میں بدلیں۔'
    )
  },

  {
    target: 'a11y',
    e: '♿',
    t: o(
      'Make it comfortable',
      'اپنی سہولت کے مطابق بنائیں'
    ),
    d: o(
      'Change text size, brightness and contrast to suit you.',
      'متن کا سائز، روشنی اور کنٹراسٹ اپنی مرضی سے بدلیں۔'
    )
  },

  {
    target: null,
    e: '🎉',
    t: o(
      "You're ready!",
      'آپ تیار ہیں!'
    ),
    d: o(
      'Log in to save your progress, or try the app as a guest right now.',
      'اپنی پیشرفت محفوظ کرنے کے لیے لاگ اِن کریں، یا ابھی مہمان کے طور پر آزمائیں۔'
    )
  }
];