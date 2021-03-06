function OpenImgModal(sourceObj) {
    css_url = String(window.getComputedStyle(document.getElementById(sourceObj)).getPropertyValue('background-image'))
    img_url = css_url.substring(5, css_url.length - 2)
    document.getElementById('ModalImg').setAttribute('src', img_url);
    document.getElementById('ImgModalDiv').style.display = 'block';
}

function CloseImgModal() {
    document.getElementById('ImgModalDiv').style.display = 'none';
}

function OpenCharModal(char_name) {
    document.getElementById('CharModalDiv').style.display = 'block';
    char_info = chars[char_name];

    document.getElementById('CharAvatar').setAttribute('src', './chars/' + char_name + '.png');
    document.getElementById('CharName').innerText = char_info['name'];

    document.getElementById('CharDialog').innerHTML = '';
    for (i = 0; i < char_info['dialog'].length; i++) {
        document.getElementById('CharDialog').innerHTML = document.getElementById('CharDialog').innerHTML + '<p>' + char_info['dialog'][i] + '</p>';
    }


}

function CloseCharModal() {
    document.getElementById('CharModalDiv').style.display = 'none';
}


var chars = {
    'jingle_ringford': {
        'name': 'Jingle Ringford',
        'dialog': [
            "Welcome! Hop in the gondola to take a ride up the mountain to Exit 19: Santa's castle!",
            "Santa asked me to design the new badge, and he wanted it to look really cold - like it was frosty.",
            "Click your badge (the snowflake in the center of your avatar) to read your objectives.",
            "If you'd like to chat with the community, join us on Discord!",
            "We have specially appointed Kringle Koncierges as helpers; you can hit them up for help in the #general channel!",
            "If you get a minute, check out Ed Skoudis' official intro to the con!",
            "Oh, and before you head off up the mountain, you might want to try to figure out what's written on that advertising bilboard.",
            "Have you managed to read the gift list at the center?",
            "It can be hard when things are twirly. There are tools that can help!",
            "It also helps to select the correct twirly area.",
            "*** As Santa ***",
            "Santa, it's surprising to see you all the way down here!",
            "I'm used to you being up at the North Pole."
        ]
    },
    'jewel_loggins': {
        'name': 'Jewel Loggins',
        'dialog': [
            "Welcome to the SANS Holiday Hack Challenge 2020! Have a great time!",
            "Be sure to join us on Discord!",
            "Remember, you can get hints for each of the objectives in your badge by clicking on elves.",
            "If you help elves solve their own technical terminal challenge, they'll give you some ideas about how to approach the objectives.",
            "Oh, and if you see any odd objects lying around, walk over to them to pick them up!",
            "You might even find one as you approach the castle!",
            "*** As Santa ***",
            "Hey Santa, didn't I just see you walking past me?"
        ]
    },
    'pepper_minstix': {
        'name': 'Pepper Minstix',
        'dialog': [
            "Howdy - Pepper Minstix here!",
            "I've been playing with tmux lately, and golly it's useful.",
            "Problem is: I somehow became detached from my session.",
            "Do you think you could get me back to where I was, admiring a beautiful bird?",
            "If you find it handy, there's a tmux cheat sheet you can use as a reference.",
            "I hope you can help!",
            "*** After Solving Unescape Tmux ***",
            "You found her! Thanks so much for getting her back!",
            "Hey, maybe I can help YOU out!",
            "There's a Santavator that moves visitors from floor to floor, but it's a bit wonky.",
            "You'll need a key and other odd objects. Try talking to Sparkle Redberry about the key.",
            "For the odd objects, maybe just wander around the castle and see what you find on the floor.",
            "Once you have a few, try using them to split, redirect, and color the Super Santavator Sparkle Stream (S4).",
            "You need to power the red, yellow, and green receivers with the right color light!",
            "*** As Santa ***",
            "Howdy Santa!",
            "I've heard that several people have fixed the Santavator, including you. That's great news!"
        ]
    },
    'shinny_upatree': {
        'name': 'Shinny Upatree',
        'dialog': [
            "Hiya hiya - I'm Shinny Upatree!",
            "Check out this cool KringleCon kiosk!",
            "You can get a map of the castle, learn about where the elves are, and get your own badge printed right on-screen!",
            "Be careful with that last one though. I heard someone say it's \"ingestible.\" Or something...",
            "Do you think you could check and see if there is an issue?",
            "*** After Solving Kringle Kiosk ***",
            "Golly - wow! You sure found the flaw for us!",
            "Say, we've been having an issue with an Amazon S3 bucket.",
            "Do you think you could help find Santa's package file?",
            "Jeepers, it seems there's always a leaky bucket in the news. You'd think we could find our own files!",
            "Digininja has a great guide, if you're new to S3 searching.",
            "He even released a tool for the task - what a guy!",
            "The package wrapper Santa used is reversible, but it may take you some trying.",
            "Good luck, and thanks for pitching in!",
            "*** As Santa ***",
            "Hiya hiya, Santa!",
            "Hey, there's issues going on with the tag generator in the Wrapping Room."
        ]
    },
    'three_turtle_doves': {
        'name': 'Three Turtle Doves',
        'dialog': [
            "*** Jean-Claude ***",
            "Jacques DuGivre!",
            "*** As Santa ***",
            "Jack Frost!",
            "Jack Frost!",
            "Jack Frost!",
            "*** Marie ***",
            "Joyeuses fêtes!",
            "*** As Santa ***",
            "Happy Holidays!",
            "Happy Holidays!",
            "*** Pierre ***",
            "Bonjour!",
            "*** As Santa ***",
            "Hello!"
        ]
    },
    'santa': {
        'name': 'Santa',
        'dialog': [
            "*** Castle Entrance ***",
            "Hello and welcome to the North Pole!",
            "We're super excited about this year's KringleCon 3: French Hens.",
            "My elves have been working all year to upgrade the castle.",
            "It was a HUGE construction project, and we've nearly completed it.",
            "Please pardon the remaining construction dust around the castle and enjoy yourselves!",
            "*** Entry ***",
            "Welcome to my newly upgraded castle!",
            "Also, check out that big portrait behind me!",
            "I received it in the mail a couple of weeks ago – a wonderful house warming present from an anonymous admirer.",
            "Gosh, I wonder who sent it. I'm so thankful for the gift!",
            "Please feel free to explore my upgraded castle and enjoy the KringleCon talks upstairs.",
            "You can get there through my new Santavator!",
        ]
    },
    'ginger_breddie': {
        'name': 'Ginger Breddie',
        'dialog': [
            "Hey, I heard from some of the other elves that there's some really crazy things going on with floor one and a half.",
            "Hey Santa! Did you just come here from floor one and a half?"
        ]
    },
    'piney_sappington': {
        'name': 'Piney Sappington',
        'dialog': [
            "Psssst!",
            "Hey you! Yes YOU!",
            "I've gotta tell you something, but you gotta keep it on the down-low.",
            "Santa has been behaving VERY strangely over the past couple of weeks.",
            "He has delayed certain projects, cancelled others, and even messed around with our technical infrastructure.",
            "There's rumors among the elves that something has gone wrong with Santa.",
            "I can't say any more – he might hear!",
            "*** As Santa ***",
            "Hey Santa!",
            "Are you alright?",
            "You look a little out of it. Perhaps you could use some rest.",
            "You’ve been so busy."
        ]
    },
    'sparkle_redberry': {
        'name': 'Sparkle Redberry',
        'dialog': [
            "Hey hey, Sparkle Redberry here!",
            "The Santavator is on the fritz. Something with the wiring is grinchy, but maybe you can rig something up?",
            "Here's the key! Good luck!",
            "On another note, I heard Santa say that he was thinking of canceling KringleCon this year!",
            "At first, I thought it was a joke, but he seemed serious. I'm glad he changed his mind.",
            "Have you had a chance to look at the Santavator yet?",
            "With that key, you can look under the panel and see the Super Santavator Sparkle Stream (S4).",
            "To get to different floors, you'll need to power the various colored receivers.",
            "... There MAY be a way to bypass the S4 stream.",
            "*** As Santa ***",
            "Santa, I just saw you get in the Santavator, but you never came back down, but now you're back.",
            "How did you do that?"
        ]
    },
    'ribb_bonbowford': {
        'name': 'Ribb Bonbowford',
        'dialog': [
            "Hello - my name is Ribb Bonbowford. Nice to meet you!",
            "Are you new to programming? It's a handy skill for anyone in cyber security.",
            "This challenge centers around JavaScript. Take a look at this intro and see how far it gets you!",
            "Ready to move beyond elf commands? Don't be afraid to mix in native JavaScript.",
            "Trying to extract only numbers from an array? Have you tried to filter?",
            "Maybe you need to enumerate an object's keys and then filter?",
            "Getting hung up on number of lines? Maybe try to minify your code.",
            "Is there a way to push array items to the beginning of an array? Hmm...",
            "*** As Santa ***",
            "Hello Santa!",
            "I've been looking over some of that code you submitted for the Santavator.",
            "It seems to open up a vulnerability in the fingerprint reader.",
            "I'm kind of surprised that you would have submitted such weak code.",
            "Normally your code is cleaner."
        ]
    },
    'holly_evergreen': {
        'name': 'Holly Evergreen',
        'dialog': [
            "Hi, so glad to see you! I'm Holly Evergreen.",
            "I've been working with this Redis-based terminal here.",
            "We're quite sure there's a bug in it, but we haven't caught it yet.",
            "The maintenance port is available for curling, if you'd like to investigate.",
            "Can you check the source of the index.php page and look for the bug?",
            "I read something online recently about remote code execution on Redis. That might help!",
            "I think I got close to RCE, but I get mixed up between commas and plusses.",
            "You'll figure it out, I'm sure!",
            "*** After Redis Bug Hunt ***",
            "See? I knew you could to it!",
            "I wonder, could we figure out the problem with the Tag Generator if we can get the source code?",
            "Can you figure out the path to the script?",
            "I've discovered that enumerating all endpoints is a really good idea to understand an application's functionality.",
            "Sometimes I find the Content-Type header hinders the browser more than it helps.",
            "If you find a way to execute code blindly, maybe you can redirect to a file then download that file?",
            "*** As Santa ***",
            "Hi Santa!",
            "If you have a chance, I'd love to get your feedback on the Tag Generator updates!",
            "I'm a little concerned about the file upload feature, but Noel thinks it will be fine.",
            "Sorry to be a pest Santa, but could you look at the Tag Generator?",
            "I've been looking at it, and I wonder if the source code would provide more insight?",
            "I told Noel we should be more careful about disclosing information in error messages.",
            "I tried what you suggested and enumerating all endpoints really is good idea to understand an application's functionality.",
            "Sometimes though, I find the Content-Type header hinders the browser more than it helps.",
            "Blind command injection can be frustrating though. Do you think output redirection would help?"
        ]
    },
    'fitzy_shortstack': {
        'name': 'Fitzy Shortstack',
        'dialog': [
            "\"Put it in the cloud,\" they said...",
            "\"It'll be great,\" they said...",
            "All the lights on the Christmas trees throughout the castle are controlled through a remote server.",
            "We can shuffle the colors of the lights by connecting via dial-up, but our only modem is broken!",
            "Fortunately, I speak dial-up. However, I can't quite remember the handshake sequence.",
            "Maybe you can help me out? The phone number is 756-8347; you can use this blue phone.",
            "*** After 33.6kpbs",
            "탢ݵרOُ񆨶$Ԩ؉楌Բ ahem! We did it! Thank you!!",
            "Anytime you feel like changing the color scheme up, just pick up the phone!",
            "You know, Santa really seems to trust Shinny Upatree...",
            "*** As Santa ***",
            "\"Watch Santa walk around,\" they said.",
            "\"See how strange he's behaving,\" they said.",
            "And you know what? They were right.",
            "Oh, Santa! I didn't see you there!",
            "I hope you're feeling OK."
        ]
    },
    'angel_candysalt': {
        'name': 'Angel Candysalt',
        'dialog': [
            "You know, every day or so, I see Santa looking at his portrait in the entry and then letting out a maniacal “Bwahahaha.”",
            "It's kind of disturbing and I'm worried about him.",
            "Oh, this machine here? Oh, it's nothing you'll be able to use.",
            "You know, we have pretty tight controls on authentication for that infrastructure.",
            "There's some biometrics, so only Santa and a handful of elves can login.",
            "*** As Santa ***",
            "Hey Santa, there’s some crazy stuff going on that we can see through our Splunk infrastructure.",
            "You better login and see what’s up."
        ]
    },
    'sugarplum_mary': {
        'name': 'Sugarplum Mary',
        'dialog': [
            "Sugarplum Mary? That's me!",
            "I was just playing with this here terminal and learning some Linux!",
            "It's a great intro to the Bash terminal.",
            "If you get stuck at any point, type hintme to get a nudge!",
            "Can you make it to the end?",
            "*** After Linux Primer ***",
            "You did it - great! Maybe you can help me configure my postfix mail server on Gentoo!",
            "Just kidding!",
            "Hey, wouldja' mind helping me get into my point-of-sale terminal?",
            "It's down, and we kinda' need it running.",
            "Problem is: it is asking for a password. I never set one!",
            "Can you help me figure out what it is so I can get set up?",
            "Shinny says this might be an Electron application.",
            "I hear there's a way to extract an ASAR file from the binary, but I haven't looked into it yet.",
            "*** As Santa ***",
            "IT'S SANTA!!!",
            "... oh, hi Santa.",
            "Thanks for all of the Linux lessons, I feel like I'm getting better at working at the command line!",
            "I'm so thankful for all of the Linux help from our guest Santa!",
            "Maybe they can help with the point of sale terminal issue too?",
            "Wow Santa, these guests are amazing! It seems like there's nothing they can't do!"
        ]
    },
    'jack_frost': {
        'name': 'Jack Frost',
        'dialog': [
            "That's such a magnificent portrait of Santa in the foyer.",
            "What a great demonstration of artistic skill.",
            "Bwahahaha!",
            "*** In Talk Lobby ***",
            "Gosh, there's some really great talks.",
            "I'm getting all kinds of ideas for different modes of attack.",
            "*** In NetWars Roof ***",
            "Hi, I'm Jack Frost!",
            "Just hanging out here at The Frostiest Place on Earth.",
            "*** As Santa in Courtyard ***",
            "Oh, hi Santa.",
            "I'm just wandering around, minding my own business.",
            "Nothing nefarious going on here.",
            "*** As Santa in Talk Lobby ***",
            "Hello Santa. It's you again.",
            "Thank you so much for hosting this event.",
            "I know we've had our issues in the past, but I think we should just bury the hatchet.",
            "*** As Santa on NetWars roof ***",
            "Uh-oh! Santa! It’s… YOU!",
            "Hello! How are you doing?",
            "I'm just minding my own business, watching the elves play NetWars.",
            "*** On Santa's Balcony ***",
            "My plan was NEARLY perfect… but I never expected someone with your skills to come around and ruin my plan for ruining the holidays!",
            "And now, they’re gonna put me in jail for my deeds."
        ]
    },
    'bubble_lightington': {
        'name': 'Bubble Lightington',
        'dialog': [
            "Santa doesn't seem to be his kind self lately.",
            "It's like something's gotten into him.",
            "Must be stress.",
            "*** As Santa ***",
            "Hey Santa... I’ve noticed that lately, you’ve been telling everyone to \"Stay frosty.\"",
            "What’s that all about?"
        ]
    },
    'bushy_evergreen': {
        'name': 'Bushy Evergreen',
        'dialog': [
            "Ohai! Bushy Evergreen, just trying to get this door open.",
            "It's running some Rust code written by Alabaster Snowball.",
            "I'm pretty sure the password I need for ./door is right in the executable itself.",
            "Isn't there a way to view the human-readable strings in a binary file?",
            "*** After Speaker UNprep - ./door ***",
            "That's it! What a great password...",
            "Oh, this might be a good time to mention another lock in the castle.",
            "Santa asked me to ask you to evaluate the security of our new HID lock.",
            "If ever you find yourself in posession of a Proxmark3, click it in your badge to interact with it.",
            "It's a slick device that can read others' badges!",
            "Hey, you want to help me figure out the light switch too? Those come in handy sometimes.",
            "The password we need is in the lights.conf file, but it seems to be encrypted.",
            "There's another instance of the program and configuration in ~/lab/ you can play around with.",
            "What if we set the user name to an encrypted value?",
            "*** After Speaker UNprep - ./lights ***",
            "Wow - that worked? I mean, it worked! Hooray for opportunistic decryption, I guess!",
            "Oh, did I mention that the Proxmark can simulate badges? Cool, huh?",
            "There are lots of references online to help.",
            "In fact, there's a talk going on right now!",
            "So hey, if you want, there's one more challenge.",
            "You see, there's a vending machine in there that the speakers like to use sometimes.",
            "Play around with ./vending_machines in the lab folder.",
            "You know what might be worth trying? Delete or rename the config file and run it.",
            "Then you could set the password yourself to AAAAAAAA or BBBBBBBB.",
            "If the encryption is simple code book or rotation ciphers, you'll be able to roll back the original password.",
            "*** After Speaker UNprep - ./vending-machines ***",
            "Your lookup table worked - great job! That's one way to defeat a polyalphabetic cipher!",
            "Good luck navigating the rest of the castle.",
            "And that Proxmark thing? Some people scan other people's badges and try those codes at locked doors.",
            "Other people scan one or two and just try to vary room numbers.",
            "Do whatever works best for you!",
            "*** As Santa ***",
            "Ohai Santa!",
            "I found someone to test the new HID lock in the Workshop.",
            "I can't wait to see what they find and tell us in their report!"
        ]
    },
    'bow_ninecandle': {
        'name': '',
        'dialog': [
            "You know what Santa just told me?",
            "He said he thought of yet another marketing pitch for the North Pole.",
            "He wants to call it, \"The Frostiest Place on Earth!\"",
            "What’s with that?",
            "*** As Santa ***",
            "Santa, it’s good to see you.",
            "Are you still trying to get the North Pole marketing department to use your new tagline, \"The North Pole: The Frostiest Place on Earth?\""
        ]
    },
    'chimney_scissorsticks': {
        'name': 'Chimney Scissorsticks',
        'dialog': [
            "Hello hello, I'm Chimney Scissorsticks!",
            "Feel free to use this greeting card generator to create some holiday messages which you can share online!",
            "It's based closely on the code used in the Tag Generator - in the wrapping room.",
            "I hear that one's having some issues, but this one seems A-OK.",
            "*** As Santa ***",
            "Hello hello, Santa!",
            "Guests have been having fun generating greeting cards with our machine!"
        ]
    },
    'release_the_snacken': {
        'name': 'Release the Snacken',
        'dialog': [
            "HI. I AM OUT OF ORDER",
            "We're outta glazed donuts.",
            "We're outta jelly donuts.",
            "We're outta Bavarian cream-filled donuts.",
            "We're outta cinnamon rolls.",
            "We're outta apple fritters.",
            "We're outta bear... wait a minute...",
            "WE'RE OUTTA BEAR CLAWS.",
            "All I've got are these Portal Candies. Enjoy!",
            "Can I interest you in a box of weasles, by chance?",

        ]
    },
    'moroel_nougat': {
        'name': 'Moroel Nougat',
        'dialog': [
            "I'm in the Speaker UNPreparedness room again!",
            "I just love meeting all the speakers as they come through here!",
            "Sure is dark in here, though. Bushy must still be working on the lights.",
            "I'm not scared YOU'RE scared...",
            "You fixed the lights! Thanks!!",
            "Again, I wasn't scared.",
            "Someone write that down.",
            "*** As Santa ***",
            "Yo Santa. I've been doing my job as the official greeter of speakers coming into the SpeakerUNPreparedness room.",
            "I'm amazed that we have THOUSANDS of speakers coming through here!"

        ]
    },
    'tangle_coalbox': {
        'name': 'Tangle Coalbox',
        'dialog': [
            "Howdy gumshoe. I'm Tangle Coalbox, resident sleuth in the North Pole.",
            "If you're up for a challenge, I'd ask you to look at this here Snowball Game.",
            "We tested an earlier version this summer, but that one had web socket vulnerabilities.",
            "This version seems simple enough on the Easy level, but the Impossible level is, well...",
            "I'd call it impossible, but I just saw someone beat it! I'm sure something's off here.",
            "Could it be that the name a player provides has some connection to how the forts are laid out?",
            "Knowing that, I can see how an elf might feed their Hard name into an Easy game to cheat a bit.",
            "But on Impossible, the best you get are rejected player names in the page comments. Can you use those somehow?",
            "Check out Tom Liston's talk for more info, if you need it.",
            "*** After Snowball Fight ***",
            "Crikey - that's it! You've done the Impossible! You've impressed this old elf today.",
            "Great work identifying and abusing the pseudo-random sequence.",
            "Now, the REAL question is, how else can this be abused? Do you think someone could try and cheat the Naughty/Nice Blockchain with this?",
            "If you have control over to bytes in a file, it's easy to create MD5 hash collisions.",
            "Problem is: there's that nonce that he would have to know ahead of time.",
            "A blockchain works by \"chaining\" blocks together - so there's no way that Jack could change it without it messing up the chain...",
            "Maybe if you look at the block that seems like it got changed, it might help.",
            "If Jack was able to change the block AND the document without changing the hash... that would require a very UNIque hash COLLision.",
            "Apparently Jack was able to change just 4 bytes in the block to completely change everything about it. It's like some sort of evil game to him.",
            "That's about all the help I can give you, kid, but Prof. Petabyte may have more.",
            "*** As Santa ***",
            "Howdy Boss. You look a tad flushed.",
            "Can I get you some water from the vending machine?",
            "I'm still looking into the Snowball Game like you asked.",
            "I read the write-up of the test completed earlier this summer with the web socket vulnerabilities.",
            "I was able to complete the Easy level, but the Impossible level is, umm...",
            "I'd call it impossible, but I just saw someone beat it!",
            "Is it possible that the name a player provides influences how the forts are laid out?",
            "Oh, oh, maybe if I feed a Hard name into an Easy game I can manipulate it!",
            "UGH! on Impossible, the best I get are rejected player names in the page comments... maybe that's useful?",
            "I'll have to re-watch Tom Liston's talk again.",
            "Thanks for all the tips and encouragement Santa!",
            "*** After Blockchain ***",
            "I ... I'm really impressed." +
            "Wow, you really did it!"

        ]
    },
    'minty_candycane': {
        'name': 'Minty Candycane',
        'dialog': [
            "Hey there, KringleCon attendee! I'm Minty Candycane!",
            "I'm working on fixing the Present Sort-O-Matic.",
            "The Sort-O-Matic uses JavaScript regular expressions to sort presents apart from misfit toys, but it's not working right.",
            "With some tools, regexes need / at the beginning and the ends, but they aren't used here.",
            "You can find a regular expression cheat sheet here if you need it.",
            "You can use this regex interpreter to test your regex against the required Sort-O-Matic patterns.",
            "Do you think you can help me fix it?",
            "*** After Sort-O-Matic ***",
            "Great job! You make this look easy!",
            "Hey, have you tried the Splunk challenge?",
            "Are you newer to SOC operations? Maybe check out his intro talk from last year.",
            "Dave Herrald is doing a great talk on tracking adversary emulation through Splunk!",
            "Don't forget about useful tools including Cyber Chef for decoding and decrypting data!",
            "It's down in the Great Room, but oh, they probably won't let an attendee operate it.",
            "*** As Santa ***",
            "Hey there Santa!",
            "I'm working on this regex Present Sorter and making great progress! It's still not quite right though.",
            "I found a regular expression cheat sheet that helps a lot!",
            "Oh and this regex test interface has been amazing for testing my adjustments.",
            "Santa, I thought we were limiting access to the room next door with the HID reader.",
            "I thought I should let you know.",
            "Some of the elves in the Great Room are analyzing some issues using Splunk.",
            "I watched the intro to SOC operations and threat hunting talk from last year to get ready.",
            "What a great idea to invite Dave Herrald to talk about tracking adversary emulation in Splunk!",
            "And thank you for the tip on Cyber Chef for decoding and decrypting data!"
        ]
    },
    'noel_boetie': {
        'name': 'Noel Boetie',
        'dialog': [
            "I'm Noel Boetie. Welcome to the Wrapping Room!",
            "We wrap presents and tag them for delivery here.",
            "Unfortunately, the tag generator is acting up.",
            "I'm hoping Santa can give me a hand nailing down that flaw.",
            "*** As Santa ***",
            "Welcome to the Wrapping Room, Santa!",
            "The tag generator is acting up.",
            "I feel like the issue has something to do with weird files being uploaded.",
            "Can you help me figure out what's wrong?"

        ]
    },
    'alabaster_snowball': {
        'name': 'Alabaster Snowball',
        'dialog': [
            "Welcome to the roof! Alabaster Snowball here.",
            "I'm watching some elves play NetWars!",
            "Feel free to try out our Scapy Present Packet Prepper!",
            "If you get stuck, you can help() to see how to get tasks and hints.",
            "*** As Santa ***",
            "Hey Santa! You've got to check out our Scapy Present Packet Prepper!",
            "Please work through the whole thing to make sure it's helpful for our guests!",
            "I made it so that players can help() to see how to get tasks and hints.",
            "When you're done, maybe you can help me with this other issue I'm having.",
            "*** After Scapy Prepper",
            "Oh, I see the Scapy Present Packet Prepper has already been completed!",
            "Now you can help me get access to this machine.",
            "It seems that some interloper here at the North Pole has taken control of the host.",
            "We need to regain access to some important documents associated with Kringle Castle.",
            "Maybe we should try a machine-in-the-middle attack?",
            "That could give us access to manipulate DNS responses.",
            "But we'll still need to cook up something to change the HTTP response.",
            "I'm sure glad you're here Santa."
        ]
    },
    'wunorse_openslae': {
        'name': 'Wunorse Openslae',
        'dialog': [
            "Hiya hiya - I'm Wunorse Openslae!",
            "I've been playing a bit with CAN bus. Are you a car hacker?",
            "I'd love it if you could take a look at this terminal for me.",
            "I'm trying to figure out what the unlock code is in this CAN bus log.",
            "When it was grabbing this traffic, I locked, unlocked, and locked the doors one more time.",
            "It ought to be a simple matter of just filtering out the noise until we get down to those three actions.",
            "Need more of a nudge? Check out Chris Elgee's talk on CAN traffic!",
            "*** After CAN-Bus Investigation ***",
            "Great work! You found the code!",
            "I wonder if I can use this knowledge to work out some kind of universal unlocker...",
            "... to be used only with permission, of course!",
            "Say, do you have any thoughts on what might fix Santa's sleigh?",
            "Turns out: Santa's sleigh uses a variation of CAN bus that we call CAN-D bus.",
            "And there's something naughty going on in that CAN-D bus.",
            "The brakes seem to shudder when I put some pressure on them, and the doors are acting oddly.",
            "I'm pretty sure we need to filter out naughty CAN-D-ID codes.",
            "There might even be some valid IDs with invalid data bytes.",
            "For security reasons, only Santa is allowed access to the sled and its CAN-D bus.",
            "I'll hit him up next time he's nearby.",
            "*** As Santa ***",
            "Hey Santa!",
            "Those tweaks you made to the sled just don’t seem right to me.",
            "I can’t figure out what’s wrong, but maybe you can check it out to fix it."
        ]
    },
    'tinsel_upatree': {
        'name': 'Tinsel Upatree',
        'dialog': [
            "Howdy Santa! Just guarding the Naughty/Nice list on your desk.",
            "Santa, I don't know if you've heard, but something is very, very wrong...",
            "We tabulated the latest score of the Naughty/Nice Blockchain.",
            "Jack Frost is the nicest being in the world! Jack Frost!?!",
            "As you know, we only really start checking the Naughty/Nice totals as we get closer to the holidays.",
            "Out of nowhere, Jack Frost has this crazy score... positive 4,294,935,958 nice points!",
            "No one has EVER gotten a score that high! No one knows how it happened.",
            "Most of us recall Jack having a NEGATIVE score only a few days ago...",
            "Worse still, his huge positive score seems to have happened way back in March.",
            "Our first thought was that he somehow changed the blockchain - but, as you know, that isn't possible.",
            "We ran a validation of the blockchain and it all checks out.",
            "Even the smallest change to any block should make it invalid.",
            "Blockchains are huge, so we cut a one minute chunk from when Jack's big score registered back in March.",
            "You can get a slice of the Naughty/Nice blockchain on your desk.",
            "You can get some tools to help you here.",
            "Tangle Coalbox, in the Speaker UNPreparedness room. has been talking with attendees about the issue.",
            "*** In Santa Office as Self ***",
            "GOSHGOLLY",
            "How did you get in here??",
            "I mean, hey, I'm impressed you made it in here, but you've got to leave!",
            "Breaking into Santa's office might mean immediate membership on the wrong side of the Naughty/Nice List.",
            "*** As Santa After Blockchain ***",
            "The mystery is solved! I can't wait to see which attendee solved it!"
        ]
    },
    'eve_snowshoes': {
        'name': 'Eve Snowshoes',
        'dialog': [
            "Hey, Santa!",
            "*** As Santa After Blockchain ***",
            "I’m so glad we got the Naughty-Nice Blockchain set right again!",
            "Gosh, it would be great to see the SANS Holiday Hack player who helped you fix it!",
            "Can you go find the person who did that and come back here?",
            "*** On Santa's Balcony ***",
            "What a fantabulous job! Congratulations!",
            "You MUST let us know how you did it!",
            "Feel free to show off your skills with some swag - only for our victors!"
        ]
    },
    '': {
        'name': '',
        'dialog': [


        ]
    }

}