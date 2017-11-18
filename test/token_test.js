
var Token = require("../lib/Token.js").Token;

chai = require("chai");
var assert = chai.assert;
var conllu_gold = require("../test/example1/conllu_obj.js").conllu;

describe("A Token object created by an empty constructor", function () {

    // The token to be tested
    var token;

    beforeEach(function () {
        token = new Token();
    });

    it("should be an instance of Token", function () {
        assert.instanceOf(token, Token);
    });

    it("should have ID field undefined", function() {
        assert.property(token,'id', "The Token does not have a property called 'id'.");
        assert.isUndefined(token.id, "The 'id' property is not undefined.");
    });

    it("should have FORM property be an empty string", function() {
        assert.property(token, 'form', "The Token does not have a property called 'form'");
        assert.isString(token.form,"The 'form' property is not a string");
        assert.strictEqual(token.form,'',"The 'form' property is not empty");
    });
    
    it("should have LEMMA property undefined", function() {
        assert.property(token,'lemma', "The Token does not have a property called 'lemma'.");
        assert.isUndefined(token.lemma, "The 'lemma' property is not undefined.");
    });

    it("should have UPOSTAG property undefined", function() {
        assert.property(token,'upostag', "The Token does not have a property called 'upostag'.");
        assert.isUndefined(token.upostag, "The 'upostag' property is not undefined.");
    });

    it("should have XPOSTAG property undefined", function() {
        assert.property(token,'xpostag', "The Token does not have a property called 'xpostag'.");
        assert.isUndefined(token.xpostag, "The 'xpostag' property is not undefined.");
    });

    it("should have FEATS property undefined", function() {
        assert.property(token,'feats', "The Token does not have a property called 'feats'.");
        assert.isUndefined(token.feats, "The 'feats' property is not undefined.");
    });

    it("should have HEAD property undefined", function() {
        assert.property(token,'head', "The Token does not have a property called 'head'.");
        assert.isUndefined(token.head, "The 'head' property is not undefined.");
    });

    describe("property 'head'", function () {

        describe("set", function () {

            var consolelogger;

            beforeEach(function () {

                // override console.warn so that we can check that it was called.
                // consolelogger exists so that we can check that it was set.
                consolelogger = null;
                console.warn = function (message) {
                    consolelogger = message;
                }
            });

            it("should console.warn about deprecation", function () {
                token.head = 'somestring';
                assert.isNotNull(consolelogger, "Console.warn was not called");
            });
        });

        describe("get", function () {

            var consolelogger;

            beforeEach(function () {

                // override console.warn so that we can check that it was called.
                // consolelogger exists so that we can check that it was set.
                consolelogger = null;
                console.warn = function (message) {
                    consolelogger = message;
                }
            });

            it("should console.warn about deprecation", function () {
                var something = token.head;
                assert.isNotNull(consolelogger, "Console.warn was not called");
            });
        })
    });

    it("should have DEPREL property undefined", function() {
        assert.property(token,'deprel', "The Token does not have a property called 'deprel'.");
        assert.isUndefined(token.deprel, "The 'deprel' property is not undefined.");
    });

    it("should have DEPS property undefined", function() {
        assert.property(token,'deps', "The Token does not have a property called 'deps'.");
        assert.isUndefined(token.deps, "The 'deps' property is not undefined.");
    });

    describe("property 'deps'", function () {

        describe("set", function () {

            var consolelogger;

            beforeEach(function () {

                // override console.warn so that we can check that it was called.
                // consolelogger exists so that we can check that it was set.
                consolelogger = null;
                console.warn = function (message) {
                    consolelogger = message;
                }
            });

            it("should console.warn about deprecation", function () {
                token.deps = 'somestring';
                assert.isNotNull(consolelogger, "Console.warn was not called");
            });
        });

        describe("get", function () {

            var consolelogger;

            beforeEach(function () {

                // override console.warn so that we can check that it was called.
                // consolelogger exists so that we can check that it was set.
                consolelogger = null;
                console.warn = function (message) {
                    consolelogger = message;
                }
            });

            it("should console.warn about deprecation", function () {
                var something = token.deps;
                assert.isNotNull(consolelogger, "Console.warn was not called");
            });
        })
    });

    it("should have MISC property undefined", function() {
        assert.property(token,'misc', "The Token does not have a property called 'misc'.");
        assert.isUndefined(token.misc, "The 'misc' property is not undefined.");
    });


    describe("property 'serial'", function () {
        it("should be a property", function () {
            assert.property(token, 'serial');
        });

        describe("get", function () {
            describe("Token generated from empty constructor", function () {
                it("should return a string of _ separated by tabs", function () {
                    assert.strictEqual(token.serial,'_\t_\t_\t_\t_\t_\t_\t_\t_\t_');
                });
            });

            conllu_gold.sentences.forEach(function (sent_gold) {
                sent_gold.tokens.forEach(function (token_gold) {
                    if ( ! token_gold.hasOwnProperty('tokens')) {
                        describe(token_gold.form, function () {
                            beforeEach(function () {
                                token.id = token_gold.id;
                                token.form = token_gold.form;
                                token.lemma = token_gold.lemma;
                                token.upostag = token_gold.upostag;
                                token.xpostag = token_gold.xpostag;
                                token.feats = token_gold.feats;
                                token.head = token_gold.head;
                                token.deprel = token_gold.deprel;
                                token.deps = token_gold.deps;
                                token.misc = token_gold.misc;
                            });

                            it("should equal "+token_gold.serial, function () {
                                assert.strictEqual(token.serial, token_gold.serial);
                            });

                        });
                    }
                });
            });
        });

        describe("set", function () {

            conllu_gold.sentences.forEach(function (sent_gold) {
                sent_gold.tokens.forEach(function (token_gold) {

                    if ( ! token_gold.hasOwnProperty('tokens')) {
                        describe(token_gold.form, function () {
                            beforeEach(function () {
                                token.serial = token_gold.serial;

                                token.id = token_gold.id;
                                token.form = token_gold.form;
                                token.lemma = token_gold.lemma;
                                token.upostag = token_gold.upostag;
                                token.xpostag = token_gold.xpostag;
                                token.feats = token_gold.feats;
                                token.head = token_gold.head;
                                token.deprel = token_gold.deprel;
                                token.deps = token_gold.deps;
                                token.misc = token_gold.misc;
                            });

                            it("should set ID to "+token_gold.id, function () {
                                assert.strictEqual(token.id, token_gold.id);
                            });

                            it("should set FORM to "+token_gold.form, function () {
                                assert.strictEqual(token.form, token_gold.form);
                            });

                            it("should set LEMMA to "+token_gold.lemma, function () {
                                assert.strictEqual(token.lemma, token_gold.lemma);
                            });

                            it("should set UPOSTAG to "+token_gold.upostag, function () {
                                assert.strictEqual(token.upostag, token_gold.upostag);
                            });

                            it("should set XPOSTAG to "+token_gold.xpostag, function () {
                                assert.strictEqual(token.xpostag, token_gold.xpostag);
                            });

                            it("should set FEATS to "+token_gold.feats, function () {
                                assert.strictEqual(token.feats, token_gold.feats);
                            });

                            it("should set HEAD to "+token_gold.head, function () {
                                assert.strictEqual(token.head, token_gold.head);
                            });

                            it("should set DEPREL to "+token_gold.deprel, function () {
                                assert.strictEqual(token.deprel, token_gold.deprel);
                            });

                            it("should set DEPS to "+token_gold.deps, function () {
                                assert.strictEqual(token.deps, token_gold.deps);
                            });

                            it("should set MISC to "+token_gold.misc, function () {
                                assert.strictEqual(token.misc, token_gold.misc);
                            });


                        });
                    }
                });
            });
        });
    });

});


