class Word{
    constructor(word, defintion, kaomoji){
        this.word = word;
        this.defintion = defintion;
        this.kaomoji = kaomoji;
    }
}

class EmotionObject{
    constructor(emotion, description, color, onomatopoeia, kaomoji){
        this.emotion = emotion;
        this.description = description;
        this.color = color;
        this.onomatopoeia = onomatopoeia;
		this.kaomoji = kaomoji;
    }

    getOnomatopoeiaWords(){
        let results = [];
        let len = this.onomatopoeia.length;
        for (let i = 0; i < len; i++) {
            let currentWord = new Word(this.onomatopoeia[i], dictionary[this.onomatopoeia[i]], kaomojiDictionary[this.onomatopoeia[i]]);
            results.push(currentWord);
        }

        return results;
    }

    getHtmlContainerString(){
		let containerString = "";
		containerString +=
		`
		<div id="sec-${this.emotion}" class="vw-100 bg-${this.color} justify-content-center align-items-center">
			<div>
				<h3 class="pt-5 px-5">${this.emotion.toUpperCase()}</h3>
				<p class="pt-2 px-5 description">${this.description}</p>
			</div>
			<div class="p-2 mb-2 d-flex flex-wrap container">
		`;

		let onomatopoeiaWords = this.getOnomatopoeiaWords();
		for (let i = 0; i < onomatopoeiaWords.length; i++) {
			let currentWord = onomatopoeiaWords[i];
			containerString +=
			`
					<div class="cal-8 col-md-5 m-4 onomatopoeia row">
						<div class="col-4">
							<h4 class="pt-4">${currentWord.word}</h4>
							<p class="pb-4">${currentWord.defintion}</p>
						</div>
						<div class="col-8 d-flex justify-content-center align-items-center">
						<h4>${currentWord.kaomoji}</h4>
						</div>
					</div>
			`;
		}
		containerString +=
		`
			</div>
		`;

		return containerString;
	}
}

//グローバル定数
const dictionary = {
    "bark":"the sound made by a dog",
    "grunt":"issue a low, animal-like noise",
    "roar":"make a loud noise, as of an animal",
    "whack":"the act of hitting vigorously",
    "smack":"a blow from a flat object (as an open hand)",
    "hiss":`make a sharp, elongated "s" sound`,
    "ahem":"the utterance of a sound similar to clearing the throat",
    "bawl":"cry loudly",
    "bling":"flashy, ostentatious jewelry",
    "boom":"a deep prolonged loud noise",
    "buzz":"the sound of rapid vibration",
    "caw":"utter a cry, characteristic of crows, rooks, or ravens",
    "chatter":"talk socially without exchanging too much information",
    "chant":"a repetitive song in which syllables are assigned to a tone",
    "clatter":"a continuous rattling sound as of hard objects falling or striking each other.",
    "clunk":"a heavy dull sound (as made by impact of heavy objects)",
    "crawl":"move forward on the hands and knees or by dragging the body close to the ground.",
    "flick":"throw or toss with a quick motion",
    "giggle":"a light, silly laugh.",
    "gargle":"an act or instance or the sound of washing one's mouth and throat with a liquid kept in motion by exhaling through it.",
    "honk":"the cry of a goose or any loud sound resembling it",
    "oink":"the short low gruff noise of the kind made by hogs",
    "whine":"a complaint uttered in a plaintive way",
    "waah":"sound made when crying by babies",
    "zing":"sound my by something energetic",
	"hollow":"sound with a missing soul",
	"fuddle":"a state of confusion or intoxication"
};

const kaomojiDictionary = {
    "bark":"(*｀皿´*)ｶﾞﾙﾙ",
    "grunt":"ヽ(｀Д´)ノｳｶﾞｰ",
    "roar":"(「・ω・)「ｶﾞｵｰ",
    "whack":"(ノД`)ノ☆((('д')))",
    "smack":"( ‘д‘⊂彡☆))Д´) ﾊﾟｰﾝ",
    "hiss":"(「ФДФ)「ｼｬｰ",
    "ahem":"（´ρ｀*）ｺﾎﾝ",
    "bawl":"ヽ(ﾟ`Д´ﾟ)ﾉﾟ｡ｳﾜｧｧｧﾝ!!",
    "bling":".｡.:*･'(*°∇°*)'･*:.｡.",
    "boom":"(_・ω・)_ ﾊﾞｧﾝ",
    "buzz":"ｶﾞｸｶﾞｸ((( ;ﾟДﾟ)))ﾌﾞﾙﾌﾞﾙ",
    "caw":"(*ﾟ∋ﾟ)",
    "chatter":"(*＾∀＾)人(＾∀＾*)",
    "chant":"♬♪( ◜◒◝ )♩♬",
    "clatter":"(((>_<)))ｶﾞﾀｶﾞﾀ",
    "clunk":"＝＝(((((>ω<)*o*)☆",
    "crawl":"_(°ω°｣ ∠)_三",
    "flick":"#ノ｀д´)ノ 彡┻━┻",
    "giggle":"( *´艸`)ｸｽｸｽ",
    "gargle":"(# ﾟДﾟ)",
    "honk":"( ﾟ∀ﾟ)・;’.、",
    "oink":"ヾ(｀ε´)ﾉ ﾌﾞｰﾌﾞｰ",
    "whine":"(´；ω；｀)",
    "waah":"ﾟﾟ(ﾉД`)ｳｴｰﾝ;",
    "zing":"-=≡Σ(((⊃ﾟ∀ﾟ)つ ",
	"hollow":"┌┤´д`├┐",
	"fuddle":"・:*:・ヽ(ﾟ∀｡)ノ・:*:・"
};

const emotions = [
    new EmotionObject("angry", "feeling or showing strong annoyance, displeasure, or hostility; full of anger.", "red", ["bark","grunt", "roar","whack","smack","hiss"], "(＃｀皿´)"),
    new EmotionObject("happy", "feeling or showing pleasure or contentment.", "pink", ["bling","chatter","chant","giggle"], "＼(^O^)／"),
    new EmotionObject("bad", "not such as to be hoped for or desired; unpleasant or unwelcome.", "grey", ["ahem","clatter","clunk"], "(∩´﹏`∩)"),
    new EmotionObject("sad", "feeling or showing sorrow; unhappy.", "greyblue", ["bawl","whine","waah"], "(；д；)"),
    new EmotionObject("surprised", "to feel mild astonishment or shock.", "purple", ["boom","honk","zing"], "Σ(ﾟ∀ﾟﾉ)ﾉ"),
    new EmotionObject("fearful", "feeling afraid; showing fear or anxiety.", "green", ["buzz","caw","crawl"], "((( ;ﾟДﾟ)))"),
    new EmotionObject("disgusted", "feeling or showing strong annoyance, displeasure, or hostility; full of anger.", "orange", ["flick","gargle","oink"], "( ˘•ω•˘ )"),
	new EmotionObject("tired", "feeling in need of rest or sleep", "blue", ["hollow"], "┌┤´д`├┐"),
	new EmotionObject("confused", "unable to think clearly", "shockingpink", ["fuddle"], "ヽ(ﾟ∀｡)ノ")
];

let tableOfContents =
`
		<h1 class="title">Emotion Onomatopoeia Dictionary</h1>
		<h2 class="category">Category</h2>
		<div class="box">
`;
for (let i = 0; i < emotions.length; i++) {
	let currentEmotion = emotions[i];
	tableOfContents +=
	`
		<div class="bg-${currentEmotion.color} emotion">
			<h3 class="pt-5"><a href="#sec-${currentEmotion.emotion}">${currentEmotion.emotion.toUpperCase()}</a></h3>
			<h3 class="pt-4">${currentEmotion.kaomoji}</h3>
		</div>
	`;
}
tableOfContents +=
`
		</div>
`;

let containerSection = "";
for (let i = 0; i < emotions.length; i++) {
	containerSection += emotions[i].getHtmlContainerString();
}

let htmlString =
`
	<div class="back">
		${tableOfContents}
		${containerSection}
	</div>
`;

document.getElementById("target").innerHTML = htmlString;
