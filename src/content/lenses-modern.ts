import type { LensData } from './lenses-ancient'

/** 20th–21st century philosophy, essays and practical frameworks. */
export const LENSES_MODERN: LensData[] = [
  {
    id: 'heidegger-being-toward-death',
    type: 'thinker',
    name: '하이데거 — 죽음을 향한 존재',
    origin: '20세기 독일 · 『존재와 시간』 (1927) §§46–53',
    position:
      '우리는 대개 “사람들(das Man)이 다 그렇게 산다”는 익명의 방식으로 산다. 죽음은 아무도 대신해줄 수 없는, 오직 나만의 가능성이다. 죽음을 앞질러 마주할 때 비로소 익명성에서 벗어나 자기 고유의 가능성을 붙잡는 본래적 실존이 열린다.',
    keyConcept: '죽음을 향한 존재(Sein zum Tode), 세인(das Man), 본래성',
    challenge: '‘사람들이 다 그렇게 산다’는 말로 내린 결정은 무엇인가요? 당신의 죽음이 오직 당신의 것이라면, 오직 당신의 것인 가능성은 무엇인가요?',
    sources: [
      { citation: 'Heidegger, Sein und Zeit (1927), §§46–53', kind: '원전' },
      { citation: '하이데거, 『존재와 시간』 (이기상 옮김, 까치, 1998)', kind: '국역본' },
    ],
    tags: ['죽음', '자아', '본래성', '실존', 'authenticity'],
    contrastsWith: ['epicurus-death-is-nothing', 'buddhism-anatta'],
  },
  {
    id: 'sartre-existentialism',
    type: 'thinker',
    name: '사르트르 — 실존은 본질에 앞선다',
    origin: '20세기 프랑스 · 『실존주의는 휴머니즘이다』 (1946), 『존재와 무』 (1943)',
    position:
      '인간에게는 미리 주어진 본질이 없다. 우리는 먼저 존재하고, 선택을 통해 자신을 만든다. 그래서 “자유를 선고받았다.” 그 무게를 피하려고 우리는 “어쩔 수 없었다”는 자기기만(mauvaise foi)에 빠진다. 선택하지 않는 것도 선택이며, 내 선택은 곧 인간 전체를 위한 선택이다.',
    keyConcept: '실존이 본질에 앞선다, 자기기만(bad faith)',
    challenge: '‘어쩔 수 없었다’고 말한 최근 결정에서, 실제로는 무엇을 택하고 있었나요? 자유를 인정하면 무엇이 무거워지고 무엇이 가벼워지나요?',
    sources: [
      { citation: "Sartre, L'existentialisme est un humanisme (1946)", kind: '원전' },
      { citation: "Sartre, L'Être et le Néant (1943), I부 2장 「자기기만」", kind: '원전' },
      { citation: '사르트르, 『실존주의는 휴머니즘이다』 (박정태 옮김, 이학사, 2008)', kind: '국역본' },
    ],
    tags: ['자유', '의미', '자아', '선택', '책임', 'existentialism'],
    contrastsWith: ['frankl-logotherapy', 'stoicism-dichotomy', 'confucius-ren'],
  },
  {
    id: 'camus-absurd',
    type: 'thinker',
    name: '카뮈 — 부조리와 반항',
    origin: '20세기 프랑스 · 『시지프 신화』 (1942)',
    position:
      '부조리는 의미를 갈구하는 인간과 침묵하는 세계의 대면에서 생긴다. 출구는 셋이다: 자살, 철학적 자살(신앙으로의 도약), 그리고 반항. 카뮈는 반항을 택한다—부조리를 지운 채가 아니라 부조리를 응시한 채 열정적으로 살기. 바위를 굴리는 시지프는 자기 운명을 자기 것으로 만들었다. “시지프가 행복하다고 상상해야 한다.”',
    keyConcept: '부조리(l’absurde), 반항, 명철함',
    challenge: '당신의 시지프 바위는 무엇인가요? 그것에 의미를 ‘부여’하지 않고도 그 일을 사랑할 수 있나요?',
    sources: [
      { citation: 'Camus, Le Mythe de Sisyphe (1942)', kind: '원전' },
      { citation: '카뮈, 『시지프 신화』 (김화영 옮김, 민음사, 2016)', kind: '국역본' },
    ],
    tags: ['의미', '부조리', '허무', '반복', '긍정', 'absurd'],
    contrastsWith: ['frankl-logotherapy', 'tolstoy'],
  },
  {
    id: 'buber-i-thou',
    type: 'thinker',
    name: '부버 — 나와 너',
    origin: '20세기 · 『나와 너』 (1923)',
    position:
      '세계를 대하는 두 태도가 있다. ‘나–그것’은 경험하고 이용하는 관계이고, ‘나–너’는 온 존재로 마주하는 만남이다. “모든 참된 삶은 만남이다.” 너는 찾아서 얻는 것이 아니라 만나지는 것이며, 모든 너는 결국 그것이 되지만, 나는 오직 너와의 관계 안에서 나가 된다.',
    keyConcept: '나–너(Ich–Du)와 나–그것(Ich–Es)',
    challenge: '오늘 만난 사람들 중 ‘그것’이 아니라 ‘너’로 만난 사람이 있었나요? 그 만남에서 당신은 어떤 ‘나’였나요?',
    sources: [
      { citation: 'Buber, Ich und Du (1923)', kind: '원전' },
      { citation: '부버, 『나와 너』 (표재명 옮김, 문예출판사)', kind: '국역본' },
    ],
    tags: ['관계', '만남', '타자', '대화', 'dialogue'],
  },
  {
    id: 'levinas-other',
    type: 'thinker',
    name: '레비나스 — 타인의 얼굴',
    origin: '20세기 프랑스 · 『전체성과 무한』 (1961), 『윤리와 무한』 (1982)',
    position:
      '타인은 내가 이해하고 소유할 수 있는 대상이 아니라, 나의 이해를 넘어서는 무한이다. 타인의 얼굴은 나에게 먼저 말을 건네며 “죽이지 말라”고 명령한다. 윤리는 제일철학이고, 타인에 대한 책임은 나의 자유보다 앞선다. 나는 타인에게 응답함으로써 비로소 주체가 된다.',
    keyConcept: '얼굴(visage), 자유에 앞서는 책임',
    challenge: '당신의 행복론에서 타인은 어디에 있나요? 타인의 얼굴이 당신에게 먼저 요구하는 것이 있다면, 그것은 당신의 자유보다 앞서나요?',
    sources: [
      { citation: 'Levinas, Totalité et Infini (1961)', kind: '원전' },
      { citation: 'Levinas, Éthique et Infini (1982)', kind: '원전' },
      { citation: '레비나스, 『윤리와 무한』 (김동규 옮김, 도서출판 100, 2020)', kind: '국역본' },
    ],
    tags: ['관계', '타자', '윤리', '책임', 'ethics'],
    contrastsWith: ['sartre-existentialism', 'epicurus-ataraxia'],
  },
  {
    id: 'arendt-vita-activa',
    type: 'thinker',
    name: '아렌트 — 노동·작업·행위',
    origin: '20세기 · 『인간의 조건』 (1958)',
    position:
      '활동적 삶에는 세 층이 있다. 노동은 생존을 위해 소모되고 아무것도 남기지 않는다. 작업은 세계에 남는 것을 만든다. 행위는 사람들 사이에서 말과 행동으로 무언가를 새로 시작하는 것(탄생성)이며, 결과를 예측할 수 없다. 근대는 모든 것을 노동으로 환원해 “노동 없는 노동자들의 사회”를 만들었다.',
    keyConcept: '노동(labor)·작업(work)·행위(action), 탄생성',
    challenge: '당신의 하루는 노동(소모되는 것), 작업(남는 것), 행위(사람들 사이에서 시작하는 것) 중 무엇으로 이루어져 있나요? 마지막 것은 언제였나요?',
    sources: [
      { citation: 'Arendt, The Human Condition (1958)', kind: '원전' },
      { citation: '아렌트, 『인간의 조건』 (이진우 옮김, 한길사, 개정판 2019)', kind: '국역본' },
    ],
    tags: ['일', '의미', '행위', '공적 삶', 'action'],
  },
  {
    id: 'murdoch-attention',
    type: 'thinker',
    name: '머독·베유 — 주의(attention)',
    origin: '20세기 · 『선의 군림』 (1970), 『중력과 은총』 (1947)',
    position:
      '도덕적 삶의 대부분은 선택의 순간이 아니라 그 이전, 무엇을 어떻게 바라보는가에서 결정된다. 머독은 “개별적 현실을 향한 정의롭고 사랑 어린 시선”을 주의라 부르고, 자아의 환상에서 빠져나오는 “탈자아(unselfing)”를 말한다. 베유에게 주의는 “가장 드물고 순수한 형태의 너그러움”이다.',
    keyConcept: '주의(attention)와 탈자아(unselfing)',
    challenge: '지금 당신의 주의는 어디에 가 있나요? 자기 자신에게서 눈을 떼고 무언가를 ‘있는 그대로’ 오래 바라본 마지막 순간은 언제인가요?',
    sources: [
      { citation: 'Murdoch, I. (1970). The Sovereignty of Good. Routledge.', kind: '원전' },
      { citation: 'Weil, S. (1947). La Pesanteur et la Grâce.', kind: '원전' },
      { citation: '시몬 베유, 『중력과 은총』 (윤진 옮김, 문학과지성사, 2021)', kind: '국역본' },
    ],
    tags: ['의미', '관계', '주의', '사랑', '자아', 'attention'],
  },
  {
    id: 'pieper-leisure',
    type: 'thinker',
    name: '피퍼 — 여가는 문화의 토대',
    origin: '20세기 독일 · 『여가와 경신』 (1948)',
    position:
      '여가(schole, otium)는 게으름도, 다음 노동을 위한 회복도 아니다. 그것은 세계를 받아들이는 관조적 태도이며 축제와 예배의 시간이다. “총체적 노동”의 세계는 여가를 불가능하게 만들고, 그러면 문화도 사라진다. 아리스토텔레스의 말처럼, 우리는 여가를 위해 일한다.',
    keyConcept: '여가(Muße) vs 총체적 노동',
    challenge: '당신의 여가는 다음 노동을 위한 회복인가요, 그 자체로 세계를 받아들이는 시간인가요? ‘아무것도 생산하지 않는 시간’을 죄책감 없이 보낼 수 있나요?',
    sources: [
      { citation: 'Pieper, J. (1948). Muße und Kult.', kind: '원전' },
      { citation: '피퍼, 『여가와 경신』 (김진태 옮김, 가톨릭대학교출판부, 2011)', kind: '국역본' },
    ],
    tags: ['일', '여가', '즐거움', '관조', 'leisure'],
    contrastsWith: ['weber-beruf', 'han-burnout-society'],
  },
  {
    id: 'play-huizinga',
    type: 'thinker',
    name: '하위징아 — 호모 루덴스',
    origin: '20세기 네덜란드 · 『호모 루덴스』 (1938)',
    position:
      '놀이는 자유로운 행위이고, “일상”이 아니며, 물질적 이익과 무관하고, 정해진 시간과 공간 안에서 규칙에 따라 진행되며, 그 자체로 재미있다. 문화는 놀이에서 나왔고 놀이 속에서 펼쳐진다. 놀이를 잃은 삶은 문화 이전으로 퇴행한 삶이다.',
    keyConcept: '놀이의 다섯 특징, 놀이하는 인간',
    challenge: '마지막으로 ‘놀았던’ 순간은 언제였나요? 결과도 쓸모도 없이, 규칙 안에서, 시간을 잊고. 그것이 사라졌다면 무엇이 밀어냈나요?',
    sources: [
      { citation: 'Huizinga, J. (1938). Homo Ludens.', kind: '원전' },
      { citation: '하위징아, 『호모 루덴스』 (이종인 옮김, 연암서가, 2010)', kind: '국역본' },
    ],
    tags: ['즐거움', '놀이', '자유', '문화', 'play'],
  },
  {
    id: 'fromm-art-of-loving',
    type: 'thinker',
    name: '프롬 — 사랑의 기술',
    origin: '20세기 · 『사랑의 기술』 (1956)',
    position:
      '사랑은 빠지는 감정이 아니라 배우고 연습해야 하는 기술이다. 사랑의 네 요소는 관심, 책임, 존중, 앎이다. 미성숙한 사랑은 “당신이 필요해서 사랑한다”고 말하고, 성숙한 사랑은 “사랑해서 당신이 필요하다”고 말한다. 사랑은 대상의 문제가 아니라 능력의 문제다.',
    keyConcept: '관심·책임·존중·앎, 능력으로서의 사랑',
    challenge: '관심·책임·존중·앎 중 당신이 가장 잘하는 것과 가장 못하는 것은? 당신의 사랑은 ‘필요해서 사랑하는’ 쪽인가요, ‘사랑해서 필요한’ 쪽인가요?',
    sources: [
      { citation: 'Fromm, E. (1956). The Art of Loving. Harper & Row.', kind: '원전' },
      { citation: '프롬, 『사랑의 기술』 (황문수 옮김, 문예출판사, 개정판 2019)', kind: '국역본' },
    ],
    tags: ['관계', '사랑', '기술', '성숙', 'love'],
  },
  {
    id: 'fromm-escape-from-freedom',
    type: 'thinker',
    name: '프롬 — 자유로부터의 도피',
    origin: '20세기 · 『자유로부터의 도피』 (1941)',
    position:
      '전통의 속박에서 풀려난 “~로부터의 자유”는 고립과 불안을 낳고, 사람들은 그 무게를 피해 권위에 복종하거나, 파괴하거나, 남들과 똑같은 자동인형이 된다. 진짜 자유는 “~를 향한 자유”, 곧 사랑과 일에서 자발적으로 자기를 실현하는 것이다.',
    keyConcept: '소극적 자유의 불안, 도피의 세 기제, 적극적 자유',
    challenge: '자유가 무거워 도망친 적이 있나요—권위에 기대거나, 남들처럼 되거나? 당신이 정말 원하는 것은 ‘~로부터의 자유’인가요, ‘~를 향한 자유’인가요?',
    sources: [
      { citation: 'Fromm, E. (1941). Escape from Freedom. Farrar & Rinehart.', kind: '원전' },
      { citation: '프롬, 『자유로부터의 도피』 (김석희 옮김, 휴머니스트, 2012)', kind: '국역본' },
    ],
    tags: ['자유', '불안', '순응', '권위', 'freedom'],
  },
  {
    id: 'hooks-love-as-action',
    type: 'thinker',
    name: '벨 훅스 — 동사로서의 사랑',
    origin: '20세기 말 미국 · 『올 어바웃 러브』 (2000)',
    position:
      '사랑을 명사(느낌)가 아니라 동사(행위)로 정의하자. 훅스는 스콧 펙의 정의를 받아들인다: 사랑은 “자기 자신이나 타인의 영적 성장을 돌보기 위해 자기를 확장하려는 의지”다. 그 재료는 돌봄, 애정, 인정, 존중, 헌신, 신뢰, 정직한 소통이며, 사랑과 학대는 공존할 수 없다.',
    keyConcept: '행위로서의 사랑, 성장을 돌보려는 의지',
    challenge: '사랑을 동사로 정의한다면, 이번 주 당신이 ‘사랑한’ 행위는 무엇이었나요? 성장을 돕는 대신 소유하려 한 순간은?',
    sources: [
      { citation: 'hooks, b. (2000). All About Love: New Visions. William Morrow.', kind: '원전' },
      { citation: '벨 훅스, 『올 어바웃 러브』 (이영기 옮김, 책읽는수요일, 2012)', kind: '국역본' },
    ],
    tags: ['관계', '사랑', '행위', '성장', 'love'],
  },
  {
    id: 'berlin-two-liberties',
    type: 'thinker',
    name: '벌린 — 두 가지 자유 개념',
    origin: '20세기 영국 · 「자유의 두 개념」 (1958)',
    position:
      '소극적 자유는 간섭받지 않음이고, 적극적 자유는 자기 삶의 주인이 됨이다. 적극적 자유는 “진짜 나”의 이름으로 강제를 정당화하는 데 악용될 수 있다. 그리고 가치들은 진정으로 충돌한다—자유와 평등, 자비와 정의처럼—그래서 모든 좋은 것을 한꺼번에 가질 수는 없다.',
    keyConcept: '소극적 자유·적극적 자유, 가치 다원주의',
    challenge: '당신이 원하는 자유는 ‘간섭받지 않음’인가요, ‘자기 삶의 주인이 됨’인가요? 둘이 충돌하는 지점—예컨대 나쁜 습관에 대한 자유—에서 무엇을 택하나요?',
    sources: [
      { citation: 'Berlin, I. (1958). Two concepts of liberty. In Four Essays on Liberty (1969). Oxford University Press.', kind: '원전' },
      { citation: '벌린, 『자유론』 (박동천 옮김, 아카넷, 개정판 2014)', kind: '국역본' },
    ],
    tags: ['자유', '가치', '충돌', '다원주의', 'liberty'],
  },
  {
    id: 'frankfurt-caring',
    type: 'thinker',
    name: '프랑크푸르트 — 2차 욕구와 돌봄',
    origin: '20세기 미국 · 「의지의 자유와 인격 개념」 (1971), 『사랑의 이유』 (2004)',
    position:
      '인격의 핵심은 “원함에 대한 원함”, 곧 어떤 욕구를 자기 의지로 승인하는가에 있다. 중독을 원하지 않는 중독자와 기꺼이 원하는 중독자는 같은 행동을 하지만 다른 존재다. 우리가 무엇을 진심으로 돌보는가(caring)가 삶에 형태를 주며, 사랑은 이유를 만드는 원천이다.',
    keyConcept: '2차 욕구(second-order desire), 돌봄(caring)',
    challenge: '당신이 원하는 것 중 ‘원하지 않았으면 하는 원함’은 무엇인가요? 그 위에 있는 의지—무엇을 진심으로 돌보는가—가 당신을 정의한다면, 그 목록은 무엇인가요?',
    sources: [
      { citation: 'Frankfurt, H. G. (1971). Freedom of the will and the concept of a person. The Journal of Philosophy, 68(1), 5–20.', kind: '논문' },
      { citation: 'Frankfurt, H. G. (2004). The Reasons of Love. Princeton University Press.', kind: '책' },
    ],
    tags: ['자유', '가치', '욕구', '의지', '돌봄', 'will'],
  },
  {
    id: 'williams-ground-projects',
    type: 'thinker',
    name: '버나드 윌리엄스 — 근본 기획',
    origin: '20세기 영국 · 『도덕적 운』 (1981)',
    position:
      '사람에게는 그것 없이는 계속 살아갈 이유를 찾기 어려운 “근본 기획(ground projects)”이 있다. 모든 사람을 똑같이 대하라는 공평한 도덕이 이 기획을 버리라고 요구한다면, 그것은 삶을 살 만하게 하는 것 자체를 파괴하는 셈이다. 물에 빠진 아내를 구하며 “아내니까 구해도 되는가”를 따지는 것은 “생각이 하나 더 많은 것”이다.',
    keyConcept: '근본 기획(ground projects), 인격의 통합성',
    challenge: '당신에게 ‘이것 없이는 계속 살 이유를 찾기 어렵다’고 할 만한 기획이 있나요? 그것을 위해 어떤 공평한 요구를 거절하겠습니까?',
    sources: [
      { citation: 'Williams, B. (1981). Persons, character and morality. In Moral Luck. Cambridge University Press.', kind: '책' },
    ],
    tags: ['의미', '가치', '기획', '통합성', 'integrity'],
    contrastsWith: ['kant-autonomy', 'mill-utilitarianism'],
  },
  {
    id: 'williams-makropulos',
    type: 'thinker',
    name: '버나드 윌리엄스 — 불멸의 권태',
    origin: '20세기 영국 · 「마크로풀로스 사건」 (1973)',
    position:
      '살아갈 이유를 주는 것은 “살아 있는 한 원하는 것”이 아니라 “그것 때문에 살아 있고 싶은” 범주적 욕구다. 342년을 산 오페라의 주인공 엘리나처럼, 같은 성격으로 무한히 산다면 결국 모든 범주적 욕구가 소진되어 권태만 남는다. 죽음은 삶에 형태를 주는 조건이다.',
    keyConcept: '범주적 욕구(categorical desire), 불멸의 권태',
    challenge: '당신의 욕구 중 “살아 있는 한”이 아니라 “살아 있어야 할 이유”가 되는 범주적 욕구는 무엇인가요? 그것들은 300년을 버틸 수 있나요?',
    sources: [
      { citation: 'Williams, B. (1973). The Makropulos case: Reflections on the tedium of immortality. In Problems of the Self. Cambridge University Press.', kind: '책' },
    ],
    tags: ['죽음', '불멸', '욕구', '권태', 'immortality'],
  },
  {
    id: 'moral-luck',
    type: 'concept',
    name: '도덕적 운 (Moral Luck)',
    origin: '철학 · 윌리엄스·네이글 (1976)',
    position:
      '우리는 통제할 수 있는 것에 대해서만 칭찬받거나 비난받아야 한다고 믿지만, 실제 평가는 운에 크게 좌우된다. 음주운전을 하고 아무도 치지 않은 사람과 아이를 친 사람은 같은 행동을 했다. 타고난 기질(구성적 운), 처한 상황(상황적 운), 결과(결과적 운)가 모두 우리 밖에 있다면, 공로와 책임의 개념은 근본에서 흔들린다.',
    keyConcept: '결과적·상황적·구성적 운',
    challenge: '당신의 성취와 실패 중 얼마나가 통제 밖의 운이었나요? 그 사실을 인정하면 자부심과 자책은 각각 어떻게 달라져야 하나요?',
    sources: [
      { citation: 'Nagel, T. (1979). Moral luck. In Mortal Questions. Cambridge University Press.', kind: '책' },
      { citation: 'Williams, B. (1981). Moral luck. In Moral Luck. Cambridge University Press.', kind: '책' },
    ],
    tags: ['자유', '책임', '운', '공로', 'luck'],
  },
  {
    id: 'nagel-absurd',
    type: 'thinker',
    name: '네이글 — 부조리와 아이러니',
    origin: '20세기 미국 · 「부조리」 (1971)',
    position:
      '부조리는 우리가 삶을 진지하게 대하는 태도와, 언제든 한 걸음 물러나 그 모든 것을 자의적인 것으로 볼 수 있는 능력의 충돌에서 온다. 우리가 더 크거나 더 오래 산다고 해서 덜 부조리해지지는 않는다. 그렇다면 답은 영웅적 반항도 절망도 아닌 아이러니—진지함과 거리두기를 동시에 품는 태도다.',
    keyConcept: '아무 데도 아닌 곳에서의 시선, 아이러니',
    challenge: '삶을 아주 멀리서 볼 때 느껴지는 부조리를 당신은 어떻게 다루나요? 영웅적 반항이 아니라 아이러니와 유머로 감당할 수 있나요?',
    sources: [
      { citation: 'Nagel, T. (1971). The absurd. The Journal of Philosophy, 68(20), 716–727.', kind: '논문' },
      { citation: '네이글, 『이 모든 것은 무엇을 의미하는가』 (조영기 옮김, 궁리, 2014)', kind: '국역본' },
    ],
    tags: ['의미', '부조리', '아이러니', '관점', 'absurd'],
    contrastsWith: ['camus-absurd'],
  },
  {
    id: 'nagel-death',
    type: 'thinker',
    name: '네이글 — 박탈로서의 죽음',
    origin: '20세기 미국 · 「죽음」 (1970)',
    position:
      '죽음이 나쁘다면 그것은 죽어 있는 상태가 고통스러워서가 아니라, 살아 있었더라면 누렸을 좋은 것들을 빼앗기 때문이다. 경험할 주체가 없어도 박탈은 박탈이다. 태어나기 전의 부재와 죽은 뒤의 부재는 대칭이 아니다—전자는 아무것도 빼앗지 않는다.',
    keyConcept: '박탈 이론(deprivation account)',
    challenge: '죽음이 나쁘다면 그것은 ‘무엇을 빼앗기 때문’인가요? 그렇다면 지금 당신이 죽음에게 빼앗기고 싶지 않은 것의 목록은—그리고 그것을 지금 살고 있나요?',
    sources: [
      { citation: 'Nagel, T. (1970). Death. Noûs, 4(1), 73–80.', kind: '논문' },
    ],
    tags: ['죽음', '박탈', '논증', 'death'],
    contrastsWith: ['epicurus-death-is-nothing'],
  },
  {
    id: 'nozick-experience-machine',
    type: 'thinker',
    name: '노직 — 경험 기계',
    origin: '20세기 미국 · 『아나키에서 유토피아로』 (1974)',
    position:
      '원하는 어떤 경험이든 완벽하게 제공하는 기계가 있다면 평생 접속하겠는가? 대부분은 거부한다. 우리는 어떤 일을 겪는 것이 아니라 실제로 하기를, 어떤 종류의 사람이기를, 현실과 접촉하기를 원한다. 그렇다면 행복은 좋은 느낌 이상의 무엇이다.',
    keyConcept: '경험 기계 사고실험, 쾌락주의 반박',
    challenge: '기계에 접속하지 않겠다면, 느낌 말고 무엇이 중요한가요? 접속하겠다면, 지금 삶에서 ‘가짜여도 상관없는’ 부분은 어디인가요?',
    sources: [
      { citation: 'Nozick, R. (1974). Anarchy, State, and Utopia. Basic Books, pp. 42–45.', kind: '책' },
      { citation: '노직, 『아나키에서 유토피아로』 (남경희 옮김, 문학과지성사, 1997)', kind: '국역본' },
    ],
    tags: ['행복', '사고실험', '쾌락주의', '진실', 'thought experiment'],
    contrastsWith: ['epicurus-ataraxia', 'mill-utilitarianism'],
  },
  {
    id: 'parfit-wellbeing-theories',
    type: 'thinker',
    name: '파핏 — 잘 삶의 세 이론',
    origin: '20세기 영국 · 『이유와 인격』 (1984) 부록 I',
    position:
      '무엇이 삶을 좋게 만드는가에 대한 답은 셋으로 갈린다. 쾌락주의: 좋은 경험이 많을수록. 욕구 충족 이론: 원하는 것이 이루어질수록. 객관적 목록 이론: 지식·우정·성취·자율 같은 것들이 그 자체로 좋다. 각 이론에는 반례가 있다—예컨대 아무도 모르게 배신당한 채 행복한 사람의 삶은 좋은 삶인가?',
    keyConcept: '쾌락주의·욕구충족·객관적 목록',
    challenge: '당신의 행복 정의는 셋 중 어디에 속하나요? 그 이론이 틀린 사례(모르는 사이 배신당한 행복한 사람)를 당신은 어떻게 처리하나요?',
    sources: [
      { citation: "Parfit, D. (1984). Reasons and Persons. Oxford University Press, Appendix I: What makes someone's life go best.", kind: '책' },
    ],
    tags: ['행복', '정의', '이론', '웰빙', 'well-being'],
  },
  {
    id: 'parfit-identity',
    type: 'thinker',
    name: '파핏 — 동일성은 중요하지 않다',
    origin: '20세기 영국 · 『이유와 인격』 (1984) III부',
    position:
      '순간이동 장치가 나를 복제하고 원본을 파괴한다면 그것은 나인가? 파핏의 답: 그 질문은 비어 있다. 중요한 것은 동일성이 아니라 심리적 연속성과 연결성(기억, 의도, 성격)이다. 이 관점을 받아들이자 그는 “유리 터널 속에 갇힌 듯하던 삶의 벽이 사라졌다”고 썼다—미래의 나는 타인과 정도의 차이일 뿐이다.',
    keyConcept: '심리적 연속성, 관계 R',
    challenge: '10년 뒤의 ‘당신’과 지금의 당신을 잇는 것은 무엇인가요? 그 연결이 약하다면, 미래의 자신을 위해 희생하는 것은 타인을 위해 희생하는 것과 얼마나 다른가요?',
    sources: [
      { citation: 'Parfit, D. (1984). Reasons and Persons. Oxford University Press, Part III.', kind: '책' },
    ],
    tags: ['자아', '동일성', '연속성', '미래', 'identity'],
    contrastsWith: ['mcadams-narrative-identity'],
  },
  {
    id: 'taylor-authenticity',
    type: 'thinker',
    name: '찰스 테일러 — 진정성과 의미의 지평',
    origin: '20세기 캐나다 · 『진정성의 윤리』 (1991), 『자아의 원천들』 (1989)',
    position:
      '“나답게 살라”는 진정성의 이상은 진짜 이상이지만, 무엇이 중요한지를 정하는 “의미의 지평”에서 떨어져 나오면 공허한 자기탐닉이 된다. 무언가가 중요하려면 내가 고르지 않은 배경이 있어야 한다. 자아는 독백이 아니라 대화 속에서 만들어진다.',
    keyConcept: '의미의 지평(horizons of significance), 대화적 자아',
    challenge: '‘나답게’를 판단하는 배경—무엇이 중요한지를 정하는 지평—은 어디서 왔나요? 그 지평 없이 ‘나만의 선택’이라는 말이 의미를 가질 수 있나요?',
    sources: [
      { citation: 'Taylor, C. (1991). The Ethics of Authenticity. Harvard University Press.', kind: '책' },
      { citation: 'Taylor, C. (1989). Sources of the Self. Harvard University Press.', kind: '책' },
      { citation: '테일러, 『불안한 현대 사회』 (송영배 옮김, 이학사, 2001)', kind: '국역본' },
    ],
    tags: ['자아', '가치', '진정성', '의미', 'authenticity'],
    contrastsWith: ['sartre-existentialism', 'mill-liberty'],
  },
  {
    id: 'susan-wolf-meaning',
    type: 'thinker',
    name: '수전 울프 — 주관적 끌림과 객관적 가치의 만남',
    origin: '21세기 미국 · 『삶의 의미와 그것이 중요한 이유』 (2010)',
    position:
      '의미는 “주관적 끌림이 객관적 매력과 만날 때” 생긴다. 무엇이든 사랑하기만 하면 의미 있다는 견해(충족 견해)도, 나보다 큰 것에 봉사해야 의미 있다는 견해도 각각 반쪽이다. 내가 사랑하며 능동적으로 참여하는 일이, 나 밖의 기준으로도 가치 있을 때 삶은 의미 있다.',
    keyConcept: '충족 견해 + 큰 것 견해 = 적합 충족 견해',
    challenge: '당신이 사랑하며 하는 일 중, 당신 밖의 기준으로도 가치 있다고 말할 수 있는 것은 무엇인가요? 둘 중 하나만 있는 활동은?',
    sources: [
      { citation: 'Wolf, S. (2010). Meaning in Life and Why It Matters. Princeton University Press.', kind: '책' },
      { citation: 'Wolf, S. (1997). Happiness and meaning: Two aspects of the good life. Social Philosophy and Policy, 14(1), 207–225.', kind: '논문' },
    ],
    tags: ['의미', '행복', '가치', '사랑', 'meaning'],
  },
  {
    id: 'nussbaum-emotions-judgments',
    type: 'thinker',
    name: '누스바움 — 감정은 판단이다',
    origin: '21세기 미국 · 『감정의 격동』 (2001)',
    position:
      '감정은 이성의 반대가 아니라 지성의 한 형태다. 감정은 내가 소중히 여기지만 완전히 통제할 수 없는 것에 대한 가치 판단이다. 슬픔은 “큰 가치를 가진 것이 사라졌다”는 판단이고, 두려움은 “소중한 것이 위협받고 있다”는 판단이다. 그래서 감정은 정확할 수도, 틀릴 수도 있으며, 검토될 수 있다.',
    keyConcept: '감정의 인지적·평가적 구조',
    challenge: '최근의 강한 감정이 ‘판단’이라면 무엇을 판단한 것인가요? 그 판단은 정확했나요, 아니면 수정이 필요한가요?',
    sources: [
      { citation: 'Nussbaum, M. C. (2001). Upheavals of Thought: The Intelligence of Emotions. Cambridge University Press.', kind: '책' },
      { citation: '누스바움, 『감정의 격동』 (조형준 옮김, 새물결, 2015)', kind: '국역본' },
    ],
    tags: ['감정', '가치', '판단', '고통', 'emotion'],
    contrastsWith: ['stoicism-dichotomy'],
  },
  {
    id: 'nussbaum-capabilities',
    type: 'thinker',
    name: '누스바움 — 역량 접근',
    origin: '21세기 미국 · 『역량의 창조』 (2011)',
    position:
      '좋은 삶의 척도는 소득이나 만족감이 아니라 사람이 실제로 “할 수 있고 될 수 있는 것”이다. 열 가지 핵심 역량—생명, 신체 건강, 신체 보전, 감각·상상·사고, 감정, 실천이성, 관계, 다른 종과의 공존, 놀이, 환경에 대한 통제—이 모두 일정 수준 이상 보장되어야 존엄한 삶이다.',
    keyConcept: '열 가지 핵심 역량',
    challenge: '열 가지 역량 중 지금 당신의 삶에서 가장 잘 실현된 것과 가장 억눌린 것은 무엇인가요? 억눌린 것은 운의 문제인가요, 선택의 문제인가요?',
    sources: [
      { citation: 'Nussbaum, M. C. (2011). Creating Capabilities: The Human Development Approach. Harvard University Press.', kind: '책' },
      { citation: '누스바움, 『역량의 창조』 (한상연 옮김, 돌베개, 2015)', kind: '국역본' },
    ],
    tags: ['가치', '자유', '역량', '존엄', 'capabilities'],
  },
  {
    id: 'setiya-telic-atelic',
    type: 'thinker',
    name: '세티야 — 텔릭과 아텔릭',
    origin: '21세기 미국 · 『미드라이프』 (2017)',
    position:
      '활동에는 완결을 향하는 것(텔릭: 보고서 끝내기, 집 사기)과 완결이 없는 것(아텔릭: 걷기, 음악 듣기, 부모 노릇, 철학하기)이 있다. 텔릭한 기획에만 삶을 걸면 이루는 순간 그 활동은 소멸하고, 중년의 공허가 온다. 처방은 아텔릭한 가치를 되찾는 것—지금 하고 있는 일 자체에 머무는 것이다.',
    keyConcept: '텔릭(telic) vs 아텔릭(atelic) 활동',
    challenge: '당신의 시간 중 완결을 향한 활동과 완결이 없는 활동의 비율은? 완결한 순간 허무했던 목표를 떠올려보고, 그 안에 있던 아텔릭한 부분은 무엇이었나요?',
    sources: [
      { citation: 'Setiya, K. (2017). Midlife: A Philosophical Guide. Princeton University Press.', kind: '책' },
      { citation: '세티야, 『어떡하죠, 마흔입니다』 (김광수 옮김, 와이즈베리, 2018)', kind: '국역본' },
    ],
    tags: ['의미', '목적', '시간', '활동', 'midlife'],
  },
  {
    id: 'bloom-sweet-spot',
    type: 'thinker',
    name: '폴 블룸 — 선택한 고통',
    origin: '21세기 · 『최선의 고통』 (2021)',
    position:
      '우리는 매운 음식, 마라톤, 공포 영화, 어려운 일처럼 스스로 고통을 택한다. 선택한 고통은 뒤따르는 쾌락을 키우고, 노력은 성취에 의미를 준다. 의미 있는 삶은 대개 투쟁을 포함한다. 다만 선택하지 않은 고통은 전혀 다른 문제다.',
    keyConcept: '선택한 고통(chosen suffering), 노력 역설',
    challenge: '당신이 기꺼이 택하는 고통은 무엇이고, 그것은 어떤 즐거움이나 의미를 더해주나요? 편안함만 있는 삶을 원하지 않는다면 그 이유는?',
    sources: [
      { citation: 'Bloom, P. (2021). The Sweet Spot: The Pleasures of Suffering and the Search for Meaning. Ecco.', kind: '책' },
      { citation: '블룸, 『최선의 고통』 (김태훈 옮김, 알에이치코리아, 2022)', kind: '국역본' },
    ],
    tags: ['즐거움', '고통', '의미', '노력', 'suffering'],
    contrastsWith: ['buddhism-dukkha', 'epicurus-ataraxia'],
  },
  {
    id: 'han-burnout-society',
    type: 'thinker',
    name: '한병철 — 피로사회',
    origin: '21세기 · 『피로사회』 (2010)',
    position:
      '“해야 한다”의 규율사회는 “할 수 있다”의 성과사회로 바뀌었다. 성과 주체는 외부의 강제 없이 스스로를 착취하며, 착취자와 피착취자가 한 몸이기에 저항할 대상이 없다. 우울과 소진은 이 사회의 질병이다. 필요한 것은 무언가를 하지 않을 능력, 관조적 머무름의 회복이다.',
    keyConcept: '성과 주체, 자기 착취, 하지 않을 능력',
    challenge: '당신을 소진시키는 명령은 밖에서 오나요, 안에서 오나요? ‘할 수 있다’를 잠시 내려놓는 시간이 있나요—무언가를 하지 않을 능력이?',
    sources: [
      { citation: 'Han, B.-C. (2010). Müdigkeitsgesellschaft. Matthes & Seitz.', kind: '원전' },
      { citation: '한병철, 『피로사회』 (김태환 옮김, 문학과지성사, 2012)', kind: '국역본' },
    ],
    tags: ['일', '번아웃', '성과', '자유', '한국', 'burnout'],
    contrastsWith: ['laozi-wuwei', 'pieper-leisure'],
  },
  {
    id: 'burkeman-four-thousand-weeks',
    type: 'book',
    name: '버크먼 — 4000주',
    origin: '21세기 영국 · 『4000주』 (2021)',
    position:
      '80년을 살아도 인생은 약 4,000주다. 전부 할 수는 없다는 사실을 받아들이는 것이 시간 관리의 출발점이다. 효율은 함정이다—빨리 비울수록 더 채워진다. 무엇을 소홀히 할지 의식적으로 고르고, 놓치는 것의 기쁨(JOMO)을 배우며, 유한성 안에서 사는 것이 유일한 삶이다.',
    keyConcept: '유한성의 수용, 효율의 함정',
    challenge: '‘전부 할 수 없다’는 사실을 받아들인다면, 당신이 의식적으로 포기할 것은 무엇인가요? 그 포기가 안도인가요, 슬픔인가요?',
    sources: [
      { citation: 'Burkeman, O. (2021). Four Thousand Weeks: Time Management for Mortals. Farrar, Straus and Giroux.', kind: '책' },
      { citation: '버크먼, 『4000주』 (이윤진 옮김, 21세기북스, 2022)', kind: '국역본' },
    ],
    tags: ['시간', '죽음', '유한성', '선택', 'time'],
  },
  {
    id: 'sennett-craftsman',
    type: 'thinker',
    name: '세넷 — 장인',
    origin: '21세기 미국 · 『장인』 (2008)',
    position:
      '장인 정신은 “그 자체를 위해 일을 잘하려는 욕구”다. 손과 머리가 함께 익히는 반복 속에서 기술이 자라고, 그 과정에서 사람은 일과 자기 삶을 이해하게 된다. 현대의 조직은 이 욕구를 자주 좌절시키지만, 질을 향한 욕구는 여전히 의미의 원천이다.',
    keyConcept: '그 자체를 위해 잘하려는 욕구',
    challenge: '결과의 보상과 상관없이 ‘잘하고 싶어서’ 하는 일이 있나요? 지금의 일에서 장인의 태도를 방해하는 것은 조직인가요, 조급함인가요?',
    sources: [
      { citation: 'Sennett, R. (2008). The Craftsman. Yale University Press.', kind: '책' },
      { citation: '세넷, 『장인』 (김홍식 옮김, 21세기북스, 2010)', kind: '국역본' },
    ],
    tags: ['일', '기술', '의미', '숙련', 'craft'],
  },
  {
    id: 'kim-youngmin-death-morning',
    type: 'book',
    name: '김영민 — 아침에는 죽음을 생각하는 것이 좋다',
    origin: '한국 · 에세이 (2018)',
    position:
      '아침마다 죽음을 한 번 생각해보라는 권고. 허무를 이기려 하기보다 허무와 함께 산책하듯 사는 태도, 삶을 이미 끝난 것으로 한 번 바라보고 나면 붙들고 있던 걱정들이 잡음으로 드러난다는 통찰. 죽음의 상기는 우울이 아니라 정신의 정돈이다.',
    keyConcept: '메멘토 모리를 통한 삶의 정돈',
    challenge: '내일 아침 죽음을 한 번 생각한다면, 오늘 붙들고 있는 걱정 중 잡음으로 드러날 것은 무엇인가요?',
    sources: [
      { citation: '김영민, 『아침에는 죽음을 생각하는 것이 좋다』 (어크로스, 2018)', kind: '책' },
    ],
    tags: ['죽음', '일상', '허무', '한국', 'memento mori'],
  },
  {
    id: 'choi-good-life',
    type: 'book',
    name: '최인철 — 굿 라이프',
    origin: '한국 · 심리학 (2018)',
    position:
      '행복을 순간의 감정으로 좁히지 말고, 즐거움·의미·품격을 갖춘 “좋은 삶”으로 넓혀 보자는 제안. 행복한 사람들은 특별한 사건보다 일상의 기술—좋아하는 일에 시간을 쓰고, 관계를 돌보고, 비교를 줄이는—을 가졌다. 행복은 명사가 아니라 동사에 가깝다.',
    keyConcept: '즐거운 삶·의미 있는 삶·품격 있는 삶',
    challenge: '당신의 삶을 즐거움·의미·품격의 세 축으로 채점한다면? 가장 낮은 축을 올리는 데 필요한 것은 감정인가요, 습관인가요?',
    sources: [
      { citation: '최인철, 『굿 라이프: 내 삶을 바꾸는 심리학의 지혜』 (21세기북스, 2018)', kind: '책' },
    ],
    tags: ['행복', '좋은 삶', '습관', '한국', 'good life'],
  },
  {
    id: 'jeong-han',
    type: 'concept',
    name: '정(情)과 한(恨) — 문화가 준 감정의 이름',
    origin: '한국 문화심리학',
    position:
      '감정은 문화가 준 개념으로 경험된다. 정(情)은 함께한 시간이 쌓아 올린 유대의 감정으로 ‘미운 정’까지 품고, 한(恨)은 풀리지 못한 억울함과 슬픔이 체념·그리움과 뒤섞여 응어리진 상태를 가리킨다. 이런 어휘가 있는 문화에서 사람들은 그 어휘의 결대로 느끼고, 견디고, 관계를 맺는다.',
    keyConcept: '토착 감정 개념(indigenous emotion concepts)',
    challenge: '당신의 감정 어휘 중 한국어 특유의 것은 무엇인가요? 그 이름이 감정을 오래 품게 만드나요, 흘려보내게 만드나요?',
    sources: [
      { citation: '최상진, 『한국인 심리학』 (중앙대학교출판부, 2000)', kind: '책' },
    ],
    tags: ['감정', '문화', '한', '정', '한국', 'culture'],
  },
  {
    id: 'ikigai-kamiya',
    type: 'concept',
    name: '이키가이(生きがい) — 가미야 미에코',
    origin: '일본 · 『삶의 보람에 대하여』 (1966)',
    position:
      '이키가이는 “살아갈 보람”이다. 정신과 의사 가미야 미에코는 한센병 환자들과의 만남에서, 보람은 거창한 사명보다 작은 기대와 응답—내일 누군가를 만난다는 사실, 내가 필요하다는 느낌—에서 온다고 보았다. 널리 퍼진 네 원(좋아하는 것·잘하는 것·세상이 필요로 하는 것·돈이 되는 것)의 벤 다이어그램은 2014년 무렵 인터넷에서 조합된 것으로, 일본의 이키가이 개념과는 직접 관계가 없다.',
    keyConcept: '이키가이 감(生きがい感), 작은 보람',
    challenge: '내일 아침 일어날 이유 중 가장 작은 것은 무엇인가요? 그 작은 것이 사라지면 어떤 큰 것도 흔들리나요?',
    sources: [
      { citation: '神谷美恵子 (1966). 『生きがいについて』. みすず書房.', kind: '원전' },
      { citation: 'Kumano, M. (2018). On the concept of well-being in Japan: Feeling shiawase as hedonic well-being and feeling ikigai as eudaimonic well-being. Applied Research in Quality of Life, 13, 419–433.', kind: '논문' },
    ],
    tags: ['의미', '일', '보람', '일본', 'ikigai'],
  },
  {
    id: 'yalom-existential-givens',
    type: 'thinker',
    name: '얄롬 — 실존의 네 가지 조건',
    origin: '20세기 미국 · 『실존주의 심리치료』 (1980)',
    position:
      '인간의 깊은 불안은 네 가지 궁극적 관심에서 온다: 죽음, 자유(와 그 밑의 근거 없음), 고립, 무의미. 우리는 이것들을 피하려고 온갖 방어를 세우지만, 방어가 곧 증상이 된다. 치료는 이 네 조건을 정직하게 마주하는 데서 시작한다.',
    keyConcept: '죽음·자유·고립·무의미',
    challenge: '죽음·자유·고독·무의미 중 지금 당신을 가장 흔드는 것은 무엇인가요? 그 불안을 피하려고 만들어둔 습관은?',
    sources: [
      { citation: 'Yalom, I. D. (1980). Existential Psychotherapy. Basic Books.', kind: '책' },
      { citation: '얄롬, 『실존주의 심리치료』 (임경수 옮김, 학지사, 2007)', kind: '국역본' },
    ],
    tags: ['죽음', '자유', '고독', '의미', '불안', 'existential'],
  },
  {
    id: 'regrets-of-dying',
    type: 'book',
    name: '브로니 웨어 — 죽어가는 이들의 다섯 가지 후회',
    origin: '호주 · 완화의료 간호사의 기록 (2011)',
    position:
      '임종을 지킨 간호사가 반복해서 들은 후회 다섯 가지: 남의 기대가 아니라 나 자신에게 진실한 삶을 살 용기가 있었더라면, 그렇게 열심히 일하지 않았더라면, 감정을 표현할 용기가 있었더라면, 친구들과 연락을 유지했더라면, 스스로 더 행복하도록 허락했더라면. 통계 연구는 아니지만, 임종의 시선이 무엇을 앞에 놓는지 보여준다.',
    keyConcept: '임종의 시선에서 본 우선순위',
    challenge: '다섯 가지 후회 중 지금의 삶이 향하고 있는 것은 무엇인가요? 오늘 하나를 미리 되돌린다면?',
    sources: [
      { citation: 'Ware, B. (2011). The Top Five Regrets of the Dying. Hay House.', kind: '책' },
      { citation: '웨어, 『내가 원하는 삶을 살았더라면』 (유윤한 옮김, 피플트리, 2013)', kind: '국역본' },
    ],
    tags: ['죽음', '후회', '우선순위', 'regret'],
  },
  {
    id: 'designing-your-life',
    type: 'book',
    name: '디자인 유어 라이프 — 좋은 시간 일지',
    origin: '스탠퍼드 디자인 프로그램 · 버넷·에번스 (2016)',
    position:
      '삶을 문제 풀이가 아니라 디자인으로 대하라. 일에 대한 관점(Workview)과 삶에 대한 관점(Lifeview)을 각각 250자로 써서 맞물리는지 보고, “좋은 시간 일지”에 활동마다 몰입도와 에너지를 기록해 몰입의 패턴을 찾고, 서로 다른 5년 계획 셋(오디세이 플랜)을 세워 작은 실험으로 시험한다.',
    keyConcept: 'Workview/Lifeview, 좋은 시간 일지, 오디세이 플랜',
    challenge: '이번 주 활동을 ‘몰입도’와 ‘에너지’ 두 축으로 기록한다면 어떤 패턴이 나올까요? 일에 대한 관점과 삶에 대한 관점을 각각 250자로 쓰면 서로 맞물리나요?',
    sources: [
      { citation: 'Burnett, B., & Evans, D. (2016). Designing Your Life. Knopf.', kind: '책' },
      { citation: '버넷·에번스, 『디자인 유어 라이프』 (이미숙 옮김, 와이즈베리, 2017)', kind: '국역본' },
    ],
    tags: ['즐거움', '일', '몰입', '에너지', '실험', 'design'],
  },
  {
    id: 'kegan-self-authoring',
    type: 'thinker',
    name: '케건 — 사회화된 자아에서 자기저작 자아로',
    origin: '20세기 미국 · 『In Over Our Heads』 (1994)',
    position:
      '성인의 마음은 단계적으로 자란다. 사회화된 마음은 주변의 기대와 규범에 의해 정의되고, 자기저작 마음은 자기 내부의 체계로 가치와 판단을 스스로 저작하며, 자기변형 마음은 자기 체계의 한계까지 보고 여러 체계를 함께 붙든다. 발달이란 “나였던 것(주체)”이 “내가 볼 수 있는 것(대상)”이 되는 일이다.',
    keyConcept: '사회화된 마음 → 자기저작 마음 → 자기변형 마음',
    challenge: '최근 중요한 결정의 기준은 누구의 것이었나요? 자기 체계로 판단하고 있다면, 그 체계 자체를 의심해볼 수 있나요?',
    sources: [
      { citation: 'Kegan, R. (1994). In Over Our Heads: The Mental Demands of Modern Life. Harvard University Press.', kind: '책' },
      { citation: 'Kegan, R. (1982). The Evolving Self. Harvard University Press.', kind: '책' },
    ],
    tags: ['자아', '발달', '가치', '독립', 'development'],
  },
]
