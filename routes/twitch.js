const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();

// From https://github.com/MrEliasen/twitch-bot-list/blob/master/list.json
// We ignore these from the chatters list
let KNOWN_BOTS = [
    'commanderroot',
    'virgoproz',
    'mikuia',
    'bloodlustr',
    'soundalerts',
    'communityshowcase',
    'freast',
    'twitchprimereminder',
    'anotherttvviewer',
    'lurxx',
    'imdamermaidqueen',
    'aten',
    'feet',
    'liquigels',
    'industrialparasite',
    'srizbi',
    'thegreatryuk_',
    'pingutio',
    'thewritinger',
    'lipton_tyan',
    'ii7331',
    'i_ananasik_i',
    'ra1denz',
    'ljlcard',
    'fvmh97c',
    'peculiarasmr',
    'randomtwitchstats',
    'itsvodoo',
    'luciferka_124',
    'anthropologydept',
    'stewlew89',
    'public_enemy821',
    'srmx30519',
    'rladmsdb88',
    'maddyson_moy_bog',
    'hentyechan',
    're1yk',
    'darkumaru729',
    'gingerne',
    'jiffyonyx',
    'nelsondock',
    'teresedirty',
    'flaskcopy',
    'rafflevantri',
    'romainstant1',
    'isaacdeplar',
    'v_and_k',
    'rainmaker',
    'thesoggy_',
    'nationalizations',
    'tawmtawmz',
    'own3d',
    'newolk69',
    'detitrex',
    '0_nekopara_0',
    'akseleron03',
    'zuclo32',
    'toymoi',
    'electricallongboard',
    'pocha_bot',
    'jochenrindt',
    'ghrly',
    'josefsknigge',
    'einfachuwe42',
    'sad_grl',
    'kostyathebest1',
    'simatashka',
    'sopalidiseend',
    'phyton_tyan',
    'l_nephilim_l',
    'fuoletovui_banan',
    'bingcortana',
    'abbottcostello',
    'casinothanks',
    'extramoar',
    'ftopayr',
    'droopdoggg',
    'havethis2',
    'gowithhim',
    'icewizerds',
    'jointeffortt',
    'liphitc',
    'cubeit',
    'pandeon_22',
    'zladk0',
    'captainskrew',
    'minion619',
    'cristianepre',
    'ribotsize',
    'sawyerlead',
    'adwin666',
    'relishdrove',
    'isnicable',
    'ssakdook',
    'ladaellada',
    'utensilzinc',
    'cartierlogic',
    'yosefsa7',
    'yosef_the_spammer',
    'qinopo',
    's4ndik',
    'violets_tv',
    'defb',
    'ehrabz',
    'bibiethumps',
    'lfgfusion',
    'carbot14xyz',
    'znicuuu',
    'makimfh',
    'moistkek',
    'carbob14xyz',
    'carbon14xyz',
    'attentionseekr',
    '1174',
    'immallytwitch',
    'seelosc',
    'omegajeppe',
    'sonorkch33',
    'nighest',
    'doubleslappy',
    'repined',
    '8gerard',
    'letups',
    'upturns',
    'connoted',
    'gummiest',
    'toddled',
    'buglers',
    'mulchs',
    'fleecier',
    'bugled',
    'flitted',
    'eyelashs',
    'taxying',
    'diapered',
    'iamfannco',
    'de127',
    'glamors',
    'biassing',
    'recoups',
    'pietys',
    'idiocys',
    'democracyatwork',
    'dj_vermeer',
    'saunaed',
    'rummest',
    'divests',
    'wringers',
    'nobilitys',
    'looneyies',
    'phorsunboys',
    'joelgreenwood35',
    'keynoting',
    'huskiness',
    'nimmy0',
    '00tylerpyt',
    'hackneying',
    'moku_',
    'ndaniei',
    'discord_for_streamers',
    'antoni_jastrzab',
    'kackestapler',
    'stygian_styx',
    'shadowy_stix',
    'ryuuiro',
    'badoge',
    'twitch_growth_discord',
    'streamers_area',
    'community4smallstreamers',
    'business_daddy',
    'vaticancitymagoo',
    'iiiliiliilliiiiliiiilllii',
    'rawiro16057',
    'pbii',
    'rogueg1rl',
    'dorpz',
    'd4rk_5ky',
    'frw33d',
    '2020',
    'tsunpop',
    'streamersdiscordcommunity',
    'brokemystreamdeck',
    'icantcontrolit',
    'comettunes',
    'calthapalustris',
    'asstrolabia',
    'jdlb',
    'discord4smallstreamers',
    'servres',
    'dailydayna',
    'fixloven',
    'pawlina93',
    'twitchgrowthdiscord',
    'zyr3_',
    'ramsayow',
    'nerdydreams',
    'hades_osiris',
    'warsofthetrekgatestar',
    'stygian_network',
    'underworldnaiad',
    'delteerdatap3',
    'delteerdatap4',
];

/*
        /chatters/all/:channel
        Returns all the chatters in a specified channel
*/
router.route('/chatters/all/:channel').get((req, res) => {
    if (!req.params.channel) return res.json(`Missing milliseconds`).sendStatus(400);

    axios
        .get(`https://tmi.twitch.tv/group/user/${req.params.channel}/chatters`)
        .then((resp) => {
            if (resp.data.chatter_count == 0) {
                return res.json('No chatters');
            } else {
                let allChatters = [];
                for (let chatter of resp.data.chatters.vips) {
                    if (!KNOWN_BOTS.includes(chatter)) allChatters.push(chatter);
                }

                for (let chatter of resp.data.chatters.moderators) {
                    if (!KNOWN_BOTS.includes(chatter)) allChatters.push(chatter);
                }

                for (let chatter of resp.data.chatters.viewers) {
                    if (!KNOWN_BOTS.includes(chatter)) allChatters.push(chatter);
                }

                return res.json(allChatters);
            }
        })
        .catch((err) => {
            if (err.status == 404) {
                return res.json('Channel not found').sendStatus(404);
            } else {
                return res.json('Unknown error').sendStatus(404);
            }
        });
});

/*
        /chatters/random/:channel
        Returns a random chatter in a specified channel
*/
router.route('/chatters/random/:channel').get((req, res) => {
    if (!req.params.channel) return res.json(`Missing milliseconds`).sendStatus(400);

    axios
        .get(`https://tmi.twitch.tv/group/user/${req.params.channel}/chatters`)
        .then((resp) => {
            if (resp.data.chatter_count == 0) {
                return res.json('No chatters');
            } else {
                let allChatters = [];
                for (let chatter of resp.data.chatters.vips) {
                    if (!KNOWN_BOTS.includes(chatter)) allChatters.push(chatter);
                }

                for (let chatter of resp.data.chatters.viewers) {
                    if (!KNOWN_BOTS.includes(chatter)) allChatters.push(chatter);
                }

                return res.json(allChatters[Math.floor(Math.random() * allChatters.length)]);
            }
        })
        .catch((err) => {
            if (err.status == 404) {
                return res.json('Channel not found').sendStatus(404);
            } else {
                return res.json('Unknown error').sendStatus(404);
            }
        });
});

module.exports = router;
