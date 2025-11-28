globalThis.process ??= {}; globalThis.process.env ??= {};
import { k as getAugmentedNamespace, l as commonjsGlobal, n as getDefaultExportFromCjs } from './astro/server_CJTHuxak.mjs';

var cryptoJs$1 = {exports: {}};

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var core$1 = {exports: {}};

const __viteBrowserExternal = {};

const __viteBrowserExternal$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: __viteBrowserExternal
}, Symbol.toStringTag, { value: 'Module' }));

const require$$0 = /*@__PURE__*/getAugmentedNamespace(__viteBrowserExternal$1);

var core = core$1.exports;

var hasRequiredCore;

function requireCore () {
	if (hasRequiredCore) return core$1.exports;
	hasRequiredCore = 1;
	(function (module, exports$1) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory();
			}
		}(core, function () {

			/*globals window, global, require*/

			/**
			 * CryptoJS core components.
			 */
			var CryptoJS = CryptoJS || (function (Math, undefined$1) {

			    var crypto;

			    // Native crypto from window (Browser)
			    if (typeof window !== 'undefined' && window.crypto) {
			        crypto = window.crypto;
			    }

			    // Native crypto in web worker (Browser)
			    if (typeof self !== 'undefined' && self.crypto) {
			        crypto = self.crypto;
			    }

			    // Native crypto from worker
			    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
			        crypto = globalThis.crypto;
			    }

			    // Native (experimental IE 11) crypto from window (Browser)
			    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
			        crypto = window.msCrypto;
			    }

			    // Native crypto from global (NodeJS)
			    if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
			        crypto = commonjsGlobal.crypto;
			    }

			    // Native crypto import via require (NodeJS)
			    if (!crypto && typeof commonjsRequire === 'function') {
			        try {
			            crypto = require$$0;
			        } catch (err) {}
			    }

			    /*
			     * Cryptographically secure pseudorandom number generator
			     *
			     * As Math.random() is cryptographically not safe to use
			     */
			    var cryptoSecureRandomInt = function () {
			        if (crypto) {
			            // Use getRandomValues method (Browser)
			            if (typeof crypto.getRandomValues === 'function') {
			                try {
			                    return crypto.getRandomValues(new Uint32Array(1))[0];
			                } catch (err) {}
			            }

			            // Use randomBytes method (NodeJS)
			            if (typeof crypto.randomBytes === 'function') {
			                try {
			                    return crypto.randomBytes(4).readInt32LE();
			                } catch (err) {}
			            }
			        }

			        throw new Error('Native crypto module could not be used to get secure random number.');
			    };

			    /*
			     * Local polyfill of Object.create

			     */
			    var create = Object.create || (function () {
			        function F() {}

			        return function (obj) {
			            var subtype;

			            F.prototype = obj;

			            subtype = new F();

			            F.prototype = null;

			            return subtype;
			        };
			    }());

			    /**
			     * CryptoJS namespace.
			     */
			    var C = {};

			    /**
			     * Library namespace.
			     */
			    var C_lib = C.lib = {};

			    /**
			     * Base object for prototypal inheritance.
			     */
			    var Base = C_lib.Base = (function () {


			        return {
			            /**
			             * Creates a new object that inherits from this object.
			             *
			             * @param {Object} overrides Properties to copy into the new object.
			             *
			             * @return {Object} The new object.
			             *
			             * @static
			             *
			             * @example
			             *
			             *     var MyType = CryptoJS.lib.Base.extend({
			             *         field: 'value',
			             *
			             *         method: function () {
			             *         }
			             *     });
			             */
			            extend: function (overrides) {
			                // Spawn
			                var subtype = create(this);

			                // Augment
			                if (overrides) {
			                    subtype.mixIn(overrides);
			                }

			                // Create default initializer
			                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
			                    subtype.init = function () {
			                        subtype.$super.init.apply(this, arguments);
			                    };
			                }

			                // Initializer's prototype is the subtype object
			                subtype.init.prototype = subtype;

			                // Reference supertype
			                subtype.$super = this;

			                return subtype;
			            },

			            /**
			             * Extends this object and runs the init method.
			             * Arguments to create() will be passed to init().
			             *
			             * @return {Object} The new object.
			             *
			             * @static
			             *
			             * @example
			             *
			             *     var instance = MyType.create();
			             */
			            create: function () {
			                var instance = this.extend();
			                instance.init.apply(instance, arguments);

			                return instance;
			            },

			            /**
			             * Initializes a newly created object.
			             * Override this method to add some logic when your objects are created.
			             *
			             * @example
			             *
			             *     var MyType = CryptoJS.lib.Base.extend({
			             *         init: function () {
			             *             // ...
			             *         }
			             *     });
			             */
			            init: function () {
			            },

			            /**
			             * Copies properties into this object.
			             *
			             * @param {Object} properties The properties to mix in.
			             *
			             * @example
			             *
			             *     MyType.mixIn({
			             *         field: 'value'
			             *     });
			             */
			            mixIn: function (properties) {
			                for (var propertyName in properties) {
			                    if (properties.hasOwnProperty(propertyName)) {
			                        this[propertyName] = properties[propertyName];
			                    }
			                }

			                // IE won't copy toString using the loop above
			                if (properties.hasOwnProperty('toString')) {
			                    this.toString = properties.toString;
			                }
			            },

			            /**
			             * Creates a copy of this object.
			             *
			             * @return {Object} The clone.
			             *
			             * @example
			             *
			             *     var clone = instance.clone();
			             */
			            clone: function () {
			                return this.init.prototype.extend(this);
			            }
			        };
			    }());

			    /**
			     * An array of 32-bit words.
			     *
			     * @property {Array} words The array of 32-bit words.
			     * @property {number} sigBytes The number of significant bytes in this word array.
			     */
			    var WordArray = C_lib.WordArray = Base.extend({
			        /**
			         * Initializes a newly created word array.
			         *
			         * @param {Array} words (Optional) An array of 32-bit words.
			         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.lib.WordArray.create();
			         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
			         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
			         */
			        init: function (words, sigBytes) {
			            words = this.words = words || [];

			            if (sigBytes != undefined$1) {
			                this.sigBytes = sigBytes;
			            } else {
			                this.sigBytes = words.length * 4;
			            }
			        },

			        /**
			         * Converts this word array to a string.
			         *
			         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
			         *
			         * @return {string} The stringified word array.
			         *
			         * @example
			         *
			         *     var string = wordArray + '';
			         *     var string = wordArray.toString();
			         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
			         */
			        toString: function (encoder) {
			            return (encoder || Hex).stringify(this);
			        },

			        /**
			         * Concatenates a word array to this word array.
			         *
			         * @param {WordArray} wordArray The word array to append.
			         *
			         * @return {WordArray} This word array.
			         *
			         * @example
			         *
			         *     wordArray1.concat(wordArray2);
			         */
			        concat: function (wordArray) {
			            // Shortcuts
			            var thisWords = this.words;
			            var thatWords = wordArray.words;
			            var thisSigBytes = this.sigBytes;
			            var thatSigBytes = wordArray.sigBytes;

			            // Clamp excess bits
			            this.clamp();

			            // Concat
			            if (thisSigBytes % 4) {
			                // Copy one byte at a time
			                for (var i = 0; i < thatSigBytes; i++) {
			                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
			                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
			                }
			            } else {
			                // Copy one word at a time
			                for (var j = 0; j < thatSigBytes; j += 4) {
			                    thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
			                }
			            }
			            this.sigBytes += thatSigBytes;

			            // Chainable
			            return this;
			        },

			        /**
			         * Removes insignificant bits.
			         *
			         * @example
			         *
			         *     wordArray.clamp();
			         */
			        clamp: function () {
			            // Shortcuts
			            var words = this.words;
			            var sigBytes = this.sigBytes;

			            // Clamp
			            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
			            words.length = Math.ceil(sigBytes / 4);
			        },

			        /**
			         * Creates a copy of this word array.
			         *
			         * @return {WordArray} The clone.
			         *
			         * @example
			         *
			         *     var clone = wordArray.clone();
			         */
			        clone: function () {
			            var clone = Base.clone.call(this);
			            clone.words = this.words.slice(0);

			            return clone;
			        },

			        /**
			         * Creates a word array filled with random bytes.
			         *
			         * @param {number} nBytes The number of random bytes to generate.
			         *
			         * @return {WordArray} The random word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.lib.WordArray.random(16);
			         */
			        random: function (nBytes) {
			            var words = [];

			            for (var i = 0; i < nBytes; i += 4) {
			                words.push(cryptoSecureRandomInt());
			            }

			            return new WordArray.init(words, nBytes);
			        }
			    });

			    /**
			     * Encoder namespace.
			     */
			    var C_enc = C.enc = {};

			    /**
			     * Hex encoding strategy.
			     */
			    var Hex = C_enc.Hex = {
			        /**
			         * Converts a word array to a hex string.
			         *
			         * @param {WordArray} wordArray The word array.
			         *
			         * @return {string} The hex string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
			         */
			        stringify: function (wordArray) {
			            // Shortcuts
			            var words = wordArray.words;
			            var sigBytes = wordArray.sigBytes;

			            // Convert
			            var hexChars = [];
			            for (var i = 0; i < sigBytes; i++) {
			                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
			                hexChars.push((bite >>> 4).toString(16));
			                hexChars.push((bite & 0x0f).toString(16));
			            }

			            return hexChars.join('');
			        },

			        /**
			         * Converts a hex string to a word array.
			         *
			         * @param {string} hexStr The hex string.
			         *
			         * @return {WordArray} The word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
			         */
			        parse: function (hexStr) {
			            // Shortcut
			            var hexStrLength = hexStr.length;

			            // Convert
			            var words = [];
			            for (var i = 0; i < hexStrLength; i += 2) {
			                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
			            }

			            return new WordArray.init(words, hexStrLength / 2);
			        }
			    };

			    /**
			     * Latin1 encoding strategy.
			     */
			    var Latin1 = C_enc.Latin1 = {
			        /**
			         * Converts a word array to a Latin1 string.
			         *
			         * @param {WordArray} wordArray The word array.
			         *
			         * @return {string} The Latin1 string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
			         */
			        stringify: function (wordArray) {
			            // Shortcuts
			            var words = wordArray.words;
			            var sigBytes = wordArray.sigBytes;

			            // Convert
			            var latin1Chars = [];
			            for (var i = 0; i < sigBytes; i++) {
			                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
			                latin1Chars.push(String.fromCharCode(bite));
			            }

			            return latin1Chars.join('');
			        },

			        /**
			         * Converts a Latin1 string to a word array.
			         *
			         * @param {string} latin1Str The Latin1 string.
			         *
			         * @return {WordArray} The word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
			         */
			        parse: function (latin1Str) {
			            // Shortcut
			            var latin1StrLength = latin1Str.length;

			            // Convert
			            var words = [];
			            for (var i = 0; i < latin1StrLength; i++) {
			                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
			            }

			            return new WordArray.init(words, latin1StrLength);
			        }
			    };

			    /**
			     * UTF-8 encoding strategy.
			     */
			    var Utf8 = C_enc.Utf8 = {
			        /**
			         * Converts a word array to a UTF-8 string.
			         *
			         * @param {WordArray} wordArray The word array.
			         *
			         * @return {string} The UTF-8 string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
			         */
			        stringify: function (wordArray) {
			            try {
			                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
			            } catch (e) {
			                throw new Error('Malformed UTF-8 data');
			            }
			        },

			        /**
			         * Converts a UTF-8 string to a word array.
			         *
			         * @param {string} utf8Str The UTF-8 string.
			         *
			         * @return {WordArray} The word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
			         */
			        parse: function (utf8Str) {
			            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
			        }
			    };

			    /**
			     * Abstract buffered block algorithm template.
			     *
			     * The property blockSize must be implemented in a concrete subtype.
			     *
			     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
			     */
			    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
			        /**
			         * Resets this block algorithm's data buffer to its initial state.
			         *
			         * @example
			         *
			         *     bufferedBlockAlgorithm.reset();
			         */
			        reset: function () {
			            // Initial values
			            this._data = new WordArray.init();
			            this._nDataBytes = 0;
			        },

			        /**
			         * Adds new data to this block algorithm's buffer.
			         *
			         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
			         *
			         * @example
			         *
			         *     bufferedBlockAlgorithm._append('data');
			         *     bufferedBlockAlgorithm._append(wordArray);
			         */
			        _append: function (data) {
			            // Convert string to WordArray, else assume WordArray already
			            if (typeof data == 'string') {
			                data = Utf8.parse(data);
			            }

			            // Append
			            this._data.concat(data);
			            this._nDataBytes += data.sigBytes;
			        },

			        /**
			         * Processes available data blocks.
			         *
			         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
			         *
			         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
			         *
			         * @return {WordArray} The processed data.
			         *
			         * @example
			         *
			         *     var processedData = bufferedBlockAlgorithm._process();
			         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
			         */
			        _process: function (doFlush) {
			            var processedWords;

			            // Shortcuts
			            var data = this._data;
			            var dataWords = data.words;
			            var dataSigBytes = data.sigBytes;
			            var blockSize = this.blockSize;
			            var blockSizeBytes = blockSize * 4;

			            // Count blocks ready
			            var nBlocksReady = dataSigBytes / blockSizeBytes;
			            if (doFlush) {
			                // Round up to include partial blocks
			                nBlocksReady = Math.ceil(nBlocksReady);
			            } else {
			                // Round down to include only full blocks,
			                // less the number of blocks that must remain in the buffer
			                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
			            }

			            // Count words ready
			            var nWordsReady = nBlocksReady * blockSize;

			            // Count bytes ready
			            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

			            // Process blocks
			            if (nWordsReady) {
			                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
			                    // Perform concrete-algorithm logic
			                    this._doProcessBlock(dataWords, offset);
			                }

			                // Remove processed words
			                processedWords = dataWords.splice(0, nWordsReady);
			                data.sigBytes -= nBytesReady;
			            }

			            // Return processed words
			            return new WordArray.init(processedWords, nBytesReady);
			        },

			        /**
			         * Creates a copy of this object.
			         *
			         * @return {Object} The clone.
			         *
			         * @example
			         *
			         *     var clone = bufferedBlockAlgorithm.clone();
			         */
			        clone: function () {
			            var clone = Base.clone.call(this);
			            clone._data = this._data.clone();

			            return clone;
			        },

			        _minBufferSize: 0
			    });

			    /**
			     * Abstract hasher template.
			     *
			     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
			     */
			    C_lib.Hasher = BufferedBlockAlgorithm.extend({
			        /**
			         * Configuration options.
			         */
			        cfg: Base.extend(),

			        /**
			         * Initializes a newly created hasher.
			         *
			         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
			         *
			         * @example
			         *
			         *     var hasher = CryptoJS.algo.SHA256.create();
			         */
			        init: function (cfg) {
			            // Apply config defaults
			            this.cfg = this.cfg.extend(cfg);

			            // Set initial values
			            this.reset();
			        },

			        /**
			         * Resets this hasher to its initial state.
			         *
			         * @example
			         *
			         *     hasher.reset();
			         */
			        reset: function () {
			            // Reset data buffer
			            BufferedBlockAlgorithm.reset.call(this);

			            // Perform concrete-hasher logic
			            this._doReset();
			        },

			        /**
			         * Updates this hasher with a message.
			         *
			         * @param {WordArray|string} messageUpdate The message to append.
			         *
			         * @return {Hasher} This hasher.
			         *
			         * @example
			         *
			         *     hasher.update('message');
			         *     hasher.update(wordArray);
			         */
			        update: function (messageUpdate) {
			            // Append
			            this._append(messageUpdate);

			            // Update the hash
			            this._process();

			            // Chainable
			            return this;
			        },

			        /**
			         * Finalizes the hash computation.
			         * Note that the finalize operation is effectively a destructive, read-once operation.
			         *
			         * @param {WordArray|string} messageUpdate (Optional) A final message update.
			         *
			         * @return {WordArray} The hash.
			         *
			         * @example
			         *
			         *     var hash = hasher.finalize();
			         *     var hash = hasher.finalize('message');
			         *     var hash = hasher.finalize(wordArray);
			         */
			        finalize: function (messageUpdate) {
			            // Final message update
			            if (messageUpdate) {
			                this._append(messageUpdate);
			            }

			            // Perform concrete-hasher logic
			            var hash = this._doFinalize();

			            return hash;
			        },

			        blockSize: 512/32,

			        /**
			         * Creates a shortcut function to a hasher's object interface.
			         *
			         * @param {Hasher} hasher The hasher to create a helper for.
			         *
			         * @return {Function} The shortcut function.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
			         */
			        _createHelper: function (hasher) {
			            return function (message, cfg) {
			                return new hasher.init(cfg).finalize(message);
			            };
			        },

			        /**
			         * Creates a shortcut function to the HMAC's object interface.
			         *
			         * @param {Hasher} hasher The hasher to use in this HMAC helper.
			         *
			         * @return {Function} The shortcut function.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
			         */
			        _createHmacHelper: function (hasher) {
			            return function (message, key) {
			                return new C_algo.HMAC.init(hasher, key).finalize(message);
			            };
			        }
			    });

			    /**
			     * Algorithm namespace.
			     */
			    var C_algo = C.algo = {};

			    return C;
			}(Math));


			return CryptoJS;

		})); 
	} (core$1));
	return core$1.exports;
}

var x64Core$1 = {exports: {}};

var x64Core = x64Core$1.exports;

var hasRequiredX64Core;

function requireX64Core () {
	if (hasRequiredX64Core) return x64Core$1.exports;
	hasRequiredX64Core = 1;
	(function (module, exports$1) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(x64Core, function (CryptoJS) {

			(function (undefined$1) {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var Base = C_lib.Base;
			    var X32WordArray = C_lib.WordArray;

			    /**
			     * x64 namespace.
			     */
			    var C_x64 = C.x64 = {};

			    /**
			     * A 64-bit word.
			     */
			    C_x64.Word = Base.extend({
			        /**
			         * Initializes a newly created 64-bit word.
			         *
			         * @param {number} high The high 32 bits.
			         * @param {number} low The low 32 bits.
			         *
			         * @example
			         *
			         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
			         */
			        init: function (high, low) {
			            this.high = high;
			            this.low = low;
			        }

			        /**
			         * Bitwise NOTs this word.
			         *
			         * @return {X64Word} A new x64-Word object after negating.
			         *
			         * @example
			         *
			         *     var negated = x64Word.not();
			         */
			        // not: function () {
			            // var high = ~this.high;
			            // var low = ~this.low;

			            // return X64Word.create(high, low);
			        // },

			        /**
			         * Bitwise ANDs this word with the passed word.
			         *
			         * @param {X64Word} word The x64-Word to AND with this word.
			         *
			         * @return {X64Word} A new x64-Word object after ANDing.
			         *
			         * @example
			         *
			         *     var anded = x64Word.and(anotherX64Word);
			         */
			        // and: function (word) {
			            // var high = this.high & word.high;
			            // var low = this.low & word.low;

			            // return X64Word.create(high, low);
			        // },

			        /**
			         * Bitwise ORs this word with the passed word.
			         *
			         * @param {X64Word} word The x64-Word to OR with this word.
			         *
			         * @return {X64Word} A new x64-Word object after ORing.
			         *
			         * @example
			         *
			         *     var ored = x64Word.or(anotherX64Word);
			         */
			        // or: function (word) {
			            // var high = this.high | word.high;
			            // var low = this.low | word.low;

			            // return X64Word.create(high, low);
			        // },

			        /**
			         * Bitwise XORs this word with the passed word.
			         *
			         * @param {X64Word} word The x64-Word to XOR with this word.
			         *
			         * @return {X64Word} A new x64-Word object after XORing.
			         *
			         * @example
			         *
			         *     var xored = x64Word.xor(anotherX64Word);
			         */
			        // xor: function (word) {
			            // var high = this.high ^ word.high;
			            // var low = this.low ^ word.low;

			            // return X64Word.create(high, low);
			        // },

			        /**
			         * Shifts this word n bits to the left.
			         *
			         * @param {number} n The number of bits to shift.
			         *
			         * @return {X64Word} A new x64-Word object after shifting.
			         *
			         * @example
			         *
			         *     var shifted = x64Word.shiftL(25);
			         */
			        // shiftL: function (n) {
			            // if (n < 32) {
			                // var high = (this.high << n) | (this.low >>> (32 - n));
			                // var low = this.low << n;
			            // } else {
			                // var high = this.low << (n - 32);
			                // var low = 0;
			            // }

			            // return X64Word.create(high, low);
			        // },

			        /**
			         * Shifts this word n bits to the right.
			         *
			         * @param {number} n The number of bits to shift.
			         *
			         * @return {X64Word} A new x64-Word object after shifting.
			         *
			         * @example
			         *
			         *     var shifted = x64Word.shiftR(7);
			         */
			        // shiftR: function (n) {
			            // if (n < 32) {
			                // var low = (this.low >>> n) | (this.high << (32 - n));
			                // var high = this.high >>> n;
			            // } else {
			                // var low = this.high >>> (n - 32);
			                // var high = 0;
			            // }

			            // return X64Word.create(high, low);
			        // },

			        /**
			         * Rotates this word n bits to the left.
			         *
			         * @param {number} n The number of bits to rotate.
			         *
			         * @return {X64Word} A new x64-Word object after rotating.
			         *
			         * @example
			         *
			         *     var rotated = x64Word.rotL(25);
			         */
			        // rotL: function (n) {
			            // return this.shiftL(n).or(this.shiftR(64 - n));
			        // },

			        /**
			         * Rotates this word n bits to the right.
			         *
			         * @param {number} n The number of bits to rotate.
			         *
			         * @return {X64Word} A new x64-Word object after rotating.
			         *
			         * @example
			         *
			         *     var rotated = x64Word.rotR(7);
			         */
			        // rotR: function (n) {
			            // return this.shiftR(n).or(this.shiftL(64 - n));
			        // },

			        /**
			         * Adds this word with the passed word.
			         *
			         * @param {X64Word} word The x64-Word to add with this word.
			         *
			         * @return {X64Word} A new x64-Word object after adding.
			         *
			         * @example
			         *
			         *     var added = x64Word.add(anotherX64Word);
			         */
			        // add: function (word) {
			            // var low = (this.low + word.low) | 0;
			            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
			            // var high = (this.high + word.high + carry) | 0;

			            // return X64Word.create(high, low);
			        // }
			    });

			    /**
			     * An array of 64-bit words.
			     *
			     * @property {Array} words The array of CryptoJS.x64.Word objects.
			     * @property {number} sigBytes The number of significant bytes in this word array.
			     */
			    C_x64.WordArray = Base.extend({
			        /**
			         * Initializes a newly created word array.
			         *
			         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
			         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.x64.WordArray.create();
			         *
			         *     var wordArray = CryptoJS.x64.WordArray.create([
			         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
			         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
			         *     ]);
			         *
			         *     var wordArray = CryptoJS.x64.WordArray.create([
			         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
			         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
			         *     ], 10);
			         */
			        init: function (words, sigBytes) {
			            words = this.words = words || [];

			            if (sigBytes != undefined$1) {
			                this.sigBytes = sigBytes;
			            } else {
			                this.sigBytes = words.length * 8;
			            }
			        },

			        /**
			         * Converts this 64-bit word array to a 32-bit word array.
			         *
			         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
			         *
			         * @example
			         *
			         *     var x32WordArray = x64WordArray.toX32();
			         */
			        toX32: function () {
			            // Shortcuts
			            var x64Words = this.words;
			            var x64WordsLength = x64Words.length;

			            // Convert
			            var x32Words = [];
			            for (var i = 0; i < x64WordsLength; i++) {
			                var x64Word = x64Words[i];
			                x32Words.push(x64Word.high);
			                x32Words.push(x64Word.low);
			            }

			            return X32WordArray.create(x32Words, this.sigBytes);
			        },

			        /**
			         * Creates a copy of this word array.
			         *
			         * @return {X64WordArray} The clone.
			         *
			         * @example
			         *
			         *     var clone = x64WordArray.clone();
			         */
			        clone: function () {
			            var clone = Base.clone.call(this);

			            // Clone "words" array
			            var words = clone.words = this.words.slice(0);

			            // Clone each X64Word object
			            var wordsLength = words.length;
			            for (var i = 0; i < wordsLength; i++) {
			                words[i] = words[i].clone();
			            }

			            return clone;
			        }
			    });
			}());


			return CryptoJS;

		})); 
	} (x64Core$1));
	return x64Core$1.exports;
}

var libTypedarrays$1 = {exports: {}};

var libTypedarrays = libTypedarrays$1.exports;

var hasRequiredLibTypedarrays;

function requireLibTypedarrays () {
	if (hasRequiredLibTypedarrays) return libTypedarrays$1.exports;
	hasRequiredLibTypedarrays = 1;
	(function (module, exports$1) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(libTypedarrays, function (CryptoJS) {

			(function () {
			    // Check if typed arrays are supported
			    if (typeof ArrayBuffer != 'function') {
			        return;
			    }

			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;

			    // Reference original init
			    var superInit = WordArray.init;

			    // Augment WordArray.init to handle typed arrays
			    var subInit = WordArray.init = function (typedArray) {
			        // Convert buffers to uint8
			        if (typedArray instanceof ArrayBuffer) {
			            typedArray = new Uint8Array(typedArray);
			        }

			        // Convert other array views to uint8
			        if (
			            typedArray instanceof Int8Array ||
			            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
			            typedArray instanceof Int16Array ||
			            typedArray instanceof Uint16Array ||
			            typedArray instanceof Int32Array ||
			            typedArray instanceof Uint32Array ||
			            typedArray instanceof Float32Array ||
			            typedArray instanceof Float64Array
			        ) {
			            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
			        }

			        // Handle Uint8Array
			        if (typedArray instanceof Uint8Array) {
			            // Shortcut
			            var typedArrayByteLength = typedArray.byteLength;

			            // Extract bytes
			            var words = [];
			            for (var i = 0; i < typedArrayByteLength; i++) {
			                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
			            }

			            // Initialize this word array
			            superInit.call(this, words, typedArrayByteLength);
			        } else {
			            // Else call normal init
			            superInit.apply(this, arguments);
			        }
			    };

			    subInit.prototype = WordArray;
			}());


			return CryptoJS.lib.WordArray;

		})); 
	} (libTypedarrays$1));
	return libTypedarrays$1.exports;
}

var encUtf16$1 = {exports: {}};

var encUtf16 = encUtf16$1.exports;

var hasRequiredEncUtf16;

function requireEncUtf16 () {
	if (hasRequiredEncUtf16) return encUtf16$1.exports;
	hasRequiredEncUtf16 = 1;
	(function (module, exports$1) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(encUtf16, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var C_enc = C.enc;

			    /**
			     * UTF-16 BE encoding strategy.
			     */
			    C_enc.Utf16 = C_enc.Utf16BE = {
			        /**
			         * Converts a word array to a UTF-16 BE string.
			         *
			         * @param {WordArray} wordArray The word array.
			         *
			         * @return {string} The UTF-16 BE string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
			         */
			        stringify: function (wordArray) {
			            // Shortcuts
			            var words = wordArray.words;
			            var sigBytes = wordArray.sigBytes;

			            // Convert
			            var utf16Chars = [];
			            for (var i = 0; i < sigBytes; i += 2) {
			                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
			                utf16Chars.push(String.fromCharCode(codePoint));
			            }

			            return utf16Chars.join('');
			        },

			        /**
			         * Converts a UTF-16 BE string to a word array.
			         *
			         * @param {string} utf16Str The UTF-16 BE string.
			         *
			         * @return {WordArray} The word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
			         */
			        parse: function (utf16Str) {
			            // Shortcut
			            var utf16StrLength = utf16Str.length;

			            // Convert
			            var words = [];
			            for (var i = 0; i < utf16StrLength; i++) {
			                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
			            }

			            return WordArray.create(words, utf16StrLength * 2);
			        }
			    };

			    /**
			     * UTF-16 LE encoding strategy.
			     */
			    C_enc.Utf16LE = {
			        /**
			         * Converts a word array to a UTF-16 LE string.
			         *
			         * @param {WordArray} wordArray The word array.
			         *
			         * @return {string} The UTF-16 LE string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
			         */
			        stringify: function (wordArray) {
			            // Shortcuts
			            var words = wordArray.words;
			            var sigBytes = wordArray.sigBytes;

			            // Convert
			            var utf16Chars = [];
			            for (var i = 0; i < sigBytes; i += 2) {
			                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
			                utf16Chars.push(String.fromCharCode(codePoint));
			            }

			            return utf16Chars.join('');
			        },

			        /**
			         * Converts a UTF-16 LE string to a word array.
			         *
			         * @param {string} utf16Str The UTF-16 LE string.
			         *
			         * @return {WordArray} The word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
			         */
			        parse: function (utf16Str) {
			            // Shortcut
			            var utf16StrLength = utf16Str.length;

			            // Convert
			            var words = [];
			            for (var i = 0; i < utf16StrLength; i++) {
			                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
			            }

			            return WordArray.create(words, utf16StrLength * 2);
			        }
			    };

			    function swapEndian(word) {
			        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
			    }
			}());


			return CryptoJS.enc.Utf16;

		})); 
	} (encUtf16$1));
	return encUtf16$1.exports;
}

var encBase64$1 = {exports: {}};

var encBase64 = encBase64$1.exports;

var hasRequiredEncBase64;

function requireEncBase64 () {
	if (hasRequiredEncBase64) return encBase64$1.exports;
	hasRequiredEncBase64 = 1;
	(function (module, exports$1) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(encBase64, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var C_enc = C.enc;

			    /**
			     * Base64 encoding strategy.
			     */
			    C_enc.Base64 = {
			        /**
			         * Converts a word array to a Base64 string.
			         *
			         * @param {WordArray} wordArray The word array.
			         *
			         * @return {string} The Base64 string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
			         */
			        stringify: function (wordArray) {
			            // Shortcuts
			            var words = wordArray.words;
			            var sigBytes = wordArray.sigBytes;
			            var map = this._map;

			            // Clamp excess bits
			            wordArray.clamp();

			            // Convert
			            var base64Chars = [];
			            for (var i = 0; i < sigBytes; i += 3) {
			                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
			                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
			                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

			                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

			                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
			                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
			                }
			            }

			            // Add padding
			            var paddingChar = map.charAt(64);
			            if (paddingChar) {
			                while (base64Chars.length % 4) {
			                    base64Chars.push(paddingChar);
			                }
			            }

			            return base64Chars.join('');
			        },

			        /**
			         * Converts a Base64 string to a word array.
			         *
			         * @param {string} base64Str The Base64 string.
			         *
			         * @return {WordArray} The word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
			         */
			        parse: function (base64Str) {
			            // Shortcuts
			            var base64StrLength = base64Str.length;
			            var map = this._map;
			            var reverseMap = this._reverseMap;

			            if (!reverseMap) {
			                    reverseMap = this._reverseMap = [];
			                    for (var j = 0; j < map.length; j++) {
			                        reverseMap[map.charCodeAt(j)] = j;
			                    }
			            }

			            // Ignore padding
			            var paddingChar = map.charAt(64);
			            if (paddingChar) {
			                var paddingIndex = base64Str.indexOf(paddingChar);
			                if (paddingIndex !== -1) {
			                    base64StrLength = paddingIndex;
			                }
			            }

			            // Convert
			            return parseLoop(base64Str, base64StrLength, reverseMap);

			        },

			        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
			    };

			    function parseLoop(base64Str, base64StrLength, reverseMap) {
			      var words = [];
			      var nBytes = 0;
			      for (var i = 0; i < base64StrLength; i++) {
			          if (i % 4) {
			              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
			              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
			              var bitsCombined = bits1 | bits2;
			              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
			              nBytes++;
			          }
			      }
			      return WordArray.create(words, nBytes);
			    }
			}());


			return CryptoJS.enc.Base64;

		})); 
	} (encBase64$1));
	return encBase64$1.exports;
}

var encBase64url$1 = {exports: {}};

var encBase64url = encBase64url$1.exports;

var hasRequiredEncBase64url;

function requireEncBase64url () {
	if (hasRequiredEncBase64url) return encBase64url$1.exports;
	hasRequiredEncBase64url = 1;
	(function (module, exports$1) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(encBase64url, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var C_enc = C.enc;

			    /**
			     * Base64url encoding strategy.
			     */
			    C_enc.Base64url = {
			        /**
			         * Converts a word array to a Base64url string.
			         *
			         * @param {WordArray} wordArray The word array.
			         *
			         * @param {boolean} urlSafe Whether to use url safe
			         *
			         * @return {string} The Base64url string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
			         */
			        stringify: function (wordArray, urlSafe) {
			            if (urlSafe === undefined) {
			                urlSafe = true;
			            }
			            // Shortcuts
			            var words = wordArray.words;
			            var sigBytes = wordArray.sigBytes;
			            var map = urlSafe ? this._safe_map : this._map;

			            // Clamp excess bits
			            wordArray.clamp();

			            // Convert
			            var base64Chars = [];
			            for (var i = 0; i < sigBytes; i += 3) {
			                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
			                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
			                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

			                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

			                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
			                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
			                }
			            }

			            // Add padding
			            var paddingChar = map.charAt(64);
			            if (paddingChar) {
			                while (base64Chars.length % 4) {
			                    base64Chars.push(paddingChar);
			                }
			            }

			            return base64Chars.join('');
			        },

			        /**
			         * Converts a Base64url string to a word array.
			         *
			         * @param {string} base64Str The Base64url string.
			         *
			         * @param {boolean} urlSafe Whether to use url safe
			         *
			         * @return {WordArray} The word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
			         */
			        parse: function (base64Str, urlSafe) {
			            if (urlSafe === undefined) {
			                urlSafe = true;
			            }

			            // Shortcuts
			            var base64StrLength = base64Str.length;
			            var map = urlSafe ? this._safe_map : this._map;
			            var reverseMap = this._reverseMap;

			            if (!reverseMap) {
			                reverseMap = this._reverseMap = [];
			                for (var j = 0; j < map.length; j++) {
			                    reverseMap[map.charCodeAt(j)] = j;
			                }
			            }

			            // Ignore padding
			            var paddingChar = map.charAt(64);
			            if (paddingChar) {
			                var paddingIndex = base64Str.indexOf(paddingChar);
			                if (paddingIndex !== -1) {
			                    base64StrLength = paddingIndex;
			                }
			            }

			            // Convert
			            return parseLoop(base64Str, base64StrLength, reverseMap);

			        },

			        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
			        _safe_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
			    };

			    function parseLoop(base64Str, base64StrLength, reverseMap) {
			        var words = [];
			        var nBytes = 0;
			        for (var i = 0; i < base64StrLength; i++) {
			            if (i % 4) {
			                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
			                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
			                var bitsCombined = bits1 | bits2;
			                words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
			                nBytes++;
			            }
			        }
			        return WordArray.create(words, nBytes);
			    }
			}());


			return CryptoJS.enc.Base64url;

		})); 
	} (encBase64url$1));
	return encBase64url$1.exports;
}

var md5$1 = {exports: {}};

var md5 = md5$1.exports;

var hasRequiredMd5;

function requireMd5 () {
	if (hasRequiredMd5) return md5$1.exports;
	hasRequiredMd5 = 1;
	(function (module, exports$1) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(md5, function (CryptoJS) {

			(function (Math) {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var Hasher = C_lib.Hasher;
			    var C_algo = C.algo;

			    // Constants table
			    var T = [];

			    // Compute constants
			    (function () {
			        for (var i = 0; i < 64; i++) {
			            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
			        }
			    }());

			    /**
			     * MD5 hash algorithm.
			     */
			    var MD5 = C_algo.MD5 = Hasher.extend({
			        _doReset: function () {
			            this._hash = new WordArray.init([
			                0x67452301, 0xefcdab89,
			                0x98badcfe, 0x10325476
			            ]);
			        },

			        _doProcessBlock: function (M, offset) {
			            // Swap endian
			            for (var i = 0; i < 16; i++) {
			                // Shortcuts
			                var offset_i = offset + i;
			                var M_offset_i = M[offset_i];

			                M[offset_i] = (
			                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
			                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
			                );
			            }

			            // Shortcuts
			            var H = this._hash.words;

			            var M_offset_0  = M[offset + 0];
			            var M_offset_1  = M[offset + 1];
			            var M_offset_2  = M[offset + 2];
			            var M_offset_3  = M[offset + 3];
			            var M_offset_4  = M[offset + 4];
			            var M_offset_5  = M[offset + 5];
			            var M_offset_6  = M[offset + 6];
			            var M_offset_7  = M[offset + 7];
			            var M_offset_8  = M[offset + 8];
			            var M_offset_9  = M[offset + 9];
			            var M_offset_10 = M[offset + 10];
			            var M_offset_11 = M[offset + 11];
			            var M_offset_12 = M[offset + 12];
			            var M_offset_13 = M[offset + 13];
			            var M_offset_14 = M[offset + 14];
			            var M_offset_15 = M[offset + 15];

			            // Working variables
			            var a = H[0];
			            var b = H[1];
			            var c = H[2];
			            var d = H[3];

			            // Computation
			            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
			            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
			            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
			            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
			            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
			            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
			            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
			            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
			            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
			            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
			            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
			            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
			            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
			            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
			            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
			            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

			            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
			            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
			            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
			            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
			            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
			            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
			            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
			            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
			            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
			            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
			            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
			            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
			            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
			            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
			            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
			            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

			            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
			            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
			            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
			            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
			            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
			            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
			            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
			            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
			            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
			            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
			            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
			            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
			            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
			            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
			            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
			            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

			            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
			            d = II(d, a, b, c, M_offset_7,  10, T[49]);
			            c = II(c, d, a, b, M_offset_14, 15, T[50]);
			            b = II(b, c, d, a, M_offset_5,  21, T[51]);
			            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
			            d = II(d, a, b, c, M_offset_3,  10, T[53]);
			            c = II(c, d, a, b, M_offset_10, 15, T[54]);
			            b = II(b, c, d, a, M_offset_1,  21, T[55]);
			            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
			            d = II(d, a, b, c, M_offset_15, 10, T[57]);
			            c = II(c, d, a, b, M_offset_6,  15, T[58]);
			            b = II(b, c, d, a, M_offset_13, 21, T[59]);
			            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
			            d = II(d, a, b, c, M_offset_11, 10, T[61]);
			            c = II(c, d, a, b, M_offset_2,  15, T[62]);
			            b = II(b, c, d, a, M_offset_9,  21, T[63]);

			            // Intermediate hash value
			            H[0] = (H[0] + a) | 0;
			            H[1] = (H[1] + b) | 0;
			            H[2] = (H[2] + c) | 0;
			            H[3] = (H[3] + d) | 0;
			        },

			        _doFinalize: function () {
			            // Shortcuts
			            var data = this._data;
			            var dataWords = data.words;

			            var nBitsTotal = this._nDataBytes * 8;
			            var nBitsLeft = data.sigBytes * 8;

			            // Add padding
			            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

			            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
			            var nBitsTotalL = nBitsTotal;
			            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
			                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
			                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
			            );
			            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
			                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
			                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
			            );

			            data.sigBytes = (dataWords.length + 1) * 4;

			            // Hash final blocks
			            this._process();

			            // Shortcuts
			            var hash = this._hash;
			            var H = hash.words;

			            // Swap endian
			            for (var i = 0; i < 4; i++) {
			                // Shortcut
			                var H_i = H[i];

			                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
			                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
			            }

			            // Return final computed hash
			            return hash;
			        },

			        clone: function () {
			            var clone = Hasher.clone.call(this);
			            clone._hash = this._hash.clone();

			            return clone;
			        }
			    });

			    function FF(a, b, c, d, x, s, t) {
			        var n = a + ((b & c) | (~b & d)) + x + t;
			        return ((n << s) | (n >>> (32 - s))) + b;
			    }

			    function GG(a, b, c, d, x, s, t) {
			        var n = a + ((b & d) | (c & ~d)) + x + t;
			        return ((n << s) | (n >>> (32 - s))) + b;
			    }

			    function HH(a, b, c, d, x, s, t) {
			        var n = a + (b ^ c ^ d) + x + t;
			        return ((n << s) | (n >>> (32 - s))) + b;
			    }

			    function II(a, b, c, d, x, s, t) {
			        var n = a + (c ^ (b | ~d)) + x + t;
			        return ((n << s) | (n >>> (32 - s))) + b;
			    }

			    /**
			     * Shortcut function to the hasher's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     *
			     * @return {WordArray} The hash.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hash = CryptoJS.MD5('message');
			     *     var hash = CryptoJS.MD5(wordArray);
			     */
			    C.MD5 = Hasher._createHelper(MD5);

			    /**
			     * Shortcut function to the HMAC's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     * @param {WordArray|string} key The secret key.
			     *
			     * @return {WordArray} The HMAC.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hmac = CryptoJS.HmacMD5(message, key);
			     */
			    C.HmacMD5 = Hasher._createHmacHelper(MD5);
			}(Math));


			return CryptoJS.MD5;

		})); 
	} (md5$1));
	return md5$1.exports;
}

var sha1$1 = {exports: {}};

var sha1 = sha1$1.exports;

var hasRequiredSha1;

function requireSha1 () {
	if (hasRequiredSha1) return sha1$1.exports;
	hasRequiredSha1 = 1;
	(function (module, exports$1) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(sha1, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var Hasher = C_lib.Hasher;
			    var C_algo = C.algo;

			    // Reusable object
			    var W = [];

			    /**
			     * SHA-1 hash algorithm.
			     */
			    var SHA1 = C_algo.SHA1 = Hasher.extend({
			        _doReset: function () {
			            this._hash = new WordArray.init([
			                0x67452301, 0xefcdab89,
			                0x98badcfe, 0x10325476,
			                0xc3d2e1f0
			            ]);
			        },

			        _doProcessBlock: function (M, offset) {
			            // Shortcut
			            var H = this._hash.words;

			            // Working variables
			            var a = H[0];
			            var b = H[1];
			            var c = H[2];
			            var d = H[3];
			            var e = H[4];

			            // Computation
			            for (var i = 0; i < 80; i++) {
			                if (i < 16) {
			                    W[i] = M[offset + i] | 0;
			                } else {
			                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
			                    W[i] = (n << 1) | (n >>> 31);
			                }

			                var t = ((a << 5) | (a >>> 27)) + e + W[i];
			                if (i < 20) {
			                    t += ((b & c) | (~b & d)) + 0x5a827999;
			                } else if (i < 40) {
			                    t += (b ^ c ^ d) + 0x6ed9eba1;
			                } else if (i < 60) {
			                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
			                } else /* if (i < 80) */ {
			                    t += (b ^ c ^ d) - 0x359d3e2a;
			                }

			                e = d;
			                d = c;
			                c = (b << 30) | (b >>> 2);
			                b = a;
			                a = t;
			            }

			            // Intermediate hash value
			            H[0] = (H[0] + a) | 0;
			            H[1] = (H[1] + b) | 0;
			            H[2] = (H[2] + c) | 0;
			            H[3] = (H[3] + d) | 0;
			            H[4] = (H[4] + e) | 0;
			        },

			        _doFinalize: function () {
			            // Shortcuts
			            var data = this._data;
			            var dataWords = data.words;

			            var nBitsTotal = this._nDataBytes * 8;
			            var nBitsLeft = data.sigBytes * 8;

			            // Add padding
			            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
			            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
			            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
			            data.sigBytes = dataWords.length * 4;

			            // Hash final blocks
			            this._process();

			            // Return final computed hash
			            return this._hash;
			        },

			        clone: function () {
			            var clone = Hasher.clone.call(this);
			            clone._hash = this._hash.clone();

			            return clone;
			        }
			    });

			    /**
			     * Shortcut function to the hasher's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     *
			     * @return {WordArray} The hash.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hash = CryptoJS.SHA1('message');
			     *     var hash = CryptoJS.SHA1(wordArray);
			     */
			    C.SHA1 = Hasher._createHelper(SHA1);

			    /**
			     * Shortcut function to the HMAC's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     * @param {WordArray|string} key The secret key.
			     *
			     * @return {WordArray} The HMAC.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hmac = CryptoJS.HmacSHA1(message, key);
			     */
			    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
			}());


			return CryptoJS.SHA1;

		})); 
	} (sha1$1));
	return sha1$1.exports;
}

var sha256$1 = {exports: {}};

var sha256 = sha256$1.exports;

var hasRequiredSha256;

function requireSha256 () {
	if (hasRequiredSha256) return sha256$1.exports;
	hasRequiredSha256 = 1;
	(function (module, exports$1) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(sha256, function (CryptoJS) {

			(function (Math) {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var Hasher = C_lib.Hasher;
			    var C_algo = C.algo;

			    // Initialization and round constants tables
			    var H = [];
			    var K = [];

			    // Compute constants
			    (function () {
			        function isPrime(n) {
			            var sqrtN = Math.sqrt(n);
			            for (var factor = 2; factor <= sqrtN; factor++) {
			                if (!(n % factor)) {
			                    return false;
			                }
			            }

			            return true;
			        }

			        function getFractionalBits(n) {
			            return ((n - (n | 0)) * 0x100000000) | 0;
			        }

			        var n = 2;
			        var nPrime = 0;
			        while (nPrime < 64) {
			            if (isPrime(n)) {
			                if (nPrime < 8) {
			                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
			                }
			                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

			                nPrime++;
			            }

			            n++;
			        }
			    }());

			    // Reusable object
			    var W = [];

			    /**
			     * SHA-256 hash algorithm.
			     */
			    var SHA256 = C_algo.SHA256 = Hasher.extend({
			        _doReset: function () {
			            this._hash = new WordArray.init(H.slice(0));
			        },

			        _doProcessBlock: function (M, offset) {
			            // Shortcut
			            var H = this._hash.words;

			            // Working variables
			            var a = H[0];
			            var b = H[1];
			            var c = H[2];
			            var d = H[3];
			            var e = H[4];
			            var f = H[5];
			            var g = H[6];
			            var h = H[7];

			            // Computation
			            for (var i = 0; i < 64; i++) {
			                if (i < 16) {
			                    W[i] = M[offset + i] | 0;
			                } else {
			                    var gamma0x = W[i - 15];
			                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
			                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
			                                   (gamma0x >>> 3);

			                    var gamma1x = W[i - 2];
			                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
			                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
			                                   (gamma1x >>> 10);

			                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
			                }

			                var ch  = (e & f) ^ (~e & g);
			                var maj = (a & b) ^ (a & c) ^ (b & c);

			                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
			                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

			                var t1 = h + sigma1 + ch + K[i] + W[i];
			                var t2 = sigma0 + maj;

			                h = g;
			                g = f;
			                f = e;
			                e = (d + t1) | 0;
			                d = c;
			                c = b;
			                b = a;
			                a = (t1 + t2) | 0;
			            }

			            // Intermediate hash value
			            H[0] = (H[0] + a) | 0;
			            H[1] = (H[1] + b) | 0;
			            H[2] = (H[2] + c) | 0;
			            H[3] = (H[3] + d) | 0;
			            H[4] = (H[4] + e) | 0;
			            H[5] = (H[5] + f) | 0;
			            H[6] = (H[6] + g) | 0;
			            H[7] = (H[7] + h) | 0;
			        },

			        _doFinalize: function () {
			            // Shortcuts
			            var data = this._data;
			            var dataWords = data.words;

			            var nBitsTotal = this._nDataBytes * 8;
			            var nBitsLeft = data.sigBytes * 8;

			            // Add padding
			            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
			            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
			            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
			            data.sigBytes = dataWords.length * 4;

			            // Hash final blocks
			            this._process();

			            // Return final computed hash
			            return this._hash;
			        },

			        clone: function () {
			            var clone = Hasher.clone.call(this);
			            clone._hash = this._hash.clone();

			            return clone;
			        }
			    });

			    /**
			     * Shortcut function to the hasher's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     *
			     * @return {WordArray} The hash.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hash = CryptoJS.SHA256('message');
			     *     var hash = CryptoJS.SHA256(wordArray);
			     */
			    C.SHA256 = Hasher._createHelper(SHA256);

			    /**
			     * Shortcut function to the HMAC's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     * @param {WordArray|string} key The secret key.
			     *
			     * @return {WordArray} The HMAC.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hmac = CryptoJS.HmacSHA256(message, key);
			     */
			    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
			}(Math));


			return CryptoJS.SHA256;

		})); 
	} (sha256$1));
	return sha256$1.exports;
}

var sha224$1 = {exports: {}};

var sha224 = sha224$1.exports;

var hasRequiredSha224;

function requireSha224 () {
	if (hasRequiredSha224) return sha224$1.exports;
	hasRequiredSha224 = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireSha256());
			}
		}(sha224, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var C_algo = C.algo;
			    var SHA256 = C_algo.SHA256;

			    /**
			     * SHA-224 hash algorithm.
			     */
			    var SHA224 = C_algo.SHA224 = SHA256.extend({
			        _doReset: function () {
			            this._hash = new WordArray.init([
			                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
			                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
			            ]);
			        },

			        _doFinalize: function () {
			            var hash = SHA256._doFinalize.call(this);

			            hash.sigBytes -= 4;

			            return hash;
			        }
			    });

			    /**
			     * Shortcut function to the hasher's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     *
			     * @return {WordArray} The hash.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hash = CryptoJS.SHA224('message');
			     *     var hash = CryptoJS.SHA224(wordArray);
			     */
			    C.SHA224 = SHA256._createHelper(SHA224);

			    /**
			     * Shortcut function to the HMAC's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     * @param {WordArray|string} key The secret key.
			     *
			     * @return {WordArray} The HMAC.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hmac = CryptoJS.HmacSHA224(message, key);
			     */
			    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
			}());


			return CryptoJS.SHA224;

		})); 
	} (sha224$1));
	return sha224$1.exports;
}

var sha512$1 = {exports: {}};

var sha512 = sha512$1.exports;

var hasRequiredSha512;

function requireSha512 () {
	if (hasRequiredSha512) return sha512$1.exports;
	hasRequiredSha512 = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireX64Core());
			}
		}(sha512, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var Hasher = C_lib.Hasher;
			    var C_x64 = C.x64;
			    var X64Word = C_x64.Word;
			    var X64WordArray = C_x64.WordArray;
			    var C_algo = C.algo;

			    function X64Word_create() {
			        return X64Word.create.apply(X64Word, arguments);
			    }

			    // Constants
			    var K = [
			        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
			        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
			        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
			        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
			        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
			        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
			        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
			        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
			        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
			        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
			        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
			        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
			        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
			        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
			        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
			        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
			        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
			        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
			        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
			        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
			        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
			        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
			        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
			        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
			        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
			        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
			        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
			        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
			        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
			        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
			        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
			        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
			        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
			        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
			        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
			        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
			        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
			        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
			        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
			        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
			    ];

			    // Reusable objects
			    var W = [];
			    (function () {
			        for (var i = 0; i < 80; i++) {
			            W[i] = X64Word_create();
			        }
			    }());

			    /**
			     * SHA-512 hash algorithm.
			     */
			    var SHA512 = C_algo.SHA512 = Hasher.extend({
			        _doReset: function () {
			            this._hash = new X64WordArray.init([
			                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
			                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
			                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
			                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
			            ]);
			        },

			        _doProcessBlock: function (M, offset) {
			            // Shortcuts
			            var H = this._hash.words;

			            var H0 = H[0];
			            var H1 = H[1];
			            var H2 = H[2];
			            var H3 = H[3];
			            var H4 = H[4];
			            var H5 = H[5];
			            var H6 = H[6];
			            var H7 = H[7];

			            var H0h = H0.high;
			            var H0l = H0.low;
			            var H1h = H1.high;
			            var H1l = H1.low;
			            var H2h = H2.high;
			            var H2l = H2.low;
			            var H3h = H3.high;
			            var H3l = H3.low;
			            var H4h = H4.high;
			            var H4l = H4.low;
			            var H5h = H5.high;
			            var H5l = H5.low;
			            var H6h = H6.high;
			            var H6l = H6.low;
			            var H7h = H7.high;
			            var H7l = H7.low;

			            // Working variables
			            var ah = H0h;
			            var al = H0l;
			            var bh = H1h;
			            var bl = H1l;
			            var ch = H2h;
			            var cl = H2l;
			            var dh = H3h;
			            var dl = H3l;
			            var eh = H4h;
			            var el = H4l;
			            var fh = H5h;
			            var fl = H5l;
			            var gh = H6h;
			            var gl = H6l;
			            var hh = H7h;
			            var hl = H7l;

			            // Rounds
			            for (var i = 0; i < 80; i++) {
			                var Wil;
			                var Wih;

			                // Shortcut
			                var Wi = W[i];

			                // Extend message
			                if (i < 16) {
			                    Wih = Wi.high = M[offset + i * 2]     | 0;
			                    Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
			                } else {
			                    // Gamma0
			                    var gamma0x  = W[i - 15];
			                    var gamma0xh = gamma0x.high;
			                    var gamma0xl = gamma0x.low;
			                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
			                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

			                    // Gamma1
			                    var gamma1x  = W[i - 2];
			                    var gamma1xh = gamma1x.high;
			                    var gamma1xl = gamma1x.low;
			                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
			                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

			                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
			                    var Wi7  = W[i - 7];
			                    var Wi7h = Wi7.high;
			                    var Wi7l = Wi7.low;

			                    var Wi16  = W[i - 16];
			                    var Wi16h = Wi16.high;
			                    var Wi16l = Wi16.low;

			                    Wil = gamma0l + Wi7l;
			                    Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
			                    Wil = Wil + gamma1l;
			                    Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
			                    Wil = Wil + Wi16l;
			                    Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

			                    Wi.high = Wih;
			                    Wi.low  = Wil;
			                }

			                var chh  = (eh & fh) ^ (~eh & gh);
			                var chl  = (el & fl) ^ (~el & gl);
			                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
			                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

			                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
			                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
			                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
			                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

			                // t1 = h + sigma1 + ch + K[i] + W[i]
			                var Ki  = K[i];
			                var Kih = Ki.high;
			                var Kil = Ki.low;

			                var t1l = hl + sigma1l;
			                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
			                var t1l = t1l + chl;
			                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
			                var t1l = t1l + Kil;
			                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
			                var t1l = t1l + Wil;
			                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

			                // t2 = sigma0 + maj
			                var t2l = sigma0l + majl;
			                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

			                // Update working variables
			                hh = gh;
			                hl = gl;
			                gh = fh;
			                gl = fl;
			                fh = eh;
			                fl = el;
			                el = (dl + t1l) | 0;
			                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
			                dh = ch;
			                dl = cl;
			                ch = bh;
			                cl = bl;
			                bh = ah;
			                bl = al;
			                al = (t1l + t2l) | 0;
			                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
			            }

			            // Intermediate hash value
			            H0l = H0.low  = (H0l + al);
			            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
			            H1l = H1.low  = (H1l + bl);
			            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
			            H2l = H2.low  = (H2l + cl);
			            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
			            H3l = H3.low  = (H3l + dl);
			            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
			            H4l = H4.low  = (H4l + el);
			            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
			            H5l = H5.low  = (H5l + fl);
			            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
			            H6l = H6.low  = (H6l + gl);
			            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
			            H7l = H7.low  = (H7l + hl);
			            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
			        },

			        _doFinalize: function () {
			            // Shortcuts
			            var data = this._data;
			            var dataWords = data.words;

			            var nBitsTotal = this._nDataBytes * 8;
			            var nBitsLeft = data.sigBytes * 8;

			            // Add padding
			            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
			            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
			            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
			            data.sigBytes = dataWords.length * 4;

			            // Hash final blocks
			            this._process();

			            // Convert hash to 32-bit word array before returning
			            var hash = this._hash.toX32();

			            // Return final computed hash
			            return hash;
			        },

			        clone: function () {
			            var clone = Hasher.clone.call(this);
			            clone._hash = this._hash.clone();

			            return clone;
			        },

			        blockSize: 1024/32
			    });

			    /**
			     * Shortcut function to the hasher's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     *
			     * @return {WordArray} The hash.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hash = CryptoJS.SHA512('message');
			     *     var hash = CryptoJS.SHA512(wordArray);
			     */
			    C.SHA512 = Hasher._createHelper(SHA512);

			    /**
			     * Shortcut function to the HMAC's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     * @param {WordArray|string} key The secret key.
			     *
			     * @return {WordArray} The HMAC.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hmac = CryptoJS.HmacSHA512(message, key);
			     */
			    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
			}());


			return CryptoJS.SHA512;

		})); 
	} (sha512$1));
	return sha512$1.exports;
}

var sha384$1 = {exports: {}};

var sha384 = sha384$1.exports;

var hasRequiredSha384;

function requireSha384 () {
	if (hasRequiredSha384) return sha384$1.exports;
	hasRequiredSha384 = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireX64Core(), requireSha512());
			}
		}(sha384, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_x64 = C.x64;
			    var X64Word = C_x64.Word;
			    var X64WordArray = C_x64.WordArray;
			    var C_algo = C.algo;
			    var SHA512 = C_algo.SHA512;

			    /**
			     * SHA-384 hash algorithm.
			     */
			    var SHA384 = C_algo.SHA384 = SHA512.extend({
			        _doReset: function () {
			            this._hash = new X64WordArray.init([
			                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
			                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
			                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
			                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
			            ]);
			        },

			        _doFinalize: function () {
			            var hash = SHA512._doFinalize.call(this);

			            hash.sigBytes -= 16;

			            return hash;
			        }
			    });

			    /**
			     * Shortcut function to the hasher's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     *
			     * @return {WordArray} The hash.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hash = CryptoJS.SHA384('message');
			     *     var hash = CryptoJS.SHA384(wordArray);
			     */
			    C.SHA384 = SHA512._createHelper(SHA384);

			    /**
			     * Shortcut function to the HMAC's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     * @param {WordArray|string} key The secret key.
			     *
			     * @return {WordArray} The HMAC.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hmac = CryptoJS.HmacSHA384(message, key);
			     */
			    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
			}());


			return CryptoJS.SHA384;

		})); 
	} (sha384$1));
	return sha384$1.exports;
}

var sha3$1 = {exports: {}};

var sha3 = sha3$1.exports;

var hasRequiredSha3;

function requireSha3 () {
	if (hasRequiredSha3) return sha3$1.exports;
	hasRequiredSha3 = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireX64Core());
			}
		}(sha3, function (CryptoJS) {

			(function (Math) {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var Hasher = C_lib.Hasher;
			    var C_x64 = C.x64;
			    var X64Word = C_x64.Word;
			    var C_algo = C.algo;

			    // Constants tables
			    var RHO_OFFSETS = [];
			    var PI_INDEXES  = [];
			    var ROUND_CONSTANTS = [];

			    // Compute Constants
			    (function () {
			        // Compute rho offset constants
			        var x = 1, y = 0;
			        for (var t = 0; t < 24; t++) {
			            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

			            var newX = y % 5;
			            var newY = (2 * x + 3 * y) % 5;
			            x = newX;
			            y = newY;
			        }

			        // Compute pi index constants
			        for (var x = 0; x < 5; x++) {
			            for (var y = 0; y < 5; y++) {
			                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
			            }
			        }

			        // Compute round constants
			        var LFSR = 0x01;
			        for (var i = 0; i < 24; i++) {
			            var roundConstantMsw = 0;
			            var roundConstantLsw = 0;

			            for (var j = 0; j < 7; j++) {
			                if (LFSR & 0x01) {
			                    var bitPosition = (1 << j) - 1;
			                    if (bitPosition < 32) {
			                        roundConstantLsw ^= 1 << bitPosition;
			                    } else /* if (bitPosition >= 32) */ {
			                        roundConstantMsw ^= 1 << (bitPosition - 32);
			                    }
			                }

			                // Compute next LFSR
			                if (LFSR & 0x80) {
			                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
			                    LFSR = (LFSR << 1) ^ 0x71;
			                } else {
			                    LFSR <<= 1;
			                }
			            }

			            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
			        }
			    }());

			    // Reusable objects for temporary values
			    var T = [];
			    (function () {
			        for (var i = 0; i < 25; i++) {
			            T[i] = X64Word.create();
			        }
			    }());

			    /**
			     * SHA-3 hash algorithm.
			     */
			    var SHA3 = C_algo.SHA3 = Hasher.extend({
			        /**
			         * Configuration options.
			         *
			         * @property {number} outputLength
			         *   The desired number of bits in the output hash.
			         *   Only values permitted are: 224, 256, 384, 512.
			         *   Default: 512
			         */
			        cfg: Hasher.cfg.extend({
			            outputLength: 512
			        }),

			        _doReset: function () {
			            var state = this._state = [];
			            for (var i = 0; i < 25; i++) {
			                state[i] = new X64Word.init();
			            }

			            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
			        },

			        _doProcessBlock: function (M, offset) {
			            // Shortcuts
			            var state = this._state;
			            var nBlockSizeLanes = this.blockSize / 2;

			            // Absorb
			            for (var i = 0; i < nBlockSizeLanes; i++) {
			                // Shortcuts
			                var M2i  = M[offset + 2 * i];
			                var M2i1 = M[offset + 2 * i + 1];

			                // Swap endian
			                M2i = (
			                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
			                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
			                );
			                M2i1 = (
			                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
			                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
			                );

			                // Absorb message into state
			                var lane = state[i];
			                lane.high ^= M2i1;
			                lane.low  ^= M2i;
			            }

			            // Rounds
			            for (var round = 0; round < 24; round++) {
			                // Theta
			                for (var x = 0; x < 5; x++) {
			                    // Mix column lanes
			                    var tMsw = 0, tLsw = 0;
			                    for (var y = 0; y < 5; y++) {
			                        var lane = state[x + 5 * y];
			                        tMsw ^= lane.high;
			                        tLsw ^= lane.low;
			                    }

			                    // Temporary values
			                    var Tx = T[x];
			                    Tx.high = tMsw;
			                    Tx.low  = tLsw;
			                }
			                for (var x = 0; x < 5; x++) {
			                    // Shortcuts
			                    var Tx4 = T[(x + 4) % 5];
			                    var Tx1 = T[(x + 1) % 5];
			                    var Tx1Msw = Tx1.high;
			                    var Tx1Lsw = Tx1.low;

			                    // Mix surrounding columns
			                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
			                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
			                    for (var y = 0; y < 5; y++) {
			                        var lane = state[x + 5 * y];
			                        lane.high ^= tMsw;
			                        lane.low  ^= tLsw;
			                    }
			                }

			                // Rho Pi
			                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
			                    var tMsw;
			                    var tLsw;

			                    // Shortcuts
			                    var lane = state[laneIndex];
			                    var laneMsw = lane.high;
			                    var laneLsw = lane.low;
			                    var rhoOffset = RHO_OFFSETS[laneIndex];

			                    // Rotate lanes
			                    if (rhoOffset < 32) {
			                        tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
			                        tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
			                    } else /* if (rhoOffset >= 32) */ {
			                        tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
			                        tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
			                    }

			                    // Transpose lanes
			                    var TPiLane = T[PI_INDEXES[laneIndex]];
			                    TPiLane.high = tMsw;
			                    TPiLane.low  = tLsw;
			                }

			                // Rho pi at x = y = 0
			                var T0 = T[0];
			                var state0 = state[0];
			                T0.high = state0.high;
			                T0.low  = state0.low;

			                // Chi
			                for (var x = 0; x < 5; x++) {
			                    for (var y = 0; y < 5; y++) {
			                        // Shortcuts
			                        var laneIndex = x + 5 * y;
			                        var lane = state[laneIndex];
			                        var TLane = T[laneIndex];
			                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
			                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

			                        // Mix rows
			                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
			                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
			                    }
			                }

			                // Iota
			                var lane = state[0];
			                var roundConstant = ROUND_CONSTANTS[round];
			                lane.high ^= roundConstant.high;
			                lane.low  ^= roundConstant.low;
			            }
			        },

			        _doFinalize: function () {
			            // Shortcuts
			            var data = this._data;
			            var dataWords = data.words;
			            this._nDataBytes * 8;
			            var nBitsLeft = data.sigBytes * 8;
			            var blockSizeBits = this.blockSize * 32;

			            // Add padding
			            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
			            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
			            data.sigBytes = dataWords.length * 4;

			            // Hash final blocks
			            this._process();

			            // Shortcuts
			            var state = this._state;
			            var outputLengthBytes = this.cfg.outputLength / 8;
			            var outputLengthLanes = outputLengthBytes / 8;

			            // Squeeze
			            var hashWords = [];
			            for (var i = 0; i < outputLengthLanes; i++) {
			                // Shortcuts
			                var lane = state[i];
			                var laneMsw = lane.high;
			                var laneLsw = lane.low;

			                // Swap endian
			                laneMsw = (
			                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
			                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
			                );
			                laneLsw = (
			                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
			                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
			                );

			                // Squeeze state to retrieve hash
			                hashWords.push(laneLsw);
			                hashWords.push(laneMsw);
			            }

			            // Return final computed hash
			            return new WordArray.init(hashWords, outputLengthBytes);
			        },

			        clone: function () {
			            var clone = Hasher.clone.call(this);

			            var state = clone._state = this._state.slice(0);
			            for (var i = 0; i < 25; i++) {
			                state[i] = state[i].clone();
			            }

			            return clone;
			        }
			    });

			    /**
			     * Shortcut function to the hasher's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     *
			     * @return {WordArray} The hash.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hash = CryptoJS.SHA3('message');
			     *     var hash = CryptoJS.SHA3(wordArray);
			     */
			    C.SHA3 = Hasher._createHelper(SHA3);

			    /**
			     * Shortcut function to the HMAC's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     * @param {WordArray|string} key The secret key.
			     *
			     * @return {WordArray} The HMAC.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hmac = CryptoJS.HmacSHA3(message, key);
			     */
			    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
			}(Math));


			return CryptoJS.SHA3;

		})); 
	} (sha3$1));
	return sha3$1.exports;
}

var ripemd160$1 = {exports: {}};

var ripemd160 = ripemd160$1.exports;

var hasRequiredRipemd160;

function requireRipemd160 () {
	if (hasRequiredRipemd160) return ripemd160$1.exports;
	hasRequiredRipemd160 = 1;
	(function (module, exports$1) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(ripemd160, function (CryptoJS) {

			/** @preserve
			(c) 2012 by Cédric Mesnil. All rights reserved.

			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
			*/

			(function (Math) {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var Hasher = C_lib.Hasher;
			    var C_algo = C.algo;

			    // Constants table
			    var _zl = WordArray.create([
			        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
			        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
			        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
			        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
			        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
			    var _zr = WordArray.create([
			        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
			        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
			        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
			        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
			        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
			    var _sl = WordArray.create([
			         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
			        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
			        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
			          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
			        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
			    var _sr = WordArray.create([
			        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
			        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
			        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
			        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
			        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);

			    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
			    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

			    /**
			     * RIPEMD160 hash algorithm.
			     */
			    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
			        _doReset: function () {
			            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
			        },

			        _doProcessBlock: function (M, offset) {

			            // Swap endian
			            for (var i = 0; i < 16; i++) {
			                // Shortcuts
			                var offset_i = offset + i;
			                var M_offset_i = M[offset_i];

			                // Swap
			                M[offset_i] = (
			                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
			                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
			                );
			            }
			            // Shortcut
			            var H  = this._hash.words;
			            var hl = _hl.words;
			            var hr = _hr.words;
			            var zl = _zl.words;
			            var zr = _zr.words;
			            var sl = _sl.words;
			            var sr = _sr.words;

			            // Working variables
			            var al, bl, cl, dl, el;
			            var ar, br, cr, dr, er;

			            ar = al = H[0];
			            br = bl = H[1];
			            cr = cl = H[2];
			            dr = dl = H[3];
			            er = el = H[4];
			            // Computation
			            var t;
			            for (var i = 0; i < 80; i += 1) {
			                t = (al +  M[offset+zl[i]])|0;
			                if (i<16){
				            t +=  f1(bl,cl,dl) + hl[0];
			                } else if (i<32) {
				            t +=  f2(bl,cl,dl) + hl[1];
			                } else if (i<48) {
				            t +=  f3(bl,cl,dl) + hl[2];
			                } else if (i<64) {
				            t +=  f4(bl,cl,dl) + hl[3];
			                } else {// if (i<80) {
				            t +=  f5(bl,cl,dl) + hl[4];
			                }
			                t = t|0;
			                t =  rotl(t,sl[i]);
			                t = (t+el)|0;
			                al = el;
			                el = dl;
			                dl = rotl(cl, 10);
			                cl = bl;
			                bl = t;

			                t = (ar + M[offset+zr[i]])|0;
			                if (i<16){
				            t +=  f5(br,cr,dr) + hr[0];
			                } else if (i<32) {
				            t +=  f4(br,cr,dr) + hr[1];
			                } else if (i<48) {
				            t +=  f3(br,cr,dr) + hr[2];
			                } else if (i<64) {
				            t +=  f2(br,cr,dr) + hr[3];
			                } else {// if (i<80) {
				            t +=  f1(br,cr,dr) + hr[4];
			                }
			                t = t|0;
			                t =  rotl(t,sr[i]) ;
			                t = (t+er)|0;
			                ar = er;
			                er = dr;
			                dr = rotl(cr, 10);
			                cr = br;
			                br = t;
			            }
			            // Intermediate hash value
			            t    = (H[1] + cl + dr)|0;
			            H[1] = (H[2] + dl + er)|0;
			            H[2] = (H[3] + el + ar)|0;
			            H[3] = (H[4] + al + br)|0;
			            H[4] = (H[0] + bl + cr)|0;
			            H[0] =  t;
			        },

			        _doFinalize: function () {
			            // Shortcuts
			            var data = this._data;
			            var dataWords = data.words;

			            var nBitsTotal = this._nDataBytes * 8;
			            var nBitsLeft = data.sigBytes * 8;

			            // Add padding
			            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
			            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
			                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
			                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
			            );
			            data.sigBytes = (dataWords.length + 1) * 4;

			            // Hash final blocks
			            this._process();

			            // Shortcuts
			            var hash = this._hash;
			            var H = hash.words;

			            // Swap endian
			            for (var i = 0; i < 5; i++) {
			                // Shortcut
			                var H_i = H[i];

			                // Swap
			                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
			                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
			            }

			            // Return final computed hash
			            return hash;
			        },

			        clone: function () {
			            var clone = Hasher.clone.call(this);
			            clone._hash = this._hash.clone();

			            return clone;
			        }
			    });


			    function f1(x, y, z) {
			        return ((x) ^ (y) ^ (z));

			    }

			    function f2(x, y, z) {
			        return (((x)&(y)) | ((~x)&(z)));
			    }

			    function f3(x, y, z) {
			        return (((x) | (~(y))) ^ (z));
			    }

			    function f4(x, y, z) {
			        return (((x) & (z)) | ((y)&(~(z))));
			    }

			    function f5(x, y, z) {
			        return ((x) ^ ((y) |(~(z))));

			    }

			    function rotl(x,n) {
			        return (x<<n) | (x>>>(32-n));
			    }


			    /**
			     * Shortcut function to the hasher's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     *
			     * @return {WordArray} The hash.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hash = CryptoJS.RIPEMD160('message');
			     *     var hash = CryptoJS.RIPEMD160(wordArray);
			     */
			    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

			    /**
			     * Shortcut function to the HMAC's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     * @param {WordArray|string} key The secret key.
			     *
			     * @return {WordArray} The HMAC.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
			     */
			    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
			}());


			return CryptoJS.RIPEMD160;

		})); 
	} (ripemd160$1));
	return ripemd160$1.exports;
}

var hmac$1 = {exports: {}};

var hmac = hmac$1.exports;

var hasRequiredHmac;

function requireHmac () {
	if (hasRequiredHmac) return hmac$1.exports;
	hasRequiredHmac = 1;
	(function (module, exports$1) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(hmac, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var Base = C_lib.Base;
			    var C_enc = C.enc;
			    var Utf8 = C_enc.Utf8;
			    var C_algo = C.algo;

			    /**
			     * HMAC algorithm.
			     */
			    C_algo.HMAC = Base.extend({
			        /**
			         * Initializes a newly created HMAC.
			         *
			         * @param {Hasher} hasher The hash algorithm to use.
			         * @param {WordArray|string} key The secret key.
			         *
			         * @example
			         *
			         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
			         */
			        init: function (hasher, key) {
			            // Init hasher
			            hasher = this._hasher = new hasher.init();

			            // Convert string to WordArray, else assume WordArray already
			            if (typeof key == 'string') {
			                key = Utf8.parse(key);
			            }

			            // Shortcuts
			            var hasherBlockSize = hasher.blockSize;
			            var hasherBlockSizeBytes = hasherBlockSize * 4;

			            // Allow arbitrary length keys
			            if (key.sigBytes > hasherBlockSizeBytes) {
			                key = hasher.finalize(key);
			            }

			            // Clamp excess bits
			            key.clamp();

			            // Clone key for inner and outer pads
			            var oKey = this._oKey = key.clone();
			            var iKey = this._iKey = key.clone();

			            // Shortcuts
			            var oKeyWords = oKey.words;
			            var iKeyWords = iKey.words;

			            // XOR keys with pad constants
			            for (var i = 0; i < hasherBlockSize; i++) {
			                oKeyWords[i] ^= 0x5c5c5c5c;
			                iKeyWords[i] ^= 0x36363636;
			            }
			            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

			            // Set initial values
			            this.reset();
			        },

			        /**
			         * Resets this HMAC to its initial state.
			         *
			         * @example
			         *
			         *     hmacHasher.reset();
			         */
			        reset: function () {
			            // Shortcut
			            var hasher = this._hasher;

			            // Reset
			            hasher.reset();
			            hasher.update(this._iKey);
			        },

			        /**
			         * Updates this HMAC with a message.
			         *
			         * @param {WordArray|string} messageUpdate The message to append.
			         *
			         * @return {HMAC} This HMAC instance.
			         *
			         * @example
			         *
			         *     hmacHasher.update('message');
			         *     hmacHasher.update(wordArray);
			         */
			        update: function (messageUpdate) {
			            this._hasher.update(messageUpdate);

			            // Chainable
			            return this;
			        },

			        /**
			         * Finalizes the HMAC computation.
			         * Note that the finalize operation is effectively a destructive, read-once operation.
			         *
			         * @param {WordArray|string} messageUpdate (Optional) A final message update.
			         *
			         * @return {WordArray} The HMAC.
			         *
			         * @example
			         *
			         *     var hmac = hmacHasher.finalize();
			         *     var hmac = hmacHasher.finalize('message');
			         *     var hmac = hmacHasher.finalize(wordArray);
			         */
			        finalize: function (messageUpdate) {
			            // Shortcut
			            var hasher = this._hasher;

			            // Compute HMAC
			            var innerHash = hasher.finalize(messageUpdate);
			            hasher.reset();
			            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

			            return hmac;
			        }
			    });
			}());


		})); 
	} (hmac$1));
	return hmac$1.exports;
}

var pbkdf2$1 = {exports: {}};

var pbkdf2 = pbkdf2$1.exports;

var hasRequiredPbkdf2;

function requirePbkdf2 () {
	if (hasRequiredPbkdf2) return pbkdf2$1.exports;
	hasRequiredPbkdf2 = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireSha256(), requireHmac());
			}
		}(pbkdf2, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var Base = C_lib.Base;
			    var WordArray = C_lib.WordArray;
			    var C_algo = C.algo;
			    var SHA256 = C_algo.SHA256;
			    var HMAC = C_algo.HMAC;

			    /**
			     * Password-Based Key Derivation Function 2 algorithm.
			     */
			    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
			        /**
			         * Configuration options.
			         *
			         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
			         * @property {Hasher} hasher The hasher to use. Default: SHA256
			         * @property {number} iterations The number of iterations to perform. Default: 250000
			         */
			        cfg: Base.extend({
			            keySize: 128/32,
			            hasher: SHA256,
			            iterations: 250000
			        }),

			        /**
			         * Initializes a newly created key derivation function.
			         *
			         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
			         *
			         * @example
			         *
			         *     var kdf = CryptoJS.algo.PBKDF2.create();
			         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
			         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
			         */
			        init: function (cfg) {
			            this.cfg = this.cfg.extend(cfg);
			        },

			        /**
			         * Computes the Password-Based Key Derivation Function 2.
			         *
			         * @param {WordArray|string} password The password.
			         * @param {WordArray|string} salt A salt.
			         *
			         * @return {WordArray} The derived key.
			         *
			         * @example
			         *
			         *     var key = kdf.compute(password, salt);
			         */
			        compute: function (password, salt) {
			            // Shortcut
			            var cfg = this.cfg;

			            // Init HMAC
			            var hmac = HMAC.create(cfg.hasher, password);

			            // Initial values
			            var derivedKey = WordArray.create();
			            var blockIndex = WordArray.create([0x00000001]);

			            // Shortcuts
			            var derivedKeyWords = derivedKey.words;
			            var blockIndexWords = blockIndex.words;
			            var keySize = cfg.keySize;
			            var iterations = cfg.iterations;

			            // Generate key
			            while (derivedKeyWords.length < keySize) {
			                var block = hmac.update(salt).finalize(blockIndex);
			                hmac.reset();

			                // Shortcuts
			                var blockWords = block.words;
			                var blockWordsLength = blockWords.length;

			                // Iterations
			                var intermediate = block;
			                for (var i = 1; i < iterations; i++) {
			                    intermediate = hmac.finalize(intermediate);
			                    hmac.reset();

			                    // Shortcut
			                    var intermediateWords = intermediate.words;

			                    // XOR intermediate with block
			                    for (var j = 0; j < blockWordsLength; j++) {
			                        blockWords[j] ^= intermediateWords[j];
			                    }
			                }

			                derivedKey.concat(block);
			                blockIndexWords[0]++;
			            }
			            derivedKey.sigBytes = keySize * 4;

			            return derivedKey;
			        }
			    });

			    /**
			     * Computes the Password-Based Key Derivation Function 2.
			     *
			     * @param {WordArray|string} password The password.
			     * @param {WordArray|string} salt A salt.
			     * @param {Object} cfg (Optional) The configuration options to use for this computation.
			     *
			     * @return {WordArray} The derived key.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var key = CryptoJS.PBKDF2(password, salt);
			     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
			     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
			     */
			    C.PBKDF2 = function (password, salt, cfg) {
			        return PBKDF2.create(cfg).compute(password, salt);
			    };
			}());


			return CryptoJS.PBKDF2;

		})); 
	} (pbkdf2$1));
	return pbkdf2$1.exports;
}

var evpkdf$1 = {exports: {}};

var evpkdf = evpkdf$1.exports;

var hasRequiredEvpkdf;

function requireEvpkdf () {
	if (hasRequiredEvpkdf) return evpkdf$1.exports;
	hasRequiredEvpkdf = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireSha1(), requireHmac());
			}
		}(evpkdf, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var Base = C_lib.Base;
			    var WordArray = C_lib.WordArray;
			    var C_algo = C.algo;
			    var MD5 = C_algo.MD5;

			    /**
			     * This key derivation function is meant to conform with EVP_BytesToKey.
			     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
			     */
			    var EvpKDF = C_algo.EvpKDF = Base.extend({
			        /**
			         * Configuration options.
			         *
			         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
			         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
			         * @property {number} iterations The number of iterations to perform. Default: 1
			         */
			        cfg: Base.extend({
			            keySize: 128/32,
			            hasher: MD5,
			            iterations: 1
			        }),

			        /**
			         * Initializes a newly created key derivation function.
			         *
			         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
			         *
			         * @example
			         *
			         *     var kdf = CryptoJS.algo.EvpKDF.create();
			         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
			         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
			         */
			        init: function (cfg) {
			            this.cfg = this.cfg.extend(cfg);
			        },

			        /**
			         * Derives a key from a password.
			         *
			         * @param {WordArray|string} password The password.
			         * @param {WordArray|string} salt A salt.
			         *
			         * @return {WordArray} The derived key.
			         *
			         * @example
			         *
			         *     var key = kdf.compute(password, salt);
			         */
			        compute: function (password, salt) {
			            var block;

			            // Shortcut
			            var cfg = this.cfg;

			            // Init hasher
			            var hasher = cfg.hasher.create();

			            // Initial values
			            var derivedKey = WordArray.create();

			            // Shortcuts
			            var derivedKeyWords = derivedKey.words;
			            var keySize = cfg.keySize;
			            var iterations = cfg.iterations;

			            // Generate key
			            while (derivedKeyWords.length < keySize) {
			                if (block) {
			                    hasher.update(block);
			                }
			                block = hasher.update(password).finalize(salt);
			                hasher.reset();

			                // Iterations
			                for (var i = 1; i < iterations; i++) {
			                    block = hasher.finalize(block);
			                    hasher.reset();
			                }

			                derivedKey.concat(block);
			            }
			            derivedKey.sigBytes = keySize * 4;

			            return derivedKey;
			        }
			    });

			    /**
			     * Derives a key from a password.
			     *
			     * @param {WordArray|string} password The password.
			     * @param {WordArray|string} salt A salt.
			     * @param {Object} cfg (Optional) The configuration options to use for this computation.
			     *
			     * @return {WordArray} The derived key.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var key = CryptoJS.EvpKDF(password, salt);
			     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
			     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
			     */
			    C.EvpKDF = function (password, salt, cfg) {
			        return EvpKDF.create(cfg).compute(password, salt);
			    };
			}());


			return CryptoJS.EvpKDF;

		})); 
	} (evpkdf$1));
	return evpkdf$1.exports;
}

var cipherCore$1 = {exports: {}};

var cipherCore = cipherCore$1.exports;

var hasRequiredCipherCore;

function requireCipherCore () {
	if (hasRequiredCipherCore) return cipherCore$1.exports;
	hasRequiredCipherCore = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireEvpkdf());
			}
		}(cipherCore, function (CryptoJS) {

			/**
			 * Cipher core components.
			 */
			CryptoJS.lib.Cipher || (function (undefined$1) {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var Base = C_lib.Base;
			    var WordArray = C_lib.WordArray;
			    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
			    var C_enc = C.enc;
			    C_enc.Utf8;
			    var Base64 = C_enc.Base64;
			    var C_algo = C.algo;
			    var EvpKDF = C_algo.EvpKDF;

			    /**
			     * Abstract base cipher template.
			     *
			     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
			     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
			     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
			     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
			     */
			    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
			        /**
			         * Configuration options.
			         *
			         * @property {WordArray} iv The IV to use for this operation.
			         */
			        cfg: Base.extend(),

			        /**
			         * Creates this cipher in encryption mode.
			         *
			         * @param {WordArray} key The key.
			         * @param {Object} cfg (Optional) The configuration options to use for this operation.
			         *
			         * @return {Cipher} A cipher instance.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
			         */
			        createEncryptor: function (key, cfg) {
			            return this.create(this._ENC_XFORM_MODE, key, cfg);
			        },

			        /**
			         * Creates this cipher in decryption mode.
			         *
			         * @param {WordArray} key The key.
			         * @param {Object} cfg (Optional) The configuration options to use for this operation.
			         *
			         * @return {Cipher} A cipher instance.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
			         */
			        createDecryptor: function (key, cfg) {
			            return this.create(this._DEC_XFORM_MODE, key, cfg);
			        },

			        /**
			         * Initializes a newly created cipher.
			         *
			         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
			         * @param {WordArray} key The key.
			         * @param {Object} cfg (Optional) The configuration options to use for this operation.
			         *
			         * @example
			         *
			         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
			         */
			        init: function (xformMode, key, cfg) {
			            // Apply config defaults
			            this.cfg = this.cfg.extend(cfg);

			            // Store transform mode and key
			            this._xformMode = xformMode;
			            this._key = key;

			            // Set initial values
			            this.reset();
			        },

			        /**
			         * Resets this cipher to its initial state.
			         *
			         * @example
			         *
			         *     cipher.reset();
			         */
			        reset: function () {
			            // Reset data buffer
			            BufferedBlockAlgorithm.reset.call(this);

			            // Perform concrete-cipher logic
			            this._doReset();
			        },

			        /**
			         * Adds data to be encrypted or decrypted.
			         *
			         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
			         *
			         * @return {WordArray} The data after processing.
			         *
			         * @example
			         *
			         *     var encrypted = cipher.process('data');
			         *     var encrypted = cipher.process(wordArray);
			         */
			        process: function (dataUpdate) {
			            // Append
			            this._append(dataUpdate);

			            // Process available blocks
			            return this._process();
			        },

			        /**
			         * Finalizes the encryption or decryption process.
			         * Note that the finalize operation is effectively a destructive, read-once operation.
			         *
			         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
			         *
			         * @return {WordArray} The data after final processing.
			         *
			         * @example
			         *
			         *     var encrypted = cipher.finalize();
			         *     var encrypted = cipher.finalize('data');
			         *     var encrypted = cipher.finalize(wordArray);
			         */
			        finalize: function (dataUpdate) {
			            // Final data update
			            if (dataUpdate) {
			                this._append(dataUpdate);
			            }

			            // Perform concrete-cipher logic
			            var finalProcessedData = this._doFinalize();

			            return finalProcessedData;
			        },

			        keySize: 128/32,

			        ivSize: 128/32,

			        _ENC_XFORM_MODE: 1,

			        _DEC_XFORM_MODE: 2,

			        /**
			         * Creates shortcut functions to a cipher's object interface.
			         *
			         * @param {Cipher} cipher The cipher to create a helper for.
			         *
			         * @return {Object} An object with encrypt and decrypt shortcut functions.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
			         */
			        _createHelper: (function () {
			            function selectCipherStrategy(key) {
			                if (typeof key == 'string') {
			                    return PasswordBasedCipher;
			                } else {
			                    return SerializableCipher;
			                }
			            }

			            return function (cipher) {
			                return {
			                    encrypt: function (message, key, cfg) {
			                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
			                    },

			                    decrypt: function (ciphertext, key, cfg) {
			                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
			                    }
			                };
			            };
			        }())
			    });

			    /**
			     * Abstract base stream cipher template.
			     *
			     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
			     */
			    C_lib.StreamCipher = Cipher.extend({
			        _doFinalize: function () {
			            // Process partial blocks
			            var finalProcessedBlocks = this._process(true);

			            return finalProcessedBlocks;
			        },

			        blockSize: 1
			    });

			    /**
			     * Mode namespace.
			     */
			    var C_mode = C.mode = {};

			    /**
			     * Abstract base block cipher mode template.
			     */
			    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
			        /**
			         * Creates this mode for encryption.
			         *
			         * @param {Cipher} cipher A block cipher instance.
			         * @param {Array} iv The IV words.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
			         */
			        createEncryptor: function (cipher, iv) {
			            return this.Encryptor.create(cipher, iv);
			        },

			        /**
			         * Creates this mode for decryption.
			         *
			         * @param {Cipher} cipher A block cipher instance.
			         * @param {Array} iv The IV words.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
			         */
			        createDecryptor: function (cipher, iv) {
			            return this.Decryptor.create(cipher, iv);
			        },

			        /**
			         * Initializes a newly created mode.
			         *
			         * @param {Cipher} cipher A block cipher instance.
			         * @param {Array} iv The IV words.
			         *
			         * @example
			         *
			         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
			         */
			        init: function (cipher, iv) {
			            this._cipher = cipher;
			            this._iv = iv;
			        }
			    });

			    /**
			     * Cipher Block Chaining mode.
			     */
			    var CBC = C_mode.CBC = (function () {
			        /**
			         * Abstract base CBC mode.
			         */
			        var CBC = BlockCipherMode.extend();

			        /**
			         * CBC encryptor.
			         */
			        CBC.Encryptor = CBC.extend({
			            /**
			             * Processes the data block at offset.
			             *
			             * @param {Array} words The data words to operate on.
			             * @param {number} offset The offset where the block starts.
			             *
			             * @example
			             *
			             *     mode.processBlock(data.words, offset);
			             */
			            processBlock: function (words, offset) {
			                // Shortcuts
			                var cipher = this._cipher;
			                var blockSize = cipher.blockSize;

			                // XOR and encrypt
			                xorBlock.call(this, words, offset, blockSize);
			                cipher.encryptBlock(words, offset);

			                // Remember this block to use with next block
			                this._prevBlock = words.slice(offset, offset + blockSize);
			            }
			        });

			        /**
			         * CBC decryptor.
			         */
			        CBC.Decryptor = CBC.extend({
			            /**
			             * Processes the data block at offset.
			             *
			             * @param {Array} words The data words to operate on.
			             * @param {number} offset The offset where the block starts.
			             *
			             * @example
			             *
			             *     mode.processBlock(data.words, offset);
			             */
			            processBlock: function (words, offset) {
			                // Shortcuts
			                var cipher = this._cipher;
			                var blockSize = cipher.blockSize;

			                // Remember this block to use with next block
			                var thisBlock = words.slice(offset, offset + blockSize);

			                // Decrypt and XOR
			                cipher.decryptBlock(words, offset);
			                xorBlock.call(this, words, offset, blockSize);

			                // This block becomes the previous block
			                this._prevBlock = thisBlock;
			            }
			        });

			        function xorBlock(words, offset, blockSize) {
			            var block;

			            // Shortcut
			            var iv = this._iv;

			            // Choose mixing block
			            if (iv) {
			                block = iv;

			                // Remove IV for subsequent blocks
			                this._iv = undefined$1;
			            } else {
			                block = this._prevBlock;
			            }

			            // XOR blocks
			            for (var i = 0; i < blockSize; i++) {
			                words[offset + i] ^= block[i];
			            }
			        }

			        return CBC;
			    }());

			    /**
			     * Padding namespace.
			     */
			    var C_pad = C.pad = {};

			    /**
			     * PKCS #5/7 padding strategy.
			     */
			    var Pkcs7 = C_pad.Pkcs7 = {
			        /**
			         * Pads data using the algorithm defined in PKCS #5/7.
			         *
			         * @param {WordArray} data The data to pad.
			         * @param {number} blockSize The multiple that the data should be padded to.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
			         */
			        pad: function (data, blockSize) {
			            // Shortcut
			            var blockSizeBytes = blockSize * 4;

			            // Count padding bytes
			            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

			            // Create padding word
			            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

			            // Create padding
			            var paddingWords = [];
			            for (var i = 0; i < nPaddingBytes; i += 4) {
			                paddingWords.push(paddingWord);
			            }
			            var padding = WordArray.create(paddingWords, nPaddingBytes);

			            // Add padding
			            data.concat(padding);
			        },

			        /**
			         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
			         *
			         * @param {WordArray} data The data to unpad.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
			         */
			        unpad: function (data) {
			            // Get number of padding bytes from last byte
			            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

			            // Remove padding
			            data.sigBytes -= nPaddingBytes;
			        }
			    };

			    /**
			     * Abstract base block cipher template.
			     *
			     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
			     */
			    C_lib.BlockCipher = Cipher.extend({
			        /**
			         * Configuration options.
			         *
			         * @property {Mode} mode The block mode to use. Default: CBC
			         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
			         */
			        cfg: Cipher.cfg.extend({
			            mode: CBC,
			            padding: Pkcs7
			        }),

			        reset: function () {
			            var modeCreator;

			            // Reset cipher
			            Cipher.reset.call(this);

			            // Shortcuts
			            var cfg = this.cfg;
			            var iv = cfg.iv;
			            var mode = cfg.mode;

			            // Reset block mode
			            if (this._xformMode == this._ENC_XFORM_MODE) {
			                modeCreator = mode.createEncryptor;
			            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
			                modeCreator = mode.createDecryptor;
			                // Keep at least one block in the buffer for unpadding
			                this._minBufferSize = 1;
			            }

			            if (this._mode && this._mode.__creator == modeCreator) {
			                this._mode.init(this, iv && iv.words);
			            } else {
			                this._mode = modeCreator.call(mode, this, iv && iv.words);
			                this._mode.__creator = modeCreator;
			            }
			        },

			        _doProcessBlock: function (words, offset) {
			            this._mode.processBlock(words, offset);
			        },

			        _doFinalize: function () {
			            var finalProcessedBlocks;

			            // Shortcut
			            var padding = this.cfg.padding;

			            // Finalize
			            if (this._xformMode == this._ENC_XFORM_MODE) {
			                // Pad data
			                padding.pad(this._data, this.blockSize);

			                // Process final blocks
			                finalProcessedBlocks = this._process(true);
			            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
			                // Process final blocks
			                finalProcessedBlocks = this._process(true);

			                // Unpad data
			                padding.unpad(finalProcessedBlocks);
			            }

			            return finalProcessedBlocks;
			        },

			        blockSize: 128/32
			    });

			    /**
			     * A collection of cipher parameters.
			     *
			     * @property {WordArray} ciphertext The raw ciphertext.
			     * @property {WordArray} key The key to this ciphertext.
			     * @property {WordArray} iv The IV used in the ciphering operation.
			     * @property {WordArray} salt The salt used with a key derivation function.
			     * @property {Cipher} algorithm The cipher algorithm.
			     * @property {Mode} mode The block mode used in the ciphering operation.
			     * @property {Padding} padding The padding scheme used in the ciphering operation.
			     * @property {number} blockSize The block size of the cipher.
			     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
			     */
			    var CipherParams = C_lib.CipherParams = Base.extend({
			        /**
			         * Initializes a newly created cipher params object.
			         *
			         * @param {Object} cipherParams An object with any of the possible cipher parameters.
			         *
			         * @example
			         *
			         *     var cipherParams = CryptoJS.lib.CipherParams.create({
			         *         ciphertext: ciphertextWordArray,
			         *         key: keyWordArray,
			         *         iv: ivWordArray,
			         *         salt: saltWordArray,
			         *         algorithm: CryptoJS.algo.AES,
			         *         mode: CryptoJS.mode.CBC,
			         *         padding: CryptoJS.pad.PKCS7,
			         *         blockSize: 4,
			         *         formatter: CryptoJS.format.OpenSSL
			         *     });
			         */
			        init: function (cipherParams) {
			            this.mixIn(cipherParams);
			        },

			        /**
			         * Converts this cipher params object to a string.
			         *
			         * @param {Format} formatter (Optional) The formatting strategy to use.
			         *
			         * @return {string} The stringified cipher params.
			         *
			         * @throws Error If neither the formatter nor the default formatter is set.
			         *
			         * @example
			         *
			         *     var string = cipherParams + '';
			         *     var string = cipherParams.toString();
			         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
			         */
			        toString: function (formatter) {
			            return (formatter || this.formatter).stringify(this);
			        }
			    });

			    /**
			     * Format namespace.
			     */
			    var C_format = C.format = {};

			    /**
			     * OpenSSL formatting strategy.
			     */
			    var OpenSSLFormatter = C_format.OpenSSL = {
			        /**
			         * Converts a cipher params object to an OpenSSL-compatible string.
			         *
			         * @param {CipherParams} cipherParams The cipher params object.
			         *
			         * @return {string} The OpenSSL-compatible string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
			         */
			        stringify: function (cipherParams) {
			            var wordArray;

			            // Shortcuts
			            var ciphertext = cipherParams.ciphertext;
			            var salt = cipherParams.salt;

			            // Format
			            if (salt) {
			                wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
			            } else {
			                wordArray = ciphertext;
			            }

			            return wordArray.toString(Base64);
			        },

			        /**
			         * Converts an OpenSSL-compatible string to a cipher params object.
			         *
			         * @param {string} openSSLStr The OpenSSL-compatible string.
			         *
			         * @return {CipherParams} The cipher params object.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
			         */
			        parse: function (openSSLStr) {
			            var salt;

			            // Parse base64
			            var ciphertext = Base64.parse(openSSLStr);

			            // Shortcut
			            var ciphertextWords = ciphertext.words;

			            // Test for salt
			            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
			                // Extract salt
			                salt = WordArray.create(ciphertextWords.slice(2, 4));

			                // Remove salt from ciphertext
			                ciphertextWords.splice(0, 4);
			                ciphertext.sigBytes -= 16;
			            }

			            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
			        }
			    };

			    /**
			     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
			     */
			    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
			        /**
			         * Configuration options.
			         *
			         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
			         */
			        cfg: Base.extend({
			            format: OpenSSLFormatter
			        }),

			        /**
			         * Encrypts a message.
			         *
			         * @param {Cipher} cipher The cipher algorithm to use.
			         * @param {WordArray|string} message The message to encrypt.
			         * @param {WordArray} key The key.
			         * @param {Object} cfg (Optional) The configuration options to use for this operation.
			         *
			         * @return {CipherParams} A cipher params object.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
			         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
			         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
			         */
			        encrypt: function (cipher, message, key, cfg) {
			            // Apply config defaults
			            cfg = this.cfg.extend(cfg);

			            // Encrypt
			            var encryptor = cipher.createEncryptor(key, cfg);
			            var ciphertext = encryptor.finalize(message);

			            // Shortcut
			            var cipherCfg = encryptor.cfg;

			            // Create and return serializable cipher params
			            return CipherParams.create({
			                ciphertext: ciphertext,
			                key: key,
			                iv: cipherCfg.iv,
			                algorithm: cipher,
			                mode: cipherCfg.mode,
			                padding: cipherCfg.padding,
			                blockSize: cipher.blockSize,
			                formatter: cfg.format
			            });
			        },

			        /**
			         * Decrypts serialized ciphertext.
			         *
			         * @param {Cipher} cipher The cipher algorithm to use.
			         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
			         * @param {WordArray} key The key.
			         * @param {Object} cfg (Optional) The configuration options to use for this operation.
			         *
			         * @return {WordArray} The plaintext.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
			         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
			         */
			        decrypt: function (cipher, ciphertext, key, cfg) {
			            // Apply config defaults
			            cfg = this.cfg.extend(cfg);

			            // Convert string to CipherParams
			            ciphertext = this._parse(ciphertext, cfg.format);

			            // Decrypt
			            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

			            return plaintext;
			        },

			        /**
			         * Converts serialized ciphertext to CipherParams,
			         * else assumed CipherParams already and returns ciphertext unchanged.
			         *
			         * @param {CipherParams|string} ciphertext The ciphertext.
			         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
			         *
			         * @return {CipherParams} The unserialized ciphertext.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
			         */
			        _parse: function (ciphertext, format) {
			            if (typeof ciphertext == 'string') {
			                return format.parse(ciphertext, this);
			            } else {
			                return ciphertext;
			            }
			        }
			    });

			    /**
			     * Key derivation function namespace.
			     */
			    var C_kdf = C.kdf = {};

			    /**
			     * OpenSSL key derivation function.
			     */
			    var OpenSSLKdf = C_kdf.OpenSSL = {
			        /**
			         * Derives a key and IV from a password.
			         *
			         * @param {string} password The password to derive from.
			         * @param {number} keySize The size in words of the key to generate.
			         * @param {number} ivSize The size in words of the IV to generate.
			         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
			         *
			         * @return {CipherParams} A cipher params object with the key, IV, and salt.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
			         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
			         */
			        execute: function (password, keySize, ivSize, salt, hasher) {
			            // Generate random salt
			            if (!salt) {
			                salt = WordArray.random(64/8);
			            }

			            // Derive key and IV
			            if (!hasher) {
			                var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
			            } else {
			                var key = EvpKDF.create({ keySize: keySize + ivSize, hasher: hasher }).compute(password, salt);
			            }


			            // Separate key and IV
			            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
			            key.sigBytes = keySize * 4;

			            // Return params
			            return CipherParams.create({ key: key, iv: iv, salt: salt });
			        }
			    };

			    /**
			     * A serializable cipher wrapper that derives the key from a password,
			     * and returns ciphertext as a serializable cipher params object.
			     */
			    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
			        /**
			         * Configuration options.
			         *
			         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
			         */
			        cfg: SerializableCipher.cfg.extend({
			            kdf: OpenSSLKdf
			        }),

			        /**
			         * Encrypts a message using a password.
			         *
			         * @param {Cipher} cipher The cipher algorithm to use.
			         * @param {WordArray|string} message The message to encrypt.
			         * @param {string} password The password.
			         * @param {Object} cfg (Optional) The configuration options to use for this operation.
			         *
			         * @return {CipherParams} A cipher params object.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
			         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
			         */
			        encrypt: function (cipher, message, password, cfg) {
			            // Apply config defaults
			            cfg = this.cfg.extend(cfg);

			            // Derive key and other params
			            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, cfg.salt, cfg.hasher);

			            // Add IV to config
			            cfg.iv = derivedParams.iv;

			            // Encrypt
			            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

			            // Mix in derived params
			            ciphertext.mixIn(derivedParams);

			            return ciphertext;
			        },

			        /**
			         * Decrypts serialized ciphertext using a password.
			         *
			         * @param {Cipher} cipher The cipher algorithm to use.
			         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
			         * @param {string} password The password.
			         * @param {Object} cfg (Optional) The configuration options to use for this operation.
			         *
			         * @return {WordArray} The plaintext.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
			         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
			         */
			        decrypt: function (cipher, ciphertext, password, cfg) {
			            // Apply config defaults
			            cfg = this.cfg.extend(cfg);

			            // Convert string to CipherParams
			            ciphertext = this._parse(ciphertext, cfg.format);

			            // Derive key and other params
			            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt, cfg.hasher);

			            // Add IV to config
			            cfg.iv = derivedParams.iv;

			            // Decrypt
			            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

			            return plaintext;
			        }
			    });
			}());


		})); 
	} (cipherCore$1));
	return cipherCore$1.exports;
}

var modeCfb$1 = {exports: {}};

var modeCfb = modeCfb$1.exports;

var hasRequiredModeCfb;

function requireModeCfb () {
	if (hasRequiredModeCfb) return modeCfb$1.exports;
	hasRequiredModeCfb = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireCipherCore());
			}
		}(modeCfb, function (CryptoJS) {

			/**
			 * Cipher Feedback block mode.
			 */
			CryptoJS.mode.CFB = (function () {
			    var CFB = CryptoJS.lib.BlockCipherMode.extend();

			    CFB.Encryptor = CFB.extend({
			        processBlock: function (words, offset) {
			            // Shortcuts
			            var cipher = this._cipher;
			            var blockSize = cipher.blockSize;

			            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

			            // Remember this block to use with next block
			            this._prevBlock = words.slice(offset, offset + blockSize);
			        }
			    });

			    CFB.Decryptor = CFB.extend({
			        processBlock: function (words, offset) {
			            // Shortcuts
			            var cipher = this._cipher;
			            var blockSize = cipher.blockSize;

			            // Remember this block to use with next block
			            var thisBlock = words.slice(offset, offset + blockSize);

			            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

			            // This block becomes the previous block
			            this._prevBlock = thisBlock;
			        }
			    });

			    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
			        var keystream;

			        // Shortcut
			        var iv = this._iv;

			        // Generate keystream
			        if (iv) {
			            keystream = iv.slice(0);

			            // Remove IV for subsequent blocks
			            this._iv = undefined;
			        } else {
			            keystream = this._prevBlock;
			        }
			        cipher.encryptBlock(keystream, 0);

			        // Encrypt
			        for (var i = 0; i < blockSize; i++) {
			            words[offset + i] ^= keystream[i];
			        }
			    }

			    return CFB;
			}());


			return CryptoJS.mode.CFB;

		})); 
	} (modeCfb$1));
	return modeCfb$1.exports;
}

var modeCtr$1 = {exports: {}};

var modeCtr = modeCtr$1.exports;

var hasRequiredModeCtr;

function requireModeCtr () {
	if (hasRequiredModeCtr) return modeCtr$1.exports;
	hasRequiredModeCtr = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireCipherCore());
			}
		}(modeCtr, function (CryptoJS) {

			/**
			 * Counter block mode.
			 */
			CryptoJS.mode.CTR = (function () {
			    var CTR = CryptoJS.lib.BlockCipherMode.extend();

			    var Encryptor = CTR.Encryptor = CTR.extend({
			        processBlock: function (words, offset) {
			            // Shortcuts
			            var cipher = this._cipher;
			            var blockSize = cipher.blockSize;
			            var iv = this._iv;
			            var counter = this._counter;

			            // Generate keystream
			            if (iv) {
			                counter = this._counter = iv.slice(0);

			                // Remove IV for subsequent blocks
			                this._iv = undefined;
			            }
			            var keystream = counter.slice(0);
			            cipher.encryptBlock(keystream, 0);

			            // Increment counter
			            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0;

			            // Encrypt
			            for (var i = 0; i < blockSize; i++) {
			                words[offset + i] ^= keystream[i];
			            }
			        }
			    });

			    CTR.Decryptor = Encryptor;

			    return CTR;
			}());


			return CryptoJS.mode.CTR;

		})); 
	} (modeCtr$1));
	return modeCtr$1.exports;
}

var modeCtrGladman$1 = {exports: {}};

var modeCtrGladman = modeCtrGladman$1.exports;

var hasRequiredModeCtrGladman;

function requireModeCtrGladman () {
	if (hasRequiredModeCtrGladman) return modeCtrGladman$1.exports;
	hasRequiredModeCtrGladman = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireCipherCore());
			}
		}(modeCtrGladman, function (CryptoJS) {

			/** @preserve
			 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
			 * derived from CryptoJS.mode.CTR
			 * Jan Hruby jhruby.web@gmail.com
			 */
			CryptoJS.mode.CTRGladman = (function () {
			    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

				function incWord(word)
				{
					if (((word >> 24) & 0xff) === 0xff) { //overflow
					var b1 = (word >> 16)&0xff;
					var b2 = (word >> 8)&0xff;
					var b3 = word & 0xff;

					if (b1 === 0xff) // overflow b1
					{
					b1 = 0;
					if (b2 === 0xff)
					{
						b2 = 0;
						if (b3 === 0xff)
						{
							b3 = 0;
						}
						else
						{
							++b3;
						}
					}
					else
					{
						++b2;
					}
					}
					else
					{
					++b1;
					}

					word = 0;
					word += (b1 << 16);
					word += (b2 << 8);
					word += b3;
					}
					else
					{
					word += (0x01 << 24);
					}
					return word;
				}

				function incCounter(counter)
				{
					if ((counter[0] = incWord(counter[0])) === 0)
					{
						// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
						counter[1] = incWord(counter[1]);
					}
					return counter;
				}

			    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
			        processBlock: function (words, offset) {
			            // Shortcuts
			            var cipher = this._cipher;
			            var blockSize = cipher.blockSize;
			            var iv = this._iv;
			            var counter = this._counter;

			            // Generate keystream
			            if (iv) {
			                counter = this._counter = iv.slice(0);

			                // Remove IV for subsequent blocks
			                this._iv = undefined;
			            }

						incCounter(counter);

						var keystream = counter.slice(0);
			            cipher.encryptBlock(keystream, 0);

			            // Encrypt
			            for (var i = 0; i < blockSize; i++) {
			                words[offset + i] ^= keystream[i];
			            }
			        }
			    });

			    CTRGladman.Decryptor = Encryptor;

			    return CTRGladman;
			}());




			return CryptoJS.mode.CTRGladman;

		})); 
	} (modeCtrGladman$1));
	return modeCtrGladman$1.exports;
}

var modeOfb$1 = {exports: {}};

var modeOfb = modeOfb$1.exports;

var hasRequiredModeOfb;

function requireModeOfb () {
	if (hasRequiredModeOfb) return modeOfb$1.exports;
	hasRequiredModeOfb = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireCipherCore());
			}
		}(modeOfb, function (CryptoJS) {

			/**
			 * Output Feedback block mode.
			 */
			CryptoJS.mode.OFB = (function () {
			    var OFB = CryptoJS.lib.BlockCipherMode.extend();

			    var Encryptor = OFB.Encryptor = OFB.extend({
			        processBlock: function (words, offset) {
			            // Shortcuts
			            var cipher = this._cipher;
			            var blockSize = cipher.blockSize;
			            var iv = this._iv;
			            var keystream = this._keystream;

			            // Generate keystream
			            if (iv) {
			                keystream = this._keystream = iv.slice(0);

			                // Remove IV for subsequent blocks
			                this._iv = undefined;
			            }
			            cipher.encryptBlock(keystream, 0);

			            // Encrypt
			            for (var i = 0; i < blockSize; i++) {
			                words[offset + i] ^= keystream[i];
			            }
			        }
			    });

			    OFB.Decryptor = Encryptor;

			    return OFB;
			}());


			return CryptoJS.mode.OFB;

		})); 
	} (modeOfb$1));
	return modeOfb$1.exports;
}

var modeEcb$1 = {exports: {}};

var modeEcb = modeEcb$1.exports;

var hasRequiredModeEcb;

function requireModeEcb () {
	if (hasRequiredModeEcb) return modeEcb$1.exports;
	hasRequiredModeEcb = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireCipherCore());
			}
		}(modeEcb, function (CryptoJS) {

			/**
			 * Electronic Codebook block mode.
			 */
			CryptoJS.mode.ECB = (function () {
			    var ECB = CryptoJS.lib.BlockCipherMode.extend();

			    ECB.Encryptor = ECB.extend({
			        processBlock: function (words, offset) {
			            this._cipher.encryptBlock(words, offset);
			        }
			    });

			    ECB.Decryptor = ECB.extend({
			        processBlock: function (words, offset) {
			            this._cipher.decryptBlock(words, offset);
			        }
			    });

			    return ECB;
			}());


			return CryptoJS.mode.ECB;

		})); 
	} (modeEcb$1));
	return modeEcb$1.exports;
}

var padAnsix923$1 = {exports: {}};

var padAnsix923 = padAnsix923$1.exports;

var hasRequiredPadAnsix923;

function requirePadAnsix923 () {
	if (hasRequiredPadAnsix923) return padAnsix923$1.exports;
	hasRequiredPadAnsix923 = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireCipherCore());
			}
		}(padAnsix923, function (CryptoJS) {

			/**
			 * ANSI X.923 padding strategy.
			 */
			CryptoJS.pad.AnsiX923 = {
			    pad: function (data, blockSize) {
			        // Shortcuts
			        var dataSigBytes = data.sigBytes;
			        var blockSizeBytes = blockSize * 4;

			        // Count padding bytes
			        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

			        // Compute last byte position
			        var lastBytePos = dataSigBytes + nPaddingBytes - 1;

			        // Pad
			        data.clamp();
			        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
			        data.sigBytes += nPaddingBytes;
			    },

			    unpad: function (data) {
			        // Get number of padding bytes from last byte
			        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

			        // Remove padding
			        data.sigBytes -= nPaddingBytes;
			    }
			};


			return CryptoJS.pad.Ansix923;

		})); 
	} (padAnsix923$1));
	return padAnsix923$1.exports;
}

var padIso10126$1 = {exports: {}};

var padIso10126 = padIso10126$1.exports;

var hasRequiredPadIso10126;

function requirePadIso10126 () {
	if (hasRequiredPadIso10126) return padIso10126$1.exports;
	hasRequiredPadIso10126 = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireCipherCore());
			}
		}(padIso10126, function (CryptoJS) {

			/**
			 * ISO 10126 padding strategy.
			 */
			CryptoJS.pad.Iso10126 = {
			    pad: function (data, blockSize) {
			        // Shortcut
			        var blockSizeBytes = blockSize * 4;

			        // Count padding bytes
			        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

			        // Pad
			        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
			             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
			    },

			    unpad: function (data) {
			        // Get number of padding bytes from last byte
			        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

			        // Remove padding
			        data.sigBytes -= nPaddingBytes;
			    }
			};


			return CryptoJS.pad.Iso10126;

		})); 
	} (padIso10126$1));
	return padIso10126$1.exports;
}

var padIso97971$1 = {exports: {}};

var padIso97971 = padIso97971$1.exports;

var hasRequiredPadIso97971;

function requirePadIso97971 () {
	if (hasRequiredPadIso97971) return padIso97971$1.exports;
	hasRequiredPadIso97971 = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireCipherCore());
			}
		}(padIso97971, function (CryptoJS) {

			/**
			 * ISO/IEC 9797-1 Padding Method 2.
			 */
			CryptoJS.pad.Iso97971 = {
			    pad: function (data, blockSize) {
			        // Add 0x80 byte
			        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

			        // Zero pad the rest
			        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
			    },

			    unpad: function (data) {
			        // Remove zero padding
			        CryptoJS.pad.ZeroPadding.unpad(data);

			        // Remove one more byte -- the 0x80 byte
			        data.sigBytes--;
			    }
			};


			return CryptoJS.pad.Iso97971;

		})); 
	} (padIso97971$1));
	return padIso97971$1.exports;
}

var padZeropadding$1 = {exports: {}};

var padZeropadding = padZeropadding$1.exports;

var hasRequiredPadZeropadding;

function requirePadZeropadding () {
	if (hasRequiredPadZeropadding) return padZeropadding$1.exports;
	hasRequiredPadZeropadding = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireCipherCore());
			}
		}(padZeropadding, function (CryptoJS) {

			/**
			 * Zero padding strategy.
			 */
			CryptoJS.pad.ZeroPadding = {
			    pad: function (data, blockSize) {
			        // Shortcut
			        var blockSizeBytes = blockSize * 4;

			        // Pad
			        data.clamp();
			        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
			    },

			    unpad: function (data) {
			        // Shortcut
			        var dataWords = data.words;

			        // Unpad
			        var i = data.sigBytes - 1;
			        for (var i = data.sigBytes - 1; i >= 0; i--) {
			            if (((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
			                data.sigBytes = i + 1;
			                break;
			            }
			        }
			    }
			};


			return CryptoJS.pad.ZeroPadding;

		})); 
	} (padZeropadding$1));
	return padZeropadding$1.exports;
}

var padNopadding$1 = {exports: {}};

var padNopadding = padNopadding$1.exports;

var hasRequiredPadNopadding;

function requirePadNopadding () {
	if (hasRequiredPadNopadding) return padNopadding$1.exports;
	hasRequiredPadNopadding = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireCipherCore());
			}
		}(padNopadding, function (CryptoJS) {

			/**
			 * A noop padding strategy.
			 */
			CryptoJS.pad.NoPadding = {
			    pad: function () {
			    },

			    unpad: function () {
			    }
			};


			return CryptoJS.pad.NoPadding;

		})); 
	} (padNopadding$1));
	return padNopadding$1.exports;
}

var formatHex$1 = {exports: {}};

var formatHex = formatHex$1.exports;

var hasRequiredFormatHex;

function requireFormatHex () {
	if (hasRequiredFormatHex) return formatHex$1.exports;
	hasRequiredFormatHex = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireCipherCore());
			}
		}(formatHex, function (CryptoJS) {

			(function (undefined$1) {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var CipherParams = C_lib.CipherParams;
			    var C_enc = C.enc;
			    var Hex = C_enc.Hex;
			    var C_format = C.format;

			    C_format.Hex = {
			        /**
			         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
			         *
			         * @param {CipherParams} cipherParams The cipher params object.
			         *
			         * @return {string} The hexadecimally encoded string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
			         */
			        stringify: function (cipherParams) {
			            return cipherParams.ciphertext.toString(Hex);
			        },

			        /**
			         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
			         *
			         * @param {string} input The hexadecimally encoded string.
			         *
			         * @return {CipherParams} The cipher params object.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
			         */
			        parse: function (input) {
			            var ciphertext = Hex.parse(input);
			            return CipherParams.create({ ciphertext: ciphertext });
			        }
			    };
			}());


			return CryptoJS.format.Hex;

		})); 
	} (formatHex$1));
	return formatHex$1.exports;
}

var aes$1 = {exports: {}};

var aes = aes$1.exports;

var hasRequiredAes;

function requireAes () {
	if (hasRequiredAes) return aes$1.exports;
	hasRequiredAes = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
			}
		}(aes, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var BlockCipher = C_lib.BlockCipher;
			    var C_algo = C.algo;

			    // Lookup tables
			    var SBOX = [];
			    var INV_SBOX = [];
			    var SUB_MIX_0 = [];
			    var SUB_MIX_1 = [];
			    var SUB_MIX_2 = [];
			    var SUB_MIX_3 = [];
			    var INV_SUB_MIX_0 = [];
			    var INV_SUB_MIX_1 = [];
			    var INV_SUB_MIX_2 = [];
			    var INV_SUB_MIX_3 = [];

			    // Compute lookup tables
			    (function () {
			        // Compute double table
			        var d = [];
			        for (var i = 0; i < 256; i++) {
			            if (i < 128) {
			                d[i] = i << 1;
			            } else {
			                d[i] = (i << 1) ^ 0x11b;
			            }
			        }

			        // Walk GF(2^8)
			        var x = 0;
			        var xi = 0;
			        for (var i = 0; i < 256; i++) {
			            // Compute sbox
			            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
			            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
			            SBOX[x] = sx;
			            INV_SBOX[sx] = x;

			            // Compute multiplication
			            var x2 = d[x];
			            var x4 = d[x2];
			            var x8 = d[x4];

			            // Compute sub bytes, mix columns tables
			            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
			            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
			            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
			            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
			            SUB_MIX_3[x] = t;

			            // Compute inv sub bytes, inv mix columns tables
			            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
			            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
			            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
			            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
			            INV_SUB_MIX_3[sx] = t;

			            // Compute next counter
			            if (!x) {
			                x = xi = 1;
			            } else {
			                x = x2 ^ d[d[d[x8 ^ x2]]];
			                xi ^= d[d[xi]];
			            }
			        }
			    }());

			    // Precomputed Rcon lookup
			    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

			    /**
			     * AES block cipher algorithm.
			     */
			    var AES = C_algo.AES = BlockCipher.extend({
			        _doReset: function () {
			            var t;

			            // Skip reset of nRounds has been set before and key did not change
			            if (this._nRounds && this._keyPriorReset === this._key) {
			                return;
			            }

			            // Shortcuts
			            var key = this._keyPriorReset = this._key;
			            var keyWords = key.words;
			            var keySize = key.sigBytes / 4;

			            // Compute number of rounds
			            var nRounds = this._nRounds = keySize + 6;

			            // Compute number of key schedule rows
			            var ksRows = (nRounds + 1) * 4;

			            // Compute key schedule
			            var keySchedule = this._keySchedule = [];
			            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
			                if (ksRow < keySize) {
			                    keySchedule[ksRow] = keyWords[ksRow];
			                } else {
			                    t = keySchedule[ksRow - 1];

			                    if (!(ksRow % keySize)) {
			                        // Rot word
			                        t = (t << 8) | (t >>> 24);

			                        // Sub word
			                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

			                        // Mix Rcon
			                        t ^= RCON[(ksRow / keySize) | 0] << 24;
			                    } else if (keySize > 6 && ksRow % keySize == 4) {
			                        // Sub word
			                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
			                    }

			                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
			                }
			            }

			            // Compute inv key schedule
			            var invKeySchedule = this._invKeySchedule = [];
			            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
			                var ksRow = ksRows - invKsRow;

			                if (invKsRow % 4) {
			                    var t = keySchedule[ksRow];
			                } else {
			                    var t = keySchedule[ksRow - 4];
			                }

			                if (invKsRow < 4 || ksRow <= 4) {
			                    invKeySchedule[invKsRow] = t;
			                } else {
			                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
			                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
			                }
			            }
			        },

			        encryptBlock: function (M, offset) {
			            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
			        },

			        decryptBlock: function (M, offset) {
			            // Swap 2nd and 4th rows
			            var t = M[offset + 1];
			            M[offset + 1] = M[offset + 3];
			            M[offset + 3] = t;

			            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

			            // Inv swap 2nd and 4th rows
			            var t = M[offset + 1];
			            M[offset + 1] = M[offset + 3];
			            M[offset + 3] = t;
			        },

			        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
			            // Shortcut
			            var nRounds = this._nRounds;

			            // Get input, add round key
			            var s0 = M[offset]     ^ keySchedule[0];
			            var s1 = M[offset + 1] ^ keySchedule[1];
			            var s2 = M[offset + 2] ^ keySchedule[2];
			            var s3 = M[offset + 3] ^ keySchedule[3];

			            // Key schedule row counter
			            var ksRow = 4;

			            // Rounds
			            for (var round = 1; round < nRounds; round++) {
			                // Shift rows, sub bytes, mix columns, add round key
			                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
			                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
			                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
			                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

			                // Update state
			                s0 = t0;
			                s1 = t1;
			                s2 = t2;
			                s3 = t3;
			            }

			            // Shift rows, sub bytes, add round key
			            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
			            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
			            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
			            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

			            // Set output
			            M[offset]     = t0;
			            M[offset + 1] = t1;
			            M[offset + 2] = t2;
			            M[offset + 3] = t3;
			        },

			        keySize: 256/32
			    });

			    /**
			     * Shortcut functions to the cipher's object interface.
			     *
			     * @example
			     *
			     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
			     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
			     */
			    C.AES = BlockCipher._createHelper(AES);
			}());


			return CryptoJS.AES;

		})); 
	} (aes$1));
	return aes$1.exports;
}

var tripledes$1 = {exports: {}};

var tripledes = tripledes$1.exports;

var hasRequiredTripledes;

function requireTripledes () {
	if (hasRequiredTripledes) return tripledes$1.exports;
	hasRequiredTripledes = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
			}
		}(tripledes, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var BlockCipher = C_lib.BlockCipher;
			    var C_algo = C.algo;

			    // Permuted Choice 1 constants
			    var PC1 = [
			        57, 49, 41, 33, 25, 17, 9,  1,
			        58, 50, 42, 34, 26, 18, 10, 2,
			        59, 51, 43, 35, 27, 19, 11, 3,
			        60, 52, 44, 36, 63, 55, 47, 39,
			        31, 23, 15, 7,  62, 54, 46, 38,
			        30, 22, 14, 6,  61, 53, 45, 37,
			        29, 21, 13, 5,  28, 20, 12, 4
			    ];

			    // Permuted Choice 2 constants
			    var PC2 = [
			        14, 17, 11, 24, 1,  5,
			        3,  28, 15, 6,  21, 10,
			        23, 19, 12, 4,  26, 8,
			        16, 7,  27, 20, 13, 2,
			        41, 52, 31, 37, 47, 55,
			        30, 40, 51, 45, 33, 48,
			        44, 49, 39, 56, 34, 53,
			        46, 42, 50, 36, 29, 32
			    ];

			    // Cumulative bit shift constants
			    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

			    // SBOXes and round permutation constants
			    var SBOX_P = [
			        {
			            0x0: 0x808200,
			            0x10000000: 0x8000,
			            0x20000000: 0x808002,
			            0x30000000: 0x2,
			            0x40000000: 0x200,
			            0x50000000: 0x808202,
			            0x60000000: 0x800202,
			            0x70000000: 0x800000,
			            0x80000000: 0x202,
			            0x90000000: 0x800200,
			            0xa0000000: 0x8200,
			            0xb0000000: 0x808000,
			            0xc0000000: 0x8002,
			            0xd0000000: 0x800002,
			            0xe0000000: 0x0,
			            0xf0000000: 0x8202,
			            0x8000000: 0x0,
			            0x18000000: 0x808202,
			            0x28000000: 0x8202,
			            0x38000000: 0x8000,
			            0x48000000: 0x808200,
			            0x58000000: 0x200,
			            0x68000000: 0x808002,
			            0x78000000: 0x2,
			            0x88000000: 0x800200,
			            0x98000000: 0x8200,
			            0xa8000000: 0x808000,
			            0xb8000000: 0x800202,
			            0xc8000000: 0x800002,
			            0xd8000000: 0x8002,
			            0xe8000000: 0x202,
			            0xf8000000: 0x800000,
			            0x1: 0x8000,
			            0x10000001: 0x2,
			            0x20000001: 0x808200,
			            0x30000001: 0x800000,
			            0x40000001: 0x808002,
			            0x50000001: 0x8200,
			            0x60000001: 0x200,
			            0x70000001: 0x800202,
			            0x80000001: 0x808202,
			            0x90000001: 0x808000,
			            0xa0000001: 0x800002,
			            0xb0000001: 0x8202,
			            0xc0000001: 0x202,
			            0xd0000001: 0x800200,
			            0xe0000001: 0x8002,
			            0xf0000001: 0x0,
			            0x8000001: 0x808202,
			            0x18000001: 0x808000,
			            0x28000001: 0x800000,
			            0x38000001: 0x200,
			            0x48000001: 0x8000,
			            0x58000001: 0x800002,
			            0x68000001: 0x2,
			            0x78000001: 0x8202,
			            0x88000001: 0x8002,
			            0x98000001: 0x800202,
			            0xa8000001: 0x202,
			            0xb8000001: 0x808200,
			            0xc8000001: 0x800200,
			            0xd8000001: 0x0,
			            0xe8000001: 0x8200,
			            0xf8000001: 0x808002
			        },
			        {
			            0x0: 0x40084010,
			            0x1000000: 0x4000,
			            0x2000000: 0x80000,
			            0x3000000: 0x40080010,
			            0x4000000: 0x40000010,
			            0x5000000: 0x40084000,
			            0x6000000: 0x40004000,
			            0x7000000: 0x10,
			            0x8000000: 0x84000,
			            0x9000000: 0x40004010,
			            0xa000000: 0x40000000,
			            0xb000000: 0x84010,
			            0xc000000: 0x80010,
			            0xd000000: 0x0,
			            0xe000000: 0x4010,
			            0xf000000: 0x40080000,
			            0x800000: 0x40004000,
			            0x1800000: 0x84010,
			            0x2800000: 0x10,
			            0x3800000: 0x40004010,
			            0x4800000: 0x40084010,
			            0x5800000: 0x40000000,
			            0x6800000: 0x80000,
			            0x7800000: 0x40080010,
			            0x8800000: 0x80010,
			            0x9800000: 0x0,
			            0xa800000: 0x4000,
			            0xb800000: 0x40080000,
			            0xc800000: 0x40000010,
			            0xd800000: 0x84000,
			            0xe800000: 0x40084000,
			            0xf800000: 0x4010,
			            0x10000000: 0x0,
			            0x11000000: 0x40080010,
			            0x12000000: 0x40004010,
			            0x13000000: 0x40084000,
			            0x14000000: 0x40080000,
			            0x15000000: 0x10,
			            0x16000000: 0x84010,
			            0x17000000: 0x4000,
			            0x18000000: 0x4010,
			            0x19000000: 0x80000,
			            0x1a000000: 0x80010,
			            0x1b000000: 0x40000010,
			            0x1c000000: 0x84000,
			            0x1d000000: 0x40004000,
			            0x1e000000: 0x40000000,
			            0x1f000000: 0x40084010,
			            0x10800000: 0x84010,
			            0x11800000: 0x80000,
			            0x12800000: 0x40080000,
			            0x13800000: 0x4000,
			            0x14800000: 0x40004000,
			            0x15800000: 0x40084010,
			            0x16800000: 0x10,
			            0x17800000: 0x40000000,
			            0x18800000: 0x40084000,
			            0x19800000: 0x40000010,
			            0x1a800000: 0x40004010,
			            0x1b800000: 0x80010,
			            0x1c800000: 0x0,
			            0x1d800000: 0x4010,
			            0x1e800000: 0x40080010,
			            0x1f800000: 0x84000
			        },
			        {
			            0x0: 0x104,
			            0x100000: 0x0,
			            0x200000: 0x4000100,
			            0x300000: 0x10104,
			            0x400000: 0x10004,
			            0x500000: 0x4000004,
			            0x600000: 0x4010104,
			            0x700000: 0x4010000,
			            0x800000: 0x4000000,
			            0x900000: 0x4010100,
			            0xa00000: 0x10100,
			            0xb00000: 0x4010004,
			            0xc00000: 0x4000104,
			            0xd00000: 0x10000,
			            0xe00000: 0x4,
			            0xf00000: 0x100,
			            0x80000: 0x4010100,
			            0x180000: 0x4010004,
			            0x280000: 0x0,
			            0x380000: 0x4000100,
			            0x480000: 0x4000004,
			            0x580000: 0x10000,
			            0x680000: 0x10004,
			            0x780000: 0x104,
			            0x880000: 0x4,
			            0x980000: 0x100,
			            0xa80000: 0x4010000,
			            0xb80000: 0x10104,
			            0xc80000: 0x10100,
			            0xd80000: 0x4000104,
			            0xe80000: 0x4010104,
			            0xf80000: 0x4000000,
			            0x1000000: 0x4010100,
			            0x1100000: 0x10004,
			            0x1200000: 0x10000,
			            0x1300000: 0x4000100,
			            0x1400000: 0x100,
			            0x1500000: 0x4010104,
			            0x1600000: 0x4000004,
			            0x1700000: 0x0,
			            0x1800000: 0x4000104,
			            0x1900000: 0x4000000,
			            0x1a00000: 0x4,
			            0x1b00000: 0x10100,
			            0x1c00000: 0x4010000,
			            0x1d00000: 0x104,
			            0x1e00000: 0x10104,
			            0x1f00000: 0x4010004,
			            0x1080000: 0x4000000,
			            0x1180000: 0x104,
			            0x1280000: 0x4010100,
			            0x1380000: 0x0,
			            0x1480000: 0x10004,
			            0x1580000: 0x4000100,
			            0x1680000: 0x100,
			            0x1780000: 0x4010004,
			            0x1880000: 0x10000,
			            0x1980000: 0x4010104,
			            0x1a80000: 0x10104,
			            0x1b80000: 0x4000004,
			            0x1c80000: 0x4000104,
			            0x1d80000: 0x4010000,
			            0x1e80000: 0x4,
			            0x1f80000: 0x10100
			        },
			        {
			            0x0: 0x80401000,
			            0x10000: 0x80001040,
			            0x20000: 0x401040,
			            0x30000: 0x80400000,
			            0x40000: 0x0,
			            0x50000: 0x401000,
			            0x60000: 0x80000040,
			            0x70000: 0x400040,
			            0x80000: 0x80000000,
			            0x90000: 0x400000,
			            0xa0000: 0x40,
			            0xb0000: 0x80001000,
			            0xc0000: 0x80400040,
			            0xd0000: 0x1040,
			            0xe0000: 0x1000,
			            0xf0000: 0x80401040,
			            0x8000: 0x80001040,
			            0x18000: 0x40,
			            0x28000: 0x80400040,
			            0x38000: 0x80001000,
			            0x48000: 0x401000,
			            0x58000: 0x80401040,
			            0x68000: 0x0,
			            0x78000: 0x80400000,
			            0x88000: 0x1000,
			            0x98000: 0x80401000,
			            0xa8000: 0x400000,
			            0xb8000: 0x1040,
			            0xc8000: 0x80000000,
			            0xd8000: 0x400040,
			            0xe8000: 0x401040,
			            0xf8000: 0x80000040,
			            0x100000: 0x400040,
			            0x110000: 0x401000,
			            0x120000: 0x80000040,
			            0x130000: 0x0,
			            0x140000: 0x1040,
			            0x150000: 0x80400040,
			            0x160000: 0x80401000,
			            0x170000: 0x80001040,
			            0x180000: 0x80401040,
			            0x190000: 0x80000000,
			            0x1a0000: 0x80400000,
			            0x1b0000: 0x401040,
			            0x1c0000: 0x80001000,
			            0x1d0000: 0x400000,
			            0x1e0000: 0x40,
			            0x1f0000: 0x1000,
			            0x108000: 0x80400000,
			            0x118000: 0x80401040,
			            0x128000: 0x0,
			            0x138000: 0x401000,
			            0x148000: 0x400040,
			            0x158000: 0x80000000,
			            0x168000: 0x80001040,
			            0x178000: 0x40,
			            0x188000: 0x80000040,
			            0x198000: 0x1000,
			            0x1a8000: 0x80001000,
			            0x1b8000: 0x80400040,
			            0x1c8000: 0x1040,
			            0x1d8000: 0x80401000,
			            0x1e8000: 0x400000,
			            0x1f8000: 0x401040
			        },
			        {
			            0x0: 0x80,
			            0x1000: 0x1040000,
			            0x2000: 0x40000,
			            0x3000: 0x20000000,
			            0x4000: 0x20040080,
			            0x5000: 0x1000080,
			            0x6000: 0x21000080,
			            0x7000: 0x40080,
			            0x8000: 0x1000000,
			            0x9000: 0x20040000,
			            0xa000: 0x20000080,
			            0xb000: 0x21040080,
			            0xc000: 0x21040000,
			            0xd000: 0x0,
			            0xe000: 0x1040080,
			            0xf000: 0x21000000,
			            0x800: 0x1040080,
			            0x1800: 0x21000080,
			            0x2800: 0x80,
			            0x3800: 0x1040000,
			            0x4800: 0x40000,
			            0x5800: 0x20040080,
			            0x6800: 0x21040000,
			            0x7800: 0x20000000,
			            0x8800: 0x20040000,
			            0x9800: 0x0,
			            0xa800: 0x21040080,
			            0xb800: 0x1000080,
			            0xc800: 0x20000080,
			            0xd800: 0x21000000,
			            0xe800: 0x1000000,
			            0xf800: 0x40080,
			            0x10000: 0x40000,
			            0x11000: 0x80,
			            0x12000: 0x20000000,
			            0x13000: 0x21000080,
			            0x14000: 0x1000080,
			            0x15000: 0x21040000,
			            0x16000: 0x20040080,
			            0x17000: 0x1000000,
			            0x18000: 0x21040080,
			            0x19000: 0x21000000,
			            0x1a000: 0x1040000,
			            0x1b000: 0x20040000,
			            0x1c000: 0x40080,
			            0x1d000: 0x20000080,
			            0x1e000: 0x0,
			            0x1f000: 0x1040080,
			            0x10800: 0x21000080,
			            0x11800: 0x1000000,
			            0x12800: 0x1040000,
			            0x13800: 0x20040080,
			            0x14800: 0x20000000,
			            0x15800: 0x1040080,
			            0x16800: 0x80,
			            0x17800: 0x21040000,
			            0x18800: 0x40080,
			            0x19800: 0x21040080,
			            0x1a800: 0x0,
			            0x1b800: 0x21000000,
			            0x1c800: 0x1000080,
			            0x1d800: 0x40000,
			            0x1e800: 0x20040000,
			            0x1f800: 0x20000080
			        },
			        {
			            0x0: 0x10000008,
			            0x100: 0x2000,
			            0x200: 0x10200000,
			            0x300: 0x10202008,
			            0x400: 0x10002000,
			            0x500: 0x200000,
			            0x600: 0x200008,
			            0x700: 0x10000000,
			            0x800: 0x0,
			            0x900: 0x10002008,
			            0xa00: 0x202000,
			            0xb00: 0x8,
			            0xc00: 0x10200008,
			            0xd00: 0x202008,
			            0xe00: 0x2008,
			            0xf00: 0x10202000,
			            0x80: 0x10200000,
			            0x180: 0x10202008,
			            0x280: 0x8,
			            0x380: 0x200000,
			            0x480: 0x202008,
			            0x580: 0x10000008,
			            0x680: 0x10002000,
			            0x780: 0x2008,
			            0x880: 0x200008,
			            0x980: 0x2000,
			            0xa80: 0x10002008,
			            0xb80: 0x10200008,
			            0xc80: 0x0,
			            0xd80: 0x10202000,
			            0xe80: 0x202000,
			            0xf80: 0x10000000,
			            0x1000: 0x10002000,
			            0x1100: 0x10200008,
			            0x1200: 0x10202008,
			            0x1300: 0x2008,
			            0x1400: 0x200000,
			            0x1500: 0x10000000,
			            0x1600: 0x10000008,
			            0x1700: 0x202000,
			            0x1800: 0x202008,
			            0x1900: 0x0,
			            0x1a00: 0x8,
			            0x1b00: 0x10200000,
			            0x1c00: 0x2000,
			            0x1d00: 0x10002008,
			            0x1e00: 0x10202000,
			            0x1f00: 0x200008,
			            0x1080: 0x8,
			            0x1180: 0x202000,
			            0x1280: 0x200000,
			            0x1380: 0x10000008,
			            0x1480: 0x10002000,
			            0x1580: 0x2008,
			            0x1680: 0x10202008,
			            0x1780: 0x10200000,
			            0x1880: 0x10202000,
			            0x1980: 0x10200008,
			            0x1a80: 0x2000,
			            0x1b80: 0x202008,
			            0x1c80: 0x200008,
			            0x1d80: 0x0,
			            0x1e80: 0x10000000,
			            0x1f80: 0x10002008
			        },
			        {
			            0x0: 0x100000,
			            0x10: 0x2000401,
			            0x20: 0x400,
			            0x30: 0x100401,
			            0x40: 0x2100401,
			            0x50: 0x0,
			            0x60: 0x1,
			            0x70: 0x2100001,
			            0x80: 0x2000400,
			            0x90: 0x100001,
			            0xa0: 0x2000001,
			            0xb0: 0x2100400,
			            0xc0: 0x2100000,
			            0xd0: 0x401,
			            0xe0: 0x100400,
			            0xf0: 0x2000000,
			            0x8: 0x2100001,
			            0x18: 0x0,
			            0x28: 0x2000401,
			            0x38: 0x2100400,
			            0x48: 0x100000,
			            0x58: 0x2000001,
			            0x68: 0x2000000,
			            0x78: 0x401,
			            0x88: 0x100401,
			            0x98: 0x2000400,
			            0xa8: 0x2100000,
			            0xb8: 0x100001,
			            0xc8: 0x400,
			            0xd8: 0x2100401,
			            0xe8: 0x1,
			            0xf8: 0x100400,
			            0x100: 0x2000000,
			            0x110: 0x100000,
			            0x120: 0x2000401,
			            0x130: 0x2100001,
			            0x140: 0x100001,
			            0x150: 0x2000400,
			            0x160: 0x2100400,
			            0x170: 0x100401,
			            0x180: 0x401,
			            0x190: 0x2100401,
			            0x1a0: 0x100400,
			            0x1b0: 0x1,
			            0x1c0: 0x0,
			            0x1d0: 0x2100000,
			            0x1e0: 0x2000001,
			            0x1f0: 0x400,
			            0x108: 0x100400,
			            0x118: 0x2000401,
			            0x128: 0x2100001,
			            0x138: 0x1,
			            0x148: 0x2000000,
			            0x158: 0x100000,
			            0x168: 0x401,
			            0x178: 0x2100400,
			            0x188: 0x2000001,
			            0x198: 0x2100000,
			            0x1a8: 0x0,
			            0x1b8: 0x2100401,
			            0x1c8: 0x100401,
			            0x1d8: 0x400,
			            0x1e8: 0x2000400,
			            0x1f8: 0x100001
			        },
			        {
			            0x0: 0x8000820,
			            0x1: 0x20000,
			            0x2: 0x8000000,
			            0x3: 0x20,
			            0x4: 0x20020,
			            0x5: 0x8020820,
			            0x6: 0x8020800,
			            0x7: 0x800,
			            0x8: 0x8020000,
			            0x9: 0x8000800,
			            0xa: 0x20800,
			            0xb: 0x8020020,
			            0xc: 0x820,
			            0xd: 0x0,
			            0xe: 0x8000020,
			            0xf: 0x20820,
			            0x80000000: 0x800,
			            0x80000001: 0x8020820,
			            0x80000002: 0x8000820,
			            0x80000003: 0x8000000,
			            0x80000004: 0x8020000,
			            0x80000005: 0x20800,
			            0x80000006: 0x20820,
			            0x80000007: 0x20,
			            0x80000008: 0x8000020,
			            0x80000009: 0x820,
			            0x8000000a: 0x20020,
			            0x8000000b: 0x8020800,
			            0x8000000c: 0x0,
			            0x8000000d: 0x8020020,
			            0x8000000e: 0x8000800,
			            0x8000000f: 0x20000,
			            0x10: 0x20820,
			            0x11: 0x8020800,
			            0x12: 0x20,
			            0x13: 0x800,
			            0x14: 0x8000800,
			            0x15: 0x8000020,
			            0x16: 0x8020020,
			            0x17: 0x20000,
			            0x18: 0x0,
			            0x19: 0x20020,
			            0x1a: 0x8020000,
			            0x1b: 0x8000820,
			            0x1c: 0x8020820,
			            0x1d: 0x20800,
			            0x1e: 0x820,
			            0x1f: 0x8000000,
			            0x80000010: 0x20000,
			            0x80000011: 0x800,
			            0x80000012: 0x8020020,
			            0x80000013: 0x20820,
			            0x80000014: 0x20,
			            0x80000015: 0x8020000,
			            0x80000016: 0x8000000,
			            0x80000017: 0x8000820,
			            0x80000018: 0x8020820,
			            0x80000019: 0x8000020,
			            0x8000001a: 0x8000800,
			            0x8000001b: 0x0,
			            0x8000001c: 0x20800,
			            0x8000001d: 0x820,
			            0x8000001e: 0x20020,
			            0x8000001f: 0x8020800
			        }
			    ];

			    // Masks that select the SBOX input
			    var SBOX_MASK = [
			        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
			        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
			    ];

			    /**
			     * DES block cipher algorithm.
			     */
			    var DES = C_algo.DES = BlockCipher.extend({
			        _doReset: function () {
			            // Shortcuts
			            var key = this._key;
			            var keyWords = key.words;

			            // Select 56 bits according to PC1
			            var keyBits = [];
			            for (var i = 0; i < 56; i++) {
			                var keyBitPos = PC1[i] - 1;
			                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
			            }

			            // Assemble 16 subkeys
			            var subKeys = this._subKeys = [];
			            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
			                // Create subkey
			                var subKey = subKeys[nSubKey] = [];

			                // Shortcut
			                var bitShift = BIT_SHIFTS[nSubKey];

			                // Select 48 bits according to PC2
			                for (var i = 0; i < 24; i++) {
			                    // Select from the left 28 key bits
			                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

			                    // Select from the right 28 key bits
			                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
			                }

			                // Since each subkey is applied to an expanded 32-bit input,
			                // the subkey can be broken into 8 values scaled to 32-bits,
			                // which allows the key to be used without expansion
			                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
			                for (var i = 1; i < 7; i++) {
			                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
			                }
			                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
			            }

			            // Compute inverse subkeys
			            var invSubKeys = this._invSubKeys = [];
			            for (var i = 0; i < 16; i++) {
			                invSubKeys[i] = subKeys[15 - i];
			            }
			        },

			        encryptBlock: function (M, offset) {
			            this._doCryptBlock(M, offset, this._subKeys);
			        },

			        decryptBlock: function (M, offset) {
			            this._doCryptBlock(M, offset, this._invSubKeys);
			        },

			        _doCryptBlock: function (M, offset, subKeys) {
			            // Get input
			            this._lBlock = M[offset];
			            this._rBlock = M[offset + 1];

			            // Initial permutation
			            exchangeLR.call(this, 4,  0x0f0f0f0f);
			            exchangeLR.call(this, 16, 0x0000ffff);
			            exchangeRL.call(this, 2,  0x33333333);
			            exchangeRL.call(this, 8,  0x00ff00ff);
			            exchangeLR.call(this, 1,  0x55555555);

			            // Rounds
			            for (var round = 0; round < 16; round++) {
			                // Shortcuts
			                var subKey = subKeys[round];
			                var lBlock = this._lBlock;
			                var rBlock = this._rBlock;

			                // Feistel function
			                var f = 0;
			                for (var i = 0; i < 8; i++) {
			                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
			                }
			                this._lBlock = rBlock;
			                this._rBlock = lBlock ^ f;
			            }

			            // Undo swap from last round
			            var t = this._lBlock;
			            this._lBlock = this._rBlock;
			            this._rBlock = t;

			            // Final permutation
			            exchangeLR.call(this, 1,  0x55555555);
			            exchangeRL.call(this, 8,  0x00ff00ff);
			            exchangeRL.call(this, 2,  0x33333333);
			            exchangeLR.call(this, 16, 0x0000ffff);
			            exchangeLR.call(this, 4,  0x0f0f0f0f);

			            // Set output
			            M[offset] = this._lBlock;
			            M[offset + 1] = this._rBlock;
			        },

			        keySize: 64/32,

			        ivSize: 64/32,

			        blockSize: 64/32
			    });

			    // Swap bits across the left and right words
			    function exchangeLR(offset, mask) {
			        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
			        this._rBlock ^= t;
			        this._lBlock ^= t << offset;
			    }

			    function exchangeRL(offset, mask) {
			        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
			        this._lBlock ^= t;
			        this._rBlock ^= t << offset;
			    }

			    /**
			     * Shortcut functions to the cipher's object interface.
			     *
			     * @example
			     *
			     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
			     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
			     */
			    C.DES = BlockCipher._createHelper(DES);

			    /**
			     * Triple-DES block cipher algorithm.
			     */
			    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
			        _doReset: function () {
			            // Shortcuts
			            var key = this._key;
			            var keyWords = key.words;
			            // Make sure the key length is valid (64, 128 or >= 192 bit)
			            if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
			                throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
			            }

			            // Extend the key according to the keying options defined in 3DES standard
			            var key1 = keyWords.slice(0, 2);
			            var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
			            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);

			            // Create DES instances
			            this._des1 = DES.createEncryptor(WordArray.create(key1));
			            this._des2 = DES.createEncryptor(WordArray.create(key2));
			            this._des3 = DES.createEncryptor(WordArray.create(key3));
			        },

			        encryptBlock: function (M, offset) {
			            this._des1.encryptBlock(M, offset);
			            this._des2.decryptBlock(M, offset);
			            this._des3.encryptBlock(M, offset);
			        },

			        decryptBlock: function (M, offset) {
			            this._des3.decryptBlock(M, offset);
			            this._des2.encryptBlock(M, offset);
			            this._des1.decryptBlock(M, offset);
			        },

			        keySize: 192/32,

			        ivSize: 64/32,

			        blockSize: 64/32
			    });

			    /**
			     * Shortcut functions to the cipher's object interface.
			     *
			     * @example
			     *
			     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
			     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
			     */
			    C.TripleDES = BlockCipher._createHelper(TripleDES);
			}());


			return CryptoJS.TripleDES;

		})); 
	} (tripledes$1));
	return tripledes$1.exports;
}

var rc4$1 = {exports: {}};

var rc4 = rc4$1.exports;

var hasRequiredRc4;

function requireRc4 () {
	if (hasRequiredRc4) return rc4$1.exports;
	hasRequiredRc4 = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
			}
		}(rc4, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var StreamCipher = C_lib.StreamCipher;
			    var C_algo = C.algo;

			    /**
			     * RC4 stream cipher algorithm.
			     */
			    var RC4 = C_algo.RC4 = StreamCipher.extend({
			        _doReset: function () {
			            // Shortcuts
			            var key = this._key;
			            var keyWords = key.words;
			            var keySigBytes = key.sigBytes;

			            // Init sbox
			            var S = this._S = [];
			            for (var i = 0; i < 256; i++) {
			                S[i] = i;
			            }

			            // Key setup
			            for (var i = 0, j = 0; i < 256; i++) {
			                var keyByteIndex = i % keySigBytes;
			                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

			                j = (j + S[i] + keyByte) % 256;

			                // Swap
			                var t = S[i];
			                S[i] = S[j];
			                S[j] = t;
			            }

			            // Counters
			            this._i = this._j = 0;
			        },

			        _doProcessBlock: function (M, offset) {
			            M[offset] ^= generateKeystreamWord.call(this);
			        },

			        keySize: 256/32,

			        ivSize: 0
			    });

			    function generateKeystreamWord() {
			        // Shortcuts
			        var S = this._S;
			        var i = this._i;
			        var j = this._j;

			        // Generate keystream word
			        var keystreamWord = 0;
			        for (var n = 0; n < 4; n++) {
			            i = (i + 1) % 256;
			            j = (j + S[i]) % 256;

			            // Swap
			            var t = S[i];
			            S[i] = S[j];
			            S[j] = t;

			            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
			        }

			        // Update counters
			        this._i = i;
			        this._j = j;

			        return keystreamWord;
			    }

			    /**
			     * Shortcut functions to the cipher's object interface.
			     *
			     * @example
			     *
			     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
			     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
			     */
			    C.RC4 = StreamCipher._createHelper(RC4);

			    /**
			     * Modified RC4 stream cipher algorithm.
			     */
			    var RC4Drop = C_algo.RC4Drop = RC4.extend({
			        /**
			         * Configuration options.
			         *
			         * @property {number} drop The number of keystream words to drop. Default 192
			         */
			        cfg: RC4.cfg.extend({
			            drop: 192
			        }),

			        _doReset: function () {
			            RC4._doReset.call(this);

			            // Drop
			            for (var i = this.cfg.drop; i > 0; i--) {
			                generateKeystreamWord.call(this);
			            }
			        }
			    });

			    /**
			     * Shortcut functions to the cipher's object interface.
			     *
			     * @example
			     *
			     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
			     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
			     */
			    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
			}());


			return CryptoJS.RC4;

		})); 
	} (rc4$1));
	return rc4$1.exports;
}

var rabbit$1 = {exports: {}};

var rabbit = rabbit$1.exports;

var hasRequiredRabbit;

function requireRabbit () {
	if (hasRequiredRabbit) return rabbit$1.exports;
	hasRequiredRabbit = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
			}
		}(rabbit, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var StreamCipher = C_lib.StreamCipher;
			    var C_algo = C.algo;

			    // Reusable objects
			    var S  = [];
			    var C_ = [];
			    var G  = [];

			    /**
			     * Rabbit stream cipher algorithm
			     */
			    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
			        _doReset: function () {
			            // Shortcuts
			            var K = this._key.words;
			            var iv = this.cfg.iv;

			            // Swap endian
			            for (var i = 0; i < 4; i++) {
			                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
			                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
			            }

			            // Generate initial state values
			            var X = this._X = [
			                K[0], (K[3] << 16) | (K[2] >>> 16),
			                K[1], (K[0] << 16) | (K[3] >>> 16),
			                K[2], (K[1] << 16) | (K[0] >>> 16),
			                K[3], (K[2] << 16) | (K[1] >>> 16)
			            ];

			            // Generate initial counter values
			            var C = this._C = [
			                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
			                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
			                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
			                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
			            ];

			            // Carry bit
			            this._b = 0;

			            // Iterate the system four times
			            for (var i = 0; i < 4; i++) {
			                nextState.call(this);
			            }

			            // Modify the counters
			            for (var i = 0; i < 8; i++) {
			                C[i] ^= X[(i + 4) & 7];
			            }

			            // IV setup
			            if (iv) {
			                // Shortcuts
			                var IV = iv.words;
			                var IV_0 = IV[0];
			                var IV_1 = IV[1];

			                // Generate four subvectors
			                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
			                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
			                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
			                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

			                // Modify counter values
			                C[0] ^= i0;
			                C[1] ^= i1;
			                C[2] ^= i2;
			                C[3] ^= i3;
			                C[4] ^= i0;
			                C[5] ^= i1;
			                C[6] ^= i2;
			                C[7] ^= i3;

			                // Iterate the system four times
			                for (var i = 0; i < 4; i++) {
			                    nextState.call(this);
			                }
			            }
			        },

			        _doProcessBlock: function (M, offset) {
			            // Shortcut
			            var X = this._X;

			            // Iterate the system
			            nextState.call(this);

			            // Generate four keystream words
			            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
			            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
			            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
			            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

			            for (var i = 0; i < 4; i++) {
			                // Swap endian
			                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
			                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

			                // Encrypt
			                M[offset + i] ^= S[i];
			            }
			        },

			        blockSize: 128/32,

			        ivSize: 64/32
			    });

			    function nextState() {
			        // Shortcuts
			        var X = this._X;
			        var C = this._C;

			        // Save old counter values
			        for (var i = 0; i < 8; i++) {
			            C_[i] = C[i];
			        }

			        // Calculate new counter values
			        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
			        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
			        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
			        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
			        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
			        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
			        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
			        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
			        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

			        // Calculate the g-values
			        for (var i = 0; i < 8; i++) {
			            var gx = X[i] + C[i];

			            // Construct high and low argument for squaring
			            var ga = gx & 0xffff;
			            var gb = gx >>> 16;

			            // Calculate high and low result of squaring
			            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
			            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

			            // High XOR low
			            G[i] = gh ^ gl;
			        }

			        // Calculate new state values
			        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
			        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
			        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
			        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
			        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
			        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
			        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
			        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
			    }

			    /**
			     * Shortcut functions to the cipher's object interface.
			     *
			     * @example
			     *
			     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
			     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
			     */
			    C.Rabbit = StreamCipher._createHelper(Rabbit);
			}());


			return CryptoJS.Rabbit;

		})); 
	} (rabbit$1));
	return rabbit$1.exports;
}

var rabbitLegacy$1 = {exports: {}};

var rabbitLegacy = rabbitLegacy$1.exports;

var hasRequiredRabbitLegacy;

function requireRabbitLegacy () {
	if (hasRequiredRabbitLegacy) return rabbitLegacy$1.exports;
	hasRequiredRabbitLegacy = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
			}
		}(rabbitLegacy, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var StreamCipher = C_lib.StreamCipher;
			    var C_algo = C.algo;

			    // Reusable objects
			    var S  = [];
			    var C_ = [];
			    var G  = [];

			    /**
			     * Rabbit stream cipher algorithm.
			     *
			     * This is a legacy version that neglected to convert the key to little-endian.
			     * This error doesn't affect the cipher's security,
			     * but it does affect its compatibility with other implementations.
			     */
			    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
			        _doReset: function () {
			            // Shortcuts
			            var K = this._key.words;
			            var iv = this.cfg.iv;

			            // Generate initial state values
			            var X = this._X = [
			                K[0], (K[3] << 16) | (K[2] >>> 16),
			                K[1], (K[0] << 16) | (K[3] >>> 16),
			                K[2], (K[1] << 16) | (K[0] >>> 16),
			                K[3], (K[2] << 16) | (K[1] >>> 16)
			            ];

			            // Generate initial counter values
			            var C = this._C = [
			                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
			                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
			                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
			                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
			            ];

			            // Carry bit
			            this._b = 0;

			            // Iterate the system four times
			            for (var i = 0; i < 4; i++) {
			                nextState.call(this);
			            }

			            // Modify the counters
			            for (var i = 0; i < 8; i++) {
			                C[i] ^= X[(i + 4) & 7];
			            }

			            // IV setup
			            if (iv) {
			                // Shortcuts
			                var IV = iv.words;
			                var IV_0 = IV[0];
			                var IV_1 = IV[1];

			                // Generate four subvectors
			                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
			                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
			                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
			                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

			                // Modify counter values
			                C[0] ^= i0;
			                C[1] ^= i1;
			                C[2] ^= i2;
			                C[3] ^= i3;
			                C[4] ^= i0;
			                C[5] ^= i1;
			                C[6] ^= i2;
			                C[7] ^= i3;

			                // Iterate the system four times
			                for (var i = 0; i < 4; i++) {
			                    nextState.call(this);
			                }
			            }
			        },

			        _doProcessBlock: function (M, offset) {
			            // Shortcut
			            var X = this._X;

			            // Iterate the system
			            nextState.call(this);

			            // Generate four keystream words
			            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
			            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
			            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
			            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

			            for (var i = 0; i < 4; i++) {
			                // Swap endian
			                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
			                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

			                // Encrypt
			                M[offset + i] ^= S[i];
			            }
			        },

			        blockSize: 128/32,

			        ivSize: 64/32
			    });

			    function nextState() {
			        // Shortcuts
			        var X = this._X;
			        var C = this._C;

			        // Save old counter values
			        for (var i = 0; i < 8; i++) {
			            C_[i] = C[i];
			        }

			        // Calculate new counter values
			        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
			        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
			        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
			        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
			        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
			        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
			        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
			        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
			        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

			        // Calculate the g-values
			        for (var i = 0; i < 8; i++) {
			            var gx = X[i] + C[i];

			            // Construct high and low argument for squaring
			            var ga = gx & 0xffff;
			            var gb = gx >>> 16;

			            // Calculate high and low result of squaring
			            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
			            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

			            // High XOR low
			            G[i] = gh ^ gl;
			        }

			        // Calculate new state values
			        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
			        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
			        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
			        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
			        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
			        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
			        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
			        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
			    }

			    /**
			     * Shortcut functions to the cipher's object interface.
			     *
			     * @example
			     *
			     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
			     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
			     */
			    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
			}());


			return CryptoJS.RabbitLegacy;

		})); 
	} (rabbitLegacy$1));
	return rabbitLegacy$1.exports;
}

var blowfish$1 = {exports: {}};

var blowfish = blowfish$1.exports;

var hasRequiredBlowfish;

function requireBlowfish () {
	if (hasRequiredBlowfish) return blowfish$1.exports;
	hasRequiredBlowfish = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
			}
		}(blowfish, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var BlockCipher = C_lib.BlockCipher;
			    var C_algo = C.algo;

			    const N = 16;

			    //Origin pbox and sbox, derived from PI
			    const ORIG_P = [
			        0x243F6A88, 0x85A308D3, 0x13198A2E, 0x03707344,
			        0xA4093822, 0x299F31D0, 0x082EFA98, 0xEC4E6C89,
			        0x452821E6, 0x38D01377, 0xBE5466CF, 0x34E90C6C,
			        0xC0AC29B7, 0xC97C50DD, 0x3F84D5B5, 0xB5470917,
			        0x9216D5D9, 0x8979FB1B
			    ];

			    const ORIG_S = [
			        [   0xD1310BA6, 0x98DFB5AC, 0x2FFD72DB, 0xD01ADFB7,
			            0xB8E1AFED, 0x6A267E96, 0xBA7C9045, 0xF12C7F99,
			            0x24A19947, 0xB3916CF7, 0x0801F2E2, 0x858EFC16,
			            0x636920D8, 0x71574E69, 0xA458FEA3, 0xF4933D7E,
			            0x0D95748F, 0x728EB658, 0x718BCD58, 0x82154AEE,
			            0x7B54A41D, 0xC25A59B5, 0x9C30D539, 0x2AF26013,
			            0xC5D1B023, 0x286085F0, 0xCA417918, 0xB8DB38EF,
			            0x8E79DCB0, 0x603A180E, 0x6C9E0E8B, 0xB01E8A3E,
			            0xD71577C1, 0xBD314B27, 0x78AF2FDA, 0x55605C60,
			            0xE65525F3, 0xAA55AB94, 0x57489862, 0x63E81440,
			            0x55CA396A, 0x2AAB10B6, 0xB4CC5C34, 0x1141E8CE,
			            0xA15486AF, 0x7C72E993, 0xB3EE1411, 0x636FBC2A,
			            0x2BA9C55D, 0x741831F6, 0xCE5C3E16, 0x9B87931E,
			            0xAFD6BA33, 0x6C24CF5C, 0x7A325381, 0x28958677,
			            0x3B8F4898, 0x6B4BB9AF, 0xC4BFE81B, 0x66282193,
			            0x61D809CC, 0xFB21A991, 0x487CAC60, 0x5DEC8032,
			            0xEF845D5D, 0xE98575B1, 0xDC262302, 0xEB651B88,
			            0x23893E81, 0xD396ACC5, 0x0F6D6FF3, 0x83F44239,
			            0x2E0B4482, 0xA4842004, 0x69C8F04A, 0x9E1F9B5E,
			            0x21C66842, 0xF6E96C9A, 0x670C9C61, 0xABD388F0,
			            0x6A51A0D2, 0xD8542F68, 0x960FA728, 0xAB5133A3,
			            0x6EEF0B6C, 0x137A3BE4, 0xBA3BF050, 0x7EFB2A98,
			            0xA1F1651D, 0x39AF0176, 0x66CA593E, 0x82430E88,
			            0x8CEE8619, 0x456F9FB4, 0x7D84A5C3, 0x3B8B5EBE,
			            0xE06F75D8, 0x85C12073, 0x401A449F, 0x56C16AA6,
			            0x4ED3AA62, 0x363F7706, 0x1BFEDF72, 0x429B023D,
			            0x37D0D724, 0xD00A1248, 0xDB0FEAD3, 0x49F1C09B,
			            0x075372C9, 0x80991B7B, 0x25D479D8, 0xF6E8DEF7,
			            0xE3FE501A, 0xB6794C3B, 0x976CE0BD, 0x04C006BA,
			            0xC1A94FB6, 0x409F60C4, 0x5E5C9EC2, 0x196A2463,
			            0x68FB6FAF, 0x3E6C53B5, 0x1339B2EB, 0x3B52EC6F,
			            0x6DFC511F, 0x9B30952C, 0xCC814544, 0xAF5EBD09,
			            0xBEE3D004, 0xDE334AFD, 0x660F2807, 0x192E4BB3,
			            0xC0CBA857, 0x45C8740F, 0xD20B5F39, 0xB9D3FBDB,
			            0x5579C0BD, 0x1A60320A, 0xD6A100C6, 0x402C7279,
			            0x679F25FE, 0xFB1FA3CC, 0x8EA5E9F8, 0xDB3222F8,
			            0x3C7516DF, 0xFD616B15, 0x2F501EC8, 0xAD0552AB,
			            0x323DB5FA, 0xFD238760, 0x53317B48, 0x3E00DF82,
			            0x9E5C57BB, 0xCA6F8CA0, 0x1A87562E, 0xDF1769DB,
			            0xD542A8F6, 0x287EFFC3, 0xAC6732C6, 0x8C4F5573,
			            0x695B27B0, 0xBBCA58C8, 0xE1FFA35D, 0xB8F011A0,
			            0x10FA3D98, 0xFD2183B8, 0x4AFCB56C, 0x2DD1D35B,
			            0x9A53E479, 0xB6F84565, 0xD28E49BC, 0x4BFB9790,
			            0xE1DDF2DA, 0xA4CB7E33, 0x62FB1341, 0xCEE4C6E8,
			            0xEF20CADA, 0x36774C01, 0xD07E9EFE, 0x2BF11FB4,
			            0x95DBDA4D, 0xAE909198, 0xEAAD8E71, 0x6B93D5A0,
			            0xD08ED1D0, 0xAFC725E0, 0x8E3C5B2F, 0x8E7594B7,
			            0x8FF6E2FB, 0xF2122B64, 0x8888B812, 0x900DF01C,
			            0x4FAD5EA0, 0x688FC31C, 0xD1CFF191, 0xB3A8C1AD,
			            0x2F2F2218, 0xBE0E1777, 0xEA752DFE, 0x8B021FA1,
			            0xE5A0CC0F, 0xB56F74E8, 0x18ACF3D6, 0xCE89E299,
			            0xB4A84FE0, 0xFD13E0B7, 0x7CC43B81, 0xD2ADA8D9,
			            0x165FA266, 0x80957705, 0x93CC7314, 0x211A1477,
			            0xE6AD2065, 0x77B5FA86, 0xC75442F5, 0xFB9D35CF,
			            0xEBCDAF0C, 0x7B3E89A0, 0xD6411BD3, 0xAE1E7E49,
			            0x00250E2D, 0x2071B35E, 0x226800BB, 0x57B8E0AF,
			            0x2464369B, 0xF009B91E, 0x5563911D, 0x59DFA6AA,
			            0x78C14389, 0xD95A537F, 0x207D5BA2, 0x02E5B9C5,
			            0x83260376, 0x6295CFA9, 0x11C81968, 0x4E734A41,
			            0xB3472DCA, 0x7B14A94A, 0x1B510052, 0x9A532915,
			            0xD60F573F, 0xBC9BC6E4, 0x2B60A476, 0x81E67400,
			            0x08BA6FB5, 0x571BE91F, 0xF296EC6B, 0x2A0DD915,
			            0xB6636521, 0xE7B9F9B6, 0xFF34052E, 0xC5855664,
			            0x53B02D5D, 0xA99F8FA1, 0x08BA4799, 0x6E85076A   ],
			        [   0x4B7A70E9, 0xB5B32944, 0xDB75092E, 0xC4192623,
			            0xAD6EA6B0, 0x49A7DF7D, 0x9CEE60B8, 0x8FEDB266,
			            0xECAA8C71, 0x699A17FF, 0x5664526C, 0xC2B19EE1,
			            0x193602A5, 0x75094C29, 0xA0591340, 0xE4183A3E,
			            0x3F54989A, 0x5B429D65, 0x6B8FE4D6, 0x99F73FD6,
			            0xA1D29C07, 0xEFE830F5, 0x4D2D38E6, 0xF0255DC1,
			            0x4CDD2086, 0x8470EB26, 0x6382E9C6, 0x021ECC5E,
			            0x09686B3F, 0x3EBAEFC9, 0x3C971814, 0x6B6A70A1,
			            0x687F3584, 0x52A0E286, 0xB79C5305, 0xAA500737,
			            0x3E07841C, 0x7FDEAE5C, 0x8E7D44EC, 0x5716F2B8,
			            0xB03ADA37, 0xF0500C0D, 0xF01C1F04, 0x0200B3FF,
			            0xAE0CF51A, 0x3CB574B2, 0x25837A58, 0xDC0921BD,
			            0xD19113F9, 0x7CA92FF6, 0x94324773, 0x22F54701,
			            0x3AE5E581, 0x37C2DADC, 0xC8B57634, 0x9AF3DDA7,
			            0xA9446146, 0x0FD0030E, 0xECC8C73E, 0xA4751E41,
			            0xE238CD99, 0x3BEA0E2F, 0x3280BBA1, 0x183EB331,
			            0x4E548B38, 0x4F6DB908, 0x6F420D03, 0xF60A04BF,
			            0x2CB81290, 0x24977C79, 0x5679B072, 0xBCAF89AF,
			            0xDE9A771F, 0xD9930810, 0xB38BAE12, 0xDCCF3F2E,
			            0x5512721F, 0x2E6B7124, 0x501ADDE6, 0x9F84CD87,
			            0x7A584718, 0x7408DA17, 0xBC9F9ABC, 0xE94B7D8C,
			            0xEC7AEC3A, 0xDB851DFA, 0x63094366, 0xC464C3D2,
			            0xEF1C1847, 0x3215D908, 0xDD433B37, 0x24C2BA16,
			            0x12A14D43, 0x2A65C451, 0x50940002, 0x133AE4DD,
			            0x71DFF89E, 0x10314E55, 0x81AC77D6, 0x5F11199B,
			            0x043556F1, 0xD7A3C76B, 0x3C11183B, 0x5924A509,
			            0xF28FE6ED, 0x97F1FBFA, 0x9EBABF2C, 0x1E153C6E,
			            0x86E34570, 0xEAE96FB1, 0x860E5E0A, 0x5A3E2AB3,
			            0x771FE71C, 0x4E3D06FA, 0x2965DCB9, 0x99E71D0F,
			            0x803E89D6, 0x5266C825, 0x2E4CC978, 0x9C10B36A,
			            0xC6150EBA, 0x94E2EA78, 0xA5FC3C53, 0x1E0A2DF4,
			            0xF2F74EA7, 0x361D2B3D, 0x1939260F, 0x19C27960,
			            0x5223A708, 0xF71312B6, 0xEBADFE6E, 0xEAC31F66,
			            0xE3BC4595, 0xA67BC883, 0xB17F37D1, 0x018CFF28,
			            0xC332DDEF, 0xBE6C5AA5, 0x65582185, 0x68AB9802,
			            0xEECEA50F, 0xDB2F953B, 0x2AEF7DAD, 0x5B6E2F84,
			            0x1521B628, 0x29076170, 0xECDD4775, 0x619F1510,
			            0x13CCA830, 0xEB61BD96, 0x0334FE1E, 0xAA0363CF,
			            0xB5735C90, 0x4C70A239, 0xD59E9E0B, 0xCBAADE14,
			            0xEECC86BC, 0x60622CA7, 0x9CAB5CAB, 0xB2F3846E,
			            0x648B1EAF, 0x19BDF0CA, 0xA02369B9, 0x655ABB50,
			            0x40685A32, 0x3C2AB4B3, 0x319EE9D5, 0xC021B8F7,
			            0x9B540B19, 0x875FA099, 0x95F7997E, 0x623D7DA8,
			            0xF837889A, 0x97E32D77, 0x11ED935F, 0x16681281,
			            0x0E358829, 0xC7E61FD6, 0x96DEDFA1, 0x7858BA99,
			            0x57F584A5, 0x1B227263, 0x9B83C3FF, 0x1AC24696,
			            0xCDB30AEB, 0x532E3054, 0x8FD948E4, 0x6DBC3128,
			            0x58EBF2EF, 0x34C6FFEA, 0xFE28ED61, 0xEE7C3C73,
			            0x5D4A14D9, 0xE864B7E3, 0x42105D14, 0x203E13E0,
			            0x45EEE2B6, 0xA3AAABEA, 0xDB6C4F15, 0xFACB4FD0,
			            0xC742F442, 0xEF6ABBB5, 0x654F3B1D, 0x41CD2105,
			            0xD81E799E, 0x86854DC7, 0xE44B476A, 0x3D816250,
			            0xCF62A1F2, 0x5B8D2646, 0xFC8883A0, 0xC1C7B6A3,
			            0x7F1524C3, 0x69CB7492, 0x47848A0B, 0x5692B285,
			            0x095BBF00, 0xAD19489D, 0x1462B174, 0x23820E00,
			            0x58428D2A, 0x0C55F5EA, 0x1DADF43E, 0x233F7061,
			            0x3372F092, 0x8D937E41, 0xD65FECF1, 0x6C223BDB,
			            0x7CDE3759, 0xCBEE7460, 0x4085F2A7, 0xCE77326E,
			            0xA6078084, 0x19F8509E, 0xE8EFD855, 0x61D99735,
			            0xA969A7AA, 0xC50C06C2, 0x5A04ABFC, 0x800BCADC,
			            0x9E447A2E, 0xC3453484, 0xFDD56705, 0x0E1E9EC9,
			            0xDB73DBD3, 0x105588CD, 0x675FDA79, 0xE3674340,
			            0xC5C43465, 0x713E38D8, 0x3D28F89E, 0xF16DFF20,
			            0x153E21E7, 0x8FB03D4A, 0xE6E39F2B, 0xDB83ADF7   ],
			        [   0xE93D5A68, 0x948140F7, 0xF64C261C, 0x94692934,
			            0x411520F7, 0x7602D4F7, 0xBCF46B2E, 0xD4A20068,
			            0xD4082471, 0x3320F46A, 0x43B7D4B7, 0x500061AF,
			            0x1E39F62E, 0x97244546, 0x14214F74, 0xBF8B8840,
			            0x4D95FC1D, 0x96B591AF, 0x70F4DDD3, 0x66A02F45,
			            0xBFBC09EC, 0x03BD9785, 0x7FAC6DD0, 0x31CB8504,
			            0x96EB27B3, 0x55FD3941, 0xDA2547E6, 0xABCA0A9A,
			            0x28507825, 0x530429F4, 0x0A2C86DA, 0xE9B66DFB,
			            0x68DC1462, 0xD7486900, 0x680EC0A4, 0x27A18DEE,
			            0x4F3FFEA2, 0xE887AD8C, 0xB58CE006, 0x7AF4D6B6,
			            0xAACE1E7C, 0xD3375FEC, 0xCE78A399, 0x406B2A42,
			            0x20FE9E35, 0xD9F385B9, 0xEE39D7AB, 0x3B124E8B,
			            0x1DC9FAF7, 0x4B6D1856, 0x26A36631, 0xEAE397B2,
			            0x3A6EFA74, 0xDD5B4332, 0x6841E7F7, 0xCA7820FB,
			            0xFB0AF54E, 0xD8FEB397, 0x454056AC, 0xBA489527,
			            0x55533A3A, 0x20838D87, 0xFE6BA9B7, 0xD096954B,
			            0x55A867BC, 0xA1159A58, 0xCCA92963, 0x99E1DB33,
			            0xA62A4A56, 0x3F3125F9, 0x5EF47E1C, 0x9029317C,
			            0xFDF8E802, 0x04272F70, 0x80BB155C, 0x05282CE3,
			            0x95C11548, 0xE4C66D22, 0x48C1133F, 0xC70F86DC,
			            0x07F9C9EE, 0x41041F0F, 0x404779A4, 0x5D886E17,
			            0x325F51EB, 0xD59BC0D1, 0xF2BCC18F, 0x41113564,
			            0x257B7834, 0x602A9C60, 0xDFF8E8A3, 0x1F636C1B,
			            0x0E12B4C2, 0x02E1329E, 0xAF664FD1, 0xCAD18115,
			            0x6B2395E0, 0x333E92E1, 0x3B240B62, 0xEEBEB922,
			            0x85B2A20E, 0xE6BA0D99, 0xDE720C8C, 0x2DA2F728,
			            0xD0127845, 0x95B794FD, 0x647D0862, 0xE7CCF5F0,
			            0x5449A36F, 0x877D48FA, 0xC39DFD27, 0xF33E8D1E,
			            0x0A476341, 0x992EFF74, 0x3A6F6EAB, 0xF4F8FD37,
			            0xA812DC60, 0xA1EBDDF8, 0x991BE14C, 0xDB6E6B0D,
			            0xC67B5510, 0x6D672C37, 0x2765D43B, 0xDCD0E804,
			            0xF1290DC7, 0xCC00FFA3, 0xB5390F92, 0x690FED0B,
			            0x667B9FFB, 0xCEDB7D9C, 0xA091CF0B, 0xD9155EA3,
			            0xBB132F88, 0x515BAD24, 0x7B9479BF, 0x763BD6EB,
			            0x37392EB3, 0xCC115979, 0x8026E297, 0xF42E312D,
			            0x6842ADA7, 0xC66A2B3B, 0x12754CCC, 0x782EF11C,
			            0x6A124237, 0xB79251E7, 0x06A1BBE6, 0x4BFB6350,
			            0x1A6B1018, 0x11CAEDFA, 0x3D25BDD8, 0xE2E1C3C9,
			            0x44421659, 0x0A121386, 0xD90CEC6E, 0xD5ABEA2A,
			            0x64AF674E, 0xDA86A85F, 0xBEBFE988, 0x64E4C3FE,
			            0x9DBC8057, 0xF0F7C086, 0x60787BF8, 0x6003604D,
			            0xD1FD8346, 0xF6381FB0, 0x7745AE04, 0xD736FCCC,
			            0x83426B33, 0xF01EAB71, 0xB0804187, 0x3C005E5F,
			            0x77A057BE, 0xBDE8AE24, 0x55464299, 0xBF582E61,
			            0x4E58F48F, 0xF2DDFDA2, 0xF474EF38, 0x8789BDC2,
			            0x5366F9C3, 0xC8B38E74, 0xB475F255, 0x46FCD9B9,
			            0x7AEB2661, 0x8B1DDF84, 0x846A0E79, 0x915F95E2,
			            0x466E598E, 0x20B45770, 0x8CD55591, 0xC902DE4C,
			            0xB90BACE1, 0xBB8205D0, 0x11A86248, 0x7574A99E,
			            0xB77F19B6, 0xE0A9DC09, 0x662D09A1, 0xC4324633,
			            0xE85A1F02, 0x09F0BE8C, 0x4A99A025, 0x1D6EFE10,
			            0x1AB93D1D, 0x0BA5A4DF, 0xA186F20F, 0x2868F169,
			            0xDCB7DA83, 0x573906FE, 0xA1E2CE9B, 0x4FCD7F52,
			            0x50115E01, 0xA70683FA, 0xA002B5C4, 0x0DE6D027,
			            0x9AF88C27, 0x773F8641, 0xC3604C06, 0x61A806B5,
			            0xF0177A28, 0xC0F586E0, 0x006058AA, 0x30DC7D62,
			            0x11E69ED7, 0x2338EA63, 0x53C2DD94, 0xC2C21634,
			            0xBBCBEE56, 0x90BCB6DE, 0xEBFC7DA1, 0xCE591D76,
			            0x6F05E409, 0x4B7C0188, 0x39720A3D, 0x7C927C24,
			            0x86E3725F, 0x724D9DB9, 0x1AC15BB4, 0xD39EB8FC,
			            0xED545578, 0x08FCA5B5, 0xD83D7CD3, 0x4DAD0FC4,
			            0x1E50EF5E, 0xB161E6F8, 0xA28514D9, 0x6C51133C,
			            0x6FD5C7E7, 0x56E14EC4, 0x362ABFCE, 0xDDC6C837,
			            0xD79A3234, 0x92638212, 0x670EFA8E, 0x406000E0  ],
			        [   0x3A39CE37, 0xD3FAF5CF, 0xABC27737, 0x5AC52D1B,
			            0x5CB0679E, 0x4FA33742, 0xD3822740, 0x99BC9BBE,
			            0xD5118E9D, 0xBF0F7315, 0xD62D1C7E, 0xC700C47B,
			            0xB78C1B6B, 0x21A19045, 0xB26EB1BE, 0x6A366EB4,
			            0x5748AB2F, 0xBC946E79, 0xC6A376D2, 0x6549C2C8,
			            0x530FF8EE, 0x468DDE7D, 0xD5730A1D, 0x4CD04DC6,
			            0x2939BBDB, 0xA9BA4650, 0xAC9526E8, 0xBE5EE304,
			            0xA1FAD5F0, 0x6A2D519A, 0x63EF8CE2, 0x9A86EE22,
			            0xC089C2B8, 0x43242EF6, 0xA51E03AA, 0x9CF2D0A4,
			            0x83C061BA, 0x9BE96A4D, 0x8FE51550, 0xBA645BD6,
			            0x2826A2F9, 0xA73A3AE1, 0x4BA99586, 0xEF5562E9,
			            0xC72FEFD3, 0xF752F7DA, 0x3F046F69, 0x77FA0A59,
			            0x80E4A915, 0x87B08601, 0x9B09E6AD, 0x3B3EE593,
			            0xE990FD5A, 0x9E34D797, 0x2CF0B7D9, 0x022B8B51,
			            0x96D5AC3A, 0x017DA67D, 0xD1CF3ED6, 0x7C7D2D28,
			            0x1F9F25CF, 0xADF2B89B, 0x5AD6B472, 0x5A88F54C,
			            0xE029AC71, 0xE019A5E6, 0x47B0ACFD, 0xED93FA9B,
			            0xE8D3C48D, 0x283B57CC, 0xF8D56629, 0x79132E28,
			            0x785F0191, 0xED756055, 0xF7960E44, 0xE3D35E8C,
			            0x15056DD4, 0x88F46DBA, 0x03A16125, 0x0564F0BD,
			            0xC3EB9E15, 0x3C9057A2, 0x97271AEC, 0xA93A072A,
			            0x1B3F6D9B, 0x1E6321F5, 0xF59C66FB, 0x26DCF319,
			            0x7533D928, 0xB155FDF5, 0x03563482, 0x8ABA3CBB,
			            0x28517711, 0xC20AD9F8, 0xABCC5167, 0xCCAD925F,
			            0x4DE81751, 0x3830DC8E, 0x379D5862, 0x9320F991,
			            0xEA7A90C2, 0xFB3E7BCE, 0x5121CE64, 0x774FBE32,
			            0xA8B6E37E, 0xC3293D46, 0x48DE5369, 0x6413E680,
			            0xA2AE0810, 0xDD6DB224, 0x69852DFD, 0x09072166,
			            0xB39A460A, 0x6445C0DD, 0x586CDECF, 0x1C20C8AE,
			            0x5BBEF7DD, 0x1B588D40, 0xCCD2017F, 0x6BB4E3BB,
			            0xDDA26A7E, 0x3A59FF45, 0x3E350A44, 0xBCB4CDD5,
			            0x72EACEA8, 0xFA6484BB, 0x8D6612AE, 0xBF3C6F47,
			            0xD29BE463, 0x542F5D9E, 0xAEC2771B, 0xF64E6370,
			            0x740E0D8D, 0xE75B1357, 0xF8721671, 0xAF537D5D,
			            0x4040CB08, 0x4EB4E2CC, 0x34D2466A, 0x0115AF84,
			            0xE1B00428, 0x95983A1D, 0x06B89FB4, 0xCE6EA048,
			            0x6F3F3B82, 0x3520AB82, 0x011A1D4B, 0x277227F8,
			            0x611560B1, 0xE7933FDC, 0xBB3A792B, 0x344525BD,
			            0xA08839E1, 0x51CE794B, 0x2F32C9B7, 0xA01FBAC9,
			            0xE01CC87E, 0xBCC7D1F6, 0xCF0111C3, 0xA1E8AAC7,
			            0x1A908749, 0xD44FBD9A, 0xD0DADECB, 0xD50ADA38,
			            0x0339C32A, 0xC6913667, 0x8DF9317C, 0xE0B12B4F,
			            0xF79E59B7, 0x43F5BB3A, 0xF2D519FF, 0x27D9459C,
			            0xBF97222C, 0x15E6FC2A, 0x0F91FC71, 0x9B941525,
			            0xFAE59361, 0xCEB69CEB, 0xC2A86459, 0x12BAA8D1,
			            0xB6C1075E, 0xE3056A0C, 0x10D25065, 0xCB03A442,
			            0xE0EC6E0E, 0x1698DB3B, 0x4C98A0BE, 0x3278E964,
			            0x9F1F9532, 0xE0D392DF, 0xD3A0342B, 0x8971F21E,
			            0x1B0A7441, 0x4BA3348C, 0xC5BE7120, 0xC37632D8,
			            0xDF359F8D, 0x9B992F2E, 0xE60B6F47, 0x0FE3F11D,
			            0xE54CDA54, 0x1EDAD891, 0xCE6279CF, 0xCD3E7E6F,
			            0x1618B166, 0xFD2C1D05, 0x848FD2C5, 0xF6FB2299,
			            0xF523F357, 0xA6327623, 0x93A83531, 0x56CCCD02,
			            0xACF08162, 0x5A75EBB5, 0x6E163697, 0x88D273CC,
			            0xDE966292, 0x81B949D0, 0x4C50901B, 0x71C65614,
			            0xE6C6C7BD, 0x327A140A, 0x45E1D006, 0xC3F27B9A,
			            0xC9AA53FD, 0x62A80F00, 0xBB25BFE2, 0x35BDD2F6,
			            0x71126905, 0xB2040222, 0xB6CBCF7C, 0xCD769C2B,
			            0x53113EC0, 0x1640E3D3, 0x38ABBD60, 0x2547ADF0,
			            0xBA38209C, 0xF746CE76, 0x77AFA1C5, 0x20756060,
			            0x85CBFE4E, 0x8AE88DD8, 0x7AAAF9B0, 0x4CF9AA7E,
			            0x1948C25C, 0x02FB8A8C, 0x01C36AE4, 0xD6EBE1F9,
			            0x90D4F869, 0xA65CDEA0, 0x3F09252D, 0xC208E69F,
			            0xB74E6132, 0xCE77E25B, 0x578FDFE3, 0x3AC372E6  ]
			    ];

			    var BLOWFISH_CTX = {
			        pbox: [],
			        sbox: []
			    };

			    function F(ctx, x){
			        let a = (x >> 24) & 0xFF;
			        let b = (x >> 16) & 0xFF;
			        let c = (x >> 8) & 0xFF;
			        let d = x & 0xFF;

			        let y = ctx.sbox[0][a] + ctx.sbox[1][b];
			        y = y ^ ctx.sbox[2][c];
			        y = y + ctx.sbox[3][d];

			        return y;
			    }

			    function BlowFish_Encrypt(ctx, left, right){
			        let Xl = left;
			        let Xr = right;
			        let temp;

			        for(let i = 0; i < N; ++i){
			            Xl = Xl ^ ctx.pbox[i];
			            Xr = F(ctx, Xl) ^ Xr;

			            temp = Xl;
			            Xl = Xr;
			            Xr = temp;
			        }

			        temp = Xl;
			        Xl = Xr;
			        Xr = temp;

			        Xr = Xr ^ ctx.pbox[N];
			        Xl = Xl ^ ctx.pbox[N + 1];

			        return {left: Xl, right: Xr};
			    }

			    function BlowFish_Decrypt(ctx, left, right){
			        let Xl = left;
			        let Xr = right;
			        let temp;

			        for(let i = N + 1; i > 1; --i){
			            Xl = Xl ^ ctx.pbox[i];
			            Xr = F(ctx, Xl) ^ Xr;

			            temp = Xl;
			            Xl = Xr;
			            Xr = temp;
			        }

			        temp = Xl;
			        Xl = Xr;
			        Xr = temp;

			        Xr = Xr ^ ctx.pbox[1];
			        Xl = Xl ^ ctx.pbox[0];

			        return {left: Xl, right: Xr};
			    }

			    /**
			     * Initialization ctx's pbox and sbox.
			     *
			     * @param {Object} ctx The object has pbox and sbox.
			     * @param {Array} key An array of 32-bit words.
			     * @param {int} keysize The length of the key.
			     *
			     * @example
			     *
			     *     BlowFishInit(BLOWFISH_CTX, key, 128/32);
			     */
			    function BlowFishInit(ctx, key, keysize)
			    {
			        for(let Row = 0; Row < 4; Row++)
			        {
			            ctx.sbox[Row] = [];
			            for(let Col = 0; Col < 256; Col++)
			            {
			                ctx.sbox[Row][Col] = ORIG_S[Row][Col];
			            }
			        }

			        let keyIndex = 0;
			        for(let index = 0; index < N + 2; index++)
			        {
			            ctx.pbox[index] = ORIG_P[index] ^ key[keyIndex];
			            keyIndex++;
			            if(keyIndex >= keysize)
			            {
			                keyIndex = 0;
			            }
			        }

			        let Data1 = 0;
			        let Data2 = 0;
			        let res = 0;
			        for(let i = 0; i < N + 2; i += 2)
			        {
			            res = BlowFish_Encrypt(ctx, Data1, Data2);
			            Data1 = res.left;
			            Data2 = res.right;
			            ctx.pbox[i] = Data1;
			            ctx.pbox[i + 1] = Data2;
			        }

			        for(let i = 0; i < 4; i++)
			        {
			            for(let j = 0; j < 256; j += 2)
			            {
			                res = BlowFish_Encrypt(ctx, Data1, Data2);
			                Data1 = res.left;
			                Data2 = res.right;
			                ctx.sbox[i][j] = Data1;
			                ctx.sbox[i][j + 1] = Data2;
			            }
			        }

			        return true;
			    }

			    /**
			     * Blowfish block cipher algorithm.
			     */
			    var Blowfish = C_algo.Blowfish = BlockCipher.extend({
			        _doReset: function () {
			            // Skip reset of nRounds has been set before and key did not change
			            if (this._keyPriorReset === this._key) {
			                return;
			            }

			            // Shortcuts
			            var key = this._keyPriorReset = this._key;
			            var keyWords = key.words;
			            var keySize = key.sigBytes / 4;

			            //Initialization pbox and sbox
			            BlowFishInit(BLOWFISH_CTX, keyWords, keySize);
			        },

			        encryptBlock: function (M, offset) {
			            var res = BlowFish_Encrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
			            M[offset] = res.left;
			            M[offset + 1] = res.right;
			        },

			        decryptBlock: function (M, offset) {
			            var res = BlowFish_Decrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
			            M[offset] = res.left;
			            M[offset + 1] = res.right;
			        },

			        blockSize: 64/32,

			        keySize: 128/32,

			        ivSize: 64/32
			    });

			    /**
			     * Shortcut functions to the cipher's object interface.
			     *
			     * @example
			     *
			     *     var ciphertext = CryptoJS.Blowfish.encrypt(message, key, cfg);
			     *     var plaintext  = CryptoJS.Blowfish.decrypt(ciphertext, key, cfg);
			     */
			    C.Blowfish = BlockCipher._createHelper(Blowfish);
			}());


			return CryptoJS.Blowfish;

		})); 
	} (blowfish$1));
	return blowfish$1.exports;
}

var cryptoJs = cryptoJs$1.exports;

var hasRequiredCryptoJs;

function requireCryptoJs () {
	if (hasRequiredCryptoJs) return cryptoJs$1.exports;
	hasRequiredCryptoJs = 1;
	(function (module, exports$1) {
(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireX64Core(), requireLibTypedarrays(), requireEncUtf16(), requireEncBase64(), requireEncBase64url(), requireMd5(), requireSha1(), requireSha256(), requireSha224(), requireSha512(), requireSha384(), requireSha3(), requireRipemd160(), requireHmac(), requirePbkdf2(), requireEvpkdf(), requireCipherCore(), requireModeCfb(), requireModeCtr(), requireModeCtrGladman(), requireModeOfb(), requireModeEcb(), requirePadAnsix923(), requirePadIso10126(), requirePadIso97971(), requirePadZeropadding(), requirePadNopadding(), requireFormatHex(), requireAes(), requireTripledes(), requireRc4(), requireRabbit(), requireRabbitLegacy(), requireBlowfish());
			}
		}(cryptoJs, function (CryptoJS) {

			return CryptoJS;

		})); 
	} (cryptoJs$1));
	return cryptoJs$1.exports;
}

var cryptoJsExports = requireCryptoJs();
const CryptoJS = /*@__PURE__*/getDefaultExportFromCjs(cryptoJsExports);

/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

/* eslint-disable space-unary-ops */

/* Public constants ==========================================================*/
/* ===========================================================================*/


//const Z_FILTERED          = 1;
//const Z_HUFFMAN_ONLY      = 2;
//const Z_RLE               = 3;
const Z_FIXED$1               = 4;
//const Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
const Z_BINARY              = 0;
const Z_TEXT                = 1;
//const Z_ASCII             = 1; // = Z_TEXT
const Z_UNKNOWN$1             = 2;

/*============================================================================*/


function zero$1(buf) { let len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

const STORED_BLOCK = 0;
const STATIC_TREES = 1;
const DYN_TREES    = 2;
/* The three kinds of block type */

const MIN_MATCH$1    = 3;
const MAX_MATCH$1    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

const LENGTH_CODES$1  = 29;
/* number of length codes, not counting the special END_BLOCK code */

const LITERALS$1      = 256;
/* number of literal bytes 0..255 */

const L_CODES$1       = LITERALS$1 + 1 + LENGTH_CODES$1;
/* number of Literal or Length codes, including the END_BLOCK code */

const D_CODES$1       = 30;
/* number of distance codes */

const BL_CODES$1      = 19;
/* number of codes used to transfer the bit lengths */

const HEAP_SIZE$1     = 2 * L_CODES$1 + 1;
/* maximum heap size */

const MAX_BITS$1      = 15;
/* All codes must not exceed MAX_BITS bits */

const Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

const MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

const END_BLOCK   = 256;
/* end of block literal code */

const REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

const REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

const REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
const extra_lbits =   /* extra bits for each length code */
  new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]);

const extra_dbits =   /* extra bits for each distance code */
  new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]);

const extra_blbits =  /* extra bits for each bit length code */
  new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]);

const bl_order =
  new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

const DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
const static_ltree  = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

const static_dtree  = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

const _dist_code    = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

const _length_code  = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

const base_length   = new Array(LENGTH_CODES$1);
zero$1(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

const base_dist     = new Array(D_CODES$1);
zero$1(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


let static_l_desc;
let static_d_desc;
let static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



const d_code = (dist) => {

  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
};


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
const put_short = (s, w) => {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
};


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
const send_bits = (s, value, length) => {

  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
};


const send_code = (s, c, tree) => {

  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
};


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
const bi_reverse = (code, len) => {

  let res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
};


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
const bi_flush = (s) => {

  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
};


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
const gen_bitlen = (s, desc) => {
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */

  const tree            = desc.dyn_tree;
  const max_code        = desc.max_code;
  const stree           = desc.stat_desc.static_tree;
  const has_stree       = desc.stat_desc.has_stree;
  const extra           = desc.stat_desc.extra_bits;
  const base            = desc.stat_desc.extra_base;
  const max_length      = desc.stat_desc.max_length;
  let h;              /* heap index */
  let n, m;           /* iterate over the tree elements */
  let bits;           /* bit length */
  let xbits;          /* extra bits */
  let f;              /* frequency */
  let overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Tracev((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Tracev((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
};


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
const gen_codes = (tree, max_code, bl_count) => {
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */

  const next_code = new Array(MAX_BITS$1 + 1); /* next code value for each bit length */
  let code = 0;              /* running code value */
  let bits;                  /* bit index */
  let n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS$1; bits++) {
    code = (code + bl_count[bits - 1]) << 1;
    next_code[bits] = code;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    let len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
};


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
const tr_static_init = () => {

  let n;        /* iterates over tree elements */
  let bits;     /* bit counter */
  let length;   /* length value */
  let code;     /* code value */
  let dist;     /* distance index */
  const bl_count = new Array(MAX_BITS$1 + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES$1; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES$1; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES$1, MAX_BITS$1);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES$1, MAX_BL_BITS);

  //static_init_done = true;
};


/* ===========================================================================
 * Initialize a new block.
 */
const init_block = (s) => {

  let n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES$1;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES$1;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES$1; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.sym_next = s.matches = 0;
};


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
const bi_windup = (s) =>
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
};

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
const smaller = (tree, n, m, depth) => {

  const _n2 = n * 2;
  const _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
};

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
const pqdownheap = (s, tree, k) => {
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */

  const v = s.heap[k];
  let j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
};


// inlined manually
// const SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
const compress_block = (s, ltree, dtree) => {
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */

  let dist;           /* distance of matched string */
  let lc;             /* match length or unmatched char (if dist == 0) */
  let sx = 0;         /* running index in sym_buf */
  let code;           /* the code to send */
  let extra;          /* number of extra bits to send */

  if (s.sym_next !== 0) {
    do {
      dist = s.pending_buf[s.sym_buf + sx++] & 0xff;
      dist += (s.pending_buf[s.sym_buf + sx++] & 0xff) << 8;
      lc = s.pending_buf[s.sym_buf + sx++];
      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS$1 + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and sym_buf is ok: */
      //Assert(s->pending < s->lit_bufsize + sx, "pendingBuf overflow");

    } while (sx < s.sym_next);
  }

  send_code(s, END_BLOCK, ltree);
};


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
const build_tree = (s, desc) => {
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */

  const tree     = desc.dyn_tree;
  const stree    = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const elems    = desc.stat_desc.elems;
  let n, m;          /* iterate over heap elements */
  let max_code = -1; /* largest code with non zero frequency */
  let node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE$1;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
};


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
const scan_tree = (s, tree, max_code) => {
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */

  let n;                     /* iterates over all tree elements */
  let prevlen = -1;          /* last emitted length */
  let curlen;                /* length of current code */

  let nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  let count = 0;             /* repeat count of the current code */
  let max_count = 7;         /* max repeat count */
  let min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
const send_tree = (s, tree, max_code) => {
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */

  let n;                     /* iterates over all tree elements */
  let prevlen = -1;          /* last emitted length */
  let curlen;                /* length of current code */

  let nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  let count = 0;             /* repeat count of the current code */
  let max_count = 7;         /* max repeat count */
  let min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
const build_bl_tree = (s) => {

  let max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
};


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
const send_all_trees = (s, lcodes, dcodes, blcodes) => {
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */

  let rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
};


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "block list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "allow list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
const detect_data_type = (s) => {
  /* block_mask is the bit mask of block-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  let block_mask = 0xf3ffc07f;
  let n;

  /* Check for non-textual ("block-listed") bytes. */
  for (n = 0; n <= 31; n++, block_mask >>>= 1) {
    if ((block_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("allow-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS$1; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "block-listed" or "allow-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
};


let static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
const _tr_init$1 = (s) =>
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
};


/* ===========================================================================
 * Send a stored block
 */
const _tr_stored_block$1 = (s, buf, stored_len, last) => {
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */

  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  bi_windup(s);        /* align on byte boundary */
  put_short(s, stored_len);
  put_short(s, ~stored_len);
  if (stored_len) {
    s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
  }
  s.pending += stored_len;
};


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
const _tr_align$1 = (s) => {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
};


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and write out the encoded block.
 */
const _tr_flush_block$1 = (s, buf, stored_len, last) => {
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */

  let opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  let max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN$1) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->sym_next / 3));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block$1(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
};

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
const _tr_tally$1 = (s, dist, lc) => {
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */

  s.pending_buf[s.sym_buf + s.sym_next++] = dist;
  s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
  s.pending_buf[s.sym_buf + s.sym_next++] = lc;
  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

  return (s.sym_next === s.sym_end);
};

var _tr_init_1  = _tr_init$1;
var _tr_stored_block_1 = _tr_stored_block$1;
var _tr_flush_block_1  = _tr_flush_block$1;
var _tr_tally_1 = _tr_tally$1;
var _tr_align_1 = _tr_align$1;

var trees = {
	_tr_init: _tr_init_1,
	_tr_stored_block: _tr_stored_block_1,
	_tr_flush_block: _tr_flush_block_1,
	_tr_tally: _tr_tally_1,
	_tr_align: _tr_align_1
};

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

const adler32 = (adler, buf, len, pos) => {
  let s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
};


var adler32_1 = adler32;

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
const makeTable = () => {
  let c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
};

// Create table on load. Just 255 signed longs. Not a problem.
const crcTable = new Uint32Array(makeTable());


const crc32 = (crc, buf, len, pos) => {
  const t = crcTable;
  const end = pos + len;

  crc ^= -1;

  for (let i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
};


var crc32_1 = crc32;

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var messages = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var constants$2 = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  Z_MEM_ERROR:       -4,
  Z_BUF_ERROR:       -5,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

const { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;




/* Public constants ==========================================================*/
/* ===========================================================================*/

const {
  Z_NO_FLUSH: Z_NO_FLUSH$2, Z_PARTIAL_FLUSH, Z_FULL_FLUSH: Z_FULL_FLUSH$1, Z_FINISH: Z_FINISH$3, Z_BLOCK: Z_BLOCK$1,
  Z_OK: Z_OK$3, Z_STREAM_END: Z_STREAM_END$3, Z_STREAM_ERROR: Z_STREAM_ERROR$2, Z_DATA_ERROR: Z_DATA_ERROR$2, Z_BUF_ERROR: Z_BUF_ERROR$1,
  Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
  Z_FILTERED, Z_HUFFMAN_ONLY, Z_RLE, Z_FIXED, Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
  Z_UNKNOWN,
  Z_DEFLATED: Z_DEFLATED$2
} = constants$2;

/*============================================================================*/


const MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
const MAX_WBITS$1 = 15;
/* 32K LZ77 window */
const DEF_MEM_LEVEL = 8;


const LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
const LITERALS      = 256;
/* number of literal bytes 0..255 */
const L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
const D_CODES       = 30;
/* number of distance codes */
const BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
const HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
const MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

const MIN_MATCH = 3;
const MAX_MATCH = 258;
const MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

const PRESET_DICT = 0x20;

const INIT_STATE    =  42;    /* zlib header -> BUSY_STATE */
//#ifdef GZIP
const GZIP_STATE    =  57;    /* gzip header -> BUSY_STATE | EXTRA_STATE */
//#endif
const EXTRA_STATE   =  69;    /* gzip extra block -> NAME_STATE */
const NAME_STATE    =  73;    /* gzip file name -> COMMENT_STATE */
const COMMENT_STATE =  91;    /* gzip comment -> HCRC_STATE */
const HCRC_STATE    = 103;    /* gzip header CRC -> BUSY_STATE */
const BUSY_STATE    = 113;    /* deflate -> FINISH_STATE */
const FINISH_STATE  = 666;    /* stream complete */

const BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
const BS_BLOCK_DONE     = 2; /* block flush performed */
const BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
const BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

const OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

const err = (strm, errorCode) => {
  strm.msg = messages[errorCode];
  return errorCode;
};

const rank = (f) => {
  return ((f) * 2) - ((f) > 4 ? 9 : 0);
};

const zero = (buf) => {
  let len = buf.length; while (--len >= 0) { buf[len] = 0; }
};

/* ===========================================================================
 * Slide the hash table when sliding the window down (could be avoided with 32
 * bit values at the expense of memory usage). We slide even when level == 0 to
 * keep the hash table consistent if we switch back to level > 0 later.
 */
const slide_hash = (s) => {
  let n, m;
  let p;
  let wsize = s.w_size;

  n = s.hash_size;
  p = n;
  do {
    m = s.head[--p];
    s.head[p] = (m >= wsize ? m - wsize : 0);
  } while (--n);
  n = wsize;
//#ifndef FASTEST
  p = n;
  do {
    m = s.prev[--p];
    s.prev[p] = (m >= wsize ? m - wsize : 0);
    /* If n is not on any hash chain, prev[n] is garbage but
     * its value will never be used.
     */
  } while (--n);
//#endif
};

/* eslint-disable new-cap */
let HASH_ZLIB = (s, prev, data) => ((prev << s.hash_shift) ^ data) & s.hash_mask;
// This hash causes less collisions, https://github.com/nodeca/pako/issues/135
// But breaks binary compatibility
//let HASH_FAST = (s, prev, data) => ((prev << 8) + (prev >> 8) + (data << 4)) & s.hash_mask;
let HASH = HASH_ZLIB;


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output, except for
 * some deflate_stored() output, goes through this function so some
 * applications may wish to modify it to avoid allocating a large
 * strm->next_out buffer and copying into it. (See also read_buf()).
 */
const flush_pending = (strm) => {
  const s = strm.state;

  //_tr_flush_bits(s);
  let len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
  strm.next_out  += len;
  s.pending_out  += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending      -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
};


const flush_block_only = (s, last) => {
  _tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
};


const put_byte = (s, b) => {
  s.pending_buf[s.pending++] = b;
};


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
const putShortMSB = (s, b) => {

  //  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
};


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
const read_buf = (strm, buf, start, size) => {

  let len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32_1(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32_1(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
};


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
const longest_match = (s, cur_match) => {

  let chain_length = s.max_chain_length;      /* max hash chain length */
  let scan = s.strstart; /* current string */
  let match;                       /* matched string */
  let len;                           /* length of current match */
  let best_len = s.prev_length;              /* best match length so far */
  let nice_match = s.nice_match;             /* stop if match long enough */
  const limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  const _win = s.window; // shortcut

  const wmask = s.w_mask;
  const prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  const strend = s.strstart + MAX_MATCH;
  let scan_end1  = _win[scan + best_len - 1];
  let scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
};


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
const fill_window = (s) => {

  const _w_size = s.w_size;
  let n, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;
      if (s.insert > s.strstart) {
        s.insert = s.strstart;
      }
      slide_hash(s);
      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    const curr = s.strstart + s.lookahead;
//    let init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
};

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 *
 * In case deflateParams() is used to later switch to a non-zero compression
 * level, s->matches (otherwise unused when storing) keeps track of the number
 * of hash table slides to perform. If s->matches is 1, then one hash table
 * slide will be done when switching. If s->matches is 2, the maximum value
 * allowed here, then the hash table will be cleared, since two or more slides
 * is the same as a clear.
 *
 * deflate_stored() is written to minimize the number of times an input byte is
 * copied. It is most efficient with large input and output buffers, which
 * maximizes the opportunites to have a single copy from next_in to next_out.
 */
const deflate_stored = (s, flush) => {

  /* Smallest worthy block size when not flushing or finishing. By default
   * this is 32K. This can be as small as 507 bytes for memLevel == 1. For
   * large input and output buffers, the stored block size will be larger.
   */
  let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;

  /* Copy as many min_block or larger stored blocks directly to next_out as
   * possible. If flushing, copy the remaining available input to next_out as
   * stored blocks, if there is enough space.
   */
  let len, left, have, last = 0;
  let used = s.strm.avail_in;
  do {
    /* Set len to the maximum size block that we can copy directly with the
     * available input data and output space. Set left to how much of that
     * would be copied from what's left in the window.
     */
    len = 65535/* MAX_STORED */;     /* maximum deflate stored block length */
    have = (s.bi_valid + 42) >> 3;     /* number of header bytes */
    if (s.strm.avail_out < have) {         /* need room for header */
      break;
    }
      /* maximum stored block length that will fit in avail_out: */
    have = s.strm.avail_out - have;
    left = s.strstart - s.block_start;  /* bytes left in window */
    if (len > left + s.strm.avail_in) {
      len = left + s.strm.avail_in;   /* limit len to the input */
    }
    if (len > have) {
      len = have;             /* limit len to the output */
    }

    /* If the stored block would be less than min_block in length, or if
     * unable to copy all of the available input when flushing, then try
     * copying to the window and the pending buffer instead. Also don't
     * write an empty block when flushing -- deflate() does that.
     */
    if (len < min_block && ((len === 0 && flush !== Z_FINISH$3) ||
                        flush === Z_NO_FLUSH$2 ||
                        len !== left + s.strm.avail_in)) {
      break;
    }

    /* Make a dummy stored block in pending to get the header bytes,
     * including any pending bits. This also updates the debugging counts.
     */
    last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
    _tr_stored_block(s, 0, 0, last);

    /* Replace the lengths in the dummy stored block with len. */
    s.pending_buf[s.pending - 4] = len;
    s.pending_buf[s.pending - 3] = len >> 8;
    s.pending_buf[s.pending - 2] = ~len;
    s.pending_buf[s.pending - 1] = ~len >> 8;

    /* Write the stored block header bytes. */
    flush_pending(s.strm);

//#ifdef ZLIB_DEBUG
//    /* Update debugging counts for the data about to be copied. */
//    s->compressed_len += len << 3;
//    s->bits_sent += len << 3;
//#endif

    /* Copy uncompressed bytes from the window to next_out. */
    if (left) {
      if (left > len) {
        left = len;
      }
      //zmemcpy(s->strm->next_out, s->window + s->block_start, left);
      s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
      s.strm.next_out += left;
      s.strm.avail_out -= left;
      s.strm.total_out += left;
      s.block_start += left;
      len -= left;
    }

    /* Copy uncompressed bytes directly from next_in to next_out, updating
     * the check value.
     */
    if (len) {
      read_buf(s.strm, s.strm.output, s.strm.next_out, len);
      s.strm.next_out += len;
      s.strm.avail_out -= len;
      s.strm.total_out += len;
    }
  } while (last === 0);

  /* Update the sliding window with the last s->w_size bytes of the copied
   * data, or append all of the copied data to the existing window if less
   * than s->w_size bytes were copied. Also update the number of bytes to
   * insert in the hash tables, in the event that deflateParams() switches to
   * a non-zero compression level.
   */
  used -= s.strm.avail_in;    /* number of input bytes directly copied */
  if (used) {
    /* If any input was used, then no unused input remains in the window,
     * therefore s->block_start == s->strstart.
     */
    if (used >= s.w_size) {  /* supplant the previous history */
      s.matches = 2;     /* clear hash */
      //zmemcpy(s->window, s->strm->next_in - s->w_size, s->w_size);
      s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
      s.strstart = s.w_size;
      s.insert = s.strstart;
    }
    else {
      if (s.window_size - s.strstart <= used) {
        /* Slide the window down. */
        s.strstart -= s.w_size;
        //zmemcpy(s->window, s->window + s->w_size, s->strstart);
        s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
        if (s.matches < 2) {
          s.matches++;   /* add a pending slide_hash() */
        }
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
      }
      //zmemcpy(s->window + s->strstart, s->strm->next_in - used, used);
      s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
      s.strstart += used;
      s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
    }
    s.block_start = s.strstart;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }

  /* If the last block was written to next_out, then done. */
  if (last) {
    return BS_FINISH_DONE;
  }

  /* If flushing and all input has been consumed, then done. */
  if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 &&
    s.strm.avail_in === 0 && s.strstart === s.block_start) {
    return BS_BLOCK_DONE;
  }

  /* Fill the window with any remaining input. */
  have = s.window_size - s.strstart;
  if (s.strm.avail_in > have && s.block_start >= s.w_size) {
    /* Slide the window down. */
    s.block_start -= s.w_size;
    s.strstart -= s.w_size;
    //zmemcpy(s->window, s->window + s->w_size, s->strstart);
    s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
    if (s.matches < 2) {
      s.matches++;       /* add a pending slide_hash() */
    }
    have += s.w_size;      /* more space now */
    if (s.insert > s.strstart) {
      s.insert = s.strstart;
    }
  }
  if (have > s.strm.avail_in) {
    have = s.strm.avail_in;
  }
  if (have) {
    read_buf(s.strm, s.window, s.strstart, have);
    s.strstart += have;
    s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }

  /* There was not enough avail_out to write a complete worthy or flushed
   * stored block to next_out. Write a stored block to pending instead, if we
   * have enough input for a worthy block, or if flushing and there is enough
   * room for the remaining input as a stored block in the pending buffer.
   */
  have = (s.bi_valid + 42) >> 3;     /* number of header bytes */
    /* maximum stored block length that will fit in pending: */
  have = s.pending_buf_size - have > 65535/* MAX_STORED */ ? 65535/* MAX_STORED */ : s.pending_buf_size - have;
  min_block = have > s.w_size ? s.w_size : have;
  left = s.strstart - s.block_start;
  if (left >= min_block ||
     ((left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 &&
     s.strm.avail_in === 0 && left <= have)) {
    len = left > have ? have : left;
    last = flush === Z_FINISH$3 && s.strm.avail_in === 0 &&
         len === left ? 1 : 0;
    _tr_stored_block(s, s.block_start, len, last);
    s.block_start += len;
    flush_pending(s.strm);
  }

  /* We've done all we can with the available input and output. */
  return last ? BS_FINISH_STARTED : BS_NEED_MORE;
};


/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
const deflate_fast = (s, flush) => {

  let hash_head;        /* head of the hash chain */
  let bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH$3) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
};

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
const deflate_slow = (s, flush) => {

  let hash_head;          /* head of hash chain */
  let bflush;              /* set if current block must be flushed */

  let max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
};


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
const deflate_rle = (s, flush) => {

  let bflush;            /* set if current block must be flushed */
  let prev;              /* byte at distance one to match */
  let scan, strend;      /* scan goes up to strend for length of run */

  const _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
};

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
const deflate_huff = (s, flush) => {

  let bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = _tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
};

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {

  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

const configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
const lm_init = (s) => {

  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
};


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED$2; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new Uint16Array(HEAP_SIZE * 2);
  this.dyn_dtree  = new Uint16Array((2 * D_CODES + 1) * 2);
  this.bl_tree    = new Uint16Array((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new Uint16Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new Uint16Array(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new Uint16Array(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.sym_buf = 0;        /* buffer for distances and literals/lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.sym_next = 0;      /* running index in sym_buf */
  this.sym_end = 0;       /* symbol table full when sym_next reaches this */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


/* =========================================================================
 * Check for a valid deflate stream state. Return 0 if ok, 1 if not.
 */
const deflateStateCheck = (strm) => {

  if (!strm) {
    return 1;
  }
  const s = strm.state;
  if (!s || s.strm !== strm || (s.status !== INIT_STATE &&
//#ifdef GZIP
                                s.status !== GZIP_STATE &&
//#endif
                                s.status !== EXTRA_STATE &&
                                s.status !== NAME_STATE &&
                                s.status !== COMMENT_STATE &&
                                s.status !== HCRC_STATE &&
                                s.status !== BUSY_STATE &&
                                s.status !== FINISH_STATE)) {
    return 1;
  }
  return 0;
};


const deflateResetKeep = (strm) => {

  if (deflateStateCheck(strm)) {
    return err(strm, Z_STREAM_ERROR$2);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  const s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status =
//#ifdef GZIP
    s.wrap === 2 ? GZIP_STATE :
//#endif
    s.wrap ? INIT_STATE : BUSY_STATE;
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = -2;
  _tr_init(s);
  return Z_OK$3;
};


const deflateReset = (strm) => {

  const ret = deflateResetKeep(strm);
  if (ret === Z_OK$3) {
    lm_init(strm.state);
  }
  return ret;
};


const deflateSetHeader = (strm, head) => {

  if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
    return Z_STREAM_ERROR$2;
  }
  strm.state.gzhead = head;
  return Z_OK$3;
};


const deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {

  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR$2;
  }
  let wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION$1) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED || (windowBits === 8 && wrap !== 1)) {
    return err(strm, Z_STREAM_ERROR$2);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  const s = new DeflateState();

  strm.state = s;
  s.strm = strm;
  s.status = INIT_STATE;     /* to pass state test in deflateReset() */

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new Uint8Array(s.w_size * 2);
  s.head = new Uint16Array(s.hash_size);
  s.prev = new Uint16Array(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  /* We overlay pending_buf and sym_buf. This works since the average size
   * for length/distance pairs over any compressed block is assured to be 31
   * bits or less.
   *
   * Analysis: The longest fixed codes are a length code of 8 bits plus 5
   * extra bits, for lengths 131 to 257. The longest fixed distance codes are
   * 5 bits plus 13 extra bits, for distances 16385 to 32768. The longest
   * possible fixed-codes length/distance pair is then 31 bits total.
   *
   * sym_buf starts one-fourth of the way into pending_buf. So there are
   * three bytes in sym_buf for every four bytes in pending_buf. Each symbol
   * in sym_buf is three bytes -- two for the distance and one for the
   * literal/length. As each symbol is consumed, the pointer to the next
   * sym_buf value to read moves forward three bytes. From that symbol, up to
   * 31 bits are written to pending_buf. The closest the written pending_buf
   * bits gets to the next sym_buf symbol to read is just before the last
   * code is written. At that time, 31*(n-2) bits have been written, just
   * after 24*(n-2) bits have been consumed from sym_buf. sym_buf starts at
   * 8*n bits into pending_buf. (Note that the symbol buffer fills when n-1
   * symbols are written.) The closest the writing gets to what is unread is
   * then n+14 bits. Here n is lit_bufsize, which is 16384 by default, and
   * can range from 128 to 32768.
   *
   * Therefore, at a minimum, there are 142 bits of space between what is
   * written and what is read in the overlain buffers, so the symbols cannot
   * be overwritten by the compressed data. That space is actually 139 bits,
   * due to the three-bit fixed-code block header.
   *
   * That covers the case where either Z_FIXED is specified, forcing fixed
   * codes, or when the use of fixed codes is chosen, because that choice
   * results in a smaller compressed block than dynamic codes. That latter
   * condition then assures that the above analysis also covers all dynamic
   * blocks. A dynamic-code block will only be chosen to be emitted if it has
   * fewer bits than a fixed-code block would for the same set of symbols.
   * Therefore its average symbol length is assured to be less than 31. So
   * the compressed data for a dynamic block also cannot overwrite the
   * symbols from which it is being constructed.
   */

  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new Uint8Array(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->sym_buf = s->pending_buf + s->lit_bufsize;
  s.sym_buf = s.lit_bufsize;

  //s->sym_end = (s->lit_bufsize - 1) * 3;
  s.sym_end = (s.lit_bufsize - 1) * 3;
  /* We avoid equality with lit_bufsize*3 because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
};

const deflateInit = (strm, level) => {

  return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
};


/* ========================================================================= */
const deflate$2 = (strm, flush) => {

  if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
  }

  const s = strm.state;

  if (!strm.output ||
      (strm.avail_in !== 0 && !strm.input) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH$3)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
  }

  const old_flush = s.last_flush;
  s.last_flush = flush;

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK$3;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH$3) {
    return err(strm, Z_BUF_ERROR$1);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR$1);
  }

  /* Write the header */
  if (s.status === INIT_STATE && s.wrap === 0) {
    s.status = BUSY_STATE;
  }
  if (s.status === INIT_STATE) {
    /* zlib header */
    let header = (Z_DEFLATED$2 + ((s.w_bits - 8) << 4)) << 8;
    let level_flags = -1;

    if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
      level_flags = 0;
    } else if (s.level < 6) {
      level_flags = 1;
    } else if (s.level === 6) {
      level_flags = 2;
    } else {
      level_flags = 3;
    }
    header |= (level_flags << 6);
    if (s.strstart !== 0) { header |= PRESET_DICT; }
    header += 31 - (header % 31);

    putShortMSB(s, header);

    /* Save the adler32 of the preset dictionary: */
    if (s.strstart !== 0) {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 0xffff);
    }
    strm.adler = 1; // adler32(0L, Z_NULL, 0);
    s.status = BUSY_STATE;

    /* Compression must start with an empty pending buffer */
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
//#ifdef GZIP
  if (s.status === GZIP_STATE) {
    /* gzip header */
    strm.adler = 0;  //crc32(0L, Z_NULL, 0);
    put_byte(s, 31);
    put_byte(s, 139);
    put_byte(s, 8);
    if (!s.gzhead) { // s->gzhead == Z_NULL
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, s.level === 9 ? 2 :
                  (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                   4 : 0));
      put_byte(s, OS_CODE);
      s.status = BUSY_STATE;

      /* Compression must start with an empty pending buffer */
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    }
    else {
      put_byte(s, (s.gzhead.text ? 1 : 0) +
                  (s.gzhead.hcrc ? 2 : 0) +
                  (!s.gzhead.extra ? 0 : 4) +
                  (!s.gzhead.name ? 0 : 8) +
                  (!s.gzhead.comment ? 0 : 16)
      );
      put_byte(s, s.gzhead.time & 0xff);
      put_byte(s, (s.gzhead.time >> 8) & 0xff);
      put_byte(s, (s.gzhead.time >> 16) & 0xff);
      put_byte(s, (s.gzhead.time >> 24) & 0xff);
      put_byte(s, s.level === 9 ? 2 :
                  (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                   4 : 0));
      put_byte(s, s.gzhead.os & 0xff);
      if (s.gzhead.extra && s.gzhead.extra.length) {
        put_byte(s, s.gzhead.extra.length & 0xff);
        put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
      }
      if (s.gzhead.hcrc) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
      }
      s.gzindex = 0;
      s.status = EXTRA_STATE;
    }
  }
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      let beg = s.pending;   /* start of bytes to update crc */
      let left = (s.gzhead.extra.length & 0xffff) - s.gzindex;
      while (s.pending + left > s.pending_buf_size) {
        let copy = s.pending_buf_size - s.pending;
        // zmemcpy(s.pending_buf + s.pending,
        //    s.gzhead.extra + s.gzindex, copy);
        s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
        s.pending = s.pending_buf_size;
        //--- HCRC_UPDATE(beg) ---//
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        //---//
        s.gzindex += copy;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
        beg = 0;
        left -= copy;
      }
      // JS specific: s.gzhead.extra may be TypedArray or Array for backward compatibility
      //              TypedArray.slice and TypedArray.from don't exist in IE10-IE11
      let gzhead_extra = new Uint8Array(s.gzhead.extra);
      // zmemcpy(s->pending_buf + s->pending,
      //     s->gzhead->extra + s->gzindex, left);
      s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
      s.pending += left;
      //--- HCRC_UPDATE(beg) ---//
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      //---//
      s.gzindex = 0;
    }
    s.status = NAME_STATE;
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      let beg = s.pending;   /* start of bytes to update crc */
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          //--- HCRC_UPDATE(beg) ---//
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          //---//
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      //--- HCRC_UPDATE(beg) ---//
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      //---//
      s.gzindex = 0;
    }
    s.status = COMMENT_STATE;
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      let beg = s.pending;   /* start of bytes to update crc */
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          //--- HCRC_UPDATE(beg) ---//
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          //---//
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      //--- HCRC_UPDATE(beg) ---//
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      //---//
    }
    s.status = HCRC_STATE;
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
      put_byte(s, strm.adler & 0xff);
      put_byte(s, (strm.adler >> 8) & 0xff);
      strm.adler = 0; //crc32(0L, Z_NULL, 0);
    }
    s.status = BUSY_STATE;

    /* Compression must start with an empty pending buffer */
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
//#endif

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE)) {
    let bstate = s.level === 0 ? deflate_stored(s, flush) :
                 s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) :
                 s.strategy === Z_RLE ? deflate_rle(s, flush) :
                 configuration_table[s.level].func(s, flush);

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK$3;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        _tr_align(s);
      }
      else if (flush !== Z_BLOCK$1) { /* FULL_FLUSH or SYNC_FLUSH */

        _tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH$1) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK$3;
      }
    }
  }

  if (flush !== Z_FINISH$3) { return Z_OK$3; }
  if (s.wrap <= 0) { return Z_STREAM_END$3; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
};


const deflateEnd = (strm) => {

  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }

  const status = strm.state.status;

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
};


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
const deflateSetDictionary = (strm, dictionary) => {

  let dictLength = dictionary.length;

  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }

  const s = strm.state;
  const wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR$2;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    let tmpDict = new Uint8Array(s.w_size);
    tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  const avail = strm.avail_in;
  const next = strm.next_in;
  const input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    let str = s.strstart;
    let n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK$3;
};


var deflateInit_1 = deflateInit;
var deflateInit2_1 = deflateInit2;
var deflateReset_1 = deflateReset;
var deflateResetKeep_1 = deflateResetKeep;
var deflateSetHeader_1 = deflateSetHeader;
var deflate_2$1 = deflate$2;
var deflateEnd_1 = deflateEnd;
var deflateSetDictionary_1 = deflateSetDictionary;
var deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
module.exports.deflateBound = deflateBound;
module.exports.deflateCopy = deflateCopy;
module.exports.deflateGetDictionary = deflateGetDictionary;
module.exports.deflateParams = deflateParams;
module.exports.deflatePending = deflatePending;
module.exports.deflatePrime = deflatePrime;
module.exports.deflateTune = deflateTune;
*/

var deflate_1$2 = {
	deflateInit: deflateInit_1,
	deflateInit2: deflateInit2_1,
	deflateReset: deflateReset_1,
	deflateResetKeep: deflateResetKeep_1,
	deflateSetHeader: deflateSetHeader_1,
	deflate: deflate_2$1,
	deflateEnd: deflateEnd_1,
	deflateSetDictionary: deflateSetDictionary_1,
	deflateInfo: deflateInfo
};

const _has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

var assign = function (obj /*from1, from2, from3, ...*/) {
  const sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    const source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (const p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// Join array of chunks to single array.
var flattenChunks = (chunks) => {
  // calculate data length
  let len = 0;

  for (let i = 0, l = chunks.length; i < l; i++) {
    len += chunks[i].length;
  }

  // join chunks
  const result = new Uint8Array(len);

  for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
    let chunk = chunks[i];
    result.set(chunk, pos);
    pos += chunk.length;
  }

  return result;
};

var common = {
	assign: assign,
	flattenChunks: flattenChunks
};

// String encode/decode helpers


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safari
//
let STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
const _utf8len = new Uint8Array(256);
for (let q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
var string2buf = (str) => {
  if (typeof TextEncoder === 'function' && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(str);
  }

  let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new Uint8Array(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper
const buf2binstring = (buf, len) => {
  // On Chrome, the arguments in a function call that are allowed is `65534`.
  // If the length of the buffer is smaller than that, we can use this optimization,
  // otherwise we will take a slower path.
  if (len < 65534) {
    if (buf.subarray && STR_APPLY_UIA_OK) {
      return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
    }
  }

  let result = '';
  for (let i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
};


// convert array to string
var buf2string = (buf, max) => {
  const len = max || buf.length;

  if (typeof TextDecoder === 'function' && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(buf.subarray(0, max));
  }

  let i, out;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  const utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    let c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    let c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
var utf8border = (buf, max) => {

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  let pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means buffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

var strings = {
	string2buf: string2buf,
	buf2string: buf2string,
	utf8border: utf8border
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

var zstream = ZStream;

const toString$1 = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

const {
  Z_NO_FLUSH: Z_NO_FLUSH$1, Z_SYNC_FLUSH, Z_FULL_FLUSH, Z_FINISH: Z_FINISH$2,
  Z_OK: Z_OK$2, Z_STREAM_END: Z_STREAM_END$2,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFLATED: Z_DEFLATED$1
} = constants$2;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overridden.
 **/

/**
 * Deflate.result -> Uint8Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * const pako = require('pako')
 *   , chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * const deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate$1(options) {
  this.options = common.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED$1,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY
  }, options || {});

  let opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new zstream();
  this.strm.avail_out = 0;

  let status = deflate_1$2.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK$2) {
    throw new Error(messages[status]);
  }

  if (opt.header) {
    deflate_1$2.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    let dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = deflate_1$2.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, flush_mode]) -> Boolean
 * - data (Uint8Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must
 * have `flush_mode` Z_FINISH (or `true`). That will flush internal pending
 * buffers and call [[Deflate#onEnd]].
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate$1.prototype.push = function (data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  let status, _flush_mode;

  if (this.ended) { return false; }

  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString$1.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  for (;;) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    // Make sure avail_out > 6 to avoid repeating markers
    if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }

    status = deflate_1$2.deflate(strm, _flush_mode);

    // Ended => flush and finish
    if (status === Z_STREAM_END$2) {
      if (strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
      }
      status = deflate_1$2.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK$2;
    }

    // Flush if out buffer full
    if (strm.avail_out === 0) {
      this.onData(strm.output);
      continue;
    }

    // Flush if requested and has data
    if (_flush_mode > 0 && strm.next_out > 0) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }

    if (strm.avail_in === 0) break;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array): output data.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate$1.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH). By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate$1.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK$2) {
    this.result = common.flattenChunks(this.chunks);
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array
 * - data (Uint8Array|ArrayBuffer|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 *
 * ##### Example:
 *
 * ```javascript
 * const pako = require('pako')
 * const data = new Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate$1(input, options) {
  const deflator = new Deflate$1(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || messages[deflator.err]; }

  return deflator.result;
}


/**
 * gzip(data[, options]) -> Uint8Array
 * - data (Uint8Array|ArrayBuffer|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip$1(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}
var gzip_1$1 = gzip$1;

var deflate_1$1 = {
	gzip: gzip_1$1};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
const BAD$1 = 16209;       /* got a data error -- remain here until reset */
const TYPE$1 = 16191;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
var inffast = function inflate_fast(strm, start) {
  let _in;                    /* local strm.input */
  let last;                   /* have enough input while in < last */
  let _out;                   /* local strm.output */
  let beg;                    /* inflate()'s initial strm.output */
  let end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  let dmax;                   /* maximum distance from zlib header */
//#endif
  let wsize;                  /* window size or zero if not using window */
  let whave;                  /* valid bytes in the window */
  let wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  let s_window;               /* allocated sliding window, if wsize != 0 */
  let hold;                   /* local strm.hold */
  let bits;                   /* local strm.bits */
  let lcode;                  /* local strm.lencode */
  let dcode;                  /* local strm.distcode */
  let lmask;                  /* mask for first level of length codes */
  let dmask;                  /* mask for first level of distance codes */
  let here;                   /* retrieved table entry */
  let op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  let len;                    /* match length, unused bytes */
  let dist;                   /* match distance */
  let from;                   /* where to copy match from */
  let from_source;


  let input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  const state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD$1;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD$1;
                  break top;
                }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD$1;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE$1;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD$1;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

const MAXBITS = 15;
const ENOUGH_LENS$1 = 852;
const ENOUGH_DISTS$1 = 592;
//const ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

const CODES$1 = 0;
const LENS$1 = 1;
const DISTS$1 = 2;

const lbase = new Uint16Array([ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
]);

const lext = new Uint8Array([ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
]);

const dbase = new Uint16Array([ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
]);

const dext = new Uint8Array([ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
]);

const inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) =>
{
  const bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  let len = 0;               /* a code's length in bits */
  let sym = 0;               /* index of code symbols */
  let min = 0, max = 0;          /* minimum and maximum code lengths */
  let root = 0;              /* number of index bits for root table */
  let curr = 0;              /* number of index bits for current table */
  let drop = 0;              /* code bits to drop for sub-table */
  let left = 0;                   /* number of prefix codes available */
  let used = 0;              /* code entries in table used */
  let huff = 0;              /* Huffman code */
  let incr;              /* for incrementing code, index */
  let fill;              /* index for replicating entries */
  let low;               /* low bits for current root entry */
  let mask;              /* mask for low root bits */
  let next;             /* next available space in table */
  let base = null;     /* base value table to use */
//  let shoextra;    /* extra bits table to use */
  let match;                  /* use base and extra for symbol >= match */
  const count = new Uint16Array(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  const offs = new Uint16Array(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  let extra = null;

  let here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES$1 || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES$1) {
    base = extra = work;    /* dummy value--not used */
    match = 20;

  } else if (type === LENS$1) {
    base = lbase;
    extra = lext;
    match = 257;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    match = 0;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS$1 && used > ENOUGH_LENS$1) ||
    (type === DISTS$1 && used > ENOUGH_DISTS$1)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] + 1 < match) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] >= match) {
      here_op = extra[work[sym] - match];
      here_val = base[work[sym] - match];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS$1 && used > ENOUGH_LENS$1) ||
        (type === DISTS$1 && used > ENOUGH_DISTS$1)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};


var inftrees = inflate_table;

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.






const CODES = 0;
const LENS = 1;
const DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/

const {
  Z_FINISH: Z_FINISH$1, Z_BLOCK, Z_TREES,
  Z_OK: Z_OK$1, Z_STREAM_END: Z_STREAM_END$1, Z_NEED_DICT: Z_NEED_DICT$1, Z_STREAM_ERROR: Z_STREAM_ERROR$1, Z_DATA_ERROR: Z_DATA_ERROR$1, Z_MEM_ERROR: Z_MEM_ERROR$1, Z_BUF_ERROR,
  Z_DEFLATED
} = constants$2;


/* STATES ====================================================================*/
/* ===========================================================================*/


const    HEAD = 16180;       /* i: waiting for magic header */
const    FLAGS = 16181;      /* i: waiting for method and flags (gzip) */
const    TIME = 16182;       /* i: waiting for modification time (gzip) */
const    OS = 16183;         /* i: waiting for extra flags and operating system (gzip) */
const    EXLEN = 16184;      /* i: waiting for extra length (gzip) */
const    EXTRA = 16185;      /* i: waiting for extra bytes (gzip) */
const    NAME = 16186;       /* i: waiting for end of file name (gzip) */
const    COMMENT = 16187;    /* i: waiting for end of comment (gzip) */
const    HCRC = 16188;       /* i: waiting for header crc (gzip) */
const    DICTID = 16189;    /* i: waiting for dictionary check value */
const    DICT = 16190;      /* waiting for inflateSetDictionary() call */
const        TYPE = 16191;      /* i: waiting for type bits, including last-flag bit */
const        TYPEDO = 16192;    /* i: same, but skip check to exit inflate on new block */
const        STORED = 16193;    /* i: waiting for stored size (length and complement) */
const        COPY_ = 16194;     /* i/o: same as COPY below, but only first time in */
const        COPY = 16195;      /* i/o: waiting for input or output to copy stored block */
const        TABLE = 16196;     /* i: waiting for dynamic block table lengths */
const        LENLENS = 16197;   /* i: waiting for code length code lengths */
const        CODELENS = 16198;  /* i: waiting for length/lit and distance code lengths */
const            LEN_ = 16199;      /* i: same as LEN below, but only first time in */
const            LEN = 16200;       /* i: waiting for length/lit/eob code */
const            LENEXT = 16201;    /* i: waiting for length extra bits */
const            DIST = 16202;      /* i: waiting for distance code */
const            DISTEXT = 16203;   /* i: waiting for distance extra bits */
const            MATCH = 16204;     /* o: waiting for output space to copy string */
const            LIT = 16205;       /* o: waiting for output space to write literal */
const    CHECK = 16206;     /* i: waiting for 32-bit check value */
const    LENGTH = 16207;    /* i: waiting for 32-bit length (gzip) */
const    DONE = 16208;      /* finished check, done -- remain here until reset */
const    BAD = 16209;       /* got a data error -- remain here until reset */
const    MEM = 16210;       /* got an inflate() memory error -- remain here until reset */
const    SYNC = 16211;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



const ENOUGH_LENS = 852;
const ENOUGH_DISTS = 592;
//const ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

const MAX_WBITS = 15;
/* 32K LZ77 window */
const DEF_WBITS = MAX_WBITS;


const zswap32 = (q) => {

  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
};


function InflateState() {
  this.strm = null;           /* pointer back to this zlib stream */
  this.mode = 0;              /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip,
                                 bit 2 true to validate check value */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib), or
                                 -1 if raw or no header yet */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new Uint16Array(320); /* temporary storage for code lengths */
  this.work = new Uint16Array(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new Int32Array(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}


const inflateStateCheck = (strm) => {

  if (!strm) {
    return 1;
  }
  const state = strm.state;
  if (!state || state.strm !== strm ||
    state.mode < HEAD || state.mode > SYNC) {
    return 1;
  }
  return 0;
};


const inflateResetKeep = (strm) => {

  if (inflateStateCheck(strm)) { return Z_STREAM_ERROR$1; }
  const state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.flags = -1;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
  state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK$1;
};


const inflateReset = (strm) => {

  if (inflateStateCheck(strm)) { return Z_STREAM_ERROR$1; }
  const state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

};


const inflateReset2 = (strm, windowBits) => {
  let wrap;

  /* get the state */
  if (inflateStateCheck(strm)) { return Z_STREAM_ERROR$1; }
  const state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 5;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR$1;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
};


const inflateInit2 = (strm, windowBits) => {

  if (!strm) { return Z_STREAM_ERROR$1; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  const state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.strm = strm;
  state.window = null/*Z_NULL*/;
  state.mode = HEAD;     /* to pass state test in inflateReset2() */
  const ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK$1) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
};


const inflateInit = (strm) => {

  return inflateInit2(strm, DEF_WBITS);
};


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
let virgin = true;

let lenfix, distfix; // We have no pointers in JS, so keep tables separate


const fixedtables = (state) => {

  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    lenfix = new Int32Array(512);
    distfix = new Int32Array(32);

    /* literal/length table */
    let sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inftrees(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inftrees(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
};


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
const updatewindow = (strm, src, end, copy) => {

  let dist;
  const state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new Uint8Array(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    state.window.set(src.subarray(end - state.wsize, end), 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      state.window.set(src.subarray(end - copy, end), 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
};


const inflate$2 = (strm, flush) => {

  let state;
  let input, output;          // input/output buffers
  let next;                   /* next input INDEX */
  let put;                    /* next output INDEX */
  let have, left;             /* available input and output */
  let hold;                   /* bit buffer */
  let bits;                   /* bits in bit buffer */
  let _in, _out;              /* save starting available input and output */
  let copy;                   /* number of stored or match bytes to copy */
  let from;                   /* where to copy match bytes from */
  let from_source;
  let here = 0;               /* current decoding table entry */
  let here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //let last;                   /* parent table entry */
  let last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  let len;                    /* length to copy for repeats, bits to drop */
  let ret;                    /* return code */
  const hbuf = new Uint8Array(4);    /* buffer for gzip header crc calculation */
  let opts;

  let n; // temporary variable for NEED_BITS

  const order = /* permutation of code lengths */
    new Uint8Array([ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ]);


  if (inflateStateCheck(strm) || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR$1;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK$1;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        }
        //=== NEEDBITS(16);
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
          if (state.wbits === 0) {
            state.wbits = 15;
          }
          state.check = 0/*crc32(0L, Z_NULL, 0)*/;
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32_1(state.check, hbuf, 2, 0);
          //===//

          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = FLAGS;
          break;
        }
        if (state.head) {
          state.head.done = false;
        }
        if (!(state.wrap & 1) ||   /* check if zlib header allowed */
          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD;
          break;
        }
        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        len = (hold & 0x0f)/*BITS(4)*/ + 8;
        if (state.wbits === 0) {
          state.wbits = len;
        }
        if (len > 15 || len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD;
          break;
        }

        // !!! pako patch. Force use `options.windowBits` if passed.
        // Required to always use max window size by default.
        state.dmax = 1 << state.wbits;
        //state.dmax = 1 << len;

        state.flags = 0;               /* indicate zlib header */
        //Tracev((stderr, "inflate:   zlib header ok\n"));
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = hold & 0x200 ? DICTID : TYPE;
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        break;
      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.flags = hold;
        if ((state.flags & 0xff) !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD;
          break;
        }
        if (state.head) {
          state.head.text = ((hold >> 8) & 1);
        }
        if ((state.flags & 0x0200) && (state.wrap & 4)) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32_1(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = TIME;
        /* falls through */
      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.time = hold;
        }
        if ((state.flags & 0x0200) && (state.wrap & 4)) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          hbuf[2] = (hold >>> 16) & 0xff;
          hbuf[3] = (hold >>> 24) & 0xff;
          state.check = crc32_1(state.check, hbuf, 4, 0);
          //===
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = OS;
        /* falls through */
      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.xflags = (hold & 0xff);
          state.head.os = (hold >> 8);
        }
        if ((state.flags & 0x0200) && (state.wrap & 4)) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32_1(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = EXLEN;
        /* falls through */
      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length = hold;
          if (state.head) {
            state.head.extra_len = hold;
          }
          if ((state.flags & 0x0200) && (state.wrap & 4)) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        else if (state.head) {
          state.head.extra = null/*Z_NULL*/;
        }
        state.mode = EXTRA;
        /* falls through */
      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;
          if (copy > have) { copy = have; }
          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;
              if (!state.head.extra) {
                // Use untyped array for more convenient processing later
                state.head.extra = new Uint8Array(state.head.extra_len);
              }
              state.head.extra.set(
                input.subarray(
                  next,
                  // extra field is limited to 65536 bytes
                  // - no need for additional size check
                  next + copy
                ),
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len
              );
              //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }
            if ((state.flags & 0x0200) && (state.wrap & 4)) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            state.length -= copy;
          }
          if (state.length) { break inf_leave; }
        }
        state.length = 0;
        state.mode = NAME;
        /* falls through */
      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.name_max*/)) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if ((state.flags & 0x0200) && (state.wrap & 4)) {
            state.check = crc32_1(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.name = null;
        }
        state.length = 0;
        state.mode = COMMENT;
        /* falls through */
      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.comm_max*/)) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);
          if ((state.flags & 0x0200) && (state.wrap & 4)) {
            state.check = crc32_1(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.comment = null;
        }
        state.mode = HCRC;
        /* falls through */
      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if ((state.wrap & 4) && hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        if (state.head) {
          state.head.hcrc = ((state.flags >> 9) & 1);
          state.head.done = true;
        }
        strm.adler = state.check = 0;
        state.mode = TYPE;
        break;
      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        strm.adler = state.check = zswap32(hold);
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = DICT;
        /* falls through */
      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          return Z_NEED_DICT$1;
        }
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = TYPE;
        /* falls through */
      case TYPE:
        if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          state.mode = CHECK;
          break;
        }
        //=== NEEDBITS(3); */
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.last = (hold & 0x01)/*BITS(1)*/;
        //--- DROPBITS(1) ---//
        hold >>>= 1;
        bits -= 1;
        //---//

        switch ((hold & 0x03)/*BITS(2)*/) {
          case 0:                             /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;
          case 1:                             /* fixed block */
            fixedtables(state);
            //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = LEN_;             /* decode codes */
            if (flush === Z_TREES) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break inf_leave;
            }
            break;
          case 2:                             /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;
          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD;
        }
        //--- DROPBITS(2) ---//
        hold >>>= 2;
        bits -= 2;
        //---//
        break;
      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD;
          break;
        }
        state.length = hold & 0xffff;
        //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = COPY_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case COPY_:
        state.mode = COPY;
        /* falls through */
      case COPY:
        copy = state.length;
        if (copy) {
          if (copy > have) { copy = have; }
          if (copy > left) { copy = left; }
          if (copy === 0) { break inf_leave; }
          //--- zmemcpy(put, next, copy); ---
          output.set(input.subarray(next, next + copy), put);
          //---//
          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        }
        //Tracev((stderr, "inflate:       stored end\n"));
        state.mode = TYPE;
        break;
      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
//#ifndef PKZIP_BUG_WORKAROUND
        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));
        state.have = 0;
        state.mode = LENLENS;
        /* falls through */
      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
          //--- DROPBITS(3) ---//
          hold >>>= 3;
          bits -= 3;
          //---//
        }
        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        }
        // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table
        state.lencode = state.lendyn;
        state.lenbits = 7;

        opts = { bits: state.lenbits };
        ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, "inflate:       code lengths ok\n"));
        state.have = 0;
        state.mode = CODELENS;
        /* falls through */
      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.lens[state.have++] = here_val;
          }
          else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03);//BITS(2);
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
            }
            else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 3 + (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 11 + (hold & 0x7f);//BITS(7);
              //--- DROPBITS(7) ---//
              hold >>>= 7;
              bits -= 7;
              //---//
            }
            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }

        /* handle error breaks in while */
        if (state.mode === BAD) { break; }

        /* check for end-of-block code (better have one) */
        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD;
          break;
        }

        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
        state.lenbits = 9;

        opts = { bits: state.lenbits };
        ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.lenbits = opts.bits;
        // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD;
          break;
        }

        state.distbits = 6;
        //state.distcode.copy(state.codes);
        // Switch to use dynamic table
        state.distcode = state.distdyn;
        opts = { bits: state.distbits };
        ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.distbits = opts.bits;
        // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, 'inflate:       codes ok\n'));
        state.mode = LEN_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case LEN_:
        state.mode = LEN;
        /* falls through */
      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          inffast(strm, _out);
          //--- LOAD() ---
          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits;
          //---

          if (state.mode === TYPE) {
            state.back = -1;
          }
          break;
        }
        state.back = 0;
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.lencode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        state.length = here_val;
        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }
        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE;
          break;
        }
        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break;
        }
        state.extra = here_op & 15;
        state.mode = LENEXT;
        /* falls through */
      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //Tracevv((stderr, "inflate:         length %u\n", state.length));
        state.was = state.length;
        state.mode = DIST;
        /* falls through */
      case DIST:
        for (;;) {
          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.distcode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD;
          break;
        }
        state.offset = here_val;
        state.extra = (here_op) & 15;
        state.mode = DISTEXT;
        /* falls through */
      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
//#ifdef INFLATE_STRICT
        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
        state.mode = MATCH;
        /* falls through */
      case MATCH:
        if (left === 0) { break inf_leave; }
        copy = _out - left;
        if (state.offset > copy) {         /* copy from window */
          copy = state.offset - copy;
          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
          }
          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          }
          else {
            from = state.wnext - copy;
          }
          if (copy > state.length) { copy = state.length; }
          from_source = state.window;
        }
        else {                              /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }
        if (copy > left) { copy = left; }
        left -= copy;
        state.length -= copy;
        do {
          output[put++] = from_source[from++];
        } while (--copy);
        if (state.length === 0) { state.mode = LEN; }
        break;
      case LIT:
        if (left === 0) { break inf_leave; }
        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;
      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            // Use '|' instead of '+' to make sure that result is signed
            hold |= input[next++] << bits;
            bits += 8;
          }
          //===//
          _out -= left;
          strm.total_out += _out;
          state.total += _out;
          if ((state.wrap & 4) && _out) {
            strm.adler = state.check =
                /*UPDATE_CHECK(state.check, put - _out, _out);*/
                (state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out));

          }
          _out = left;
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
          if ((state.wrap & 4) && (state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }
        state.mode = LENGTH;
        /* falls through */
      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if ((state.wrap & 4) && hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }
        state.mode = DONE;
        /* falls through */
      case DONE:
        ret = Z_STREAM_END$1;
        break inf_leave;
      case BAD:
        ret = Z_DATA_ERROR$1;
        break inf_leave;
      case MEM:
        return Z_MEM_ERROR$1;
      case SYNC:
        /* falls through */
      default:
        return Z_STREAM_ERROR$1;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH$1))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if ((state.wrap & 4) && _out) {
    strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH$1) && ret === Z_OK$1) {
    ret = Z_BUF_ERROR;
  }
  return ret;
};


const inflateEnd = (strm) => {

  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }

  let state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK$1;
};


const inflateGetHeader = (strm, head) => {

  /* check state */
  if (inflateStateCheck(strm)) { return Z_STREAM_ERROR$1; }
  const state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR$1; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK$1;
};


const inflateSetDictionary = (strm, dictionary) => {
  const dictLength = dictionary.length;

  let state;
  let dictid;
  let ret;

  /* check state */
  if (inflateStateCheck(strm)) { return Z_STREAM_ERROR$1; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR$1;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32_1(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR$1;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR$1;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK$1;
};


var inflateReset_1 = inflateReset;
var inflateReset2_1 = inflateReset2;
var inflateResetKeep_1 = inflateResetKeep;
var inflateInit_1 = inflateInit;
var inflateInit2_1 = inflateInit2;
var inflate_2$1 = inflate$2;
var inflateEnd_1 = inflateEnd;
var inflateGetHeader_1 = inflateGetHeader;
var inflateSetDictionary_1 = inflateSetDictionary;
var inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
module.exports.inflateCodesUsed = inflateCodesUsed;
module.exports.inflateCopy = inflateCopy;
module.exports.inflateGetDictionary = inflateGetDictionary;
module.exports.inflateMark = inflateMark;
module.exports.inflatePrime = inflatePrime;
module.exports.inflateSync = inflateSync;
module.exports.inflateSyncPoint = inflateSyncPoint;
module.exports.inflateUndermine = inflateUndermine;
module.exports.inflateValidate = inflateValidate;
*/

var inflate_1$2 = {
	inflateReset: inflateReset_1,
	inflateReset2: inflateReset2_1,
	inflateResetKeep: inflateResetKeep_1,
	inflateInit: inflateInit_1,
	inflateInit2: inflateInit2_1,
	inflate: inflate_2$1,
	inflateEnd: inflateEnd_1,
	inflateGetHeader: inflateGetHeader_1,
	inflateSetDictionary: inflateSetDictionary_1,
	inflateInfo: inflateInfo
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

var gzheader = GZheader;

const toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

const {
  Z_NO_FLUSH, Z_FINISH,
  Z_OK, Z_STREAM_END, Z_NEED_DICT, Z_STREAM_ERROR, Z_DATA_ERROR, Z_MEM_ERROR
} = constants$2;

/* ===========================================================================*/


/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overridden.
 **/

/**
 * Inflate.result -> Uint8Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * const pako = require('pako')
 * const chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
 * const chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * const inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate$1(options) {
  this.options = common.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ''
  }, options || {});

  const opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new zstream();
  this.strm.avail_out = 0;

  let status  = inflate_1$2.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== Z_OK) {
    throw new Error(messages[status]);
  }

  this.header = new gzheader();

  inflate_1$2.inflateGetHeader(this.strm, this.header);

  // Setup dictionary
  if (opt.dictionary) {
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) { //In raw mode we need to set the dictionary early
      status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== Z_OK) {
        throw new Error(messages[status]);
      }
    }
  }
}

/**
 * Inflate#push(data[, flush_mode]) -> Boolean
 * - data (Uint8Array|ArrayBuffer): input data
 * - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE
 *   flush modes. See constants. Skipped or `false` means Z_NO_FLUSH,
 *   `true` means Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. If end of stream detected,
 * [[Inflate#onEnd]] will be called.
 *
 * `flush_mode` is not needed for normal operation, because end of stream
 * detected automatically. You may try to use it for advanced things, but
 * this functionality was not tested.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate$1.prototype.push = function (data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  const dictionary = this.options.dictionary;
  let status, _flush_mode, last_avail_out;

  if (this.ended) return false;

  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;

  // Convert data if needed
  if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  for (;;) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = inflate_1$2.inflate(strm, _flush_mode);

    if (status === Z_NEED_DICT && dictionary) {
      status = inflate_1$2.inflateSetDictionary(strm, dictionary);

      if (status === Z_OK) {
        status = inflate_1$2.inflate(strm, _flush_mode);
      } else if (status === Z_DATA_ERROR) {
        // Replace code with more verbose
        status = Z_NEED_DICT;
      }
    }

    // Skip snyc markers if more data follows and not raw mode
    while (strm.avail_in > 0 &&
           status === Z_STREAM_END &&
           strm.state.wrap > 0 &&
           data[strm.next_in] !== 0)
    {
      inflate_1$2.inflateReset(strm);
      status = inflate_1$2.inflate(strm, _flush_mode);
    }

    switch (status) {
      case Z_STREAM_ERROR:
      case Z_DATA_ERROR:
      case Z_NEED_DICT:
      case Z_MEM_ERROR:
        this.onEnd(status);
        this.ended = true;
        return false;
    }

    // Remember real `avail_out` value, because we may patch out buffer content
    // to align utf8 strings boundaries.
    last_avail_out = strm.avail_out;

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === Z_STREAM_END) {

        if (this.options.to === 'string') {

          let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          let tail = strm.next_out - next_out_utf8;
          let utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail & realign counters
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);

          this.onData(utf8str);

        } else {
          this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
        }
      }
    }

    // Must repeat iteration if out buffer is full
    if (status === Z_OK && last_avail_out === 0) continue;

    // Finalize if end of stream reached.
    if (status === Z_STREAM_END) {
      status = inflate_1$2.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return true;
    }

    if (strm.avail_in === 0) break;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|String): output data. When string output requested,
 *   each chunk will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate$1.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH). By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate$1.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = common.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|String
 * - data (Uint8Array|ArrayBuffer): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * const pako = require('pako');
 * const input = pako.deflate(new Uint8Array([1,2,3,4,5,6,7,8,9]));
 * let output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err) {
 *   console.log(err);
 * }
 * ```
 **/
function inflate$1(input, options) {
  const inflator = new Inflate$1(options);

  inflator.push(input);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) throw inflator.msg || messages[inflator.err];

  return inflator.result;
}
var ungzip$1 = inflate$1;

var inflate_1$1 = {
	ungzip: ungzip$1};

const { gzip } = deflate_1$1;

const { ungzip } = inflate_1$1;
var gzip_1 = gzip;
var ungzip_1 = ungzip;

class CompressionService {
  /**
   * Compress content using gzip
   */
  static compress(content) {
    try {
      const compressed = gzip_1(content);
      return btoa(String.fromCharCode(...compressed));
    } catch (error) {
      console.error("Compression failed:", error);
      return content;
    }
  }
  /**
   * Decompress content
   */
  static decompress(compressedContent) {
    try {
      const binaryString = atob(compressedContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const decompressed = ungzip_1(bytes, { to: "string" });
      return decompressed;
    } catch (error) {
      console.error("Decompression failed:", error);
      return compressedContent;
    }
  }
  /**
   * Calculate compression ratio
   */
  static getCompressionRatio(original, compressed) {
    return compressed.length / original.length * 100;
  }
  /**
   * Check if content should be compressed (based on size and type)
   */
  static shouldCompress(content) {
    return content.length > 1024;
  }
  /**
   * Smart compression - only compress if beneficial
   */
  static smartCompress(content) {
    if (!this.shouldCompress(content)) {
      return { content, compressed: false };
    }
    const compressed = this.compress(content);
    const ratio = this.getCompressionRatio(content, compressed);
    if (ratio < 90) {
      return { content: compressed, compressed: true };
    }
    return { content, compressed: false };
  }
}

function generateUrlId(content) {
  const timestamp = Date.now().toString();
  const hash = CryptoJS.MD5(content + timestamp).toString();
  return hash.substring(0, 12);
}
function getDatabase(locals) {
  return locals?.runtime?.env?.DB || null;
}
class DatabaseService {
  constructor(db, cache) {
    this.db = db;
    this.cache = cache;
  }
  // Create a new page with compression and cache invalidation
  async createPage(data) {
    const urlId = data.url_id || generateUrlId(data.content);
    const compressionResult = CompressionService.smartCompress(data.content);
    const result = await this.db.prepare(`
      INSERT INTO pages (url_id, title, content, language, description, is_public, is_compressed)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      urlId,
      data.title,
      compressionResult.content,
      data.language,
      data.description || null,
      data.is_public ? 1 : 0,
      compressionResult.compressed ? 1 : 0
    ).run();
    if (!result.success) {
      throw new Error("Failed to create page");
    }
    if (this.cache) {
      await this.cache.invalidateRecentPages();
    }
    return this.getPageByUrlId(urlId);
  }
  // Get page by URL ID with cache support
  async getPageByUrlId(urlId) {
    if (this.cache) {
      const cached = await this.cache.getPage(urlId);
      if (cached) {
        await this.cache.updateCacheStats(true);
        return cached;
      }
      await this.cache.updateCacheStats(false);
    }
    const result = await this.db.prepare(`
      SELECT * FROM pages WHERE url_id = ?
    `).bind(urlId).first();
    if (!result) return null;
    const page = result;
    if (page.is_compressed) {
      page.content = CompressionService.decompress(page.content);
    }
    if (this.cache) {
      await this.cache.setPage(urlId, page);
    }
    return page;
  }
  // Get page by URL ID and increment view count
  async getPageByUrlIdAndIncrement(urlId) {
    const result = await this.db.prepare(`
      SELECT * FROM pages WHERE url_id = ?
    `).bind(urlId).first();
    if (!result) return null;
    await this.db.prepare(`
      UPDATE pages SET view_count = view_count + 1 WHERE url_id = ?
    `).bind(urlId).run();
    return result;
  }
  // Increment view count for a page
  async incrementViewCount(urlId) {
    const result = await this.db.prepare(`
      UPDATE pages SET view_count = view_count + 1 WHERE url_id = ?
    `).bind(urlId).run();
    return result.success;
  }
  // Get recent public pages with cache support
  async getRecentPages(limit = 10) {
    if (this.cache) {
      const cached = await this.cache.getRecentPages(limit);
      if (cached) {
        await this.cache.updateCacheStats(true);
        return cached;
      }
      await this.cache.updateCacheStats(false);
    }
    const result = await this.db.prepare(`
      SELECT url_id, title, language, description, view_count, created_at
      FROM pages
      WHERE is_public = 1
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(limit).all();
    const pages = result.results;
    if (this.cache) {
      await this.cache.setRecentPages(limit, pages);
    }
    return pages;
  }
  // Delete page (for admin use)
  async deletePage(urlId) {
    const result = await this.db.prepare(`
      DELETE FROM pages WHERE url_id = ?
    `).bind(urlId).run();
    return result.success;
  }
}

export { DatabaseService as D, generateUrlId as a, getDatabase as g };
