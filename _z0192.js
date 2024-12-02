(async () => {
await setUp(document.getElementsByTagName("body")[0], voice)

async function setUp (element, voice) {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function textToSpeech (text,config = {}) {
        try {
            text = removeHtmlTags(text);
            let voice = "en-US-AndrewMultilingualNeural"
            let rate = "10%"
            if (config && config.voice) voice = config.voice.split(" ")[0]
            if (config && config.rate) rate = config.rate
            let wordNumb = text.trim().split(/\s+/).filter(word => word.length > 0).length
            let urls = []
            function removeHtmlTags(htmlString) {
                // Create a temporary element
                const tempElement = document.createElement('div');
                
                // Set the HTML content
                tempElement.innerHTML = htmlString;
                if (tempElement.getElementsByClassName("silence").length !== 0) {
                    let s = tempElement.getElementsByClassName("silence")
                    for (let e of s) {
                        e.innerHTML = ""
                    }
                    
                }
                
                // Get the text content without HTML tags
                return tempElement.innerText
            }
            let audioElement = document.getElementById("audio-tts")
            if (!audioElement) {
                audioElement = document.createElement('audio');
                audioElement.setAttribute("id", "audio-tts")
            }
            document.getElementsByTagName("body")[0].appendChild(audioElement)
            if (wordNumb < 20) {
                
                const emojiRegex = /([\p{Emoji_Presentation}|\p{Extended_Pictographic}]|\u200d|\uFE0F)/gu;
                text = text.replace(emojiRegex, '');
                text = text.replace(/\"/g, "\n\"")
                text = text.replace(/\(/g, "\n\(").replace(/\)/g,"\)\n")
                urls = [(await getURL(text, voice))]
                let audioElement = document.getElementById("audio-tts")
                if (!audioElement) {
                    audioElement = document.createElement('audio');
                    audioElement.setAttribute("id", "audio-tts")
                }
                document.getElementsByTagName("body")[0].appendChild(audioElement)
                audioElement.src = urls[0]
                audioElement.play()
                
            } else {
                let chunks = splitTextIntoChunks(text)
                chunks = chunks.map(chunk => {
                    const emojiRegex = /([\p{Emoji_Presentation}|\p{Extended_Pictographic}]|\u200d|\uFE0F)/gu;
                    chunk = chunk.replace(emojiRegex, '');
                    chunk = chunk.replace(/\"/g, "\n\"")
                    chunk = chunk.replace(/\(/g, "\n\(").replace(/\)/g,"\)\n")
                    return chunk
                })

                let audioElement = document.getElementById("audio-tts")
                if (!audioElement) {
                    audioElement = document.createElement('audio');
                    audioElement.setAttribute("id", "audio-tts")
                }
                let length = 0
                audioElement.addEventListener('loadedmetadata', function() {
                    length = audioElement.duration * 1000;
                });
                for (let chunk of chunks) {
                    let timeGetURL = 0;
                    const startTime = performance.now();
                    let url = await getURL(chunk, voice);
                    const endTime = performance.now();
                    timeGetURL = endTime - startTime;
                    let waitTime = length + 100 - 500 - timeGetURL > 0 ? length + 100 - 500 - timeGetURL : 0
                    await sleep(waitTime)
                    audioElement.src = url
                    urls.push(url)
                    audioElement.play()
                    await sleep(500)
                }
                return urls
                function splitTextIntoChunks(text, chunkSize = 20) {
                    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]; // Split text into sentences
                    const chunks = [];
                    let currentChunk = [];
                    let wordCount = 0;

                    sentences.forEach(sentence => {
                        const wordsInSentence = sentence.trim().split(/\s+/);
                        const sentenceWordCount = wordsInSentence.length;

                        // If adding the current sentence exceeds the chunkSize, push the current chunk
                        if (wordCount + sentenceWordCount > chunkSize) {
                        chunks.push(currentChunk.join(' ').trim());
                        currentChunk = [];  // Start a new chunk
                        wordCount = 0;      // Reset word count for the new chunk
                        }

                        // Add the sentence to the current chunk
                        currentChunk.push(sentence.trim());
                        wordCount += sentenceWordCount;
                    });

                    // Push the last chunk if there's any leftover
                    if (currentChunk.length) {
                        chunks.push(currentChunk.join(' ').trim());
                    }

                    return chunks;
                }
            }
            return urls
        } catch (e) {
            console
        }

    }

    async function getURL(text, voice) {
        try {
        let c = { "voice": voice }
        await h(text, c)
        return c.url
        async function h(text, config = {}) {
            let voice = "en-US-AndrewMultilingualNeural"
            let rate = "10%"
            if (config && config.voice) voice = config.voice.split(" ")[0]
            if (config && config.rate) rate = config.rate
            let socket = null;
            let ttsText = null;
            let ttsWindow = null;
            let ttsError = false;
            let ttsAudio = new Audio("");
            function create_edge_TTS({ voice = "zh-CN-XiaoxiaoNeural", timeout = 15, auto_reconnect = true } = {}) {
                const TRUSTED_CLIENT_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
                const VOICES_URL = `https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list?trustedclienttoken=${TRUSTED_CLIENT_TOKEN}`;
                const SYNTH_URL = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}`;
                const BINARY_DELIM = "Path:audio\r\n";
                const VOICE_LANG_REGEX = /\w{2}-\w{2}/;

                let _outputFormat = "audio-24khz-48kbitrate-mono-mp3";
                let _voiceLocale = 'zh-CN';
                let _voice = voice;
                const _queue = { message: [], url_resolve: {}, url_reject: {} };
                let ready = false;


                function _SSMLTemplate(input, rate = "10%") {
                    return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${_voiceLocale}">
                            <voice name="${_voice}">
                                <prosody rate="${rate}">
                                    ${input}
                                </prosody>
                            </voice>
                        </speak>`;
                }
                function uuidv4() {
                    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                    );
                }

                create_new_ws();

                function setFormat(format) {
                    if (format) {
                        _outputFormat = format;
                    }
                    socket.send(`Content-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n
                            {
                                "context": {
                                    "synthesis": {
                                        "audio": {
                                            "metadataoptions": {
                                                "sentenceBoundaryEnabled": "false",
                                                "wordBoundaryEnabled": "false"
                                            },
                                            "outputFormat": "${_outputFormat}" 
                                        }
                                    }
                                }
                            }
                        `);
                }

                async function createURL(requestId) {
                    let index_message = 0;
                    for (let message of _queue.message) {
                        const isbinary = message instanceof Blob;

                        if (!isbinary) {
                            continue;
                        }

                        const data = await message.text();
                        const Id = /X-RequestId:(.*?)\r\n/gm.exec(data)[1];

                        if (Id !== requestId) {
                            continue;
                        }

                        if (data.charCodeAt(0) === 0x00 && data.charCodeAt(1) === 0x67 && data.charCodeAt(2) === 0x58) {
                            // Last (empty) audio fragment
                            const blob = new Blob(_queue[requestId], { 'type': 'audio/mp3' });
                            output = blob
                            _queue[requestId] = null;
                            const url = URL.createObjectURL(blob);
                            _queue.url_resolve[requestId](url);
                        } else {
                            const index = data.indexOf(BINARY_DELIM) + BINARY_DELIM.length;
                            const audioData = message.slice(index);
                            _queue[requestId].push(audioData);
                            _queue.message[index_message] = null;
                        }
                        ++index_message;
                    }
                }

                function onopen(event) {
                    setFormat();
                    ready = true;
                }

                async function onmessage(event) {
                    const isbinary = event.data instanceof Blob;
                    _queue.message.push(event.data)
                    if (!isbinary) {
                        const requestId = /X-RequestId:(.*?)\r\n/gm.exec(event.data)[1];
                        if (event.data.includes("Path:turn.end")) {
                            createURL(requestId);
                        }
                    }
                }

                function onerror(event) {
                    ready = false;
                }

                function onclose(event) {
                    ready = false;
                }

                function addSocketListeners() {
                    socket.addEventListener('open', onopen);
                    socket.addEventListener('message', onmessage);
                    socket.addEventListener('error', onerror);
                    socket.addEventListener('close', onclose);
                }

                function create_new_ws() {
                    try {
                        if (ttsError) {
                            return;
                        }

                        socket = new WebSocket(SYNTH_URL);

                        socket.onerror = function (event) {
                            ttsError = true;
                        }

                        addSocketListeners();
                    } catch (e) {
                        console.error(e);
                    }
                }

                let toStream = function (input) {
                    let requestSSML = _SSMLTemplate(input, rate);
                    // const requestId = uuidv4().replaceAll('-', '');
                    const requestId  = uuidv4().replace(/\-/g,"")
                    const request = `X-RequestId:${requestId}\r\nContent-Type:application/ssml+xml\r\nPath:ssml\r\n\r\n` + requestSSML.trim();

                    _queue[requestId] = [];

                    return new Promise((resolve, reject) => {
                        _queue.url_resolve[requestId] = resolve, _queue.url_reject[requestId] = reject;

                        if (!ready) {
                            if (auto_reconnect) {
                                create_new_ws();
                                socket.addEventListener('open', _ => socket.send(request));

                                setTimeout(_ => { if (!ready) reject('reconnect timeout') }, timeout * 1000);
                            }
                            else reject('socket error or timeout');
                        } else {
                            socket.send(request)
                        }
                    });
                }

                async function play(input) {
                    const url = await toStream(input);
                    config.url = url
                    return url
                }

                return new Promise((resolve, reject) => {
                    setTimeout(_ => reject('socket open timeout'), timeout * 1000);
                    // Connection opened
                    socket.addEventListener('open', function (event) {
                        resolve({
                            play,
                            toStream,
                            setVoice: (voice, locale) => {
                                _voice = voice;
                                if (!locale) {
                                    const voiceLangMatch = VOICE_LANG_REGEX.exec(_voice);
                                    if (!voiceLangMatch) {
                                        throw new Error("Could not infer voiceLocale from voiceName!");
                                    }
                                    _voiceLocale = voiceLangMatch[0];
                                } else {
                                    _voiceLocale = locale;
                                }
                            },
                            setFormat,
                            isReady: _ => ready
                        })
                    });
                });
            }
            await edgeTtsPlay(text, voice)

            async function edgeTtsPlay(text, voice = "en-US-AndrewMultilingualNeural") {
                if (text === undefined || text === null || text === '') {
                    return;
                }

                if (ttsError) {
                    return;
                }
                ttsText = text;
                const tts = await create_edge_TTS({ voice });
                try {
                    let x = await tts.play(text);

                } catch (e) {
                    ttsError = true;

                }
            }
            
        }
        } catch (e) {
            console.error(e)
        }

        // const result = await handleTTS.predict("/predict", { 		
        //     text: text, 		
        //     voice: voice, 		
        //     rate: rate, 		
        //     pitch: 0, 
        // });
        // return result.data[0].url;
    }


    await setUpLighterTTS()
    async function setUpLighterTTS () {
        try {
            let r = document.createElement("style");
            r.innerHTML =
                "\n    .play-button {\n        width: 30px !important; /* Smaller width */\n        height: 30px !important; /* Smaller height */\n        background-color: #007BFF !important; /* Blue color */\n        border: none !important;\n        border-radius: 5px !important; /* Slightly rounded corners */\n        cursor: pointer !important;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;\n        transition: background-color 0.3s !important, transform 0.3s !important;\n        display: inline-block !important; /* Change to inline-block */\n        position: relative; /* For centering the icon */\n    }\n    .play-button:hover {\n        background-color: #0056b3 !important; /* Darker blue on hover */\n        transform: scale(1.1) !important;\n    }\n    .play-icon {\n        width: 16px !important; /* Adjust icon size */\n        height: 16px !important; /* Adjust icon size */\n        fill: white !important; /* White color for the icon */\n        position: absolute; /* Center the icon */\n        top: 50% !important;\n        left: 50% !important;\n        transform: translate(-50%, -50%) !important; /* Centering */\n    }\n"
            document.head.appendChild(r);

            let autoplayIcons = element.getElementsByClassName("tts")

            for (let e of autoplayIcons) {
                let data = e.innerHTML
                e.innerHTML = ""
                e.setAttribute("data", data)
                let icon = document.createElement("span")
                icon.classList.add("play-button")
                icon.innerHTML =
                        '\n        <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\n            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>\n        </svg>\n    '
                e.appendChild(icon)
                icon.addEventListener("click", async () => {
                    await play(e)
                });
            }
        } catch (e) {
            console.error("setUpLighterTTS")
            console.error(e)
        }
    }
    async function play (e) {
        let r = voice
        let data = e.getAttribute("data")
        if (e.getAttribute("voice")) r = e.getAttribute("voice")
        await textToSpeech(data, {"voice": r})
    }

    let autoplayIcons = element.getElementsByClassName("tts")
    for (let e of autoplayIcons) {
        if (e.classList.contains("autoplay")) {
            setTimeout(async () => {
                await play(e)
            }, 100);
            
        }
        
    }
    document.addEventListener("keydown", debounce((e) => {
        if (document.getElementsByClassName("modal").length != 0) return
        if (document.getElementById("modal-container")) return
        if (document.activeElement.tagName.toLowerCase() == "input") return
        if (document.activeElement.tagName.toLowerCase() == "textarea") return
        if (document.activeElement.getAttribute("contenteditable") == "true") return
        if (!document.getElementsByClassName("app-container")[0].contains(element)) return
        let es = element.getElementsByClassName("tts")
        for (el of es) {
            let shortcut = el.getAttribute("shortcut")
            if (shortcut == e.key) {
                el.getElementsByClassName("play-button")[0].click()
                return
            }
        }
    },100))
    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
}

})();
