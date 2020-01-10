(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var provider = {
        id: 'instagram',
        title: 'Instagram',
        scope: 'basic',
        authUrl: 'https://api.instagram.com/oauth/authorize/',
        accessUrl: 'https://api.instagram.com/oauth/access_token',
        me: {
            templates: [
                '{protocol:5}://{www:3.*}instagram.com{/userId,path*}{?q}'
            ],
            target: 'https://www.instagram.com/{+userId}',
            set: {
                html: function (raw) {
                    var dParts = raw.split('window._sharedData =');
                    var dJSON = (dParts.length > 1) ? dParts[1].split(';</script>')[0] : '{}';
                    var ME = '';
                    try {
                        ME = '<a rel="me" href="' + JSON.parse(dJSON).entry_data.ProfilePage[0].user.external_url + '"></a>';
                    }
                    catch (e) { }
                    return ['<html><body>', ME, '</body></html>'].join('');
                }
            }
        },
        verify: {
            meta: { userId: '/user/username', userMe: '/user/website' }
        },
        // i18n :
        description: 'Capture and Share the World\'s Moments.',
        setup: {
            instructions: 'Please note: Your app must be reviewed by Instagram before going in production.\n' +
                'The redirect_uri must exactly match a URI  specified on the developer page.\n' +
                'Open the developer page and create your credentials...',
            key: 'CLIENT ID',
            secret: 'CLIENT SECRET',
            url: 'https://www.instagram.com/developer/clients/manage/'
        },
        svg: '<circle fill="#3E373C" cx="224" cy="224" r="224"/>' +
            '<circle fill="#306994" cx="224" cy="224" r="204"/>' +
            '<path fill="#FFFFFF" d="M253.349,315.95c0.068,7.79,1.12,24.923-3.152,31.272c-1.563,2.333-5.295,4.575-7.566,1.338' +
            'C237.318,340.975,246.65,319.305,253.349,315.95L253.349,315.95z M247.041,268.504c4.181-1.432,6.042,2.521,6.57,6.182' +
            'c0.704,4.824-1.339,6.912-1.541,11.42c-0.795,17.539-11.296,27.169-13.285,13.347C237.555,290.918,238.498,271.427,247.041,268.504' +
            'L247.041,268.504z M207.259,269.311c6.143-1.459,7.194,6.859,6.89,9.314c-0.39,3.172-1.308-1.36-2.136,7.849' +
            'c-0.423,4.703-1.098,12.517-3.312,16.672c-1.735,3.243-7.824,8.612-9.558-2.773C197.865,291.988,198.626,271.363,207.259,269.311' +
            'L207.259,269.311z M179.619,243.272c-1.992-1.606-5.981-2.56-9.203-2.51c-1.028,4.717-0.721,10.205-1.04,15.306' +
            'c-0.245,3.932-1.238,2.787-5.14,2.841c-2.592,0.038-5.257-0.07-6.919,1.301c-0.199,4.604,8.307,4.059,11.39,5.338' +
            'c0.238,12.496-2.672,27.063,1.566,38.483c1.595,4.293,6.078,10.249,12.436,7.5c4.897-2.121,6.616-8.446,8.386-12.104' +
            'c3.303,11.125,3.322,10.925,12.188,12.661c6.548,1.281,9.853-7.357,11.756-12.661c0.965,2.336,0.695,3.397,2.282,5.628' +
            'c0.962,1.356,2.396,2.918,4.69,3.485c5.358,1.326,7.762-2.745,9.926-5.178l0.425-0.417c1.795,7.948,6.308,8.007,10.965,9.042' +
            'c6.622,1.476,7.858-5.87,10.408-9.046c-0.721,13.551,0.45,6.978-4.792,12.699c-1.355,1.479-2.719,2.539-3.973,4.158' +
            'c-6.265,8.095-15.148,28.521-3.691,33.803c2.979,1.366,11.102,2.637,14.379,1.283c3.389-1.396,4.979-5.734,5.792-10.089' +
            'c1.88-10.077,0.166-21.142,0.922-31.305c2.469-0.533,4.053,0.884,5.54-1.571c-0.254-2.758-3.011-2.758-5.584-2.914' +
            'c-0.124-4.801-0.153-9.674,0.004-14.477c0.35-10.591,1.827-9.08,2.052-11.839c-0.934-0.848-0.774-0.572-2.18-1.036' +
            'c-1.655-0.542-1.188-0.137-1.841-1.29c-1.263-2.944,2.089-8.576-1.221-13.043c-2.781-3.751-6.35-2.969-10.808-5.092' +
            'c-9.499-4.525-13.668,5.334-15.406,13.329c-2.865,13.156,0.248,21.664-4.49,26.955c-4.282,4.779-5.949-3.451-6.125-7.222' +
            'c-0.625-13.377,4.473-13.243-1.764-15.644c-0.96-6.37,1.018-10.956-3.423-15.061c-1.322-1.22-4.432-1.745-6.442-2.795' +
            'c-2.254-1.173-4.916-1.866-7.937-1.26c-9.532,1.905-10.812,17.754-11.678,25.034c-0.394,3.315-0.664-0.852-2.383,6.797' +
            'c-2.825,12.557-8.821,16.81-10.677,7.983c-0.929-4.419-0.732-31.446,0.503-35.141c0.872-1.132,10.31-1.687,12.362-1.648' +
            'c2.217,0.04,2.681,0.775,3.286,0.16c3.78-5.054-13.109-4.167-15.653-5.02L179.619,243.272z M312.747,269.361' +
            'c5.551-1.567,7.166,5.392,6.994,8.937c-0.113,2.293-0.057,0.94-1.063,2.417c-2.204,3.211-0.128,21.739-7.547,25.744' +
            'c-7.858,4.236-7.136-13.453-6.716-18.586C304.898,281.938,306.294,271.187,312.747,269.361L312.747,269.361z M267.093,265.576' +
            'c-0.181,5.566,0.633,11.34,0.449,17.131c-0.086,2.85-0.166,5.712-0.557,8.483c-0.295,2.069-1.375,5.452-0.902,7.279' +
            'c4.03,1.41,4.748-5.946,5.297-9.211c0.617-3.666,1.003-9.845,1.915-12.858c0.654-0.15,1.399-0.366,2.256-0.311' +
            'c4.093,0.272,0.983,6.805,1.431,15.866c0.345,7.038,2.99,22.587,13.018,18.866c3.854-1.434,5.263-5.364,7.038-9.231' +
            'c1.355,2.458,2.147,8.931,7.854,9.792c6.03,0.906,9.371,2.519,14.019-7.52c0.361-0.782,0.485-1.283,0.813-2.117' +
            'c0.17-0.431,0.294-0.74,0.518-1.086c0.428-0.681,0.171-0.335,0.656-0.801c0.699,4.39,3.539,8.705,8.284,8.917' +
            'c4.929,0.226,7.535-4.421,9.474-7.469c0.452,2.804-0.071,7.389,2.193,8.57c2.08,1.078,6.884,1.629,9.046,0.559' +
            'c1.08-1.387,0.752-5.155,0.961-7.113c0.248-2.348,0.563-4.608,0.969-6.896c0.386-2.189,1.428-10.689,3.669-11.939' +
            'c1.076,8.015-1.789,20.802,3.53,23.133c1.194,0.521,2.487,0.659,3.834,0.632c4.562-0.084,3.081-1.735,4.734-8.249' +
            'c1.13-4.446,4.202-15.303,6.729-18.062c0.104,6.5-1.155,11.117,0.183,18c2.313,11.89,12.753,15.511,19.121,3.932' +
            'c1.13-2.061,5.237-12.001,3.155-14.374c-3.345-3.461-3.088,7.993-6.374,12.628c-1.353,1.904-4.56,4.021-6.175,0.992' +
            'c-1.05-1.968-1.348-5.633-1.422-8.204c-0.575-19.986,6.304-18.783-0.51-23.152c-2.689-1.728-4.301-2.059-7.982-1.535' +
            'c-1.739,0.969-8.631,22.889-9.815,24.893c-0.359,0.607-0.203,0.351-0.544,0.712c-0.116-4.961-0.04-10.006-0.036-14.968' +
            'c0.002-2.556,0.615-4.839-1.271-6.091c-1.523-1.018-3.956-1.356-6.068-0.942c-3.09,0.596-4.543,5.702-5.575,8.872' +
            'c-0.661,2.016-2.977,9.445-3.166,10.925l-0.01-25.71c-1.174-1.802-6.273-2.432-8.492-1.687c-0.462,1.183-0.493,15.405-0.562,17.96' +
            'c-0.099,3.871,0.306,5.995-0.78,8.427c-0.842,1.873-1.243,4.673-2.104,6.798c-2.555,6.304-6.83,6.091-7.792-1.559' +
            'c-0.336-2.64-0.384-5.949-0.157-8.673c0.202-2.467,1.536-5.795,1.229-7.579c-1.235-1.423-1.439-0.986-3.069-2.096' +
            'c-0.739-3.851,0.295-8.195-1.167-11.778c-1.8-4.409-3.544-3.535-7.624-5.325c-3.306-1.447-6.105-3.215-10.56-1.381' +
            'c-3.246,1.334-4.659,3.571-6.22,6.726c-1.442,2.913-2.396,6.452-2.994,9.96c-0.528,3.114-0.661,9.112-1.417,11.508' +
            'c-1.532,4.896-3.012,17.883-8.726,17.2c-3.282-3.073-2.803-11.361-2.363-16.324c0.26-2.926,0.66-5.677,1.282-8.437' +
            'c0.548-2.382,2.034-5.495,1.91-7.818c-2.936-4.288-9.738-1.72-13.686-3.751c-0.215-2.454,0.222-4.074-0.354-6.414' +
            'C271.305,262.559,269.136,263.911,267.093,265.576z M139.934,299.717c1.318-3.764,2.042-5.56,2.197-10.222' +
            'c2.466,2.826,11.944,8.513,13.054,11.923c1.479,4.546-4.626,4.595-7.515,3.025c-1.347-0.727-2.572-1.763-3.641-2.64' +
            'C142.015,300.152,141.81,300.71,139.934,299.717L139.934,299.717z M115.504,307.864c1.431-4.001,2.989-19.611,6.989-22.918' +
            'c0.506,8.449-2.775,22.284,8.089,21.85c3.582-0.143,5.234-2.008,7.021-3.35c1.777,2.357,2.301,3.134,5.694,4.262' +
            'c7.474,2.486,22.89,1.418,21.239-6.782c-1.45-7.193-22.301-13.373-15.104-23.032c1.117-1.494,4.9-3.149,7.193-1.643' +
            'c0.31,0.206,3.383,4.193,6.265-0.053c1.238-1.822,2.683-5.909,0.876-7.819c-3.463-3.669-17.341-0.102-22.522,5.027' +
            'c-4.886,4.833-3.407,9.843-0.059,14.915c-3.85,1.055-1.199,0.714-3.676,7.6c-1.095,3.044-2.45,5.941-6.007,5.354' +
            'c-2.995-4.738-0.812-14.164-1.195-20.801c-0.224-3.915-1.734-8.587-6.27-7.298c-3.701,1.048-7.737,12.586-9.584,17.222' +
            'c-0.345-4.741,0.311-19.445-0.107-21.741c-0.463-2.537-6.677-3.725-7.578-2.373c-0.53,0.794-1.495,28.928-1.598,31.229' +
            'c-0.12,2.647-0.014,7.81,1.352,9.616C108.084,309.205,112.958,308.54,115.504,307.864z M89.12,281.57' +
            'c-7.652,1.546-9.432-4.615-10.248-11.451c-2.184-18.289,7.233-25.402,10.334-20.365c1.061,1.728-0.074,6.959-0.067,9.652' +
            'C89.156,266.758,89.255,274.234,89.12,281.57L89.12,281.57z M89.016,288.763c0.53,6.095-3.586,12.231-6.417,14.759' +
            'c-3.853,3.445-9.494,5.656-16.424,4.019c-7.335-1.737-9.216-8.673-6.779-12.416c1.451-2.229,3.559-3.312,4.691-6.056' +
            'c4.179-10.147-11.265-8.881-11.443,5.834c-0.184,14.968,11.081,18.829,23.947,18.055c23.312-1.407,22.088-22.82,22.088-41.344' +
            'c0-7.029-0.022-14.055,0.003-21.086c0.042-13.146,0.383-9.681-9.287-10.909c-4.1-0.521-5.914,0.307-7.986,2.427' +
            'C69.111,254.625,66.013,289.721,89.016,288.763z M172.076,92.538h103.039c9.788,0,17.793,8.005,17.793,17.794v103.039' +
            'c0,9.787-8.005,17.795-17.793,17.795H172.076c-9.787,0-17.795-8.008-17.795-17.795V110.332' +
            'C154.283,100.543,162.289,92.538,172.076,92.538L172.076,92.538z M255.267,107.939c-3.437,0-6.24,2.808-6.24,6.242v14.939' +
            'c0,3.431,2.804,6.239,6.24,6.239h15.668c3.436,0,6.241-2.809,6.241-6.239v-14.939c0-3.434-2.806-6.242-6.241-6.242H255.267' +
            'L255.267,107.939z M277.246,151.162h-12.203c1.151,3.771,1.775,7.762,1.775,11.895c0,23.059-19.294,41.75-43.09,41.75' +
            'c-23.799,0-43.089-18.69-43.089-41.75c0-4.133,0.621-8.124,1.776-11.895h-12.731v58.558c0,3.031,2.48,5.511,5.511,5.511h96.535' +
            'c3.033,0,5.516-2.479,5.516-5.511V151.162L277.246,151.162z M223.729,134.574c-15.377,0-27.843,12.078-27.843,26.979' +
            'c0,14.896,12.466,26.977,27.843,26.977c15.376,0,27.841-12.079,27.841-26.977C251.569,146.652,239.104,134.574,223.729,134.574z"/>'
    };
    exports.default = { provider: provider };
});
//# sourceMappingURL=index.js.map