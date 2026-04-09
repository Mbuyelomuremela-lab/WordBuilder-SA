// ─────────────────────────────────────────────────────────────────────────────
// WordBuilder SA — Language Data
// Words and sentences for all 9 South African official languages
// ─────────────────────────────────────────────────────────────────────────────

const WORD_DATA = {
  English: {
    stage1: [
      { word: 'CAT',    hint: 'A furry household pet' },
      { word: 'DOG',    hint: 'Man\'s best friend' },
      { word: 'SUN',    hint: 'The star at the centre of our solar system' },
      { word: 'TREE',   hint: 'A tall plant with a trunk and branches' },
      { word: 'BOOK',   hint: 'You read this' },
      { word: 'BIRD',   hint: 'A feathered animal that can fly' },
      { word: 'FISH',   hint: 'A creature that lives in water' },
      { word: 'RAIN',   hint: 'Water falling from clouds' }
    ],
    stage2: [
      { word: 'SCHOOL',   hint: 'A place of learning' },
      { word: 'FLOWER',   hint: 'A colourful part of a plant' },
      { word: 'FAMILY',   hint: 'People related to you' },
      { word: 'FRIEND',   hint: 'A person you like and trust' },
      { word: 'MARKET',   hint: 'A place to buy and sell goods' },
      { word: 'BRIDGE',   hint: 'A structure over water or a gap' },
      { word: 'GARDEN',   hint: 'An outdoor space for growing plants' },
      { word: 'ORANGE',   hint: 'A citrus fruit or a warm colour' }
    ]
  },

  Afrikaans: {
    stage1: [
      { word: 'KAT',   hint: 'Huishoudelike troeteldier (cat)' },
      { word: 'HOND',  hint: 'Mans beste vriend (dog)' },
      { word: 'SON',   hint: 'Die ster in ons sonnestelsel (sun)' },
      { word: 'BOOM',  hint: '\'n Groot plant met \'n stam (tree)' },
      { word: 'BOEK',  hint: 'Jy lees dit (book)' },
      { word: 'REËN',  hint: 'Water wat uit wolke val (rain)' },
      { word: 'HUIS',  hint: 'Jou tuiste (house)' },
      { word: 'BROOD', hint: 'Jy eet dit elke dag (bread)' }
    ],
    stage2: [
      { word: 'SKOOL',   hint: '\'n Plek van leer (school)' },
      { word: 'BLOM',    hint: 'Kleurryke deel van \'n plant (flower)' },
      { word: 'FAMILIE', hint: 'Mense wat aan jou verwant is (family)' },
      { word: 'VRIEND',  hint: '\'n Persoon wat jy vertrou (friend)' },
      { word: 'MARK',    hint: '\'n Plek om goedere te koop (market)' },
      { word: 'TUIN',    hint: 'Buitelug ruimte vir plante (garden)' },
      { word: 'WATER',   hint: 'Die vloeistof wat jy drink (water)' },
      { word: 'LAND',    hint: 'Die grond waarop ons leef (land)' }
    ]
  },

  IsiZulu: {
    stage1: [
      { word: 'IKATI',   hint: 'Isilwane esilungelwa emakhaya (cat)' },
      { word: 'INJA',    hint: 'Umngane womuntu (dog)' },
      { word: 'ILANGA',  hint: 'Inkanyezi enkulu esikhanyisela (sun)' },
      { word: 'ISIHLAHLA', hint: 'Isitshalo esikhulu (tree)' },
      { word: 'INCWADI', hint: 'Uyayifunda (book)' },
      { word: 'INYONI',  hint: 'Isilwane esindizayo (bird)' },
      { word: 'AMANZI',  hint: 'Uyaphuza lona (water)' },
      { word: 'INDLU',   hint: 'Lapho uhlala khona (house)' }
    ],
    stage2: [
      { word: 'ISIKOLE',  hint: 'Indawo yokufunda (school)' },
      { word: 'UBABA',    hint: 'Ubaba wakho (father)' },
      { word: 'UMAMA',    hint: 'Umama wakho (mother)' },
      { word: 'UMNGANE',  hint: 'Umuntu owumthanda (friend)' },
      { word: 'IZULU',    hint: 'Isibhakabhaka (sky)' },
      { word: 'UMUNTU',   hint: 'Isintu (person)' },
      { word: 'UKUDLA',   hint: 'Lokho okudliwa (food)' },
      { word: 'INHLOKO',  hint: 'Ingxenye ephezulu yomzimba (head)' }
    ]
  },

  IsiXhosa: {
    stage1: [
      { word: 'IKATI',   hint: 'Isilwanyana esinye (cat)' },
      { word: 'INJA',    hint: 'Umhlobo womuntu (dog)' },
      { word: 'ILANGA',  hint: 'Ukukhanya kwelanga (sun)' },
      { word: 'UMTHI',   hint: 'Isityalo esikhulu (tree)' },
      { word: 'INCWADI', hint: 'Uyayifunda (book)' },
      { word: 'INTAKA',  hint: 'Isilwanyana esiphaphayo (bird)' },
      { word: 'AMANZI',  hint: 'Uyasela lona (water)' },
      { word: 'INDLU',   hint: 'Apho uhlala khona (house)' }
    ],
    stage2: [
      { word: 'ISIKOLO',   hint: 'Indawo yokufunda (school)' },
      { word: 'UMAMA',     hint: 'Unina wakho (mother)' },
      { word: 'UBHUTI',    hint: 'Umntakwenu oyinkwenkwe (brother)' },
      { word: 'UMHLABA',   hint: 'Umhlaba owuma (earth/land)' },
      { word: 'IZULU',     hint: 'Isibhakabhaka (sky)' },
      { word: 'UMNTU',     hint: 'Umntu wokwenene (person)' },
      { word: 'UKUTYA',    hint: 'Lokho okudliwa (food)' },
      { word: 'INTSIMI',   hint: 'Intsimi yamasimu (field)' }
    ]
  },

  Tshivenda: {
    stage1: [
      { word: 'TSHIKATI', hint: 'Phukha ya nndu (cat)' },
      { word: 'MBWA',     hint: 'Tshibi tsha muthu (dog)' },
      { word: 'LISHAKA',  hint: 'Ḓuvha ḽ olo phaho (sun)' },
      { word: 'MURI',     hint: 'Murudi muhulwane (tree)' },
      { word: 'BUGU',     hint: 'Vha ri vhala (book)' },
      { word: 'NNUNI',    hint: 'Phukha i fhufhaho (bird)' },
      { word: 'MVULA',    hint: 'Manwe a bvaho mutsoni (rain)' },
      { word: 'NNDU',     hint: 'Fhethu ha u dzula (house)' }
    ],
    stage2: [
      { word: 'TSHIKOLО',  hint: 'Fhethu ha u dyia (school)' },
      { word: 'MAKHADZI',  hint: 'Khotsi awe (father)' },
      { word: 'MUKOLOLO',  hint: 'Munna a u fana nae (friend)' },
      { word: 'MADI',      hint: 'A u nwa (water)' },
      { word: 'DZUWA',     hint: 'Luvhondo (sun/day)' },
      { word: 'MUSANDA',   hint: 'Mudzulo wa vhamusanda (royal kraal)' },
      { word: 'VHUTHU',    hint: 'Luvhondo vhuthu (humanity)' },
      { word: 'MULALO',    hint: 'U vha na mulalo (peace)' }
    ]
  },

  Sepedi: {
    stage1: [
      { word: 'KATSE',   hint: 'Phologolo ya gae (cat)' },
      { word: 'NTŠA',    hint: 'Mogwera wa motho (dog)' },
      { word: 'LETSATSI', hint: 'Naledi ye kgolo (sun)' },
      { word: 'MOHLARE', hint: 'Semela se segolo (tree)' },
      { word: 'BUKA',    hint: 'O a e bala (book)' },
      { word: 'NONYANE', hint: 'Phologolo ya go fofa (bird)' },
      { word: 'PULA',    hint: 'Meetse a go tšwa godimo (rain)' },
      { word: 'NTLO',    hint: 'Lefelo la go dula (house)' }
    ],
    stage2: [
      { word: 'SEKOLO',    hint: 'Lefelo la thuto (school)' },
      { word: 'MORENA',    hint: 'Kgosi (chief/lord)' },
      { word: 'MOTHO',     hint: 'Setšo sa motho (person)' },
      { word: 'MEETSE',    hint: 'O a nwa (water)' },
      { word: 'LEGAE',     hint: 'Gae ya gago (home)' },
      { word: 'LEFASE',    hint: 'Lefase leo re dulago go lona (earth)' },
      { word: 'MOGWERA',   hint: 'Mongwedi wa gago (friend)' },
      { word: 'BOHLOKO',   hint: 'Maikutlo a tshoenyego (pain/sorrow)' }
    ]
  },

  Xitsonga: {
    stage1: [
      { word: 'NTSURI',  hint: 'Mhisi wa le kaya (cat)' },
      { word: 'NHOVA',   hint: 'Munghana wa munhu (dog)' },
      { word: 'DYAMBU',  hint: 'Nyota leikulu (sun)' },
      { word: 'MUTI',    hint: 'Xitluka lexikulu (tree)' },
      { word: 'BUKU',    hint: 'U yi hlaya (book)' },
      { word: 'NTSUNA',  hint: 'Nyimpfana leyi pfurhaka (bird)' },
      { word: 'MVULA',   hint: 'Mati ya le enyangweni (rain)' },
      { word: 'NDLU',    hint: 'Ndhawu yo cama (house)' }
    ],
    stage2: [
      { word: 'XIKOLO',    hint: 'Ndhawu yo dyondza (school)' },
      { word: 'TATA',      hint: 'Tatana wa wena (father)' },
      { word: 'MAMA',      hint: 'Mamana wa wena (mother)' },
      { word: 'MUNGHANA',  hint: 'Munhu lowu u n\'wi rhandza (friend)' },
      { word: 'MATI',      hint: 'U ma nwa (water)' },
      { word: 'MISAVA',    hint: 'Misava leyi hi tshama eka yona (earth)' },
      { word: 'VULAVULA',  hint: 'U vulavula (to speak)' },
      { word: 'KHALE',     hint: 'Khale ka khale (long ago)' }
    ]
  },

  Setswana: {
    stage1: [
      { word: 'KATSE',   hint: 'Phologolo ya gae (cat)' },
      { word: 'NTŠA',    hint: 'Tsala ya motho (dog)' },
      { word: 'LETSATSI', hint: 'Naledi e kgolo (sun)' },
      { word: 'SETLHARE', hint: 'Semela se segolo (tree)' },
      { word: 'BUKA',    hint: 'O e bala (book)' },
      { word: 'NONYANE', hint: 'Phologolo e e fofang (bird)' },
      { word: 'PULA',    hint: 'Metsi a go na (rain)' },
      { word: 'NTLO',    hint: 'Lefelo la go nna (house)' }
    ],
    stage2: [
      { word: 'SEKOLE',    hint: 'Lefelo la thuto (school)' },
      { word: 'MOTHO',     hint: 'Motho yo mongwe le yo mongwe (person)' },
      { word: 'KGOSI',     hint: 'Morena wa legae (chief)' },
      { word: 'METSI',     hint: 'O a nwa (water)' },
      { word: 'GAEABO',    hint: 'Gae ya gago (home)' },
      { word: 'LEFATSHE',  hint: 'Lefatshe le re dulang go lona (earth)' },
      { word: 'TSALA',     hint: 'Moratwi wa gago (friend)' },
      { word: 'KAGISO',    hint: 'Kagiso le lorato (peace)' }
    ]
  },

  IsiNdebele: {
    stage1: [
      { word: 'IKATI',   hint: 'Isilwane sekhaya (cat)' },
      { word: 'INJA',    hint: 'Umngane womuntu (dog)' },
      { word: 'ILANGA',  hint: 'Inkanyezi enkulu (sun)' },
      { word: 'UMUTHI',  hint: 'Isitshalo esikhulu (tree)' },
      { word: 'INCWADI', hint: 'Uyayifunda (book)' },
      { word: 'INYONI',  hint: 'Isilwane esiphaphayo (bird)' },
      { word: 'AMANZI',  hint: 'Uyaphuza lona (water)' },
      { word: 'INDLU',   hint: 'Lapho uhlala khona (house)' }
    ],
    stage2: [
      { word: 'ISIKOLE',  hint: 'Indawo yokufunda (school)' },
      { word: 'UBABA',    hint: 'Ubaba wakho (father)' },
      { word: 'UMAMA',    hint: 'Umama wakho (mother)' },
      { word: 'UMNGANE',  hint: 'Umuntu owumthanda (friend)' },
      { word: 'UMHLABA',  hint: 'Umhlaba wokuzalelwa (earth/land)' },
      { word: 'UKUDLA',   hint: 'Lokho okudliwa (food)' },
      { word: 'UMUNTU',   hint: 'Umuntu ngumuntu ngabantu (person)' },
      { word: 'INHLOKO',  hint: 'Ingxenye ephezulu yomzimba (head)' }
    ]
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Sentence Data
// ─────────────────────────────────────────────────────────────────────────────

const SENTENCE_DATA = {
  English: [
    { sentence: 'The cat sits on the mat',        hint: 'Where does the cat sit?' },
    { sentence: 'I love to read books',            hint: 'What do you love to do?' },
    { sentence: 'The sun shines every day',        hint: 'When does the sun shine?' },
    { sentence: 'We go to school together',        hint: 'Where do we go?' },
    { sentence: 'The bird sings in the tree',      hint: 'Where does the bird sing?' }
  ],
  Afrikaans: [
    { sentence: 'Die kat sit op die mat',          hint: 'Waar sit die kat?' },
    { sentence: 'Ek hou van lees',                 hint: 'Waarvan hou jy?' },
    { sentence: 'Die son skyn elke dag',           hint: 'Wanneer skyn die son?' },
    { sentence: 'Ons gaan saam skool toe',         hint: 'Waarheen gaan ons?' },
    { sentence: 'Die voël sing in die boom',       hint: 'Waar sing die voël?' }
  ],
  IsiZulu: [
    { sentence: 'Ikati lihlala phezu kwesikhwama',  hint: 'Ikhati lihlala kuphi?' },
    { sentence: 'Ngiyathanda ukufunda izincwadi',   hint: 'Yini oyithandayo?' },
    { sentence: 'Ilanga liyakhanya nsuku zonke',    hint: 'Ilanga lenzani?' },
    { sentence: 'Siya esikoleni ndawonye',          hint: 'Siya kuphi?' },
    { sentence: 'Inyoni ihlabelela esihlahlaneni',  hint: 'Inyoni ihlabelela kuphi?' }
  ],
  IsiXhosa: [
    { sentence: 'Ikati ihleli phezu kwesihlalo',    hint: 'Ikati ihleli phi?' },
    { sentence: 'Ndithanda ukufunda iincwadi',      hint: 'Uthanda ntoni?' },
    { sentence: 'Ilanga liyakhanya yonke imihla',   hint: 'Ilanga lenzani?' },
    { sentence: 'Siya esikolweni ndawonye',         hint: 'Siya phi?' },
    { sentence: 'Intaka icula emthini',             hint: 'Intaka icula phi?' }
  ],
  Tshivenda: [
    { sentence: 'Tshikati tshi tshina fhasi ha tafula',  hint: 'Tshikati tshi tshina ngafhi?' },
    { sentence: 'Ndi a funa u vhala zwiṅwe',            hint: 'Ndi a funa u ita mini?' },
    { sentence: 'Dzuwa ḽi a phahala matsheloni oṱhe',   hint: 'Dzuwa ḽi a ita mini?' },
    { sentence: 'Ri ya tshikoloni zwavhudi',            hint: 'Ri ya ngafhi?' },
    { sentence: 'Nnuni i a imba muri',                  hint: 'Nnuni i a imba ngafhi?' }
  ],
  Sepedi: [
    { sentence: 'Katse e dula mo selameng',          hint: 'Katse e dula kae?' },
    { sentence: 'Ke rata go bala dibuka',            hint: 'O rata go dira eng?' },
    { sentence: 'Letsatsi le bonagala letsatsi le lentsho', hint: 'Letsatsi le bonagala neng?' },
    { sentence: 'Re ya sekolong mmogo',              hint: 'Re ya kae?' },
    { sentence: 'Nonyane e bina go mohlare',         hint: 'Nonyane e bina kae?' }
  ],
  Xitsonga: [
    { sentence: 'Ntsuri wu tshama eka tafula',       hint: 'Ntsuri wu tshama kwihi?' },
    { sentence: 'Ndzi rhandza ku hlaya tibuku',      hint: 'Ndzi rhandza ku ita yini?' },
    { sentence: 'Dyambu ri angaza siku rin\'wana ni rin\'wana', hint: 'Dyambu ri ita yini?' },
    { sentence: 'Hi ya exikolweni hi ri nwe',        hint: 'Hi ya kwihi?' },
    { sentence: 'Ntsuna yi yimba le mutini',         hint: 'Ntsuna yi yimba kwihi?' }
  ],
  Setswana: [
    { sentence: 'Katse e nna fa tlase ga tafole',    hint: 'Katse e nna kae?' },
    { sentence: 'Ke rata go bala dibuka',            hint: 'O rata go dira eng?' },
    { sentence: 'Letsatsi le galalela letsatsi lengwe le lengwe', hint: 'Letsatsi le dira jang?' },
    { sentence: 'Re ya kwa sekolong mmogo',          hint: 'Re ya kwa kae?' },
    { sentence: 'Nonyane e bua mo setlhareng',       hint: 'Nonyane e bua kae?' }
  ],
  IsiNdebele: [
    { sentence: 'Ikati lihlala phezu kwetafula',     hint: 'Ikati lihlala kuphi?' },
    { sentence: 'Ngiyathanda ukufunda izincwadi',    hint: 'Yini oyithandayo?' },
    { sentence: 'Ilanga liyakhanya nsuku zonke',     hint: 'Ilanga lenzani?' },
    { sentence: 'Siya esikolweni ndawonye',          hint: 'Siya kuphi?' },
    { sentence: 'Inyoni ihlabelela emuthini',        hint: 'Inyoni ihlabelela kuphi?' }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────────────────────

export function getWordData(language, stage) {
  const langData = WORD_DATA[language] || WORD_DATA['English'];
  const stageKey = `stage${stage}`;
  return langData[stageKey] || langData['stage1'];
}

export function getSentenceData(language) {
  return SENTENCE_DATA[language] || SENTENCE_DATA['English'];
}

export { WORD_DATA, SENTENCE_DATA };
