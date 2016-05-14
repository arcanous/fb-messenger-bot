var DTquotes = [
'An ‘extremely credible source’ has called my office and told me that Barack Obama’s birth certificate is a fraud',
'Robert Pattinson should not take back Kristen Stewart. She cheated on him like a dog & will do it again – just watch. He can do much better!',
'Ariana Huffington is unattractive, both inside and out. I fully understand why her former husband left her for a man – he made a good decision.',
'You know, it really doesn’t matter what the media write as long as you’ve got a young, and beautiful, piece of ass.',
'I will build a great wall – and nobody builds walls better than me, believe me – and I’ll build them very inexpensively. I will build a great, great wall on our southern border, and I will make Mexico pay for that wall. Mark my words.',
'When Mexico sends its people, they’re not sending the best. They’re not sending you, they’re sending people that have lots of problems and they’re bringing those problems with us. They’re bringing drugs. They’re bring crime. They’re rapists… And some, I assume, are good people.',
'Our great African-American President hasn’t exactly had a positive impact on the thugs who are so happily and openly destroying Baltimore.',
'If I were running ‘The View’, I’d fire Rosie O’Donnell. I mean, I’d look at her right in that fat, ugly face of hers, I’d say ‘Rosie, you’re fired.',
'All of the women on The Apprentice flirted with me – consciously or unconsciously. That’s to be expected.',
'One of they key problems today is that politics is such a disgrace. Good people don’t go into government.',
'The beauty of me is that I’m very rich.',
'It’s freezing and snowing in New York – we need global warming!',
'I’ve said if Ivanka weren’t my daughter, perhaps I’d be dating her.',
'My fingers are long and beautiful, as, it has been well documented, are various other parts of my body.',
'I have never seen a thin person drinking Diet Coke.',
'I think the only difference between me and the other candidates is that I’m more honest and my women are more beautiful.',
'You’re disgusting.',
'The point is, you can never be too greedy.',
'Sorry, there is no STAR on the stage tonight!',
'My Twitter has become so powerful that I can actually make my enemies tell the truth.',
'My IQ is one of the highest — and you all know it! Please don\'t feel so stupid or insecure; it\'s not your fault.',
'I have so many fabulous friends who happen to be gay, but I am a traditionalist.',
'The other candidates — they went in, they didn’t know the air conditioning didn’t work. They sweated like dogs...How are they gonna beat ISIS? I don’t think it’s gonna happen.',
'Look at those hands, are they small hands? And, [Republican rival Marco Rubio] referred to my hands: \'If they\'re small, something else must be small.\' I guarantee you there\'s no problem. I guarantee.',
'Thanks sweetie. That’s nice',
'Lyin\' Ted Cruz just used a picture of Melania from a shoot in his ad. Be careful, Lyin\' Ted, or I will spill the beans on your wife!',
'I was down there, and I watched our police and our firemen, down on 7-Eleven, down at the World Trade Center, right after it came down',
'The only card [Hillary Clinton] has is the woman\'s card. She\'s got nothing else to offer and frankly, if Hillary Clinton were a man, I don\'t think she\'d get 5 percent of the vote. The only thing she\'s got going is the woman\'s card, and the beautiful thing is, women don\'t like her.'];



var fbMessage = require('../fbMessage/fbMessage');

module.exports = function (commandArguments) {

	var randomDonaldTrumpQuote = DTquotes[Math.floor(Math.random() * DTquotes.length)];

    return new fbMessage
        .PlainText("Donald says: " + randomDonaldTrumpQuote)
        .compose();



}