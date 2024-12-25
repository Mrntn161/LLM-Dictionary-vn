(async () => {




await setUp(voice);

async function setUp (voice) {
    try {
        if (!document.getElementById("audio-tts")) {
            let x = document.createElement("audio")
            x.setAttribute("id","audio-tts")
            document.getElementsByTagName("body")[0].appendChild(x)
        } else {
            document.getElementById("audio-tts").pause()
            document.getElementById("audio-tts").remove()
            let x = document.createElement("audio")
            x.setAttribute("id","audio-tts")
            document.getElementsByTagName("body")[0].appendChild(x)

        }
        let e = -9999,
            t = {
                sleep: function (e) {
                    return new Promise((t) => setTimeout(t, e));
                },
            },
            n = document.getElementsByClassName("tts");
        async function o(e, t) {
            let n = { voice: t };
            return (
                await (async function (e, t = {}) {
                    let n = "en-US-AndrewMultilingualNeural",
                        o = "10%";
                    t && t.voice && (n = t.voice.split(" ")[0]);
                    t && t.rate && (o = t.rate);
                    let r = null,
                        a = null,
                        i = !1;
                    new Audio("");
                    function l({ voice: e = "zh-CN-XiaoxiaoNeural", timeout: n = 15, auto_reconnect: a = !0 } = {}) {
                        const l = "6A5AA1D4EAFF4E9FB37E23D68491D6F4",
                            s = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${l}`,
                            c = "Path:audio\r\n",
                            u = /\w{2}-\w{2}/;
                        let d = "audio-24khz-48kbitrate-mono-mp3",
                            p = "zh-CN",
                            m = e;
                        const h = { message: [], url_resolve: {}, url_reject: {} };
                        let g = !1;
                        function f(e) {
                            e && (d = e),
                                r.send(
                                    `Content-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n\n                            {\n                                "context": {\n                                    "synthesis": {\n                                        "audio": {\n                                            "metadataoptions": {\n                                                "sentenceBoundaryEnabled": "false",\n                                                "wordBoundaryEnabled": "false"\n                                            },\n                                            "outputFormat": "${d}" \n                                        }\n                                    }\n                                }\n                            }\n                        `
                                );
                        }
                        function w(e) {
                            f(), (g = !0);
                        }
                        async function y(e) {
                            const t = e.data instanceof Blob;
                            if ((h.message.push(e.data), !t)) {
                                const t = /X-RequestId:(.*?)\r\n/gm.exec(e.data)[1];
                                e.data.includes("Path:turn.end") &&
                                    (async function (e) {
                                        let t = 0;
                                        for (let n of h.message) {
                                            if (!(n instanceof Blob)) continue;
                                            const o = await n.text();
                                            if (/X-RequestId:(.*?)\r\n/gm.exec(o)[1] === e) {
                                                if (0 === o.charCodeAt(0) && 103 === o.charCodeAt(1) && 88 === o.charCodeAt(2)) {
                                                    const t = new Blob(h[e], { type: "audio/mp3" });
                                                    (output = t), (h[e] = null);
                                                    const n = URL.createObjectURL(t);
                                                    h.url_resolve[e](n);
                                                } else {
                                                    const r = o.indexOf(c) + c.length,
                                                        a = n.slice(r);
                                                    h[e].push(a), (h.message[t] = null);
                                                }
                                                ++t;
                                            }
                                        }
                                    })(t);
                            }
                        }
                        function v(e) {
                            g = !1;
                        }
                        function b(e) {
                            g = !1;
                        }
                        function E() {
                            try {
                                if (i) return;
                                (r = new WebSocket(s)),
                                    (r.onerror = function (e) {
                                        i = !0;
                                    }),
                                    r.addEventListener("open", w),
                                    r.addEventListener("message", y),
                                    r.addEventListener("error", v),
                                    r.addEventListener("close", b);
                            } catch (e) {
                                console.log(e);
                            }
                        }
                        E();
                        let x = function (e) {
                            let t = (function (e, t = "10%") {
                                return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${p}">\n                            <voice name="${m}">\n                                <prosody rate="${t}">\n                                    ${e}\n                                </prosody>\n                            </voice>\n                        </speak>`;
                            })(e, o);
                            const i = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (e) => (e ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (e / 4)))).toString(16)).replace(/\-/g, ""),
                                l = `X-RequestId:${i}\r\nContent-Type:application/ssml+xml\r\nPath:ssml\r\n\r\n` + t.trim();
                            return (
                                (h[i] = []),
                                new Promise((e, t) => {
                                    (h.url_resolve[i] = e),
                                        (h.url_reject[i] = t),
                                        g
                                            ? r.send(l)
                                            : a
                                            ? (E(),
                                            r.addEventListener("open", (e) => r.send(l)),
                                            setTimeout((e) => {
                                                g || t("reconnect timeout");
                                            }, 1e3 * n))
                                            : t("socket error or timeout");
                                })
                            );
                        };
                        async function S(e) {
                            const n = await x(e);
                            return (t.url = n), n;
                        }
                        return new Promise((e, t) => {
                            setTimeout((e) => t("socket open timeout"), 1e3 * n),
                                r.addEventListener("open", function (t) {
                                    e({
                                        play: S,
                                        toStream: x,
                                        setVoice: (e, t) => {
                                            if (((m = e), t)) p = t;
                                            else {
                                                const e = u.exec(m);
                                                if (!e) throw new Error("Could not infer voiceLocale from voiceName!");
                                                p = e[0];
                                            }
                                        },
                                        setFormat: f,
                                        isReady: (e) => g,
                                    });
                                });
                        });
                    }
                    await (async function (e, t = "en-US-AndrewMultilingualNeural") {
                        if (null == e || "" === e) return;
                        if (i) return;
                        a = e;
                        const n = await l({ voice: t });
                        try {
                            await n.play(e);
                        } catch (e) {
                            i = !0;
                        }
                    })(e, n);
                })(e, n),
                n.url
            );
        }
        t.textToSpeech = async (n, r = {}) => {
            if (0 == e) return void console.log("");
            if (!n) return
            let a = "en-US-AndrewMultilingualNeural",
                i = "10%";
            r && r.voice && (a = r.voice.split(" ")[0]), r && r.rate && r.rate;
            let l = [];
            function s(e) {
                const t = document.createElement("div");
                return (t.innerHTML = e), t.innerText;
            }
            if (
                !(
                    n
                        .trim()
                        .split(/\s+/)
                        .filter((e) => e.length > 0).length < 20
                )
            ) {
                let e = (function (e, t = 20) {
                    const n = e.match(/[^.!?]+[.!?]+/g) || [e],
                        o = [];
                    let r = [],
                        a = 0;
                    n.forEach((e) => {
                        const n = e.trim().split(/\s+/).length;
                        a + n > t && (o.push(r.join(" ").trim()), (r = []), (a = 0)), r.push(e.trim()), (a += n);
                    }),
                        r.length && o.push(r.join(" ").trim());
                    return o;
                })(n);
                e = e.map((e) => (e = (e = (e = (e = s(e)).replace(/([\p{Emoji_Presentation}|\p{Extended_Pictographic}]|\u200d|\uFE0F)/gu, "")).replace(/\"/g, '\n"')).replace(/\(/g, "\n(").replace(/\)/g, ")\n")));
                let r = document.getElementById("audio-tts");
                r || ((r = document.createElement("audio")), r.setAttribute("id", "audio-tts"));

                let i = 0;
                r.addEventListener("loadedmetadata", function () {
                    i = 1e3 * r.duration;
                });
                for (let n of e) {
                    let e = 0;
                    const s = performance.now();
                    let c = await o(n, a);
                    e = performance.now() - s;
                    let u = i + 100 - 500 - e > 0 ? i + 100 - 500 - e : 0;
                    await t.sleep(u), (r.src = c), l.push(c), r.play(), await t.sleep(500);
                }
                return l;
            }
            {
                const e = /([\p{Emoji_Presentation}|\p{Extended_Pictographic}]|\u200d|\uFE0F)/gu;
                (n = (n = s(n)).replace(e, "")), console.log(n), (n = (n = n.replace(/\"/g, '\n"')).replace(/\(/g, "\n(").replace(/\)/g, ")\n")), (l = [await o(n, a)]);
                let t = document.getElementById("audio-tts");
                t || ((t = document.createElement("audio")), t.setAttribute("id", "audio-tts")), (t.src = l[0]), t.play();
            }
            return console.log(e), e > 0 && (
                console.log(""), console.log("Đã kích hoạt thành công")), l;
        };
        let r = document.createElement("style");
        (r.innerHTML =
            "\n    .play-button {\n        width: 30px !important; /* Smaller width */\n        height: 30px !important; /* Smaller height */\n        background-color: #007BFF !important; /* Blue color */\n        border: none !important;\n        border-radius: 5px !important; /* Slightly rounded corners */\n        cursor: pointer !important;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;\n        transition: background-color 0.3s !important, transform 0.3s !important;\n        display: inline-block !important; /* Change to inline-block */\n        position: relative; /* For centering the icon */\n    }\n    .play-button:hover {\n        background-color: #0056b3 !important; /* Darker blue on hover */\n        transform: scale(1.1) !important;\n    }\n    .play-icon {\n        width: 16px !important; /* Adjust icon size */\n        height: 16px !important; /* Adjust icon size */\n        fill: white !important; /* White color for the icon */\n        position: absolute; /* Center the icon */\n        top: 50% !important;\n        left: 50% !important;\n        transform: translate(-50%, -50%) !important; /* Centering */\n    }\n"),
            document.head.appendChild(r);
        for (let e of n) {
            let n = document.createElement("span"),
                o = e.innerText;
            n.classList.add("play-button"),
                (n.innerHTML =
                    '\n        <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\n            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>\n        </svg>\n    '),
                (e.innerHTML = ""),
                e.appendChild(n),
                n.addEventListener("click", async () => {
                    if (JSON.parse(n.getAttribute("urls"))) {
                        let e = JSON.parse(n.getAttribute("urls")),
                            o = document.getElementById("audio-tts");
                        o || ((o = document.createElement("audio")), o.setAttribute("id", "audio-tts"));
                        let r = 0;
                        o.addEventListener("loadedmetadata", function () {
                            r = 1e3 * o.duration;
                        });
                        for (let n of e) {
                            let e = r - 500 > 0 ? r - 500 : 0;
                            await t.sleep(e), (o.src = n), o.play(), await t.sleep(500);
                        }
                    } else {
                        let r = [];
                        (r = e.getAttribute("voice") ? await t.textToSpeech(o, { voice: e.getAttribute("voice") }) : await t.textToSpeech(o, { voice: voice })), (r = r.filter((e) => e)), n.setAttribute("urls", JSON.stringify(r));
                    }
                });
        }
        (t.validate = async function (e) {

        }),
            (e && 0 != e) || (await t.validate(key));
        let a = document.getElementsByClassName("autoplay");
        for (let e of a) {
            e.children[0].click();
            for (let n = 0; n <= 1e3; n++) {
                let n = e.children[0].getAttribute("urls");
                if ((await t.sleep(1e3), n)) break;
            }
        }

    } catch (e) {
        console.error("lighter-tts")
        console.error(e)
    }

}
})();


