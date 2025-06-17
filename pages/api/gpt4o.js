import Replicate from 'replicate';

// 添加调试日志
console.log('API Token:', process.env.REPLICATE_API_TOKEN ? 'Token exists' : 'Token is missing');

// 创建 Replicate 实例
const replicate = new Replicate({
  auth: 'r8_2YwGt4quLK4vUAXG19huCkPr9hL211ibO6S',
});

// 清理中文内容，移除拼音和英文解释
function cleanChineseContent(text) {
  // 移除括号及其内容（包括中英文括号）
  text = text.replace(/[\(（].*?[\)）]/g, '');
  // 移除方括号及其内容
  text = text.replace(/[\[【].*?[\]】]/g, '');
  // 移除拼音（假设拼音是由拉丁字母组成的）
  text = text.replace(/[a-zA-Z\s]+/g, '');
  // 移除多余的标点符号
  text = text.replace(/[,，.。\s]+$/g, '');
  // 移除多余的空格
  text = text.trim();
  return text;
}

// 获取中文提示词
function getChinesePrompt(category) {
  switch (category) {
    case 'best':
      return '一句巧妙的搭讪语句，要突出对方的特点，类似"除了漂亮，你靠什么谋生？"这样的风格';
    case 'classic':
      return '一句浪漫的搭讪语句，要带有诗意，类似"如果吻是雪花，我会送你一场暴风雪"这样的比喻';
    case 'smooth':
      return '一句机智的搭讪语句，要用双关语，类似"我们是不是上过同一节课？因为我感觉我们之间有化学反应"';
    case 'funny':
      return '一句幽默的搭讪语句，要用轻松的比喻，类似"你是WiFi吗？因为我感觉我们之间有连接"';
    case 'bold':
      return '一句直接的搭讪语句，要表达明确的好感，类似"你一定是个魔术师，因为每当我看着你，其他人都消失了"';
    case 'modern':
      return '一句时尚的搭讪语句，要用当代元素，类似"你是5G网络吗？因为你让我瞬间就心动了"';
    default:
      return '一句富有创意的搭讪语句';
  }
}

// 获取日语提示词
function getJapanesePrompt(category) {
  switch (category) {
    case 'best':
      return '魅力的な一言、例えば「美しいこと以外に、どうして生きているの？」のような相手の特徴を活かした表現';
    case 'classic':
      return 'ロマンチックな一言、例えば「もしキスが雪の結晶なら、あなたに吹雪を送りたい」のような詩的な表現';
    case 'smooth':
      return '知的な一言、例えば「私たちは同じクラスだったかな？化学の授業で出会った気がする」のような言葉遊び';
    case 'funny':
      return 'ユーモアのある一言、例えば「あなたはWi-Fi？私たちの間に接続を感じるから」のような面白い例え';
    case 'bold':
      return '大胆な一言、例えば「あなたは魔法使い？だって、あなたを見ると周りの人が消えてしまうから」のような表現';
    case 'modern':
      return '現代的な一言、例えば「君は5Gみたい、一瞬で心に繋がったから」のようなトレンディーな表現';
    default:
      return '創造的な出会いの一言';
  }
}

// 获取韩语提示词
function getKoreanPrompt(category) {
  switch (category) {
    case 'best':
      return '매력적인 한마디, "아름다운 것 말고도 무엇을 하시나요?"와 같이 상대방의 특징을 강조하는 표현';
    case 'classic':
      return '로맨틱한 한마디, "키스가 눈송이라면, 당신에게 눈보라를 보내고 싶어요"와 같은 시적인 표현';
    case 'smooth':
      return '재치있는 한마디, "우리 같은 수업을 들었나요? 우리 사이에 화학작용이 있는 것 같아서요"와 같은 말장난';
    case 'funny':
      return '유머러스한 한마디, "당신은 와이파이인가요? 우리 사이에 연결됨을 느끼거든요"와 같은 재미있는 비유';
    case 'bold':
      return '대담한 한마디, "당신은 마법사인가요? 당신을 볼 때마다 다른 사람들이 사라지거든요"와 같은 표현';
    case 'modern':
      return '현대적인 한마디, "당신은 5G 네트워크같아요, 순간적으로 제 마음에 연결되었거든요"와 같은 트렌디한 표현';
    default:
      return '창의적인 만남의 한마디';
  }
}

// 获取英语提示词
function getEnglishPrompt(category) {
  switch (category) {
    case 'best':
      return 'A charming pickup line like "Aside from being gorgeous, what do you do for a living?" that highlights their qualities';
    case 'classic':
      return 'A romantic pickup line with poetic metaphors like "If kisses were snowflakes, I\'d send you a blizzard"';
    case 'smooth':
      return 'A clever pickup line with wordplay like "Were we in a class together? I could have sworn we had chemistry"';
    case 'funny':
      return 'A humorous pickup line with light metaphors like "Are you WiFi? Because I\'m feeling a connection"';
    case 'bold':
      return 'A direct pickup line expressing clear interest like "You must be a magician, because everyone else disappears when I look at you"';
    case 'modern':
      return 'A trendy pickup line using contemporary elements like "Are you 5G? Because you got me connected instantly"';
    default:
      return 'A creative pickup line';
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category, language = 'en' } = req.body;

  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  try {
    // 多语言话术数据
    const rizzLines = {
      en: {
        classic: [
          "Are you a magician? Because whenever I look at you, everyone else disappears.",
          "Do you have a map? I keep getting lost in your eyes.",
          "If you were a vegetable, you'd be a cute-cumber.",
          "Are you made of copper and tellurium? Because you're Cu-Te.",
          "Is your name Google? Because you have everything I've been searching for."
        ],
        smooth: [
          "I must be a snowflake, because I've fallen for you.",
          "Your smile is like sunshine on a cloudy day.",
          "I'm not a photographer, but I can picture us together.",
          "If kisses were snowflakes, I'd send you a blizzard.",
          "You must be tired because you've been running through my mind all day."
        ],
        funny: [
          "Are you Wi-Fi? Because I'm really feeling a connection.",
          "I'm not a hoarder, but I really want to keep you forever.",
          "Are you my appendix? Because this feeling in my stomach makes me want to take you out.",
          "I was wondering if you had an extra heart. Mine was just stolen.",
          "Do you like Star Wars? Because Yoda one for me!"
        ],
        confident: [
          "I'm not saying you're the best catch here, but you're definitely the only one I'm interested in.",
          "I don't usually approach people, but your energy is magnetic.",
          "I had to come over here. My friends bet me I wouldn't be able to start a conversation with the most beautiful person in the room.",
          "I'm not trying to impress you or anything, but I'm Batman.",
          "I know this might sound crazy, but I think we'd look good together."
        ],
        trendy: [
          "Are you my screen time? Because I can't stop looking at you.",
          "Are you a notification? Because you've got my attention.",
          "If you were a Spotify playlist, you'd be my 'On Repeat'.",
          "Are you a TikTok video? Because I could watch you all day.",
          "You must be a premium subscription because you're everything I've been missing."
        ]
      },
      zh: {
        classic: [
          "你相信一见钟情吗？不信的话，我可以多走几次。",
          "你知道你和星星有什么区别吗？星星在天上，你在我心里。",
          "你一定很忙吧，要不要我帮你分担一下生活的重担？",
          "我觉得你的眼睛很像星星，因为我每次看到都会闪闪发亮。",
          "你知道你和太阳有什么区别吗？太阳温暖大地，你温暖我的心。"
        ],
        smooth: [
          "如果你是一首歌，一定是我的心动曲目。",
          "你笑起来真好看，像春天的花一样。",
          "我可能不是最好的，但我一定会对你最好。",
          "遇见你是我这辈子最美好的意外。",
          "你知道吗？我最近总是失眠，因为你总在我梦里。"
        ],
        funny: [
          "你是不是程序员啊？因为你一出现就让我的心跳加速了。",
          "你一定是偷了我的手机，不然为什么我满脑子都是你的号码？",
          "你是不是开了美颜相机？不然怎么看起来这么好看。",
          "你知道你和WiFi有什么区别吗？WiFi断了还可以重连，你要是走了我就不行了。",
          "你是不是快递啊？怎么这么特别？"
        ],
        confident: [
          "我觉得我们很合适，要不要试试看？",
          "我一般不主动，但你是个例外。",
          "我觉得我们之间需要一个故事，要不要一起创造一下？",
          "你知道吗？我刚刚在想，如果不来认识你，可能会后悔一辈子。",
          "我想请你喝杯咖啡，不是因为你需要提神，而是因为我需要一个理由和你多待一会。"
        ],
        trendy: [
          "你是不是抖音博主？因为你让我停不下来。",
          "你是不是消息提醒？因为你总能吸引我的注意。",
          "如果你是一首歌，一定是我的循环播放。",
          "你是不是网红？因为你让我沦陷了。",
          "你一定是我的个性化推荐，因为你太对我胃口了。"
        ]
      },
      es: {
        classic: [
          "¿Crees en el amor a primera vista o tengo que volver a pasar?",
          "¿Eres un ángel? Porque el cielo debe estar extrañándote.",
          "Si la belleza fuera tiempo, serías la eternidad.",
          "¿Tienes un mapa? Porque me pierdo en tus ojos.",
          "¿Eres el sol? Porque iluminas todo mi mundo."
        ],
        smooth: [
          "Si ser guapo fuera un delito, tendrías cadena perpetua.",
          "No soy fotógrafo, pero puedo imaginarnos juntos.",
          "Tu sonrisa es como un rayo de sol en un día nublado.",
          "Si la belleza fuera gotas de lluvia, tú serías un huracán.",
          "¿Sabes qué te queda bien? Mi número de teléfono."
        ],
        funny: [
          "¿Eres WiFi? Porque siento una conexión.",
          "¿Eres un parking? Porque eres difícil de encontrar y caro de mantener.",
          "¿Eres una cámara? Porque cada vez que te veo sonrío.",
          "¿Jugamos al Candy Crush? Porque eres un bombón.",
          "¿Eres Google? Porque tienes todo lo que busco."
        ],
        confident: [
          "No suelo hacer esto, pero eres especial.",
          "¿Sabes qué? Mi intuición me dice que deberíamos conocernos mejor.",
          "La vida es corta, y tú me haces querer vivirla al máximo.",
          "No soy supersticioso, pero creo que esto es el destino.",
          "¿Te han dicho que tienes algo magnético? Porque no puedo dejar de mirarte."
        ],
        trendy: [
          "¿Eres un video de TikTok? Porque podría verte todo el día.",
          "¿Eres una notificación? Porque captas toda mi atención.",
          "Si fueras una playlist de Spotify, serías mi 'En Repetición'.",
          "¿Eres influencer? Porque influyes en mi estado de ánimo.",
          "Eres como mi serie favorita de Netflix, no puedo dejar de pensar en ti."
        ]
      },
      fr: {
        classic: [
          "Crois-tu au coup de foudre ou dois-je repasser ?",
          "As-tu une carte ? Car je me perds dans tes yeux.",
          "Si la beauté était une seconde, tu serais l'éternité.",
          "Es-tu un ange ? Car le paradis doit te manquer.",
          "Le soleil s'est levé deux fois aujourd'hui : le matin et quand tu as souri."
        ],
        smooth: [
          "Si être beau était un crime, tu aurais la perpétuité.",
          "Je ne suis pas photographe, mais je nous imagine bien ensemble.",
          "Ton sourire est comme un rayon de soleil dans un jour nuageux.",
          "Si la beauté était des gouttes de pluie, tu serais un ouragan.",
          "Tu sais ce qui t'irait bien ? Mon numéro de téléphone."
        ],
        funny: [
          "Es-tu du WiFi ? Car je sens une connexion.",
          "Es-tu un parking ? Car tu es difficile à trouver et cher à garder.",
          "Es-tu une caméra ? Car chaque fois que je te vois, je souris.",
          "Jouons à Candy Crush, car tu es un bonbon.",
          "Es-tu Google ? Car tu as tout ce que je cherche."
        ],
        confident: [
          "Je ne fais pas ça d'habitude, mais tu es spécial(e).",
          "Mon intuition me dit qu'on devrait mieux se connaître.",
          "La vie est courte, et tu me donnes envie de la vivre pleinement.",
          "Je ne suis pas superstitieux, mais je crois que c'est le destin.",
          "On t'a déjà dit que tu avais quelque chose de magnétique ?"
        ],
        trendy: [
          "Es-tu une vidéo TikTok ? Car je pourrais te regarder toute la journée.",
          "Es-tu une notification ? Car tu captures toute mon attention.",
          "Si tu étais une playlist Spotify, tu serais ma 'En Boucle'.",
          "Es-tu influenceur/se ? Car tu influences mon humeur.",
          "Tu es comme ma série Netflix préférée, je ne peux pas m'empêcher de penser à toi."
        ]
      },
      de: {
        classic: [
          "Glaubst du an Liebe auf den ersten Blick oder soll ich noch mal vorbeikommen?",
          "Hast du eine Karte? Ich verliere mich nämlich in deinen Augen.",
          "Wenn Schönheit Zeit wäre, wärst du die Ewigkeit.",
          "Bist du ein Engel? Denn der Himmel muss dich vermissen.",
          "Die Sonne ging heute zweimal auf: am Morgen und als du gelächelt hast."
        ],
        smooth: [
          "Wenn Schönheit ein Verbrechen wäre, hättest du lebenslänglich.",
          "Ich bin zwar kein Fotograf, aber ich kann uns zusammen gut vorstellen.",
          "Dein Lächeln ist wie ein Sonnenstrahl an einem bewölkten Tag.",
          "Wenn Schönheit Regentropfen wären, wärst du ein Orkan.",
          "Weißt du, was dir gut stehen würde? Meine Telefonnummer."
        ],
        funny: [
          "Bist du WLAN? Denn ich spüre eine Verbindung.",
          "Bist du ein Parkplatz? Denn du bist schwer zu finden und teuer zu halten.",
          "Bist du eine Kamera? Denn jedes Mal, wenn ich dich sehe, muss ich lächeln.",
          "Lass uns Candy Crush spielen, denn du bist eine Süßigkeit.",
          "Bist du Google? Denn du hast alles, wonach ich suche."
        ],
        confident: [
          "Normalerweise mache ich das nicht, aber du bist etwas Besonderes.",
          "Mein Gefühl sagt mir, wir sollten uns besser kennenlernen.",
          "Das Leben ist kurz, und du lässt mich es in vollen Zügen genießen wollen.",
          "Ich bin nicht abergläubisch, aber das muss Schicksal sein.",
          "Hat dir schon mal jemand gesagt, dass du etwas Magnetisches hast?"
        ],
        trendy: [
          "Bist du ein TikTok-Video? Denn ich könnte dich den ganzen Tag anschauen.",
          "Bist du eine Benachrichtigung? Denn du hast meine volle Aufmerksamkeit.",
          "Wenn du eine Spotify-Playlist wärst, wärst du meine 'Auf Repeat'.",
          "Bist du Influencer? Denn du beeinflusst meine Stimmung.",
          "Du bist wie meine Lieblingsserie auf Netflix, ich muss ständig an dich denken."
        ]
      },
      ja: {
        classic: [
          "運命って信じる？だって、こうして出会えたんだから。",
          "あなたの目、星みたいにきれいだね。",
          "もしかして、天使？羽が見えないだけかな。",
          "あなたのような人に出会えるなんて、奇跡としか思えない。",
          "あなたの笑顔、見てるだけで幸せになれる。"
        ],
        smooth: [
          "あなたは私の人生のストーリーに欠かせない主人公になりそう。",
          "今日の天気より、あなたの方が眩しいよ。",
          "あなたと話してると、時間が止まったみたい。",
          "運命の赤い糸って、こんな感じなのかな。",
          "あなたと出会えて、人生が変わった気がする。"
        ],
        funny: [
          "WiFiみたいだね、近くにいるだけで心が繋がる感じ。",
          "スマホの充電より、あなたといる時間の方が大切。",
          "もしかして魔法使い？だって、他の人が見えなくなるから。",
          "あなたって、カメラアプリ使ってる？実物の方が可愛いよ。",
          "私、占い師に「運命の人に会える」って言われたけど、当たってたみたい。"
        ],
        confident: [
          "私たち、すごく相性いいと思わない？",
          "普段こんなこと言わないんだけど、あなたは特別。",
          "一目惚れって信じる？今、私がその瞬間かも。",
          "あなたのこと、もっと知りたいな。",
          "今日が人生で一番良い日だと思ってた。でも、あなたに会えて更に良くなった。"
        ],
        trendy: [
          "インスタ映えする笑顔だね。",
          "あなたって、私の通知設定みたい。いつも気になっちゃう。",
          "私のプレイリストに入れたい曲みたいな存在。",
          "TikTokみたいだね、見てると時間が過ぎるの忘れちゃう。",
          "あなたって、トレンド入りしそうな話題の人。"
        ]
      },
      ko: {
        classic: [
          "사랑을 믿으세요? 당신을 보고 믿게 됐어요.",
          "당신의 눈이 별처럼 빛나네요.",
          "천사가 지상에 있다는 걸 이제 알았어요.",
          "운명이란 게 이런 걸까요?",
          "당신의 미소가 내 하루를 밝게 만들어요."
        ],
        smooth: [
          "당신은 내 인생의 베스트 챕터가 될 것 같아요.",
          "오늘 날씨보다 당신이 더 눈부셔요.",
          "당신과 함께 있으면 시간이 멈추는 것 같아요.",
          "이런 게 운명의 빨간 실일까요?",
          "당신을 만난 건 내 인생 최고의 행운이에요."
        ],
        funny: [
          "와이파이 같아요, 가까이 있으면 마음이 연결되는 것 같아요.",
          "휴대폰 충전보다 당신과의 시간이 더 소중해요.",
          "마법사세요? 당신을 보면 다른 사람들이 안 보이거든요.",
          "필터 없이도 이렇게 예쁘신가요?",
          "점쟁이가 운명의 상대를 만날 거래서 왔는데, 진짜였나 봐요."
        ],
        confident: [
          "우리 잘 어울리는 것 같지 않나요?",
          "보통은 이러지 않는데, 당신은 특별해요.",
          "첫눈에 반한다는 게 이런 걸까요?",
          "당신에 대해 더 알고 싶어요.",
          "오늘이 인생에서 가장 좋은 날인 줄 알았는데, 당신을 만나서 더 좋아졌어요."
        ],
        trendy: [
          "인스타에 올리고 싶은 순간이에요.",
          "당신은 제 알림설정 같아요, 항상 신경 쓰이거든요.",
          "내 플레이리스트에 추가하고 싶은 노래 같아요.",
          "틱톡처럼 당신을 보면 시간 가는 줄 모르겠어요.",
          "당신은 실시간 트렌드에 오를 것 같아요."
        ]
      },
      ru: {
        classic: [
          "Веришь в любовь с первого взгляда или мне пройти еще раз?",
          "У тебя есть карта? Я постоянно теряюсь в твоих глазах.",
          "Если бы красота измерялась временем, ты была бы вечностью.",
          "Ты ангел? Потому что небеса должны по тебе скучать.",
          "Солнце сегодня взошло дважды: утром и когда ты улыбнулась."
        ],
        smooth: [
          "Если бы красота была преступлением, ты бы получила пожизненное.",
          "Я не фотограф, но могу представить нас вместе.",
          "Твоя улыбка как солнечный луч в пасмурный день.",
          "Если бы красота была каплями дождя, ты была бы ураганом.",
          "Знаешь, что тебе бы подошло? Мой номер телефона."
        ],
        funny: [
          "Ты Wi-Fi? Потому что я чувствую связь.",
          "Ты парковка? Потому что тебя трудно найти и дорого содержать.",
          "Ты камера? Потому что каждый раз, когда я тебя вижу, я улыбаюсь.",
          "Давай сыграем в Candy Crush, потому что ты конфетка.",
          "Ты Google? Потому что у тебя есть все, что я ищу."
        ],
        confident: [
          "Обычно я так не делаю, но ты особенная.",
          "Моя интуиция подсказывает, что нам стоит узнать друг друга получше.",
          "Жизнь коротка, а ты заставляешь меня хотеть жить полной жизнью.",
          "Я не суеверный, но это должно быть судьба.",
          "Тебе говорили, что в тебе есть что-то магнетическое?"
        ],
        trendy: [
          "Ты видео из TikTok? Потому что я могу смотреть на тебя весь день.",
          "Ты уведомление? Потому что ты привлекаешь все мое внимание.",
          "Если бы ты была плейлистом Spotify, ты была бы моим 'На повторе'.",
          "Ты инфлюенсер? Потому что ты влияешь на мое настроение.",
          "Ты как мой любимый сериал на Netflix, я не могу перестать о тебе думать."
        ]
      },
      pt: {
        classic: [
          "Você acredita em amor à primeira vista ou devo passar por aqui de novo?",
          "Você tem um mapa? Porque eu me perco nos seus olhos.",
          "Se beleza fosse tempo, você seria a eternidade.",
          "Você é um anjo? Porque o céu deve estar sentindo sua falta.",
          "O sol nasceu duas vezes hoje: de manhã e quando você sorriu."
        ],
        smooth: [
          "Se beleza fosse crime, você teria prisão perpétua.",
          "Não sou fotógrafo, mas posso nos imaginar juntos.",
          "Seu sorriso é como um raio de sol em um dia nublado.",
          "Se beleza fosse gotas de chuva, você seria um furacão.",
          "Sabe o que ficaria bem em você? Meu número de telefone."
        ],
        funny: [
          "Você é Wi-Fi? Porque estou sentindo uma conexão.",
          "Você é estacionamento? Porque é difícil de encontrar e caro de manter.",
          "Você é uma câmera? Porque toda vez que te vejo, sorrio.",
          "Vamos jogar Candy Crush? Porque você é um doce.",
          "Você é Google? Porque tem tudo que eu procuro."
        ],
        confident: [
          "Normalmente não faço isso, mas você é especial.",
          "Minha intuição diz que deveríamos nos conhecer melhor.",
          "A vida é curta, e você me faz querer vivê-la ao máximo.",
          "Não sou supersticioso, mas isso deve ser destino.",
          "Já te disseram que você tem algo magnético?"
        ],
        trendy: [
          "Você é um vídeo do TikTok? Porque eu poderia te assistir o dia todo.",
          "Você é uma notificação? Porque você captura toda minha atenção.",
          "Se você fosse uma playlist do Spotify, seria minha 'Em Repetição'.",
          "Você é influencer? Porque você influencia meu humor.",
          "Você é como minha série favorita da Netflix, não consigo parar de pensar em você."
        ]
      }
    };

    // 获取当前语言的话术，如果没有则使用英文
    const currentLanguageLines = rizzLines[language] || rizzLines['en'];
    
    let availableLines = [];
    if (category === 'all') {
      // 如果是 all 分类，从所有语言中随机选择
      const allLanguages = Object.keys(rizzLines);
      const randomLanguage = allLanguages[Math.floor(Math.random() * allLanguages.length)];
      availableLines = Object.values(rizzLines[randomLanguage]).flat();
    } else {
      availableLines = currentLanguageLines[category] || Object.values(currentLanguageLines).flat();
    }

    const randomLine = availableLines[Math.floor(Math.random() * availableLines.length)];
    
    return res.status(200).json({ output: randomLine });
  } catch (error) {
    console.error('Error generating pickup line:', error);
    return res.status(500).json({ error: 'Failed to generate pickup line' });
  }
}
