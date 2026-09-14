import type { Lens } from '@/types'

export type LensData = Omit<Lens, 'questionIds'>

/** Ancient, Eastern, Korean and early-modern lenses. */
export const LENSES_ANCIENT: LensData[] = [
  {
    id: 'aristotle-eudaimonia',
    type: 'thinker',
    name: '아리스토텔레스 — 에우다이모니아',
    origin: '고대 그리스 · 『니코마코스 윤리학』 (기원전 4세기)',
    position:
      '행복(에우다이모니아)은 느낌이 아니라 활동이다. 인간 고유의 능력인 이성을 탁월하게, 곧 덕에 따라 발휘하며 사는 삶 전체가 행복이며, 그래서 하루가 아니라 일생을 두고 판단해야 한다. 건강·친구·적당한 재산 같은 외적 좋음도 어느 정도 필요하다.',
    keyConcept: '에우다이모니아(eudaimonia): “잘 삶·잘 행함”으로서의 행복',
    challenge: '당신이 “탁월하게 해내고 있다”고 말할 수 있는 활동은 무엇인가요? 그 활동이 빠진 삶도 행복이라 부르겠습니까?',
    sources: [
      { citation: 'Aristotle, Nicomachean Ethics, I.7–10; X.6–8', kind: '원전' },
      { citation: '아리스토텔레스, 『니코마코스 윤리학』 (이창우·김재홍·강상진 옮김, 길, 2011)', kind: '국역본' },
    ],
    tags: ['행복', '덕', '활동', '탁월함', 'eudaimonia', 'virtue'],
    contrastsWith: ['epicurus-ataraxia', 'nozick-experience-machine', 'parfit-wellbeing-theories'],
  },
  {
    id: 'aristotle-friendship',
    type: 'thinker',
    name: '아리스토텔레스 — 세 종류의 우정',
    origin: '고대 그리스 · 『니코마코스 윤리학』 VIII–IX권',
    position:
      '우정은 유용함 때문에, 즐거움 때문에, 혹은 상대의 성품 그 자체 때문에 맺어진다. 앞의 둘은 조건이 바뀌면 사라지지만, 성품에 근거한 우정은 오래가고 드물며 시간이 필요하다. 친구는 “또 하나의 자기”이며, 좋은 삶에는 이런 친구가 필요하다.',
    keyConcept: '필리아(philia): 유용·즐거움·덕의 우정',
    challenge: '당신의 관계 중 상대의 성품 그 자체를 좋아하는 관계는 몇이나 되나요? 당신은 누구에게 그런 친구인가요?',
    sources: [
      { citation: 'Aristotle, Nicomachean Ethics, VIII.3–6; IX.4, 9', kind: '원전' },
      { citation: '아리스토텔레스, 『니코마코스 윤리학』 (이창우·김재홍·강상진 옮김, 길, 2011)', kind: '국역본' },
    ],
    tags: ['관계', '우정', '친구', 'philia'],
  },
  {
    id: 'epicurus-ataraxia',
    type: 'thinker',
    name: '에피쿠로스 — 아타락시아',
    origin: '고대 그리스 · 「메노이케우스에게 보내는 편지」 (기원전 3세기)',
    position:
      '쾌락이 삶의 목적이지만, 쾌락이란 방탕이 아니라 몸의 고통이 없음(아포니아)과 마음의 동요가 없음(아타락시아)이다. 욕구는 자연적이고 필수적인 것, 자연적이지만 불필요한 것, 헛된 것으로 나뉘며, 지혜는 첫째를 채우고 셋째를 버리는 데 있다. 우정은 행복의 가장 큰 재료다.',
    keyConcept: '욕구의 세 분류와 아타락시아(마음의 평정)',
    challenge: '당신의 욕구를 세 종류로 나눈다면, 지금 가장 많은 에너지를 쓰는 곳은 어디인가요? 그 욕구는 채워질 수 있는 종류인가요?',
    sources: [
      { citation: 'Epicurus, Letter to Menoeceus; Principal Doctrines', kind: '원전' },
      { citation: '에피쿠로스, 『쾌락』 (오유석 옮김, 문학과지성사, 1998)', kind: '국역본' },
    ],
    tags: ['행복', '쾌락', '욕구', '평정', '절제', 'hedonism'],
    contrastsWith: ['aristotle-eudaimonia', 'nietzsche', 'mill-utilitarianism'],
  },
  {
    id: 'epicurus-death-is-nothing',
    type: 'thinker',
    name: '에피쿠로스·루크레티우스 — 죽음은 우리에게 아무것도 아니다',
    origin: '고대 그리스·로마 · 「메노이케우스에게 보내는 편지」, 『사물의 본성에 관하여』 III권',
    position:
      '우리가 있을 때 죽음은 없고, 죽음이 있을 때 우리는 없다. 그러므로 죽음은 산 자에게도 죽은 자에게도 아무것도 아니다. 루크레티우스는 덧붙인다: 태어나기 전의 무한한 시간이 우리를 괴롭히지 않듯, 죽은 뒤의 시간도 그러하다(대칭 논증).',
    keyConcept: '죽음의 무해성 논증과 대칭 논증',
    challenge: '죽음이 두렵다면, 그 두려움은 ‘죽어 있음’에 대한 것인가요, ‘죽어감’이나 ‘잃음’에 대한 것인가요? 논증이 답하지 못하는 두려움은 무엇인가요?',
    sources: [
      { citation: 'Epicurus, Letter to Menoeceus 124–127', kind: '원전' },
      { citation: 'Lucretius, De Rerum Natura, III.830–1094', kind: '원전' },
      { citation: '루크레티우스, 『사물의 본성에 관하여』 (강대진 옮김, 아카넷, 2012)', kind: '국역본' },
    ],
    tags: ['죽음', '두려움', '논증', '무', 'death'],
    contrastsWith: ['nagel-death', 'heidegger-being-toward-death'],
  },
  {
    id: 'stoicism-dichotomy',
    type: 'tradition',
    name: '스토아 철학 — 통제의 이분법',
    origin: '고대 그리스·로마 · 에픽테토스, 마르쿠스 아우렐리우스, 세네카',
    position:
      '어떤 것은 우리에게 달려 있고(판단, 충동, 욕구), 어떤 것은 그렇지 않다(몸, 재산, 평판). 괴로움은 사물이 아니라 사물에 대한 판단에서 온다. 덕(지혜·정의·용기·절제)만으로 행복은 충분하며, 나머지는 “선호되는 무관심한 것”이다.',
    keyConcept: '통제의 이분법(dichotomy of control)과 판단의 수정',
    challenge: '지금 괴로움의 원인 중 당신의 판단에 달린 부분은 무엇인가요? 그 판단을 바꾸는 것이 지혜인지 체념인지, 무엇으로 구분하겠습니까?',
    sources: [
      { citation: 'Epictetus, Enchiridion §1, §5', kind: '원전' },
      { citation: 'Marcus Aurelius, Meditations', kind: '원전' },
      { citation: '에픽테토스, 『엥케이리디온』 (김재홍 옮김, 까치, 2003)', kind: '국역본' },
      { citation: '마르쿠스 아우렐리우스, 『명상록』 (천병희 옮김, 숲, 2005)', kind: '국역본' },
    ],
    tags: ['행복', '고통', '통제', '수용', '판단', 'stoicism'],
    contrastsWith: ['nussbaum-emotions-judgments', 'sartre-existentialism'],
  },
  {
    id: 'seneca-shortness-of-life',
    type: 'thinker',
    name: '세네카 — 인생의 짧음에 관하여',
    origin: '고대 로마 · 『인생의 짧음에 관하여』 (기원후 49년경)',
    position:
      '인생이 짧은 것이 아니라 우리가 많은 시간을 낭비하는 것이다. 삶은 쓸 줄 알면 충분히 길다. 사람들은 재산은 아끼면서 시간은 아무에게나 내어주고, “나중에” 살겠다며 오늘을 미룬다. 진짜 자기 시간을 사는 사람만이 산 것이다.',
    keyConcept: '시간의 낭비와 “미루어진 삶”',
    challenge: '지난주, 누구에게도 요구받지 않았는데 시간을 내어준 일은 무엇인가요? 그 시간을 돈처럼 아꼈다면 무엇을 지켰을까요?',
    sources: [
      { citation: 'Seneca, De Brevitate Vitae', kind: '원전' },
      { citation: '세네카, 『인생이 왜 짧은가』 (천병희 옮김, 숲, 2005)', kind: '국역본' },
    ],
    tags: ['시간', '죽음', '낭비', '유한성', 'time'],
  },
  {
    id: 'buddhism-dukkha',
    type: 'tradition',
    name: '불교 — 둑카와 두 번째 화살',
    origin: '고대 인도 · 초기 불교 경전',
    position:
      '삶에는 불만족(둑카)이 스며 있고, 그 원인은 갈애(渴愛)와 집착이며, 갈애가 그치면 괴로움도 그친다. 모든 것은 무상하다. 괴로움에는 사건 자체(첫 번째 화살)와 그에 대한 반응—저항, 자책, 반추—(두 번째 화살)가 있으며, 두 번째 화살은 쏘지 않을 수 있다.',
    keyConcept: '둑카(dukkha), 무상(無常), 두 번째 화살',
    challenge: '지금의 괴로움에서 첫 번째 화살(사건)과 두 번째 화살(사건에 대한 반응)을 나눠본다면, 각각의 크기는 얼마나 되나요?',
    sources: [
      { citation: 'Dhammacakkappavattana Sutta (SN 56.11) — 초전법륜경', kind: '원전' },
      { citation: 'Sallatha Sutta (SN 36.6) — 화살경', kind: '원전' },
      { citation: '『담마빠다(법구경)』 (전재성 역주, 한국빠알리성전협회, 2008)', kind: '국역본' },
    ],
    tags: ['고통', '행복', '집착', '무상', '수용', 'buddhism'],
    contrastsWith: ['nietzsche', 'bloom-sweet-spot'],
  },
  {
    id: 'buddhism-anatta',
    type: 'tradition',
    name: '불교 — 무아(無我)',
    origin: '고대 인도 · 「무아상경」, 『밀린다왕문경』',
    position:
      '‘나’라고 부를 만한 고정된 실체는 없다. 몸, 느낌, 지각, 의도, 의식의 다섯 무더기(五蘊)가 조건에 따라 일어나고 사라질 뿐이다. 수레가 부품들의 이름이듯 ‘나’도 과정들의 이름이다. 이것을 보면 ‘나’를 지키려는 집착이 느슨해진다.',
    keyConcept: '오온(五蘊)과 무아(anattā)',
    challenge: '‘나’를 찾아 내면을 살펴보세요. 감각·느낌·생각·의도·의식 말고, 그것들을 소유한 ‘나’가 따로 발견되나요? 발견되지 않는다면 무엇이 가벼워지나요?',
    sources: [
      { citation: 'Anattalakkhaṇa Sutta (SN 22.59)', kind: '원전' },
      { citation: 'Milindapañha — 나가세나의 수레 비유', kind: '원전' },
    ],
    tags: ['자아', '무아', '집착', '정체성', 'non-self'],
    contrastsWith: ['schlegel-true-self', 'taylor-authenticity'],
  },
  {
    id: 'confucius-ren',
    type: 'thinker',
    name: '공자 — 인(仁)과 관계적 자아',
    origin: '고대 중국 · 『논어』 (기원전 5세기)',
    position:
      '사람은 관계 속에서 사람이 된다. 인(仁)은 타인을 향한 어짊이며, 서(恕)는 “내가 원하지 않는 것을 남에게 하지 않음”이다. 배우고 때때로 익히는 것(學而時習之)이 기쁨이고, 자기를 닦는 일(修身)이 세상을 다스리는 일의 뿌리다. 자아는 역할을 벗겨내면 남는 알맹이가 아니라 역할을 잘 살아내는 데서 완성된다.',
    keyConcept: '인(仁)·서(恕)·수신(修身), 역할 윤리',
    challenge: '당신은 어떤 관계들 속에서 누구인가요? 그 역할들을 벗겨내면 남는 ‘나’가 있나요, 아니면 역할을 잘 사는 것이 곧 나인가요?',
    sources: [
      { citation: '『논어』 學而 1.1, 為政 2.4, 顏淵 12.1, 衛靈公 15.24', kind: '원전' },
      { citation: '『논어』 (성백효 역주, 전통문화연구회)', kind: '국역본' },
    ],
    tags: ['관계', '가치', '역할', '수양', '유교', 'confucianism'],
    contrastsWith: ['mill-liberty', 'sartre-existentialism'],
  },
  {
    id: 'zhuangzi-useless-tree',
    type: 'thinker',
    name: '장자 — 쓸모없음의 쓸모',
    origin: '고대 중국 · 『장자』 「소요유」·「인간세」 (기원전 4세기)',
    position:
      '목수가 거들떠보지 않는 옹이투성이 나무는 쓸모없기에 베이지 않고 천수를 누린다. 쓸모를 묻는 시선이야말로 우리를 소모시킨다. 삶은 목적을 향한 행군이 아니라 소요(逍遙), 곧 매인 데 없는 노닒일 수 있다. 물고기의 즐거움을 두고 벌인 논쟁처럼, 남의 기준으로 재는 것을 멈출 때 다른 삶이 보인다.',
    keyConcept: '무용지용(無用之用)과 소요(逍遙)',
    challenge: '당신이 ‘쓸모’를 증명하려 애쓰는 영역은 어디인가요? 쓸모를 묻지 않는다면 그 일은 어떻게 달라지나요?',
    sources: [
      { citation: '『장자』 내편 「逍遙遊」, 「人間世」, 외편 「秋水」', kind: '원전' },
      { citation: '『장자』 (안동림 역주, 현암사, 개정판 2010)', kind: '국역본' },
    ],
    tags: ['의미', '목적', '쓸모', '자유', '도가', 'daoism'],
    contrastsWith: ['frankl-logotherapy', 'weber-beruf'],
  },
  {
    id: 'laozi-wuwei',
    type: 'thinker',
    name: '노자 — 무위(無爲)',
    origin: '고대 중국 · 『도덕경』',
    position:
      '최고의 선은 물과 같다(上善若水). 물은 다투지 않고 낮은 곳으로 흐르며 만물을 이롭게 한다. 배움은 날마다 더하는 것이지만 도는 날마다 덜어내는 것이다(為學日益 為道日損). 억지로 하지 않음(無爲)은 게으름이 아니라 사물의 결을 따라 힘을 쓰는 일이며, 족함을 아는 자가 부유하다(知足者富).',
    keyConcept: '무위(無爲)·상선약수(上善若水)·지족(知足)',
    challenge: '지금 억지로 밀어붙이고 있는 일 하나를 떠올려보세요. 물처럼 낮은 곳으로 흐르게 둔다면 무엇이 일어날까요? 그리고 무엇을 ‘덜어낼’ 수 있나요?',
    sources: [
      { citation: '『도덕경』 8장, 33장, 44장, 48장', kind: '원전' },
      { citation: '『도덕경』 (오강남 풀이, 현암사, 1995)', kind: '국역본' },
    ],
    tags: ['자유', '무위', '노력', '흐름', '도가', 'daoism'],
    contrastsWith: ['han-burnout-society', 'kant-autonomy'],
  },
  {
    id: 'wonhyo-hwajaeng',
    type: 'thinker',
    name: '원효 — 일심(一心)과 화쟁(和諍)',
    origin: '신라 · 7세기 · 『대승기신론소』, 『십문화쟁론』',
    position:
      '서로 다투는 주장들은 저마다 한 면의 진리를 보고 있다. 화쟁은 하나를 이기게 하는 것이 아니라 열고 닫으며(開合) 더 큰 틀에서 서로 통하게 하는 일이다. 해골물 일화가 전하듯, 같은 물도 마음에 따라 감로수가 되고 썩은 물이 된다. 모든 것은 한 마음(一心)에서 갈라져 나온다.',
    keyConcept: '화쟁(和諍) — 다툼을 조화시키는 사유',
    challenge: '당신 안에서 다투는 두 입장을 적어보세요. 둘 중 하나를 이기게 하지 않고 둘 다 옳은 지점을 찾는다면, 어떤 문장이 되나요?',
    sources: [
      { citation: '원효, 『대승기신론 소·별기』 (은정희 역주, 일지사, 1991)', kind: '국역본' },
      { citation: '원효, 『십문화쟁론』 (단편)', kind: '원전' },
    ],
    tags: ['대조', '조화', '관점', '마음', '한국', 'korean'],
  },
  {
    id: 'toegye-sadan-chiljeong',
    type: 'thinker',
    name: '퇴계 이황 — 사단칠정(四端七情)',
    origin: '조선 · 16세기 · 퇴계–고봉 논변 (1559–1566)',
    position:
      '감정에는 두 결이 있다. 측은·수오·사양·시비의 마음(四端)은 도덕의 싹으로서 이(理)가 발한 것이고, 기쁨·노여움·슬픔·두려움·사랑·미움·욕망(七情)은 기(氣)가 발한 일반 감정이다. 퇴계는 둘의 근원을 나누어 보았고(理發氣隨·氣發理乘), 기대승과 율곡은 하나의 길(氣發理乘一途)을 주장했다. 논쟁의 핵심은 같다: 수양이란 어떤 감정을 기르고 어떤 감정을 다스릴지 분별하는 일이다.',
    keyConcept: '사단(四端)과 칠정(七情), 감정의 도덕적 결',
    challenge: '당신의 즉각적 감정 중 ‘도덕의 싹’(측은함, 부끄러움, 양보, 옳고 그름의 감각)이라 부를 만한 것은 무엇이고, 다스려야 할 감정은 무엇인가요?',
    sources: [
      { citation: '이황·기대승, 『퇴계·고봉 왕복서』 (사단칠정 논변)', kind: '원전' },
      { citation: '이황, 『성학십도』', kind: '원전' },
      { citation: '민족과사상연구회 편, 『사단칠정론』 (서광사, 1992)', kind: '입문' },
    ],
    tags: ['감정', '가치', '도덕', '수양', '유교', '한국', 'korean'],
  },
  {
    id: 'montaigne-essays',
    type: 'thinker',
    name: '몽테뉴 — “나는 무엇을 아는가?”',
    origin: '16세기 프랑스 · 『에세』 (1580–1588)',
    position:
      '“내 책의 재료는 나 자신이다.” 몽테뉴는 자신을 관찰해 쓰는 일(essai, 시도)을 철학으로 만들었다. 그가 발견한 자아는 일관되지 않고 변덕스러우며, 그래서 그는 “나는 무엇을 아는가?”를 좌우명으로 삼았다. 자기이해는 완성된 초상이 아니라 계속되는 시도다.',
    keyConcept: '에세(essai) — 자기를 쓰는 시도',
    challenge: '당신에 대해 확실히 안다고 말할 수 있는 것과, 실은 그때그때 다른 것을 나눠보세요. 일관되지 않은 자신을 그대로 기록할 수 있나요?',
    sources: [
      { citation: 'Montaigne, Essais, II.1 「우리 행동의 변덕스러움에 관하여」; II.12', kind: '원전' },
      { citation: '몽테뉴, 『에세』 (심민화·최권행 옮김, 민음사, 2022)', kind: '국역본' },
    ],
    tags: ['자아', '글쓰기', '회의', '자기관찰', 'essay'],
  },
  {
    id: 'spinoza-joy',
    type: 'thinker',
    name: '스피노자 — 기쁨은 행위 능력의 증가',
    origin: '17세기 네덜란드 · 『에티카』 (1677)',
    position:
      '모든 존재는 자기 존재를 지속하려 애쓴다(코나투스). 기쁨은 더 큰 완전성으로의 이행, 곧 행위 능력이 커지는 것이고 슬픔은 그 반대다. 우리는 수동적 정념에 끌려다니지만, 정념을 명료하게 이해하는 순간 그것은 수동성을 멈춘다. 자유는 필연을 이해하는 데 있다.',
    keyConcept: '코나투스(conatus)와 기쁨(laetitia)의 정의',
    challenge: '무엇이 당신의 ‘행위 능력’을 실제로 키우나요? 즐겁지만 당신을 작게 만드는 것과, 힘들지만 크게 만드는 것을 구분해보세요.',
    sources: [
      { citation: 'Spinoza, Ethica, III (정의·정리 6, 11), V (정리 3)', kind: '원전' },
      { citation: '스피노자, 『에티카』 (강영계 옮김, 서광사, 2007)', kind: '국역본' },
    ],
    tags: ['즐거움', '감정', '자유', '이해', '기쁨', 'affect'],
  },
  {
    id: 'hume-bundle',
    type: 'thinker',
    name: '흄 — 지각의 다발로서의 자아',
    origin: '18세기 스코틀랜드 · 『인간 본성에 관한 논고』 (1739)',
    position:
      '“내가 가장 깊이 나 자신이라 부르는 것 안으로 들어갈 때마다, 나는 언제나 어떤 특정한 지각에 걸려 넘어질 뿐, 지각 없이 나 자신을 포착한 적이 없다.” 자아는 빠르게 잇달아 지나가는 지각들의 다발이며, 동일성은 기억과 상상이 만들어내는 허구다.',
    keyConcept: '다발 이론(bundle theory)',
    challenge: '지금 이 순간 내면을 들여다보세요. 감각과 생각 말고 그것들을 ‘가진 자’가 따로 보이나요? 보이지 않는다면 ‘나답게 산다’는 말은 무엇을 뜻하게 되나요?',
    sources: [
      { citation: 'Hume, A Treatise of Human Nature, I.iv.6 「인격 동일성에 관하여」', kind: '원전' },
      { citation: '흄, 『인간 본성에 관한 논고』 (이준호 옮김, 서광사, 1994)', kind: '국역본' },
    ],
    tags: ['자아', '동일성', '지각', '회의', 'self'],
    contrastsWith: ['kant-autonomy', 'mcadams-narrative-identity'],
  },
  {
    id: 'kant-autonomy',
    type: 'thinker',
    name: '칸트 — 자율과 존엄',
    origin: '18세기 독일 · 『윤리형이상학 정초』 (1785)',
    position:
      '자유는 하고 싶은 대로 하는 것이 아니라 스스로 세운 법칙을 따르는 것(자율)이다. 사람은 값이 아니라 존엄을 가지며, 그래서 자기 자신이든 타인이든 인간성을 결코 수단으로만 대해서는 안 되고 언제나 동시에 목적으로 대해야 한다.',
    keyConcept: '자율(Autonomie)과 인간성 정식',
    challenge: '당신이 따르는 규칙 중 스스로 입법한 것은 무엇인가요? 그리고 최근 누군가를—혹은 자기 자신을—‘수단으로만’ 대한 순간은 언제였나요?',
    sources: [
      { citation: 'Kant, Grundlegung zur Metaphysik der Sitten (1785), 2절', kind: '원전' },
      { citation: '칸트, 『윤리형이상학 정초』 (백종현 옮김, 아카넷, 2005)', kind: '국역본' },
    ],
    tags: ['자유', '가치', '존엄', '보편', '의무', 'autonomy'],
    contrastsWith: ['laozi-wuwei', 'hume-bundle'],
  },
  {
    id: 'mill-utilitarianism',
    type: 'thinker',
    name: '밀 — 높은 쾌락과 행복의 역설',
    origin: '19세기 영국 · 『공리주의』 (1863), 『자서전』 (1873)',
    position:
      '쾌락에는 질의 차이가 있다. “만족한 돼지보다 불만족한 인간이, 만족한 바보보다 불만족한 소크라테스가 낫다.” 그러나 밀 자신은 청년기의 우울에서 배웠다: “스스로 행복한지 물어보라, 그 순간 행복은 사라진다.” 행복은 다른 것—타인의 행복, 인류의 진보, 예술—을 겨냥할 때 곁에서 얻어진다.',
    keyConcept: '질적 쾌락주의와 “행복은 곁눈질로 얻는 것”',
    challenge: '당신이 행복한지 자문하는 순간 행복이 사라진 경험이 있나요? 밀처럼 ‘다른 것을 겨냥하라’면, 당신은 무엇을 겨냥하겠습니까?',
    sources: [
      { citation: 'Mill, Utilitarianism (1863), ch. 2', kind: '원전' },
      { citation: 'Mill, Autobiography (1873), ch. 5 「내 정신사의 한 위기」', kind: '원전' },
      { citation: '밀, 『공리주의』 (서병훈 옮김, 책세상, 2007)', kind: '국역본' },
    ],
    tags: ['행복', '쾌락', '역설', '공리주의', 'utilitarianism'],
    contrastsWith: ['epicurus-ataraxia', 'nozick-experience-machine'],
  },
  {
    id: 'mill-liberty',
    type: 'thinker',
    name: '밀 — 개별성과 삶의 실험',
    origin: '19세기 영국 · 『자유론』 (1859) 3장',
    position:
      '자신의 삶의 계획을 세상이 대신 고르게 하는 사람은 원숭이 같은 모방 능력 외에는 아무 능력도 필요 없다. 욕구와 충동이 자기 것인 사람만이 성격을 가진다. 좋은 삶의 방식은 하나가 아니므로 각자의 “삶의 실험”이 허용되어야 하고, 타인에게 해를 끼치지 않는 한 개별성은 그 자체로 좋은 것이다.',
    keyConcept: '개별성(individuality)과 삶의 실험',
    challenge: '당신의 삶의 계획 중 ‘세상이 대신 골라준’ 부분은 어디인가요? 스스로 하고 있는 ‘삶의 실험’이 있다면 무엇인가요?',
    sources: [
      { citation: 'Mill, On Liberty (1859), ch. 3 「복지의 한 요소로서의 개별성」', kind: '원전' },
      { citation: '밀, 『자유론』 (서병훈 옮김, 책세상, 2005)', kind: '국역본' },
    ],
    tags: ['자유', '가치', '개별성', '관습', 'liberty'],
    contrastsWith: ['confucius-ren', 'taylor-authenticity'],
  },
  {
    id: 'schopenhauer-pendulum',
    type: 'thinker',
    name: '쇼펜하우어 — 고통과 권태의 진자',
    origin: '19세기 독일 · 『의지와 표상으로서의 세계』 (1818) §57',
    position:
      '삶은 고통과 권태 사이를 오가는 진자다. 욕구는 결핍이므로 고통이고, 충족되면 곧 권태가 찾아온다. 우리를 움직이는 것은 맹목적 의지이며 행복은 고통의 잠깐의 부재일 뿐이다. 탈출구는 예술의 관조, 타인의 고통에 대한 연민, 그리고 의지의 부정에 있다.',
    keyConcept: '결핍–충족–권태의 진자, 맹목적 의지',
    challenge: '최근 원하던 것을 얻은 뒤 얼마 만에 지루해졌나요? 욕구–충족–권태의 진자에서 벗어난 순간(예술, 연민, 몰입)이 있었다면 언제인가요?',
    sources: [
      { citation: 'Schopenhauer, Die Welt als Wille und Vorstellung (1818), I권 §57–58', kind: '원전' },
      { citation: '쇼펜하우어, 『의지와 표상으로서의 세계』 (홍성광 옮김, 을유문화사, 2009)', kind: '국역본' },
    ],
    tags: ['행복', '고통', '권태', '욕구', '염세', 'pessimism'],
    contrastsWith: ['spinoza-joy', 'nietzsche'],
  },
  {
    id: 'kierkegaard-self',
    type: 'thinker',
    name: '키르케고르 — 자기 자신이 되려는 의지',
    origin: '19세기 덴마크 · 『죽음에 이르는 병』 (1849), 『이것이냐 저것이냐』 (1843)',
    position:
      '자아는 사물이 아니라 “자기 자신과 관계하는 관계”다. 절망은 두 형태를 가진다: 자기 자신이 되지 않으려는 절망과, 남의 도움 없이 자기 자신이 되려는 반항의 절망. 삶에는 즐김의 심미적 단계, 선택과 책임의 윤리적 단계, 도약의 종교적 단계가 있으며, 단계 사이의 이동은 논증이 아니라 결단으로 일어난다.',
    keyConcept: '절망의 두 형태, 실존의 세 단계',
    challenge: '당신의 절망은 ‘내가 아닌 무엇이 되려는’ 절망인가요, ‘나 자신이 되지 않으려는’ 절망인가요? 지금 삶은 심미적·윤리적·종교적 단계 중 어디에 있나요?',
    sources: [
      { citation: 'Kierkegaard, Sygdommen til Døden (1849), I부 A', kind: '원전' },
      { citation: 'Kierkegaard, Enten–Eller (1843)', kind: '원전' },
      { citation: '키르케고르, 『죽음에 이르는 병』 (임규정 옮김, 한길사, 2007)', kind: '국역본' },
    ],
    tags: ['자아', '절망', '선택', '실존', '자유', 'existentialism'],
  },
  {
    id: 'nietzsche',
    type: 'thinker',
    name: '니체 — 영원회귀와 운명애',
    origin: '19세기 독일 · 『즐거운 학문』 (1882), 『차라투스트라』 (1883), 『우상의 황혼』 (1889)',
    position:
      '“이 삶을 다시 한 번, 그리고 무수히 반복해서 살아야 한다면?” 영원회귀는 삶을 저울에 올리는 시험이다. 통과하는 길은 운명애(amor fati), 곧 필연을 견디는 것을 넘어 사랑하는 것이다. 안락만을 좇아 “우리는 행복을 발명했다”며 눈을 깜빡이는 ‘최후의 인간’은 이 시험을 치를 수 없다. “살아야 할 이유(why)를 가진 사람은 거의 어떤 방식(how)도 견딘다.” 그리고 과제는 “너 자신이 되어라”이다.',
    keyConcept: '영원회귀·운명애(amor fati)·최후의 인간·자기극복',
    challenge: '이 삶을 똑같이 무한히 반복해야 한다면 긍정할 수 있나요? 긍정할 수 없는 부분은 어디이며, 그것은 바꿀 것인가요, 사랑할 것인가요?',
    sources: [
      { citation: 'Nietzsche, Die fröhliche Wissenschaft (1882) §270, §276, §341', kind: '원전' },
      { citation: 'Nietzsche, Also sprach Zarathustra (1883), 서설 §5', kind: '원전' },
      { citation: 'Nietzsche, Götzen-Dämmerung (1889), 잠언과 화살 12', kind: '원전' },
      { citation: '니체, 『즐거운 학문』 (안성찬·홍사현 옮김, 책세상, 2005)', kind: '국역본' },
    ],
    tags: ['의미', '고통', '긍정', '즐거움', '자기극복', 'nietzsche'],
    contrastsWith: ['epicurus-ataraxia', 'buddhism-dukkha', 'schopenhauer-pendulum'],
  },
  {
    id: 'tolstoy',
    type: 'thinker',
    name: '톨스토이 — 성공의 정점에서 온 질문',
    origin: '19세기 러시아 · 『고백록』 (1882), 『이반 일리치의 죽음』 (1886)',
    position:
      '명성과 가족과 건강을 모두 가진 쉰 살에 톨스토이는 멈춰 섰다. “나를 기다리는 피할 수 없는 죽음이 파괴하지 못하는 의미가 내 삶에 있는가?” 그는 사람들이 이 질문을 피하는 네 가지 방식—모름, 즐김에 빠짐, 삶을 끊음, 약함으로 버팀—을 관찰했고, 이성이 아니라 평범한 사람들의 믿음과 노동에서 답을 찾았다. 이반 일리치는 임종 직전에야 묻는다: “내 삶 전체가 잘못된 것이었다면?”',
    keyConcept: '“죽음이 파괴하지 못하는 의미”, 네 가지 출구',
    challenge: '성공의 정점에서 ‘그래서 뭐?’라는 질문이 온다면, 당신은 톨스토이의 네 출구(모름, 즐김, 끊음, 버팀) 중 어디로 가나요? 다섯 번째 길이 있다면 무엇인가요?',
    sources: [
      { citation: 'Tolstoy, Исповедь (A Confession, 1882)', kind: '원전' },
      { citation: 'Tolstoy, Смерть Ивана Ильича (1886)', kind: '원전' },
      { citation: '톨스토이, 『고백록』 (박문재 옮김, 현대지성, 2018)', kind: '국역본' },
      { citation: '톨스토이, 『이반 일리치의 죽음』 (이강은 옮김, 창비, 2012)', kind: '국역본' },
    ],
    tags: ['의미', '죽음', '허무', '성공', '위기', 'meaning'],
  },
  {
    id: 'marx-alienation',
    type: 'thinker',
    name: '마르크스 — 소외된 노동',
    origin: '19세기 · 『경제학-철학 수고』 (1844)',
    position:
      '노동자는 네 겹으로 소외된다: 자기가 만든 생산물로부터, 생산 활동 자체로부터, 인간으로서의 본질(유적 존재)로부터, 그리고 다른 사람들로부터. “노동자는 일 밖에서만 자기 자신이라 느끼고, 일 안에서는 자기 밖에 있다고 느낀다.” 노동은 본래 삶의 표현이어야 하나 생계 수단으로 전락했다.',
    keyConcept: '소외(Entfremdung)의 네 차원',
    challenge: '당신의 일에서 결과물·과정·동료·자기 자신 중 어디에서 가장 분리되어 있나요? 분리가 없는 활동은 무엇인가요?',
    sources: [
      { citation: 'Marx, Ökonomisch-philosophische Manuskripte (1844), 「소외된 노동」', kind: '원전' },
      { citation: '마르크스, 『경제학-철학 수고』 (강유원 옮김, 이론과실천, 2006)', kind: '국역본' },
    ],
    tags: ['일', '소외', '노동', '공허', 'alienation'],
  },
  {
    id: 'weber-beruf',
    type: 'thinker',
    name: '베버 — 소명(Beruf)과 쇠우리',
    origin: '20세기 초 독일 · 『프로테스탄티즘의 윤리와 자본주의 정신』 (1904–05)',
    position:
      '근대의 근면은 종교적 소명 의식—직업이 신이 부여한 임무라는 믿음—에서 나왔다. 그 믿음이 사라진 뒤에도 “일은 의무”라는 태도는 껍데기로 남아 우리를 쇠우리처럼 가둔다. “정신 없는 전문가, 가슴 없는 향락가”가 그 결과다.',
    keyConcept: '소명(Beruf)과 쇠우리(stahlhartes Gehäuse)',
    challenge: '당신의 근면은 어디서 왔나요? 소명이 사라진 뒤에도 남은 ‘의무로서의 일’이라면, 그 껍데기를 벗겨내면 무엇이 남나요?',
    sources: [
      { citation: 'Weber, Die protestantische Ethik und der Geist des Kapitalismus (1904–05)', kind: '원전' },
      { citation: '베버, 『프로테스탄티즘의 윤리와 자본주의 정신』 (김덕영 옮김, 길, 2010)', kind: '국역본' },
    ],
    tags: ['일', '소명', '근면', '의무', 'calling'],
    contrastsWith: ['zhuangzi-useless-tree', 'pieper-leisure'],
  },
]
