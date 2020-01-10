(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/has/main"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var main_1 = require("@dojo/framework/has/main");
    var bundleDir = 'src/Auth/IndieAuth/widgets/microformats/nls';
    var bundlePath = ((main_1.default('host-node') ? __dirname : bundleDir) + '/common');
    var locales = ['de'];
    var messages = {
        representative: 'representative',
        org: 'Organisations',
        url: 'URLs',
        cat: 'Categories',
        res: 'Responses',
        note: 'Notes',
        bday: 'birthday',
        anniversary: 'anniversary',
        tz: 'timezone',
        callsign: 'callsign',
        jobTitle: 'job title',
        role: 'role',
        rev: 'revision',
        mf_name: 'The full/formatted name of the person or organisation',
        'mf_honorific-prefix': 'e.g. Mrs., Mr. or Dr.',
        'mf_given-name': 'given (often first) name',
        'mf_additional-name': 'other/middle name',
        'mf_family-name': 'family (often last) name',
        'mf_sort-string': 'string to sort by',
        'mf_honorific-suffix': 'e.g. Ph.D, Esq.',
        mf_nickname: 'nickname/alias/handle',
        mf_email: 'email address',
        mf_logo: 'a logo representing the person or organisation',
        mf_photo: 'a photo representing the person or organisation ',
        mf_url: 'home page',
        mf_uid: 'universally unique identifier, typically canonical URL',
        mf_category: 'category/tag',
        mf_adr: 'postal address, optionally embed an `h-adr`',
        'mf_post-office-box': 'a P.O. Box (postal box)',
        'mf_street-address': 'street number + name',
        'mf_extended-address': 'apartment/suite/room name/number if any',
        mf_locality: 'city/town/village',
        mf_region: 'state/county/province',
        'mf_postal-code': 'postal code, e.g. US ZIP',
        'mf_country-name': 'country name',
        mf_label: 'address label',
        mf_geo: 'geographic information, optionally embed an `h-geo`',
        mf_latitude: 'decimal latitude',
        mf_longitude: 'decimal longitude',
        mf_altitude: 'decimal altitude',
        mf_tel: 'telephone number',
        mf_note: 'additional notes',
        'mf_bday': 'birth date',
        mf_anniversary: 'anniversary',
        mf_key: 'cryptographic public key e.g. SSH or GPG',
        mf_org: 'affiliated organization, optionally embed in an `h-card`',
        'mf_job-title': 'job title, previously `title` in hCard, disambiguated.',
        mf_role: 'description of role',
        mf_impp: 'Instant Messaging per RFC4770, new in vCard4 (RFC 6350)',
        mf_sex: 'biological sex, new in vCard4 (RFC 6350)',
        'mf_gender-identity': 'gender identity, new in vCard4 (RFC 6350)',
        mf_tz: 'timezone offset',
        mf_callsign: 'callsign',
        mf_rev: 'revision'
    };
    exports.default = { bundlePath: bundlePath, locales: locales, messages: messages };
});
//# sourceMappingURL=common.js.map