/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {TopLevelType} from 'events/TopLevelEventTypes';

import {accumulateTwoPhaseDispatches} from 'events/EventPropagators';
import {canUseDOM} from 'shared/ExecutionEnvironment';

import {
  TOP_BLUR,
  TOP_COMPOSITION_START,
  TOP_COMPOSITION_END,
  TOP_COMPOSITION_UPDATE,
  TOP_KEY_DOWN,
  TOP_KEY_PRESS,
  TOP_KEY_UP,
  TOP_MOUSE_DOWN,
  TOP_TEXT_INPUT,
  TOP_PASTE,
} from './DOMTopLevelEventTypes';
import * as FallbackCompositionState from './FallbackCompositionState';
import SyntheticCompositionEvent from './SyntheticCompositionEvent';
import SyntheticInputEvent from './SyntheticInputEvent';

const END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
const START_KEYCODE = 229;

const canUseCompositionEvent = canUseDOM && 'CompositionEvent' in window;

let documentMode = null;
if (canUseDOM && 'documentMode' in document) {
  documentMode = document.documentMode;
}

// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
const canUseTextInputEvent =
  canUseDOM && 'TextEvent' in window && !documentMode;

// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
const useFallbackCompositionData =
  canUseDOM &&
  (!canUseCompositionEvent ||
    (documentMode && documentMode > 8 && documentMode <= 11));

const SPACEBAR_CODE = 32;
const SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

// Events and their corresponding property names.
const eventTypes = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: 'onBeforeInput',
      captured: 'onBeforeInputCapture',
    },
    dependencies: [
      TOP_COMPOSITION_END,
      TOP_KEY_PRESS,
      TOP_TEXT_INPUT,
      TOP_PASTE,
    ],
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionEnd',
      captured: 'onCompositionEndCapture',
    },
    dependencies: [
      TOP_BLUR,
      TOP_COMPOSITION_END,
      TOP_KEY_DOWN,
      TOP_KEY_PRESS,
      TOP_KEY_UP,
      TOP_MOUSE_DOWN,
    ],
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionStart',
      captured: 'onCompositionStartCapture',
    },
    dependencies: [
      TOP_BLUR,
      TOP_COMPOSITION_START,
      TOP_KEY_DOWN,
      TOP_KEY_PRESS,
      TOP_KEY_UP,
      TOP_MOUSE_DOWN,
    ],
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionUpdate',
      captured: 'onCompositionUpdateCapture',
    },
    dependencies: [
      TOP_BLUR,
      TOP_COMPOSITION_UPDATE,
      TOP_KEY_DOWN,
      TOP_KEY_PRESS,
      TOP_KEY_UP,
      TOP_MOUSE_DOWN,
    ],
  },
};

// Track whether we've ever handled a keypress on the space key.
let hasSpaceKeypress = false;

/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */
function isKeypressCommand(nativeEvent) {
  return (
    (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
    // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(nativeEvent.ctrlKey && nativeEvent.altKey)
  );
}

/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */
function getCompositionEventType(topLevelType) {
  switch (topLevelType) {
    case TOP_COMPOSITION_START:
      return eventTypes.compositionStart;
    case TOP_COMPOSITION_END:
      return eventTypes.compositionEnd;
    case TOP_COMPOSITION_UPDATE:
      return eventTypes.compositionUpdate;
  }
}

/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionStart(topLevelType, nativeEvent) {
  return topLevelType === TOP_KEY_DOWN && nativeEvent.keyCode === START_KEYCODE;
}

/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case TOP_KEY_UP:
      // Command keys insert or clear IME input.
      return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
    case TOP_KEY_DOWN:
      // Expect IME keyCode on each keydown. If we get any other
      // code we must have exited earlier.
      return nativeEvent.keyCode !== START_KEYCODE;
    case TOP_KEY_PRESS:
    case TOP_MOUSE_DOWN:
    case TOP_BLUR:
      // Events are not possible without cancelling IME.
      return true;
    default:
      return false;
  }
}

/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */
function getDataFromCustomEvent(nativeEvent) {
  const detail = nativeEvent.detail;
  if (typeof detail === 'object' && 'data' in detail) {
    return detail.data;
  }
  return null;
}

/**
 * Check if a composition event was triggered by Korean IME.
 * Our fallback mode does not work well with IE's Korean IME,
 * so just use native composition events when Korean IME is used.
 * Although CompositionEvent.locale property is deprecated,
 * it is available in IE, where our fallback mode is enabled.
 *
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isUsingKoreanIME(nativeEvent) {
  return nativeEvent.locale === 'ko';
}

// Track the current IME composition status, if any.
let isComposing = false;

/**
 * @return {?object} A SyntheticCompositionEvent.
 */
function extractCompositionEvent(
  topLevelType,
  targetInst,
  nativeEvent,
  nativeEventTarget,
) {
  let eventType;
  let fallbackData;

  if (canUseCompositionEvent) {
    eventType = getCompositionEventType(topLevelType);
  } else if (!isComposing) {
    if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionStart;
    }
  } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
    eventType = eventTypes.compositionEnd;
  }

  if (!eventType) {
    return null;
  }

  if (useFallbackCompositionData && !isUsingKoreanIME(nativeEvent)) {
    // The current composition is stored statically and must not be
    // overwritten while composition continues.
    if (!isComposing && eventType === eventTypes.compositionStart) {
      isComposing = FallbackCompositionState.initialize(nativeEventTarget);
    } else if (eventType === eventTypes.compositionEnd) {
      if (isComposing) {
        fallbackData = FallbackCompositionState.getData();
      }
    }
  }

  const event = SyntheticCompositionEvent.getPooled(
    eventType,
    targetInst,
    nativeEvent,
    nativeEventTarget,
  );

  if (fallbackData) {
    // Inject data generated from fallback path into the synthetic event.
    // This matches the property of native CompositionEventInterface.
    event.data = fallbackData;
  } else {
    const customData = getDataFromCustomEvent(nativeEvent);
    if (customData !== null) {
      event.data = customData;
    }
  }

  accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * @param {TopLevelType} topLevelType Number from `TopLevelType`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The string corresponding to this `beforeInput` event.
 */
function getNativeBeforeInputChars(topLevelType: TopLevelType, nativeEvent) {
  switch (topLevelType) {
    case TOP_COMPOSITION_END:
      return getDataFromCustomEvent(nativeEvent);
    case TOP_KEY_PRESS:
      /**
       * If native `textInput` events are available, our goal is to make
       * use of them. However, there is a special case: the spacebar key.
       * In Webkit, preventing default on a spacebar `textInput` event
       * cancels character insertion, but it *also* causes the browser
       * to fall back to its default spacebar behavior of scrolling the
       * page.
       *
       * Tracking at:
       * https://code.google.com/p/chromium/issues/detail?id=355103
       *
       * To avoid this issue, use the keypress event as if no `textInput`
       * event is available.
       */
      const which = nativeEvent.which;
      if (which !== SPACEBAR_CODE) {
        return null;
      }

      hasSpaceKeypress = true;
      return SPACEBAR_CHAR;

    case TOP_TEXT_INPUT:
      // Record the characters to be added to the DOM.
      const chars = nativeEvent.data;

      // If it's a spacebar character, assume that we have already handled
      // it at the keypress level and bail immediately. Android Chrome
      // doesn't give us keycodes, so we need to blacklist it.
      if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
        return null;
      }

      return chars;

    default:
      // For other native event types, do nothing.
      return null;
  }
}

/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 *
 * @param {number} topLevelType Number from `TopLevelEventTypes`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The fallback string for this `beforeInput` event.
 */
function getFallbackBeforeInputChars(topLevelType: TopLevelType, nativeEvent) {
  // If we are currently composing (IME) and using a fallback to do so,
  // try to extract the composed characters from the fallback object.
  // If composition event is available, we extract a string only at
  // compositionevent, otherwise extract it at fallback events.
  if (isComposing) {
    if (
      topLevelType === TOP_COMPOSITION_END ||
      (!canUseCompositionEvent &&
        isFallbackCompositionEnd(topLevelType, nativeEvent))
    ) {
      const chars = FallbackCompositionState.getData();
      FallbackCompositionState.reset();
      isComposing = false;
      return chars;
    }
    return null;
  }

  switch (topLevelType) {
    case TOP_PASTE:
      // If a paste event occurs after a keypress, throw out the input
      // chars. Paste events should not lead to BeforeInput events.
      return null;
    case TOP_KEY_PRESS:
      /**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */
      if (!isKeypressCommand(nativeEvent)) {
        // IE fires the `keypress` event when a user types an emoji via
        // Touch keyboard of Windows.  In such a case, the `char` property
        // holds an emoji character like `\uD83D\uDE0A`.  Because its length
        // is 2, the property `which` does not represent an emoji correctly.
        // In such a case, we directly return the `char` property instead of
        // using `which`.
        if (nativeEvent.char && nativeEvent.char.length > 1) {
          return nativeEvent.char;
        } else if (nativeEvent.which) {
          return String.fromCharCode(nativeEvent.which);
        }
      }
      return null;
    case TOP_COMPOSITION_END:
      return useFallbackCompositionData && !isUsingKoreanIME(nativeEvent)
        ? null
        : nativeEvent.data;
    default:
      return null;
  }
}

/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */
function extractBeforeInputEvent(
  topLevelType,
  targetInst,
  nativeEvent,
  nativeEventTarget,
) {
  let chars;

  if (canUseTextInputEvent) {
    chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
  } else {
    chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
  }

  // If no characters are being inserted, no BeforeInput event should
  // be fired.
  if (!chars) {
    return null;
  }

  const event = SyntheticInputEvent.getPooled(
    eventTypes.beforeInput,
    targetInst,
    nativeEvent,
    nativeEventTarget,
  );

  event.data = chars;
  accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 *
 * This plugin is also responsible for emitting `composition` events, thus
 * allowing us to share composition fallback code for both `beforeInput` and
 * `composition` event types.
 */
const BeforeInputEventPlugin = {
  eventTypes: eventTypes,

  extractEvents: function(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget,
  ) {
    const composition = extractCompositionEvent(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget,
    );

    const beforeInput = extractBeforeInputEvent(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget,
    );

    if (composition === null) {
      return beforeInput;
    }

    if (beforeInput === null) {
      return composition;
    }

    return [composition, beforeInput];
  },
};

export default BeforeInputEventPlugin;

/*
Safari BEFOREINPUT
bubbles: true
cancelBubble: false
cancelable: true
composed: true
currentTarget: null
data: "a"
dataTransfer: null
defaultPrevented: false
detail: 0
eventPhase: 0
inputType: "insertText"
isTrusted: true

  layerX: 0
  layerY: 0
  pageX: 0
  pageY: 0

returnValue: true
srcElement: <input id="xy">
target: <input id="xy">
timeStamp: 3245
type: "beforeinput"
view: Window {document: #document, NaN: NaN, window: Window, Infinity: Infinity, undefined: undefined, …}
which: 0

Chrome INPUT
bubbles: true
cancelBubble: false
cancelable: false
composed: true
currentTarget: null
data: "a"
dataTransfer: null
defaultPrevented: false
detail: 0
eventPhase: 0
inputType: "insertText"

  isComposing: false
  path: (5) [input#xy, body, html, document, Window]
  type: "input"
  view: null

isTrusted: true
returnValue: true
sourceCapabilities: null
srcElement: input#xy
target: input#xy
timeStamp: 12774.000000092201
which: 0

FF INPUT --- TODO FIXME NO data, dataTransfer
bubbles: true
cancelBubble: false
cancelable: false
composed: true
currentTarget: null
defaultPrevented: false
detail: 0
eventPhase: 0
explicitOriginalTarget: <input id="xy" onkeydown="console.log('key',event)" onbeforeinput="console.log('beforeinput',event);" oninput="console.log('input',event);" type="text">
isComposing: false
isTrusted: true
layerX: 0
layerY: 0
originalTarget: <input id="xy" onkeydown="console.log('key',event)" onbeforeinput="console.log('beforeinput',event);" oninput="console.log('input',event);" type="text">
pageX: 0
pageY: 0
rangeOffset: 0
rangeParent: null
target: <input id="xy" onkeydown="console.log('key',event)" onbeforeinput="console.log('beforeinput',event);" oninput="console.log('input',event);" type="text">
timeStamp: 11555
type: "input"
view: Window https://fiddle.jshell.net/Lpjdom0z/27/show/
​which: 0

keyup setRange

window.getSelection().anchorOffset
S = e.target.selectionStart,
E = e.target.selectionEnd

check delete,
if range check replace


check autofill "insertReplacementText" in onKeyDown

ClipboardData: DataTransfer {dropEffect: "none", effectAllowed: "uninitialized",
items: DataTransferItemList, types: [], files: FileList, …}

fallback input
shorter before caret delB.
shorter after caret delF.
longer after caret autofill

CHECK
- "insertTranspose"	transpose the last two characters that were entered	No	Yes	Any
- "insertFromPaste"	paste	No	Yes	Any
IF e.target.selectionStart = e.target.selectionEnd
- "insertFromComposition"	insert into the DOM a finalized composed string that will not form part of the next composition string	Yes	Yes	Any
- "insertCompositionText"	replace the current composition string	Yes	No	Any
- "insertText"	insert typed plain text	No	Yes	Any
- "insertFromDrop"	insert content into the DOM by means of drop	No	Yes	Any

"insertFromYank"	replace the current selection with content stored in a kill buffer	No	Yes	Any
"insertReplacementText"	replace existing text by means of a spell checker, auto-correct or similar	No	Yes	Any

"insertLineBreak"	insert a line break	No	Yes	Any
"insertParagraph"	insert a paragraph break	No	Yes	Any
"insertOrderedList"	insert a numbered list	No	Yes	Any
"insertUnorderedList"	insert a bulleted list	No	Yes	Any
"insertHorizontalRule"	insert a horizontal rule	No	Yes	Any
"insertLink"	insert a link	No	Yes	Any



-
- "deleteByCut"	remove the current selection as part of a cut	No	Yes	Any
- "deleteByDrag"	remove content from the DOM by means of drag	No	Yes	Any

"deleteCompositionText"	delete the current composition string before commiting a finalized string to the DOM	Yes	No	Any
"deleteByComposition"	remove a part of the DOM in order to recompose this part using IME	Yes	Yes	Any
"deleteContent"	delete the selection without specifying the direction of the deletion and this intention is not covered by another inputType	No	Yes	Non-collapsed

"deleteContentBackward"	delete the content directly before the caret position and this intention is not covered by another inputType or delete the selection with the selection collapsing to its start after the deletion	No	Yes	Non-collapsed
"deleteContentForward"	delete the content directly after the caret position and this intention is not covered by another inputType or delete the selection with the selection collapsing to its end after the deletion	No	Yes	Non-collapsed
"deleteWordBackward"	delete a word directly before the caret position	No	Yes	Collapsed
"deleteWordForward"	delete a word directly after the caret position	No	Yes	Collapsed

"deleteSoftLineBackward"	delete from the caret to the nearest visual line break before the caret position	No	Yes	Collapsed
"deleteSoftLineForward"	delete from the caret to the nearest visual line break after the caret position	No	Yes	Collapsed
"deleteEntireSoftLine"	delete from to the nearest visual line break before the caret position to the nearest visual line break after the caret position	No	Yes	Collapsed
"deleteHardLineBackward"	delete from the caret to the nearest beginning of a block element or br element before the caret position	No	Yes	Collapsed
"deleteHardLineForward"	delete from the caret to the nearest end of a block element or br element after the caret position	No	Yes	Collapsed



"historyUndo"	undo the last editing action	No	Yes	Any
"historyRedo"	to redo the last undone editing action	No	Yes	Any

"formatBold"	initiate bold text	No	Yes	Any
"formatItalic"	initiate italic text	No	Yes	Any
"formatUnderline"	initiate underline text	No	Yes	Any
"formatStrikeThrough"	initiate stricken through text	No	Yes	Any
"formatSuperscript"	initiate superscript text	No	Yes	Any
"formatSubscript"	initiate subscript text	No	Yes	Any
"formatJustifyFull"	make the current selection fully justified	No	Yes	Any
"formatJustifyCenter"	center align the current selection	No	Yes	Any
"formatJustifyRight"	right align the current selection	No	Yes	Any
"formatJustifyLeft"	left align the current selection	No	Yes	Any
"formatIndent"	indent the current selection	No	Yes	Any
"formatOutdent"	outdent the current selection	No	Yes	Any
"formatRemove"	remove all formatting from the current selection	No	Yes	Any
"formatSetBlockTextDirection"	set the text block direction	No	Yes	Any
"formatSetInlineTextDirection"	set the text inline direction	No	Yes	Any
"formatBackColor"	change the background color	No	Yes	Any
"formatFontColor"	change the font color	No	Yes	Any
"formatFontName"	change the font-family	No	Yes	Any


NO CANCEL !!!
1. 'insertText'
2. 'insertLineBreak'
3. 'insertCompositionText'
4. 'insertReplacementText'
5. 'insertParagraph'
6. 'deleteWordForward'
7. 'deleteWordBackward'
8. 'deleteSoftLineForward'
9. 'deleteSoftLineBackward'
10. 'deleteEntireSoftLine'
11. 'deleteHardLineForward'
12. 'deleteHardLineBackward'
13. 'deleteCompositionText'
14. 'deleteContent'
15. 'deleteContentBackward'
16. 'deleteContentForward'

*/
