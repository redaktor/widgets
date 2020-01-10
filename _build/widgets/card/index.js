(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "@dojo/framework/widget-core/decorators/alwaysRender", "../themes/redaktor-default/card.m.css", "../themes/redaktor-default/_ui.m.css", "../../widgets/button", "../../widgets/icon"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var alwaysRender_1 = require("@dojo/framework/widget-core/decorators/alwaysRender");
    var css = require("../themes/redaktor-default/card.m.css");
    var uiCss = require("../themes/redaktor-default/_ui.m.css");
    var button_1 = require("../../widgets/button");
    var icon_1 = require("../../widgets/icon");
    var Card = /** @class */ (function (_super) {
        tslib_1.__extends(Card, _super);
        function Card() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Card.prototype.render = function () {
            var actionsRenderer = this.properties.actionsRenderer;
            var actionsResult = actionsRenderer && actionsRenderer();
            var mb = this.meta(Widget_1.RedaktorDimensions).getOffset('media').marginBottom || 0;
            var c = [
                Widget_1.v('div', {
                    classes: this.theme(css.rootAction)
                }, [
                    Widget_1.v('div', {
                        key: 'media',
                        classes: this.theme([css.media, css.mediaSquare]),
                        styles: {
                            backgroundImage: 'url("https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg")',
                            marginBottom: mb + "px"
                        }
                    }, [
                        Widget_1.v('div', {
                            classes: this.theme(css.mediaContent)
                        }, [
                            Widget_1.v('hgroup', [
                                Widget_1.v('h4', ['Our changing planet']),
                                Widget_1.v('h5', { classes: [uiCss.subtitle, uiCss.muted] }, ['by Kurt Wagner'])
                            ])
                        ])
                    ]),
                    Widget_1.v('p', ['Visit ten places on our planet that are undergoing the biggest changes today.']),
                    Widget_1.v('div', {
                        classes: this.theme([css.actions])
                    }, [
                        Widget_1.v('div', { classes: this.theme([css.actionButtons]) }, [
                            Widget_1.v('div', { classes: this.theme([css.actionButton]) }, [Widget_1.w(button_1.default, { size: 'small', depth: 'flat' }, ['Read'])]),
                            Widget_1.v('div', { classes: this.theme([css.actionButton]) }, [Widget_1.w(button_1.default, { size: 'small', depth: 'flat' }, ['Bookmark'])])
                        ]),
                        Widget_1.v('div', { classes: this.theme([css.actionIcons]) }, [
                            Widget_1.v('div', { classes: this.theme([css.actionIcon]) }, [Widget_1.w(icon_1.default, { type: 'searchIcon' })]),
                            Widget_1.v('div', { classes: this.theme([css.actionIcon]) }, [Widget_1.w(icon_1.default, { type: 'locationIcon' })])
                        ])
                    ])
                ].concat(this.children))
            ];
            return Widget_1.v('span', {
                key: 'root',
                classes: tslib_1.__spread([
                    this.theme(css.root)
                ], this.getSchemaClasses(css), this.getSizeClasses())
            }, c);
            // TODO actions :
            /*(
                <div key="root" classes={this.theme(css.root)}>
                    {this.children}
                    {actionsResult && <div classes={this.theme(css.actions)}>{actionsResult}</div>}
                </div>
            );*/
        };
        Card = tslib_1.__decorate([
            Widget_1.customElement({
                tag: 'dojo-card',
                properties: ['actionsRenderer']
            }),
            Widget_1.theme(css),
            alwaysRender_1.alwaysRender()
        ], Card);
        return Card;
    }(Widget_1.RedaktorWidgetBase));
    exports.default = Card;
});
//# sourceMappingURL=index.js.map