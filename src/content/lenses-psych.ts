import type { LensData } from './lenses-ancient'

/** Psychology and behavioural-science research findings, each stated as a position. */
export const LENSES_PSYCH: LensData[] = [
  {
    id: 'kahneman-two-selves',
    type: 'study',
    name: '카너먼 — 경험하는 자아와 기억하는 자아',
    origin: '심리학 · 카너먼·리스 (2005), 『생각에 관한 생각』 (2011)',
    position:
      '행복에는 두 주체가 있다. 순간을 사는 경험하는 자아와, 그것을 이야기로 만드는 기억하는 자아. 기억하는 자아는 절정과 마지막만 기억하고(피크엔드 법칙) 지속 시간은 무시한다. 우리는 경험하는 자아를 위해서가 아니라 기억하는 자아를 위해 결정을 내리는 경향이 있다.',
    keyConcept: '경험하는 자아 vs 기억하는 자아, 피크엔드 법칙',
    challenge: '당신의 행복한 순간 목록은 ‘경험하는 자아’의 것인가요, ‘기억하는 자아’의 것인가요? 사진에 남기려는 여행과 그냥 좋은 저녁 중 무엇을 더 자주 택하나요?',
    sources: [
      { citation: 'Kahneman, D., & Riis, J. (2005). Living, and thinking about it: Two perspectives on life. In F. A. Huppert, N. Baylis, & B. Keverne (Eds.), The Science of Well-Being (pp. 285–304). Oxford University Press.', kind: '논문' },
      { citation: 'Kahneman, D. (2011). Thinking, Fast and Slow. Part V. Farrar, Straus and Giroux.', kind: '책' },
      { citation: '카너먼, 『생각에 관한 생각』 (이창신 옮김, 김영사, 2018)', kind: '국역본' },
    ],
    tags: ['행복', '기억', '경험', '판단', 'two selves'],
  },
  {
    id: 'suh-origin-of-happiness',
    type: 'book',
    name: '서은국 — 행복의 기원',
    origin: '한국 · 진화심리학 (2014)',
    position:
      '행복은 삶의 목적이 아니라 생존과 번식을 돕기 위해 진화한 도구다. 행복은 강도가 아니라 빈도이며, 아이스크림처럼 금방 녹으므로 자주 경험해야 한다. 가장 확실한 재료는 사람—좋아하는 사람과 함께 먹는 음식이 행복의 원형이다. 외향성이 행복을 강하게 예측하는 이유도 여기 있다.',
    keyConcept: '행복은 빈도, 도구로서의 행복, 사회적 경험',
    challenge: '지난주 ‘좋아하는 사람과 함께 먹은 밥’은 몇 번이었나요? 행복이 빈도라면, 큰 성취 하나와 작은 즐거움 열 번 중 무엇을 택하겠습니까?',
    sources: [
      { citation: '서은국, 『행복의 기원』 (21세기북스, 2014)', kind: '책' },
      { citation: 'Diener, E., Sandvik, E., & Pavot, W. (1991). Happiness is the frequency, not the intensity, of positive versus negative affect. In Subjective Well-Being: An Interdisciplinary Perspective (pp. 119–139). Pergamon.', kind: '논문' },
    ],
    tags: ['행복', '진화', '빈도', '관계', '한국', 'evolution'],
  },
  {
    id: 'killingsworth-wandering-mind',
    type: 'study',
    name: '방황하는 마음은 불행한 마음',
    origin: '심리학 · 킬링스워스·길버트 (2010, Science)',
    position:
      '휴대전화로 2,250명의 순간을 무작위로 물은 결과, 마음은 깨어 있는 시간의 약 47%를 지금 하는 일이 아닌 곳에 두고 있었고, 마음이 떠나 있을 때 사람들은 무엇을 하고 있든 덜 행복했다. 즐거운 공상조차 지금에 집중하는 것보다 행복하지 않았다. 행복은 활동보다 마음이 거기 있는가에 더 달려 있다.',
    keyConcept: '마음의 방황(mind-wandering)과 행복',
    challenge: '지금 이 순간 당신의 마음은 여기에 있나요? 행복이 ‘무엇을 하는가’보다 ‘마음이 거기 있는가’에 달려 있다면, 오늘 어떤 활동에 마음을 두고 싶나요?',
    sources: [
      { citation: 'Killingsworth, M. A., & Gilbert, D. T. (2010). A wandering mind is an unhappy mind. Science, 330(6006), 932.', kind: '논문' },
    ],
    tags: ['행복', '주의', '현재', '경험표집', 'attention'],
  },
  {
    id: 'sdt-needs',
    type: 'study',
    name: '자기결정 이론 — 세 가지 기본 욕구',
    origin: '심리학 · 라이언·데시 (2000)',
    position:
      '문화를 막론하고 사람에게는 세 가지 기본 심리 욕구가 있다: 자율성(내 행동이 내 것이라는 느낌), 유능감(효과적으로 해낼 수 있다는 느낌), 관계성(연결되어 있다는 느낌). 이 욕구가 충족될 때 내재적 동기와 안녕감이 자라고, 좌절될 때 통제감과 소외가 온다. 행복의 조건은 돈이나 성공 자체가 아니라 그것들이 이 욕구를 채우는가에 달려 있다.',
    keyConcept: '자율성·유능감·관계성',
    challenge: '자율성·유능감·관계성 중 지금 가장 굶주린 것은 무엇인가요? 그 결핍이 최근의 불행한 순간에 들어 있었나요?',
    sources: [
      { citation: 'Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. American Psychologist, 55(1), 68–78.', kind: '논문' },
      { citation: 'Ryan, R. M., & Deci, E. L. (2001). On happiness and human potentials: A review of research on hedonic and eudaimonic well-being. Annual Review of Psychology, 52, 141–166.', kind: '논문' },
    ],
    tags: ['행복', '동기', '자율', '유능', '관계', 'self-determination'],
  },
  {
    id: 'hedonic-adaptation',
    type: 'study',
    name: '쾌락 적응',
    origin: '심리학 · 브릭먼 외 (1978), 류보머스키 외 (2005)',
    position:
      '복권 당첨자는 1년 뒤 통제 집단보다 더 행복하지 않았고, 사고로 하반신이 마비된 사람들은 예상보다 훨씬 덜 불행했다. 우리는 좋은 것에도 나쁜 것에도 적응한다. 그래서 환경 변화(돈, 집, 지위)는 행복을 오래 바꾸지 못하고, 의도적 활동—무엇을 하고 어떻게 생각하는가—이 적응에 더 강하게 저항한다.',
    keyConcept: '쾌락 적응(hedonic adaptation), 의도적 활동',
    challenge: '지금 ‘이것만 있으면’이라고 생각하는 것은 무엇인가요? 그것을 얻은 뒤 1년이 지나면 어떤 기분일지, 과거의 비슷한 사례로 예측해보세요.',
    sources: [
      { citation: 'Brickman, P., Coates, D., & Janoff-Bulman, R. (1978). Lottery winners and accident victims: Is happiness relative? Journal of Personality and Social Psychology, 36(8), 917–927.', kind: '논문' },
      { citation: 'Lyubomirsky, S., Sheldon, K. M., & Schkade, D. (2005). Pursuing happiness: The architecture of sustainable change. Review of General Psychology, 9(2), 111–131.', kind: '논문' },
    ],
    tags: ['행복', '적응', '기대', '환경', 'adaptation'],
  },
  {
    id: 'gilbert-affective-forecasting',
    type: 'study',
    name: '감정 예측의 오류',
    origin: '심리학 · 윌슨·길버트 (2005), 『행복에 걸려 비틀거리다』 (2006)',
    position:
      '우리는 미래 사건이 감정에 미칠 영향의 강도와 지속 시간을 체계적으로 과대평가한다(영향 편향). 한 가지에만 초점을 맞추고 나머지 삶을 잊으며(초점주의), 나쁜 일을 합리화해내는 심리적 면역 체계를 과소평가한다. 그래서 두려워한 일은 생각보다 덜 나쁘고, 바라던 일은 생각보다 덜 좋다.',
    keyConcept: '영향 편향(impact bias), 초점주의, 면역 무시',
    challenge: '당신이 지금 두려워하거나 갈망하는 미래의 사건은, 실제로 일어나면 얼마나 오래 감정을 좌우할까요? 과거의 예측이 빗나간 사례를 근거로 다시 추정해보세요.',
    sources: [
      { citation: 'Wilson, T. D., & Gilbert, D. T. (2005). Affective forecasting: Knowing what to want. Current Directions in Psychological Science, 14(3), 131–134.', kind: '논문' },
      { citation: 'Gilbert, D. (2006). Stumbling on Happiness. Knopf.', kind: '책' },
      { citation: '길버트, 『행복에 걸려 비틀거리다』 (서은국·최인철·김미정 옮김, 김영사, 2006)', kind: '국역본' },
    ],
    tags: ['행복', '예측', '기대', '미래', 'forecasting'],
  },
  {
    id: 'oishi-psychological-richness',
    type: 'study',
    name: '심리적으로 풍요로운 삶',
    origin: '심리학 · 오이시·웨스트게이트 (2022, Psychological Review)',
    position:
      '좋은 삶에는 행복한 삶(안정, 편안함, 즐거움)과 의미 있는 삶(목적, 중요성) 말고 세 번째 차원이 있다: 다양하고 새롭고 흥미로우며 관점을 바꿔놓는 경험으로 가득한 심리적으로 풍요로운 삶. 이 삶은 행복하거나 편안하지 않을 수 있지만, 적지 않은 사람들이 이것을 원한다.',
    keyConcept: '심리적 풍요로움(psychological richness)',
    challenge: '행복한 삶, 의미 있는 삶, 풍요로운(다채로운) 삶 중 당신이 살고 있는 것과 살고 싶은 것은 각각 무엇인가요? 관점을 바꿔놓은 경험은 얼마나 자주 있나요?',
    sources: [
      { citation: 'Oishi, S., & Westgate, E. C. (2022). A psychologically rich life: Beyond happiness and meaning. Psychological Review, 129(4), 790–811.', kind: '논문' },
    ],
    tags: ['행복', '의미', '풍요', '경험', '다양성', 'richness'],
  },
  {
    id: 'baumeister-happy-vs-meaningful',
    type: 'study',
    name: '행복한 삶과 의미 있는 삶의 차이',
    origin: '심리학 · 바우마이스터 외 (2013)',
    position:
      '행복과 의미는 겹치지만 다르다. 원하는 것을 얻는 것, 현재에 머무는 것, 받는 사람이 되는 것은 행복과 연결되고 의미와는 무관하거나 반대다. 주는 사람이 되는 것, 과거·미래를 현재와 잇는 것, 자기를 표현하는 것, 그리고 스트레스와 걱정은 의미와 연결된다. 부모 노릇이 그 전형이다.',
    keyConcept: '행복(받음·현재) vs 의미(줌·시간 통합·표현)',
    challenge: '지난달, 당신은 ‘받는 사람’이었나요, ‘주는 사람’이었나요? 스트레스와 걱정이 의미의 신호일 수 있다면, 지금의 스트레스 중 의미 있는 것은 무엇인가요?',
    sources: [
      { citation: 'Baumeister, R. F., Vohs, K. D., Aaker, J. L., & Garbinsky, E. N. (2013). Some key differences between a happy life and a meaningful life. The Journal of Positive Psychology, 8(6), 505–516.', kind: '논문' },
    ],
    tags: ['행복', '의미', '대조', '주기', 'meaning'],
  },
  {
    id: 'frankl-logotherapy',
    type: 'thinker',
    name: '프랭클 — 의미를 향한 의지',
    origin: '심리학 · 『죽음의 수용소에서』 (1946)',
    position:
      '인간의 근본 동기는 쾌락도 권력도 아닌 의미를 향한 의지다. 의미는 세 통로로 발견된다: 무언가를 만들거나 행함으로써, 무언가를 경험하거나 누군가를 만남(사랑)으로써, 그리고 피할 수 없는 고통을 대하는 태도로써. “중요한 것은 우리가 삶에 무엇을 기대하느냐가 아니라 삶이 우리에게 무엇을 기대하느냐다.” 행복은 추구할 수 없고 뒤따라올 뿐이다.',
    keyConcept: '의미를 향한 의지, 의미의 세 통로, 질문의 역전',
    challenge: '삶이 당신에게 무엇을 묻고 있나요? 세 통로—만들기, 만나기, 태도—중 지금 응답하고 있는 곳과 비어 있는 곳은?',
    sources: [
      { citation: "Frankl, V. E. (1946/2006). Man's Search for Meaning. Beacon Press.", kind: '원전' },
      { citation: '프랭클, 『죽음의 수용소에서』 (이시형 옮김, 청아출판사, 2005)', kind: '국역본' },
    ],
    tags: ['의미', '고통', '태도', '책임', 'logotherapy'],
    contrastsWith: ['sartre-existentialism', 'camus-absurd'],
  },
  {
    id: 'harvard-adult-development',
    type: 'study',
    name: '하버드 성인발달 연구 — 관계가 답이다',
    origin: '심리학 · 1938년부터 이어진 종단 연구 · 월딩어·슐츠 (2023)',
    position:
      '85년 넘게 수백 명의 삶을 추적한 결과, 80세의 건강과 행복을 가장 잘 예측한 것은 50세의 콜레스테롤이 아니라 관계에 대한 만족도였다. 외로움은 흡연만큼 해롭고, 좋은 관계는 뇌를 보호한다. 관계는 저절로 유지되지 않으며 “사회적 체력”처럼 돌봐야 한다.',
    keyConcept: '관계의 질이 좋은 삶을 예측한다, 사회적 체력',
    challenge: '당신의 관계는 ‘운동’처럼 돌보고 있나요? 50세의 관계 만족도가 80세의 건강을 예측한다면, 오늘 어느 관계에 시간을 투자하겠습니까?',
    sources: [
      { citation: 'Waldinger, R., & Schulz, M. (2023). The Good Life: Lessons from the World’s Longest Scientific Study of Happiness. Simon & Schuster.', kind: '책' },
      { citation: 'Vaillant, G. E. (2012). Triumphs of Experience. Harvard University Press.', kind: '책' },
      { citation: '월딩어·슐츠, 『세상에서 가장 긴 행복 탐구 보고서』 (박선령 옮김, 비즈니스북스, 2023)', kind: '국역본' },
    ],
    tags: ['행복', '관계', '건강', '종단연구', 'relationships'],
  },
  {
    id: 'income-and-happiness',
    type: 'study',
    name: '소득과 행복 — 어디까지 사고 어디서 멈추는가',
    origin: '심리학·경제학 · 카너먼·디턴 (2010), 킬링스워스·카너먼·멜러스 (2023)',
    position:
      '2010년 연구는 삶에 대한 평가는 소득과 함께 계속 오르지만 일상의 감정은 연 7만 5천 달러쯤에서 평평해진다고 보고했다. 2021년 연구는 감정도 계속 오른다고 반박했고, 두 진영의 공동 연구(2023)는 이렇게 정리했다: 가장 불행한 사람들에게는 소득이 어느 선을 넘으면 더 이상 도움이 되지 않지만, 대부분에게는 소득 증가가 행복을 완만하게 계속 높인다. 다만 그 효과는 다른 요인들에 비해 작다.',
    keyConcept: '삶의 평가 vs 일상 감정, 소득 효과의 크기',
    challenge: '돈이 행복을 사는 지점과 못 사는 지점을 당신의 경험에서 그어본다면 어디인가요? 소득이 두 배가 된다면 하루의 감정은 실제로 얼마나 달라질까요?',
    sources: [
      { citation: 'Kahneman, D., & Deaton, A. (2010). High income improves evaluation of life but not emotional well-being. PNAS, 107(38), 16489–16493.', kind: '논문' },
      { citation: 'Killingsworth, M. A., Kahneman, D., & Mellers, B. (2023). Income and emotional well-being: A conflict resolved. PNAS, 120(10), e2208661120.', kind: '논문' },
    ],
    tags: ['행복', '돈', '소득', '조건', 'income'],
  },
  {
    id: 'ryff-pwb',
    type: 'study',
    name: '리프 — 심리적 안녕의 여섯 차원',
    origin: '심리학 · 리프 (1989)',
    position:
      '기분이 좋은 것만이 안녕은 아니다. 심리적 안녕은 여섯 차원으로 이루어진다: 자기수용, 타인과의 긍정적 관계, 자율성, 환경에 대한 통제감, 삶의 목적, 개인적 성장. 이 관점은 “행복한가”보다 “잘 기능하고 있는가”를 묻는다.',
    keyConcept: '심리적 안녕(PWB)의 여섯 차원',
    challenge: '여섯 차원—자기수용, 긍정적 관계, 자율성, 환경 통제, 삶의 목적, 개인적 성장—중 가장 높은 것과 낮은 것은? 낮은 것은 당신이 원하지 않는 차원인가요, 못 하고 있는 차원인가요?',
    sources: [
      { citation: 'Ryff, C. D. (1989). Happiness is everything, or is it? Explorations on the meaning of psychological well-being. Journal of Personality and Social Psychology, 57(6), 1069–1081.', kind: '논문' },
      { citation: 'Ryff, C. D., & Keyes, C. L. M. (1995). The structure of psychological well-being revisited. Journal of Personality and Social Psychology, 69(4), 719–727.', kind: '논문' },
    ],
    tags: ['행복', '안녕', '성장', '목적', 'well-being'],
  },
  {
    id: 'mauss-valuing-happiness-paradox',
    type: 'study',
    name: '행복을 중시할수록 덜 행복해지는 역설',
    origin: '심리학 · 마우스 외 (2011), 포드 외 (2015)',
    position:
      '행복을 매우 중요하게 여기는 사람은, 특히 스트레스가 적어 행복할 만한 상황에서 오히려 덜 행복했다. 기대가 높아지고 자기 감정을 계속 점검하기 때문이다. 다만 후속 연구는 동아시아처럼 행복을 관계적·사회적으로 추구하는 문화에서는 이 역설이 나타나지 않는다고 보고한다—행복을 ‘함께 만드는 것’으로 볼 때는 추구가 해롭지 않다.',
    keyConcept: '행복 중시의 역설, 문화에 따른 차이',
    challenge: '행복을 얼마나 ‘중요하게’ 여기나요? 행복을 성적표처럼 확인하는 습관이 있다면, 그것이 행복한 순간을 망친 적은?',
    sources: [
      { citation: 'Mauss, I. B., Tamir, M., Anderson, C. L., & Savino, N. S. (2011). Can seeking happiness make people unhappy? Paradoxical effects of valuing happiness. Emotion, 11(4), 807–815.', kind: '논문' },
      { citation: 'Ford, B. Q., et al. (2015). Culture shapes whether the pursuit of happiness predicts higher or lower well-being. Journal of Experimental Psychology: General, 144(6), 1053–1062.', kind: '논문' },
    ],
    tags: ['행복', '역설', '추구', '문화', 'paradox'],
  },
  {
    id: 'csikszentmihalyi-flow',
    type: 'study',
    name: '칙센트미하이 — 몰입',
    origin: '심리학 · 『몰입』 (1990), 경험표집 연구',
    position:
      '가장 좋은 순간은 편안할 때가 아니라 어려운 일을 해내려 몸과 마음을 한계까지 쓸 때 온다. 몰입의 조건은 분명한 목표, 즉각적 피드백, 실력에 살짝 벅찬 도전이다. 몰입 중에는 자의식과 시간이 사라지고 활동 자체가 보상이 된다(자기목적적). 역설적으로 사람들은 여가보다 일에서 더 자주 몰입하면서도 여가를 원한다.',
    keyConcept: '몰입(flow)의 조건, 자기목적적 경험',
    challenge: '몰입의 세 조건(분명한 목표, 즉각적 피드백, 실력에 살짝 벅찬 도전)을 지금 하는 일에 더한다면 무엇을 바꿔야 하나요? 여가에서 몰입이 적다면 그 이유는?',
    sources: [
      { citation: 'Csikszentmihalyi, M. (1990). Flow: The Psychology of Optimal Experience. Harper & Row.', kind: '책' },
      { citation: 'Csikszentmihalyi, M., & LeFevre, J. (1989). Optimal experience in work and leisure. Journal of Personality and Social Psychology, 56(5), 815–822.', kind: '논문' },
      { citation: '칙센트미하이, 『몰입 flow』 (최인수 옮김, 한울림, 2004)', kind: '국역본' },
    ],
    tags: ['즐거움', '몰입', '도전', '일', 'flow'],
  },
  {
    id: 'uchida-east-west-happiness',
    type: 'study',
    name: '동양과 서양의 행복 개념',
    origin: '문화심리학 · 우치다·키타야마 (2009), 우치다 외 (2004)',
    position:
      '북미 문화에서 행복은 개인의 성취와 긍정적 감정으로 정의되고 추구해야 할 최고의 가치다. 동아시아 문화에서 행복은 관계 속의 조화와 균형으로 정의되며, 좋은 일에는 남의 질투나 조화의 흐트러짐 같은 그늘이 따른다는 변증법적 감각이 함께 있다. 어느 쪽이 옳은가가 아니라, 당신의 행복 개념이 어느 쪽에서 왔는가가 질문이다.',
    keyConcept: '독립적 행복 vs 관계적·변증법적 행복',
    challenge: '당신의 행복 개념은 개인적 성취 쪽인가요, 관계의 조화 쪽인가요? 행복이 남의 시선이나 질투를 부른다는 걱정이 당신 안에 있나요?',
    sources: [
      { citation: 'Uchida, Y., & Kitayama, S. (2009). Happiness and unhappiness in East and West: Themes and variations. Emotion, 9(4), 441–456.', kind: '논문' },
      { citation: 'Uchida, Y., Norasakkunkit, V., & Kitayama, S. (2004). Cultural constructions of happiness: Theory and empirical evidence. Journal of Happiness Studies, 5, 223–239.', kind: '논문' },
    ],
    tags: ['행복', '문화', '동아시아', '관계', 'culture'],
  },
  {
    id: 'markus-kitayama-self',
    type: 'study',
    name: '독립적 자아와 상호의존적 자아',
    origin: '문화심리학 · 마커스·키타야마 (1991)',
    position:
      '자아를 이해하는 방식은 문화에 따라 갈린다. 독립적 자아관은 나를 내적 속성(성격, 능력, 취향)으로 정의하고, 상호의존적 자아관은 나를 관계와 역할 속에서 정의한다. 이 차이는 인지, 감정, 동기 전반에 스며든다. 한 개인 안에서도 두 자아관이 공존하며 상황에 따라 앞으로 나온다.',
    keyConcept: '독립적 자아관 vs 상호의존적 자아관',
    challenge: '‘나는 ___이다’ 문장들에서 관계·역할이 많았나요, 성향·취향이 많았나요? 어느 쪽 자아관이 당신을 더 편안하게 하고, 어느 쪽이 사회가 요구하는 것인가요?',
    sources: [
      { citation: 'Markus, H. R., & Kitayama, S. (1991). Culture and the self: Implications for cognition, emotion, and motivation. Psychological Review, 98(2), 224–253.', kind: '논문' },
    ],
    tags: ['자아', '문화', '관계', '독립', 'self-construal'],
  },
  {
    id: 'seligman-perma',
    type: 'study',
    name: '셀리그만 — PERMA',
    origin: '긍정심리학 · 『플로리시』 (2011)',
    position:
      '안녕은 하나의 것이 아니다. 긍정 정서(P), 몰입(E), 관계(R), 의미(M), 성취(A)는 각각 그 자체로 추구되며 서로 환원되지 않는다. 행복한 기분만 좇으면 나머지 넷을 놓치고, 성취만 좇으면 나머지 넷이 비게 된다.',
    keyConcept: 'PERMA의 다섯 기둥',
    challenge: 'PERMA 다섯 요소를 지난달로 채점해보세요. 하나에 몰아넣고 있지는 않나요? 가장 낮은 요소를 위한 작은 행동 하나는?',
    sources: [
      { citation: 'Seligman, M. E. P. (2011). Flourish: A Visionary New Understanding of Happiness and Well-being. Free Press.', kind: '책' },
      { citation: '셀리그만, 『플로리시』 (우문식·윤상운 옮김, 물푸레, 2011)', kind: '국역본' },
    ],
    tags: ['행복', '안녕', '긍정심리학', 'PERMA'],
  },
  {
    id: 'heintzelman-king-meaning',
    type: 'study',
    name: '삶은 꽤 의미 있다',
    origin: '심리학 · 하인첼먼·킹 (2014, American Psychologist)',
    position:
      '수많은 조사에서 대부분의 사람은 자기 삶이 중간 이상으로 의미 있다고 답한다. 의미는 희귀한 성취가 아니라 일상의 규칙성, 세계가 이해된다는 감각, 긍정적 기분 같은 평범한 재료에서 온다. 의미가 없다고 느낄 때는 대개 거창한 목적이 아니라 이 평범한 것들이 흐트러져 있다.',
    keyConcept: '의미의 평범한 원천, 일관성',
    challenge: '당신의 삶이 지금 ‘꽤 의미 있다’고 느껴진다면 그 근거는 거창한 것인가요, 일상의 규칙성과 이해됨인가요? 의미가 없다고 느낄 때 무엇이 흐트러져 있었나요?',
    sources: [
      { citation: 'Heintzelman, S. J., & King, L. A. (2014). Life is pretty meaningful. American Psychologist, 69(6), 561–574.', kind: '논문' },
    ],
    tags: ['의미', '일상', '일관성', 'meaning'],
  },
  {
    id: 'martela-steger-three-meanings',
    type: 'study',
    name: '의미의 세 겹 — 일관성·목적·중요성',
    origin: '심리학 · 마르텔라·스테거 (2016)',
    position:
      '“삶의 의미”는 세 가지 다른 질문을 뭉뚱그린 말이다. 일관성: 내 삶이 이해되는가(인지). 목적: 내 삶이 어디로 향하는가(동기). 중요성: 내 삶이 살 가치가 있는가, 무언가에 중요한가(평가). 세 겹은 따로 높고 낮을 수 있으며, 따로 물어야 답할 수 있다.',
    keyConcept: '일관성(coherence)·목적(purpose)·중요성(significance)',
    challenge: '이해됨·방향·중요함 중 지금 가장 약한 것은 무엇인가요? 그것을 올리는 질문은 각각 다릅니다: ‘내 삶이 이해되는가’, ‘어디로 가는가’, ‘내 삶이 누구에게 중요한가’.',
    sources: [
      { citation: 'Martela, F., & Steger, M. F. (2016). The three meanings of meaning in life: Distinguishing coherence, purpose, and significance. The Journal of Positive Psychology, 11(5), 531–545.', kind: '논문' },
    ],
    tags: ['의미', '목적', '일관성', '중요성', 'meaning'],
  },
  {
    id: 'steger-mlq',
    type: 'study',
    name: '스테거 — 의미의 존재와 탐색',
    origin: '심리학 · 삶의 의미 척도 MLQ (2006), 한국판 (2005)',
    position:
      '삶의 의미에는 두 독립된 축이 있다. 의미의 존재(지금 내 삶이 의미 있다고 느끼는 정도)와 의미의 탐색(의미를 찾으려 애쓰는 정도). 탐색은 존재의 반대가 아니다. 존재가 높으면서 탐색도 높은 사람은 삶을 계속 깊게 만드는 중이고, 둘 다 낮은 상태가 가장 취약하다.',
    keyConcept: '의미의 존재(presence) vs 탐색(search)',
    challenge: '의미의 ‘존재’와 ‘탐색’은 별개의 축입니다. 당신은 존재 높음/탐색 높음 중 어느 조합인가요? 탐색하는 중이라는 사실 자체가 불안한가요, 살아 있다는 신호인가요?',
    sources: [
      { citation: 'Steger, M. F., Frazier, P., Oishi, S., & Kaler, M. (2006). The Meaning in Life Questionnaire: Assessing the presence of and search for meaning in life. Journal of Counseling Psychology, 53(1), 80–93.', kind: '논문' },
      { citation: '원두리, 권선중, 김교헌 (2005). 한국판 삶의 의미척도의 타당화 연구: 대학생을 대상으로. 한국심리학회지: 건강, 10(2), 211–225.', kind: '논문' },
    ],
    tags: ['의미', '척도', '탐색', '점검', 'MLQ'],
  },
  {
    id: 'berridge-wanting-liking',
    type: 'study',
    name: '원함과 좋아함은 다르다',
    origin: '신경과학 · 베리지·로빈슨 (2016)',
    position:
      '뇌에서 ‘원함’(도파민 기반의 유인 현저성)과 ‘좋아함’(쾌락의 실제 경험)은 다른 회로다. 둘은 분리될 수 있고, 중독은 좋아하지 않으면서도 강하게 원하는 상태다. 일상에서도 스마트폰, 단 음식, 알림은 강하게 원하게 만들지만 막상 하면 별로 좋지 않고, 운동이나 깊은 대화는 원하지 않지만 하면 좋다.',
    keyConcept: '원함(wanting) vs 좋아함(liking)',
    challenge: '강하게 ‘원하지만’ 막상 하면 별로 ‘좋지’ 않은 것은 무엇인가요? 원함이 아니라 좋아함을 기준으로 하루를 짠다면 무엇이 빠지고 무엇이 들어오나요?',
    sources: [
      { citation: 'Berridge, K. C., & Robinson, T. E. (2016). Liking, wanting, and the incentive-sensitization theory of addiction. American Psychologist, 71(8), 670–679.', kind: '논문' },
    ],
    tags: ['즐거움', '욕구', '중독', '도파민', 'wanting'],
  },
  {
    id: 'intrinsic-motivation',
    type: 'study',
    name: '보상이 내재적 동기를 갉아먹는다',
    origin: '심리학 · 데시 (1971), 레퍼·그린·니스벳 (1973), 메타분석 (1999)',
    position:
      '좋아서 하던 활동에 예상된 외적 보상을 붙이면, 보상이 사라진 뒤 그 활동에 대한 흥미가 줄어든다(과잉정당화 효과). 그림 그리기를 좋아하던 아이들에게 상을 약속하자 이후 자발적으로 그리는 시간이 줄었다. 통제하는 보상은 자율성을 훼손하고, 정보를 주는 피드백은 그렇지 않다.',
    keyConcept: '과잉정당화 효과, 통제적 보상 vs 정보적 피드백',
    challenge: '좋아서 하던 일에 보상이 붙자 시들해진 경험이 있나요? 그 일을 되살리려면 보상을 빼야 할까요, 자율성을 되찾아야 할까요?',
    sources: [
      { citation: 'Deci, E. L. (1971). Effects of externally mediated rewards on intrinsic motivation. Journal of Personality and Social Psychology, 18(1), 105–115.', kind: '논문' },
      { citation: 'Lepper, M. R., Greene, D., & Nisbett, R. E. (1973). Undermining children’s intrinsic interest with extrinsic reward. Journal of Personality and Social Psychology, 28(1), 129–137.', kind: '논문' },
      { citation: 'Deci, E. L., Koestner, R., & Ryan, R. M. (1999). A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation. Psychological Bulletin, 125(6), 627–668.', kind: '논문' },
    ],
    tags: ['즐거움', '동기', '보상', '놀이', 'motivation'],
  },
  {
    id: 'wilson-just-think',
    type: 'study',
    name: '생각만 하며 앉아 있기의 어려움',
    origin: '심리학 · 윌슨 외 (2014, Science)',
    position:
      '아무 자극 없이 6–15분 동안 생각만 하며 앉아 있으라는 과제를 사람들은 싫어했다. 한 실험에서는 혼자 있는 동안 스스로에게 전기 충격을 줄 수 있게 하자 남성의 67%, 여성의 25%가 적어도 한 번 버튼을 눌렀다. “훈련되지 않은 마음은 자기 자신과 단둘이 있는 것을 좋아하지 않는다.”',
    keyConcept: '자기 자신과 있는 능력',
    challenge: '자극 없이 15분을 견딜 수 있나요? 만약 고역이라면, 즐거움의 바탕—자기 자신과 있는 능력—을 어떻게 기를 수 있을까요?',
    sources: [
      { citation: 'Wilson, T. D., Reinhard, D. A., Westgate, E. C., Gilbert, D. T., Ellerbeck, N., Hahn, C., Brown, C. L., & Shaked, A. (2014). Just think: The challenges of the disengaged mind. Science, 345(6192), 75–77.', kind: '논문' },
    ],
    tags: ['즐거움', '고독', '지루함', '주의', 'boredom'],
  },
  {
    id: 'vallerand-passion',
    type: 'study',
    name: '조화로운 열정과 강박적 열정',
    origin: '심리학 · 발러랜드 외 (2003)',
    position:
      '열정에는 두 종류가 있다. 조화로운 열정은 자율적으로 내면화되어 삶의 다른 영역과 공존하고 유연하며 몰입과 안녕으로 이어진다. 강박적 열정은 자존감이나 인정에 묶여 통제적으로 내면화되고, 다른 것을 밀어내며, 못 할 때 죄책감과 갈등을 낳고 소진으로 이어진다. 같은 활동이 어느 쪽도 될 수 있다.',
    keyConcept: '조화로운 열정 vs 강박적 열정',
    challenge: '당신의 열정은 삶의 다른 부분과 조화롭게 공존하나요, 아니면 다른 것을 밀어내며 당신을 통제하나요? 그 활동을 며칠 못 할 때의 느낌이 답입니다.',
    sources: [
      { citation: 'Vallerand, R. J., Blanchard, C., Mageau, G. A., Koestner, R., Ratelle, C., Léonard, M., Gagné, M., & Marsolais, J. (2003). Les passions de l’âme: On obsessive and harmonious passion. Journal of Personality and Social Psychology, 85(4), 756–767.', kind: '논문' },
    ],
    tags: ['즐거움', '일', '열정', '소진', 'passion'],
  },
  {
    id: 'wrzesniewski-calling',
    type: 'study',
    name: '생계·경력·소명',
    origin: '심리학 · 브제스니에프스키 외 (1997), 잡 크래프팅 (2001)',
    position:
      '같은 직무 안에서도 사람들은 일을 세 가지로 다르게 경험한다. 생계(돈을 위한 것, 퇴근이 목표), 경력(승진과 성장), 소명(일 자체가 충만하고 삶의 일부). 병원 청소 노동자든 행정 직원이든 세 태도는 거의 고르게 나뉜다. 소명으로 일하는 사람은 삶의 만족이 높고, 과제·관계·인식을 스스로 다듬는 잡 크래프팅으로 그쪽으로 이동할 수 있다.',
    keyConcept: '생계(job)·경력(career)·소명(calling), 잡 크래프팅',
    challenge: '같은 직무의 동료 중 소명으로 일하는 사람이 있나요? 당신의 일에서 무엇을 바꾸면(과제, 관계, 인식) 소명에 가까워지나요?',
    sources: [
      { citation: 'Wrzesniewski, A., McCauley, C., Rozin, P., & Schwartz, B. (1997). Jobs, careers, and callings: People’s relations to their work. Journal of Research in Personality, 31(1), 21–33.', kind: '논문' },
      { citation: 'Wrzesniewski, A., & Dutton, J. E. (2001). Crafting a job: Revisioning employees as active crafters of their work. Academy of Management Review, 26(2), 179–201.', kind: '논문' },
    ],
    tags: ['일', '소명', '경력', '태도', 'calling'],
  },
  {
    id: 'revealed-values',
    type: 'concept',
    name: '드러난 가치 (Revealed Values)',
    origin: '경제학·심리학 · 새뮤얼슨의 현시선호 (1938), 바르디·슈워츠 (2003)',
    position:
      '경제학은 사람이 무엇을 원하는지 말이 아니라 선택에서 읽는다(현시선호). 가치도 마찬가지다. 달력과 통장은 가장 정직한 가치 진술서다. 연구에 따르면 말하는 가치와 행동의 상관은 있지만 크지 않으며, 그 간극이 곧 불편함과 자기기만이 사는 곳이다.',
    keyConcept: '진술된 가치 vs 드러난 가치',
    challenge: '지난주의 시간과 돈 기록만 보고 낯선 사람이 당신의 가치를 추측한다면 뭐라고 말할까요? 그 추측이 당신의 자기 서술과 다르다면, 어느 쪽이 진실에 가까운가요?',
    sources: [
      { citation: 'Samuelson, P. A. (1938). A note on the pure theory of consumer’s behaviour. Economica, 5(17), 61–71.', kind: '논문' },
      { citation: 'Bardi, A., & Schwartz, S. H. (2003). Values and behavior: Strength and structure of relations. Personality and Social Psychology Bulletin, 29(10), 1207–1220.', kind: '논문' },
    ],
    tags: ['가치', '행동', '시간', '돈', 'revealed preference'],
  },
  {
    id: 'strohminger-moral-self',
    type: 'study',
    name: '본질적 도덕 자아',
    origin: '심리학 · 스트로밍거·니콜스 (2014)',
    position:
      '사람들은 누군가의 기억, 성격, 취향이 바뀌어도 “같은 사람”이라 여기지만, 도덕적 성품—친절함, 정직함, 잔인함—이 바뀌면 “다른 사람이 되었다”고 판단한다. 우리가 정체성의 핵으로 여기는 것은 능력이나 기억이 아니라 도덕적 성격이다.',
    keyConcept: '정체성의 핵으로서의 도덕적 성품',
    challenge: '당신의 기억이 지워지는 것과 도덕적 성품이 바뀌는 것 중 무엇이 더 ‘당신이 아닌 사람’이 되는 일인가요? 그렇다면 ‘나는 누구인가’의 답은 성취보다 어디에 있어야 하나요?',
    sources: [
      { citation: 'Strohminger, N., & Nichols, S. (2014). The essential moral self. Cognition, 131(1), 159–171.', kind: '논문' },
    ],
    tags: ['자아', '가치', '도덕', '정체성', 'moral self'],
  },
  {
    id: 'via-strengths',
    type: 'study',
    name: 'VIA 성격 강점',
    origin: '긍정심리학 · 피터슨·셀리그만 (2004)',
    position:
      '여러 문화와 전통에서 공통으로 존중되는 성격 강점 24가지가 지혜, 용기, 인간애, 정의, 절제, 초월의 여섯 덕목 아래 분류된다. 각자에게 가장 자연스럽고 에너지를 주는 “대표 강점”이 있으며, 이를 새로운 방식으로 쓰는 것이 안녕을 높인다.',
    keyConcept: '24가지 성격 강점, 대표 강점',
    challenge: '당신의 ‘대표 강점’ 다섯을 고른다면? 그 강점을 쓴 날과 쓰지 못한 날의 하루는 어떻게 다른가요? 존경하는 사람에게서 본 강점과 겹치나요?',
    sources: [
      { citation: 'Peterson, C., & Seligman, M. E. P. (2004). Character Strengths and Virtues: A Handbook and Classification. Oxford University Press.', kind: '책' },
    ],
    tags: ['가치', '강점', '덕', '성격', 'strengths'],
  },
  {
    id: 'schwartz-values',
    type: 'study',
    name: '슈워츠 — 기본 가치의 구조',
    origin: '사회심리학 · 슈워츠 (1992, 2012)',
    position:
      '문화를 넘어 사람들이 인식하는 기본 가치는 열 가지다: 자기주도, 자극, 쾌락, 성취, 권력, 안전, 동조, 전통, 자애, 보편주의. 이들은 원 위에 배열되어 이웃한 가치는 양립하고 마주 보는 가치는 충돌한다. 변화에 대한 개방 ↔ 보존, 자기 고양 ↔ 자기 초월이라는 두 축이 그 구조다. 가치 갈등은 성격 결함이 아니라 구조다.',
    keyConcept: '열 가지 기본 가치, 원형 구조와 두 축',
    challenge: '열 가지 가치를 중요도로 배열하면 어떤 축(변화–보존, 자기고양–자기초월)에 기울어 있나요? 서로 반대편 가치를 동시에 높게 두고 있다면, 그 긴장이 어디서 드러나나요?',
    sources: [
      { citation: 'Schwartz, S. H. (1992). Universals in the content and structure of values: Theoretical advances and empirical tests in 20 countries. Advances in Experimental Social Psychology, 25, 1–65.', kind: '논문' },
      { citation: 'Schwartz, S. H. (2012). An overview of the Schwartz theory of basic values. Online Readings in Psychology and Culture, 2(1).', kind: '논문' },
    ],
    tags: ['가치', '충돌', '구조', 'values'],
  },
  {
    id: 'act-values',
    type: 'study',
    name: '수용전념치료 — 목표가 아닌 방향으로서의 가치',
    origin: '임상심리학 · 헤이즈·스트로살·윌슨 (1999/2012)',
    position:
      '가치는 도달하는 목적지가 아니라 나침반의 방향이다. “서쪽으로 가기”는 완수될 수 없지만 매 걸음 확인할 수 있다. 목표는 가치를 향한 이정표일 뿐이며, 목표를 이루고도 공허한 것은 방향이 없어서다. 불편한 감정을 없애려 하기보다 그것을 안고서도 가치의 방향으로 걷는 것이 심리적 유연성이다.',
    keyConcept: '방향으로서의 가치, 가치 있는 삶(valued living)',
    challenge: '당신의 가치를 ‘목표’가 아니라 ‘방향’으로 다시 쓴다면? (예: ‘승진’이 아니라 ‘배우고 기여하기’) 오늘 그 방향으로 한 걸음은 무엇이었나요?',
    sources: [
      { citation: 'Hayes, S. C., Strosahl, K. D., & Wilson, K. G. (2012). Acceptance and Commitment Therapy: The Process and Practice of Mindful Change (2nd ed.). Guilford Press.', kind: '책' },
      { citation: 'Wilson, K. G., & Murrell, A. R. (2004). Values work in acceptance and commitment therapy. In S. C. Hayes, V. M. Follette, & M. M. Linehan (Eds.), Mindfulness and Acceptance (pp. 120–151). Guilford Press.', kind: '논문' },
    ],
    tags: ['가치', '방향', '수용', '감정', 'ACT'],
  },
  {
    id: 'marcia-identity-status',
    type: 'study',
    name: '마샤 — 정체성 지위: 탐색과 전념',
    origin: '발달심리학 · 마샤 (1966), MAMA 순환 (1992)',
    position:
      '정체성은 두 축으로 읽힌다: 대안을 탐색했는가, 그리고 입장에 전념했는가. 둘 다 없으면 확산, 탐색 없이 물려받은 입장에 전념하면 조기완료, 탐색 중이지만 전념이 없으면 유예, 탐색을 거쳐 전념하면 성취다. 성취는 종착점이 아니며, 성인기 내내 유예와 성취를 오가는 순환(MAMA)이 정상이다.',
    keyConcept: '확산·조기완료·유예·성취, 탐색 × 전념',
    challenge: '각 영역에서 당신은 탐색 없이 물려받은 입장(조기완료)인가요, 탐색 중(유예)인가요, 탐색을 거쳐 세운 입장(성취)인가요? ‘유예’는 실패가 아니라 과정임을 알고 있나요?',
    sources: [
      { citation: 'Marcia, J. E. (1966). Development and validation of ego-identity status. Journal of Personality and Social Psychology, 3(5), 551–558.', kind: '논문' },
      { citation: 'Stephen, J., Fraser, E., & Marcia, J. E. (1992). Moratorium-achievement (Mama) cycles in lifespan identity development. Journal of Adolescence, 15(3), 283–300.', kind: '논문' },
    ],
    tags: ['자아', '가치', '탐색', '전념', '정체성', 'identity status'],
  },
  {
    id: 'mcadams-narrative-identity',
    type: 'study',
    name: '맥애덤스 — 서사적 정체성',
    origin: '성격심리학 · 맥애덤스 (2001), 맥애덤스·맥린 (2013)',
    position:
      '자아는 특성의 목록이 아니라, 재구성된 과거와 상상된 미래를 잇는 내면화된 진화하는 이야기다. 나쁜 일이 좋은 결과로 이어지는 구원 서사는 생성감과 안녕을, 좋은 일이 나쁘게 끝나는 오염 서사는 우울을 예측한다. 같은 사건도 다르게 이야기할 수 있고, 이야기를 바꾸면 자아가 바뀐다.',
    keyConcept: '서사적 정체성, 구원 서사 vs 오염 서사',
    challenge: '당신의 인생 이야기에서 나쁜 일이 좋은 결과로 이어진 장면(구원 서사)과 좋은 일이 나쁘게 끝난 장면(오염 서사) 중 무엇이 더 많나요? 같은 사건을 다르게 이야기할 수 있나요?',
    sources: [
      { citation: 'McAdams, D. P. (2001). The psychology of life stories. Review of General Psychology, 5(2), 100–122.', kind: '논문' },
      { citation: 'McAdams, D. P., & McLean, K. C. (2013). Narrative identity. Current Directions in Psychological Science, 22(3), 233–238.', kind: '논문' },
    ],
    tags: ['자아', '이야기', '서사', '구원', 'narrative'],
    contrastsWith: ['hume-bundle', 'parfit-identity'],
  },
  {
    id: 'self-concept-clarity',
    type: 'study',
    name: '자기개념 명료성',
    origin: '성격심리학 · 캠벨 외 (1996)',
    position:
      '자기개념 명료성은 자기에 대한 믿음이 얼마나 분명하고, 서로 일관되며, 시간이 지나도 안정적인가를 뜻한다. 명료성은 자존감·안녕과 함께 가고 신경증적 경향과 반대로 간다. 다만 문화에 따라 달라서, 관계 속에서 자아를 정의하는 문화에서는 명료성이 낮아도 안녕이 덜 손상된다.',
    keyConcept: '자기개념 명료성(self-concept clarity)',
    challenge: '당신의 자기 서술은 서로 모순되지 않고 시간이 지나도 안정적인가요? 명료함이 낮다면, 그것은 아직 탐색 중이라서인가요, 남의 시선에 따라 바뀌어서인가요?',
    sources: [
      { citation: 'Campbell, J. D., Trapnell, P. D., Heine, S. J., Katz, I. M., Lavallee, L. F., & Lehman, D. R. (1996). Self-concept clarity: Measurement, personality correlates, and cultural boundaries. Journal of Personality and Social Psychology, 70(1), 141–156.', kind: '논문' },
    ],
    tags: ['자아', '명료성', '자기개념', '점검', 'clarity'],
  },
  {
    id: 'twenty-statements-test',
    type: 'study',
    name: '스무 문장 검사 — “나는 누구인가?”',
    origin: '사회심리학 · 쿤·맥파틀랜드 (1954)',
    position:
      '“나는 누구인가?”에 스무 번 답하게 하는 단순한 검사다. 답은 역할·소속 같은 합의적 범주와 성향·평가 같은 주관적 범주로 나뉘며, 어떤 것이 먼저, 얼마나 많이 나오는지가 자기개념의 구조를 드러낸다. 집단주의 문화에서는 관계와 역할 답이 더 많다.',
    keyConcept: 'TST, 합의적 vs 주관적 자기 진술',
    challenge: '스무 문장 중 역할·소속과 성향·가치의 비율은? 역할을 모두 지우면 남는 문장이 있나요?',
    sources: [
      { citation: 'Kuhn, M. H., & McPartland, T. S. (1954). An empirical investigation of self-attitudes. American Sociological Review, 19(1), 68–76.', kind: '논문' },
    ],
    tags: ['자아', '자기개념', '역할', 'TST'],
  },
  {
    id: 'eurich-insight',
    type: 'study',
    name: '유리크 — “왜”가 아니라 “무엇”',
    origin: '조직심리학 · 『인사이트』 (2017), HBR (2018)',
    position:
      '자기인식에는 두 종류가 있다: 자기를 안에서 보는 내적 자기인식과, 남들이 나를 어떻게 보는지 아는 외적 자기인식. 둘은 독립적이다. 내성은 자기인식을 늘리지 않는 경우가 많다—“왜”라고 물으면 그럴듯한 합리화와 반추로 흐르고, “무엇”이라고 물으면(무엇이 중요했나, 무엇을 다르게 할까) 통찰로 이어진다. 스스로 자기인식이 높다고 믿는 사람은 95%지만 실제로는 10–15%뿐이다.',
    keyConcept: '내적·외적 자기인식, “왜” 대신 “무엇”',
    challenge: '최근 ‘왜 나는 이럴까’라고 물었던 일을 ‘무엇이 그 상황에서 중요했나’, ‘무엇을 다르게 할 수 있나’로 바꿔 물어보세요. 답이 달라지나요? 외부의 눈(피드백)은 언제 마지막으로 구했나요?',
    sources: [
      { citation: 'Eurich, T. (2017). Insight: Why We’re Not as Self-Aware as We Think, and How Seeing Ourselves Clearly Helps Us Succeed at Work and in Life. Crown.', kind: '책' },
      { citation: 'Eurich, T. (2018, January 4). What self-awareness really is (and how to cultivate it). Harvard Business Review.', kind: '기타' },
    ],
    tags: ['자아', '자기인식', '질문', '방법', 'self-awareness'],
  },
  {
    id: 'nisbett-wilson-introspection',
    type: 'study',
    name: '우리는 아는 것보다 더 많이 말한다',
    origin: '심리학 · 니스벳·윌슨 (1977), 윌슨 (2002)',
    position:
      '사람들은 자기 행동의 원인을 정확히 보고하지 못하는 경우가 많다. 같은 스타킹 네 켤레 중 오른쪽 것을 고른 사람들은 위치 효과를 부정하고 품질을 이유로 댔다. 우리는 이유를 ‘아는’ 것이 아니라 그럴듯한 이론으로 ‘지어낸다’. 자기이해는 내성보다 행동의 패턴을 관찰하는 데서 더 정확해진다.',
    keyConcept: '내성의 한계, 지어낸 이유',
    challenge: '당신이 스스로 ‘이유’라고 믿는 것들 중, 사실은 그럴듯한 이야기일 수 있는 것은? 자기이해를 내성 대신 행동 기록으로 검증할 수 있는 항목은 무엇인가요?',
    sources: [
      { citation: 'Nisbett, R. E., & Wilson, T. D. (1977). Telling more than we can know: Verbal reports on mental processes. Psychological Review, 84(3), 231–259.', kind: '논문' },
      { citation: 'Wilson, T. D. (2002). Strangers to Ourselves: Discovering the Adaptive Unconscious. Harvard University Press.', kind: '책' },
    ],
    tags: ['자아', '내성', '검증', '이유', 'introspection'],
  },
  {
    id: 'end-of-history-illusion',
    type: 'study',
    name: '역사의 종말 착각',
    origin: '심리학 · 쿼이드바흐·길버트·윌슨 (2013, Science)',
    position:
      '모든 연령대의 사람들이 지난 10년 동안 자신이 많이 변했다고 인정하면서도 앞으로 10년은 거의 변하지 않을 것이라 예측한다. 가치, 취향, 성격 모두 그렇다. 우리는 늘 “지금의 나가 완성된 나”라고 느끼지만, 그것은 매 시점마다 틀린 착각이었다.',
    keyConcept: '미래 변화의 과소평가',
    challenge: '10년 전의 당신은 지금의 당신을 예측했을까요? 그렇지 않았다면, 지금 ‘변하지 않을 것’이라 믿는 가치와 취향 중 무엇이 바뀔 수 있나요? 그것이 오늘의 결정을 어떻게 바꾸나요?',
    sources: [
      { citation: 'Quoidbach, J., Gilbert, D. T., & Wilson, T. D. (2013). The end of history illusion. Science, 339(6115), 96–98.', kind: '논문' },
    ],
    tags: ['자아', '변화', '미래', '시간', 'change'],
  },
  {
    id: 'schlegel-true-self',
    type: 'study',
    name: '진짜 나에 대한 믿음과 의미',
    origin: '심리학 · 슐레겔·힉스·아른트·킹 (2009)',
    position:
      '“진짜 나”가 형이상학적으로 존재하든 아니든, 자신의 진짜 자아를 안다는 느낌이 접근 가능할수록 사람들은 삶이 더 의미 있다고 느끼고 결정에 더 확신을 가진다. 진짜 자아 개념은 사실 진술이라기보다 의미와 방향을 주는 기능을 한다.',
    keyConcept: '진짜 자아 개념의 접근성과 의미',
    challenge: '‘진짜 나’를 알고 있다는 느낌이 당신에게 의미를 주나요? 그 느낌이 사실인지와 별개로, 그 믿음이 당신의 선택을 어떻게 이끄나요?',
    sources: [
      { citation: 'Schlegel, R. J., Hicks, J. A., Arndt, J., & King, L. A. (2009). Thine own self: True self-concept accessibility and meaning in life. Journal of Personality and Social Psychology, 96(2), 473–490.', kind: '논문' },
    ],
    tags: ['자아', '진정성', '의미', 'true self'],
    contrastsWith: ['buddhism-anatta', 'hume-bundle'],
  },
  {
    id: 'attachment-theory',
    type: 'study',
    name: '애착 이론 — 안전한 의존이 탐험을 낳는다',
    origin: '발달·사회심리학 · 볼비, 에인스워스, 헤이잔·셰이버 (1987)',
    position:
      '어릴 때 형성된 애착 방식(안정, 불안, 회피)은 성인의 사랑과 우정에서도 되풀이된다. 역설은 이것이다: 안전한 의존이 가능한 사람이 더 자율적으로 탐험한다. 의존을 부끄러워하는 문화가 말하는 것과 달리, 성숙은 의존하지 않음이 아니라 안전하게 의존할 줄 아는 것이다.',
    keyConcept: '애착 유형, 안전 기지(secure base)',
    challenge: '가까운 사람과 거리가 생길 때 당신은 매달리나요, 물러서나요, 안정적으로 머무나요? 안전한 의존이 탐험을 가능하게 한다면, 당신의 ‘안전 기지’는 누구인가요?',
    sources: [
      { citation: 'Hazan, C., & Shaver, P. (1987). Romantic love conceptualized as an attachment process. Journal of Personality and Social Psychology, 52(3), 511–524.', kind: '논문' },
      { citation: 'Mikulincer, M., & Shaver, P. R. (2007). Attachment in Adulthood: Structure, Dynamics, and Change. Guilford Press.', kind: '책' },
    ],
    tags: ['관계', '의존', '애착', '자율', 'attachment'],
  },
  {
    id: 'ariely-legos',
    type: 'study',
    name: '레고 실험 — 인정받지 못하는 일',
    origin: '행동경제학 · 애리얼리·카메니카·프렐렉 (2008)',
    position:
      '레고를 조립하고 돈을 받는 실험에서, 완성품을 눈앞에서 곧바로 분해당한 사람들(시지프 조건)은 보관되는 조건보다 훨씬 적게 만들었다. 같은 돈, 같은 일이었다. 일의 의미는 결과가 인정되고 남는다는 최소한의 신호에 크게 좌우된다.',
    keyConcept: '인정과 의미, 시지프 조건',
    challenge: '당신의 일이 누군가의 눈앞에서 곧바로 해체되는 것처럼 느껴진 적이 있나요? 당신의 일이 ‘보이는’ 조건은 무엇이고, 누구의 인정이 필요한가요?',
    sources: [
      { citation: 'Ariely, D., Kamenica, E., & Prelec, D. (2008). Man’s search for meaning: The case of Legos. Journal of Economic Behavior & Organization, 67(3–4), 671–677.', kind: '논문' },
    ],
    tags: ['일', '의미', '인정', 'recognition'],
  },
  {
    id: 'kross-self-distancing',
    type: 'study',
    name: '크로스 — 자기 거리두기',
    origin: '심리학 · 크로스·아이덕 (2017), 『채터』 (2021)',
    position:
      '괴로운 일을 1인칭으로 곱씹으면 감정에 다시 잠기지만, 한 걸음 떨어져—벽에 붙은 파리처럼, 혹은 자기 이름을 부르는 3인칭으로—바라보면 감정 반응이 줄고 재해석이 가능해진다. 거리두기는 회피가 아니다. 사건을 더 잘 이해하기 위해 시점을 바꾸는 것이다.',
    keyConcept: '자기 거리두기(self-distancing), 3인칭 자기 대화',
    challenge: '힘든 일을 자기 이름으로 3인칭 서술해보세요. ‘나는 왜’가 아니라 ‘OO은 무엇을 필요로 했나’로. 무엇이 달라 보이나요?',
    sources: [
      { citation: 'Kross, E., & Ayduk, O. (2017). Self-distancing: Theory, research, and current directions. Advances in Experimental Social Psychology, 55, 81–136.', kind: '논문' },
      { citation: 'Kross, E. (2021). Chatter: The Voice in Our Head, Why It Matters, and How to Harness It. Crown.', kind: '책' },
      { citation: '크로스, 『채터, 당신 안의 훼방꾼』 (강주헌 옮김, 김영사, 2021)', kind: '국역본' },
    ],
    tags: ['고통', '감정', '반추', '거리두기', 'self-distancing'],
  },
  {
    id: 'pennebaker-expressive-writing',
    type: 'study',
    name: '페니베이커 — 표현적 글쓰기',
    origin: '심리학 · 페니베이커 (1997), 페니베이커·스미스 (2016)',
    position:
      '감정적으로 중요한 경험에 대해 15–20분씩 사나흘 글을 쓴 사람들은 이후 병원 방문이 줄고 면역 지표가 나아졌다. 효과는 사실을 나열하는 것이 아니라 감정과 그 의미를 함께 쓰고, 며칠에 걸쳐 이야기의 형태가 만들어질 때 컸다. 모두에게 맞는 것은 아니며, 압도되면 멈추는 것이 맞다.',
    keyConcept: '표현적 글쓰기(expressive writing), 이야기 만들기',
    challenge: '말하지 못한 일을 글로 써본 적이 있나요? 사실만이 아니라 감정과 그 의미까지, 15분씩 나흘. 쓰고 나서 이야기의 형태가 생겼나요?',
    sources: [
      { citation: 'Pennebaker, J. W. (1997). Writing about emotional experiences as a therapeutic process. Psychological Science, 8(3), 162–166.', kind: '논문' },
      { citation: 'Pennebaker, J. W., & Smyth, J. M. (2016). Opening Up by Writing It Down (3rd ed.). Guilford Press.', kind: '책' },
    ],
    tags: ['고통', '글쓰기', '감정', '치유', 'writing'],
  },
  {
    id: 'gross-reappraisal',
    type: 'study',
    name: '그로스 — 감정 조절의 과정 모형',
    origin: '심리학 · 그로스 (1998, 2002)',
    position:
      '감정은 상황 선택 → 상황 수정 → 주의 배치 → 인지적 재평가 → 반응 조절의 어느 단계에서든 조절될 수 있다. 앞 단계일수록 비용이 적다. 표정과 표현을 누르는 억제는 부정적 감정을 줄이지 못하면서 생리적 부담과 기억 손상, 관계의 거리감을 낳고, 상황을 다시 해석하는 재평가는 감정을 실제로 바꾸며 비용이 적다.',
    keyConcept: '재평가(reappraisal) vs 억제(suppression)',
    challenge: '감정이 올라올 때 당신은 표정을 누르나요(억제), 상황을 다시 해석하나요(재평가), 상황을 피하나요? 억제의 비용은 관계와 몸 어디에서 청구되고 있나요?',
    sources: [
      { citation: 'Gross, J. J. (1998). The emerging field of emotion regulation: An integrative review. Review of General Psychology, 2(3), 271–299.', kind: '논문' },
      { citation: 'Gross, J. J. (2002). Emotion regulation: Affective, cognitive, and social consequences. Psychophysiology, 39(3), 281–291.', kind: '논문' },
    ],
    tags: ['감정', '조절', '억제', '재평가', 'regulation'],
  },
  {
    id: 'rumination-vs-reflection',
    type: 'study',
    name: '반추와 성찰은 다르다',
    origin: '심리학 · 트랩넬·캠벨 (1999), 놀렌-혹세마 외 (2008)',
    position:
      '자기에게 주의를 돌리는 데는 두 동기가 있다. 반추는 위협과 불안에서 나오는 반복적이고 수동적인 자기 주의로 우울을 키우고, 성찰은 호기심과 앎의 욕구에서 나오는 자기 탐구로 개방성과 함께 간다. 겉으로는 둘 다 “생각이 많은 것”이지만 하나는 맴돌고 하나는 나아간다.',
    keyConcept: '반추(rumination) vs 성찰(reflection)',
    challenge: '지금의 자기 성찰은 호기심에서 오나요, 불안에서 오나요? 같은 질문을 반복해서 맴돌고 있다면 잠시 멈추고 ‘무엇’ 질문으로 바꾸거나, 몸을 움직이세요.',
    sources: [
      { citation: 'Trapnell, P. D., & Campbell, J. D. (1999). Private self-consciousness and the five-factor model of personality: Distinguishing rumination from reflection. Journal of Personality and Social Psychology, 76(2), 284–304.', kind: '논문' },
      { citation: 'Nolen-Hoeksema, S., Wisco, B. E., & Lyubomirsky, S. (2008). Rethinking rumination. Perspectives on Psychological Science, 3(5), 400–424.', kind: '논문' },
    ],
    tags: ['고통', '반추', '성찰', '안전', 'rumination'],
  },
  {
    id: 'post-traumatic-growth',
    type: 'study',
    name: '외상 후 성장',
    origin: '심리학 · 테데스키·칼훈 (1996, 2004)',
    position:
      '큰 고난과 씨름한 뒤 어떤 사람들은 다섯 영역에서 성장을 보고한다: 삶에 대한 감사, 깊어진 관계, 개인적 강함, 새로운 가능성, 영적 변화. 성장은 자동이 아니다. 의도적으로 사건을 되짚고 의미를 만드는 과정, 지지해주는 사람, 시간이 필요하며, 고통과 성장은 공존한다.',
    keyConcept: '외상 후 성장의 다섯 영역, 의미 만들기',
    challenge: '고통 뒤에 삶의 감사, 관계, 강함, 새 가능성, 영적 변화 중 무엇이 자랐나요? 자라지 않았다면 무엇이 빠져 있었나요—시간, 이야기, 사람?',
    sources: [
      { citation: 'Tedeschi, R. G., & Calhoun, L. G. (2004). Posttraumatic growth: Conceptual foundations and empirical evidence. Psychological Inquiry, 15(1), 1–18.', kind: '논문' },
    ],
    tags: ['고통', '성장', '회복', 'growth'],
  },
  {
    id: 'gilovich-regret',
    type: 'study',
    name: '후회의 시간 패턴',
    origin: '심리학 · 길로비치·메드벡 (1995)',
    position:
      '짧게 보면 사람들은 한 일을 더 후회하지만, 길게 보면 하지 않은 일을 더 후회한다. 한 일의 고통은 시간이 줄여주고 배운 것으로 바뀌지만, 하지 않은 일의 결과는 상상 속에서 계속 자라기 때문이다.',
    keyConcept: '행동의 후회 vs 비행동의 후회',
    challenge: '장기적으로는 ‘하지 않은 것’의 후회가 커진다면, 지금 망설이는 일 중 10년 뒤 후회할 것은 무엇인가요? 행동의 후회는 시간이 치유하지만 비행동의 후회는 상상 속에서 자란다는 점을 어떻게 쓰겠습니까?',
    sources: [
      { citation: 'Gilovich, T., & Medvec, V. H. (1995). The experience of regret: What, when, and why. Psychological Review, 102(2), 379–395.', kind: '논문' },
    ],
    tags: ['자유', '후회', '결정', 'regret'],
  },
  {
    id: 'locus-of-control',
    type: 'concept',
    name: '통제 소재',
    origin: '심리학 · 로터 (1966), 셀리그만의 학습된 무기력 (1972)',
    position:
      '결과가 자기 행동에 달렸다고 믿는 내적 통제 소재와, 운·타인·상황에 달렸다고 믿는 외적 통제 소재가 있다. 내적 소재는 대체로 안녕과 함께 가지만, 통제할 수 없는 것까지 자기 탓으로 돌리면 자책이 된다. 반대로 통제할 수 있는 것을 포기하는 것이 학습된 무기력이다. 정확한 경계가 핵심이다.',
    keyConcept: '내적·외적 통제 소재, 학습된 무기력',
    challenge: '결과가 대체로 내 손에 달렸다고 믿나요, 운과 타인에 달렸다고 믿나요? 그 믿음이 틀린 영역—통제할 수 없는데 자책하거나, 통제할 수 있는데 포기한 영역—은 어디인가요?',
    sources: [
      { citation: 'Rotter, J. B. (1966). Generalized expectancies for internal versus external control of reinforcement. Psychological Monographs, 80(1), 1–28.', kind: '논문' },
      { citation: 'Seligman, M. E. P. (1972). Learned helplessness. Annual Review of Medicine, 23, 407–412.', kind: '논문' },
    ],
    tags: ['자유', '책임', '통제', 'control'],
  },
  {
    id: 'terror-management-theory',
    type: 'study',
    name: '공포 관리 이론',
    origin: '사회심리학 · 그린버그·피진스키·솔로몬 (1986), 베커 『죽음의 부정』 (1973)',
    position:
      '죽음을 아는 동물인 인간은 그 공포를 두 가지로 관리한다: 나를 넘어 지속되는 문화적 세계관(국가, 종교, 업적, 자녀)에 속함으로써 상징적 불멸을 얻고, 그 세계관 안에서 가치 있는 존재라는 자존감을 얻는다. 죽음을 상기시키면 사람들은 자기 집단을 더 옹호하고, 더 소비하며, 명성을 더 추구한다.',
    keyConcept: '상징적 불멸, 죽음 현저성 효과',
    challenge: '죽음이 떠오를 때 당신은 무엇에 더 매달리나요—성취, 소속, 자녀, 명성? 그것이 ‘상징적 불멸’의 추구라면, 알고 하는 것과 끌려가는 것은 무엇이 다를까요?',
    sources: [
      { citation: 'Greenberg, J., Pyszczynski, T., & Solomon, S. (1986). The causes and consequences of a need for self-esteem: A terror management theory. In R. F. Baumeister (Ed.), Public Self and Private Self (pp. 189–212). Springer.', kind: '논문' },
      { citation: 'Becker, E. (1973). The Denial of Death. Free Press.', kind: '책' },
      { citation: '베커, 『죽음의 부정』 (노승영 옮김, 한빛비즈, 2019)', kind: '국역본' },
    ],
    tags: ['죽음', '불멸', '자존감', '문화', 'terror management'],
  },
]
